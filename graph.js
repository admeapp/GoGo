/*======================================
Go Go Gadget Graph
=======================================*/

function GoGoGadgetGraph(id, data, options){

	var graphContainer = document.getElementById(id)

	// Options
	this.ySize = 4;
	if ( options && options.ySize != null ) this.ySize = options.ySize

	this.init = function(){
		var height = graphContainer.offsetHeight;
		var width = graphContainer.offsetWidth;

		// Create the SVG element
		var graph = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		graph.setAttribute('width', width);
		graph.setAttribute('height', height);
		graph.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
		graphContainer.appendChild(graph);

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
            var yMultiplier = plotArea.height / maxNumber;

            // Create min & max Grid
            var minLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            minLine.setAttribute('class','ggg-grid-lines');
            minLine.setAttribute('x1', horizontalPadding);
            minLine.setAttribute('y1', height - (yMultiplier * 0) - verticalPadding);
            minLine.setAttribute('x2', '100%');
            minLine.setAttribute('y2', height - (yMultiplier * 0) - verticalPadding);
            graph.appendChild(minLine);


      	// Y axis grid lines & labels
      	for ( var i = 0; i < this.ySize; i++ ){
                  var currentY = (range / this.ySize) * (i + 1);
                  var y = height - (yMultiplier * currentY) - verticalPadding

      		// Draw grid line
      		var gridLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      		gridLine.setAttribute('class','ggg-grid-lines');
      		gridLine.setAttribute('x1', horizontalPadding);
      		gridLine.setAttribute('y1', y);
      		gridLine.setAttribute('x2', '100%');
      		gridLine.setAttribute('y2', y);
      		graph.appendChild(gridLine);

      		// Draw Label
      		var label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      		label.setAttribute('class','ggg-label');
      		label.setAttribute('x', 15);
      		label.setAttribute('y', y + 3);
      		label.textContent = Math.round((range / this.ySize) * (i + 1));
      		graph.appendChild(label);
      	}

      	for ( var i = 0; i < data.length; i++ ){
      		var columnWidth = (plotArea.width / data.length);
      		columnWidth += columnWidth / data.length;
      		var x = horizontalPadding + ( columnWidth * i );

      		var yHeight = plotArea.height / maxNumber;

                  var curveString = "M0 0 L10 10 L50 30"

      		var point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      		point.setAttributeNS(null, 'class', 'ggg-circle')
      		point.setAttributeNS(null, "cx", x);
			point.setAttributeNS(null, "cy", height - (yHeight * data[i].value) - verticalPadding);
			point.setAttributeNS(null, "r",  5);
      		graph.appendChild(point);
      	}

	}

	this.init();

}