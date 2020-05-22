export class MyClass {
    constructor() {
        this.initCanvas();
        this.buildGraphHandler = this.buildGraph.bind(this);
        this.drawButton = document.querySelector('#draw'); 
        this.drawButton.addEventListener('click', this.buildGraphHandler);
    }

    dispose() {
        this.drawButton.removeEventListener('click', () => {this.buildGraphHandler});
    }

    //initiate Canvas
    initCanvas() {
        this.canvas = document.querySelector("#graph");
        this.context = this.canvas.getContext("2d");
        this.xAxis = this.xAxisValuesMapping();
        this.yAxis = this.yAxisValuesMapping();
        this.buildAxis();
    }

    xAxisValuesMapping() {
        let xAxisMapping = [];
        for (let i = 0; i < this.canvas.width; i++) {
            let mappedValue = this.remap(0, this.canvas.width, -this.canvas.width/2, this.canvas.width/2, i);
            xAxisMapping.push(mappedValue);
        }
        return xAxisMapping;
    }

    yAxisValuesMapping() {
        let yAxisMapping = []
        for (let i = 0; i < this.canvas.height; i++) {
            let mappedValue = this.remap(0, this.canvas.height, -this.canvas.height/2, this.canvas.height/2, i);
            yAxisMapping.push(mappedValue);
        }
        return yAxisMapping;
    }


    //build axis
    buildAxis() {
        //build y-axis:
        this.context.lineWidth = 0.75;
        this.context.beginPath();
        this.context.moveTo(this.canvas.width/2, 0);
        this.context.lineTo(this.canvas.width/2, this.canvas.height);
        this.context.stroke();


        //build x-axis
        this.context.beginPath();
        this.context.moveTo(0,this.canvas.height/2);
        this.context.lineTo(this.canvas.width, this.canvas.height/2);
        this.context.stroke();
    }

    //build sine graph
    buildGraph() {
        let amplitude = document.querySelector("#amplitudeInput").value;
        let frequency = document.querySelector("#frequencyInput").value;
        if(amplitude == "" || frequency == "") {return};

        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.buildAxis();

        //get mappings
        this.context.beginPath();
        this.context.moveTo(0, this.canvas.height/2 - Math.sin(this.xAxis[0] * 1/frequency) * amplitude);

        for (let i = 0; i < this.canvas.width; i++) {
            //Math.sin(i * frequency) * Amplitude 
           this.context.lineTo(i, this.canvas.height/2 - Math.sin(this.xAxis[i] * 1/frequency) * amplitude);
        }

        this.context.stroke();
    }


    lerp(min, max, fraction) {
        return (1.0 - fraction) * min + max * fraction;
    }
    
    invlerp(min, max, value) {
        return (value - min) / (max - min);
    }

    remap(inputMin, inputMax, outputMin, outputMax, value) {
        let fraction = this.invlerp(inputMin, inputMax, value);
        return this.lerp(outputMin, outputMax, fraction);
    }
}