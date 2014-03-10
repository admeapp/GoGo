/*======================================
GO GO GADGET GRAPHS
=======================================*/
var graph_methods = {
	// Line Graph
	lineGraph: function(data, options) {
		
		// ySize is amount of y axis grid lines
		this.ySize = 5;
		if ( options && options.ySize != null ) this.ySize = options.ySize
		this.pointRadius = 7;
		if ( options && options.pointRadius != null ) this.pointRadius = options.pointRadius

		// Set width & Height
		var height = this.graphNode.offsetHeight;
		var width = this.graphNode.offsetWidth;

		// Create the SVG element
		var graph = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		graph.setAttribute('width', width);
		graph.setAttribute('height', height);
		graph.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
		this.graphNode.appendChild(graph);

		// Set padding and plot area
		var horizontalPadding = 40;
        var verticalPadding = 30;
      	var plotArea = {
      		width:width - (horizontalPadding),
      		height:height - (verticalPadding * 2)
      	}

      	// Max Number
      	var maxNumber = 0;
      	for ( var i = 0; i < data.length; i++ ){
      		if ( data[i].value > maxNumber ){
      			maxNumber = data[i].value
      		}
      	}

      	// Min Number
      	var minNumber = maxNumber;
      	for ( var i = 0; i < data.length; i++ ){
      		if ( data[i].value < minNumber ){
      			minNumber = data[i].value
      		}
      	}

      	var range = Math.round(maxNumber - minNumber);
      	// yMultipler is used to calcuate the y value of the points.
        var yMultiplier = plotArea.height / range;

        // Y axis grid lines & labels
      	for ( var i = 0; i < this.ySize; i++ ){
            var currentY = (range / this.ySize) * (i);
            currentY += currentY / this.ySize;
            var y = height - (yMultiplier * currentY) - verticalPadding

      		// Draw grid line
      		var gridLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      		gridLine.setAttribute('class','ggg-grid-lines');
      		gridLine.setAttribute('x1', horizontalPadding);
      		gridLine.setAttribute('y1', y);
      		gridLine.setAttribute('x2', plotArea.width + 20);
      		gridLine.setAttribute('y2', y);
      		graph.appendChild(gridLine);

      		// Draw Label
      		var label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      		label.setAttribute('class','ggg-label');
      		label.setAttribute('x', 15);
      		label.setAttribute('y', y + 3);
      		label.textContent = 'val';
      		graph.appendChild(label);
      	}


      	var plotString = "";
      	path = document.createElementNS('http://www.w3.org/2000/svg',"path");
      	path.setAttributeNS(null, "class", 'ggg-path');
      	graph.appendChild(path)

      	for ( var i = 0; i < data.length; i++ ){
      		var pointData = data[i]

      		// Calculate x value
      		var columnWidth = (plotArea.width / data.length);
      		columnWidth += columnWidth / data.length;
      		var x = horizontalPadding + ( columnWidth * i );

      		// Calculate y value
      		var y = height - (yMultiplier * (data[i].value - minNumber)) - verticalPadding;

      		// Plot the path
      		

      		// If its the first point then start the path
      		if ( i === 0 ){
      			plotString += "M "+x+","+y
      		}else{
      			if ( options && options.smooth ){
      				var c1 = x - (columnWidth / 2 * 1)+","+(height - (yMultiplier * (data[i - 1].value - minNumber)) - verticalPadding)
      				var c2 = x - (columnWidth / 2)+","+y
      				plotString += "C "+c1+" "+c2+" "+x+","+y
      			}else{
      				plotString += "L "+x+","+y
      			}
      		}

      		// Check to draw x grids
      		if ( options && options.drawXGrids ){
      			var gridLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      			gridLine.setAttribute('class','ggg-grid-lines');
      			gridLine.setAttribute('x1', x);
      			gridLine.setAttribute('y1', verticalPadding);
      			gridLine.setAttribute('x2', x);
      			gridLine.setAttribute('y2', verticalPadding + plotArea.height);
      			graph.appendChild(gridLine);
      		}

      		// Plot the points
      		var point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      		point.setAttributeNS(null, 'class', 'ggg-circle')
      		point.setAttributeNS(null, "cx", x);
			point.setAttributeNS(null, "cy", y);
			point.setAttributeNS(null, "r",  this.pointRadius);
      		graph.appendChild(point);

      		// x Axis Labels
      		var label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      		label.setAttribute('class','ggg-label');
      		label.setAttribute('x', x);
			label.setAttributeNS(null, "text-anchor", 'middle');
      		label.setAttribute('y', plotArea.height + verticalPadding + 20);
      		label.textContent = pointData.label;
      		graph.appendChild(label);

      		// Mouse Over Call Back
      		if ( options && options.pointMouseOver )
      		point.addEventListener("mouseenter", function(){
      			options.pointMouseOver(this, pointData)
      		})

      		// Mouse Out Call Back
      		if ( options && options.pointMouseOut )
      		point.addEventListener("mouseleave", function(){
      			options.pointMouseOut(this, pointData)
      		})
      	}

      	// Update the path
      	path.setAttributeNS(null, "d", plotString);

	}
}, ggg, ggg;

_ggg = function(selector) { 
	this.graphNode = document.querySelector(selector); 
	this.data = data;
};

_ggg.prototype = graph_methods;

ggg = function(selector){
	return new _ggg(selector)
}