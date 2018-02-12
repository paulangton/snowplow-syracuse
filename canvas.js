var c1 = document.querySelector("#layer1");
c1.width  = window.innerWidth;
c1.height = window.innerHeight;
var ctx1 = c1.getContext("2d");
ctx1.width = c1.width
ctx1.height = c1.height

var c2 = document.querySelector("#layer2");
c2.width  = window.innerWidth;
c2.height = window.innerHeight;
var ctx2 = c2.getContext("2d");
ctx2.width = c2.width
ctx2.height = c2.height

window.addEventListener("resize", function() {
    c1.width  = window.innerWidth;
    c1.height = window.innerHeight;
    c2.width  = window.innerWidth;
    c2.height = window.innerHeight;
    ctx1.width = c1.width
    ctx1.height = c1.height
    ctx2.width = c2.width
    ctx2.height = c2.height
});

ctx2.strokeStyle = 'rgba(0,0,0,0.4)'
ctx2.lineWidth = 2
ctx2.lineJoin = 'bevel'

class Truck {
    constructor(route) {
        this.route = route
        
        this.last = undefined
    }
    
    drawGlobe(tick) {
        ctx1.beginPath();
        ctx1.arc(this.route[tick][0] * ctx1.width,
                 this.route[tick][1] * ctx1.height,
                 5, 0, 2 * Math.PI);
        ctx1.fill();
    }
    
    drawTrace(tick) {
        if (this.last) {
            ctx2.beginPath();
            ctx2.moveTo(this.route[tick][0] * ctx2.width,
                        this.route[tick][1] * ctx2.height);
            ctx2.lineTo(this.last[0] * ctx2.width,
                        this.last[1] * ctx2.height);
            ctx2.stroke();
        }
    }
    
    drawAt(tick) {
        if (this.route[tick]) {
            this.drawGlobe(tick)
            this.drawTrace(tick)
            this.last = this.route[tick]
        }
    }
}

var tickrate = 1;
var tick = 0

var trucks = []
a.forEach(function(route) {
    trucks.push(new Truck(route))
});

setInterval(run, 0);

function run() {
    ctx1.clearRect(0, 0, ctx1.width, ctx1.height);
    
    trucks.forEach(function(truck) {
        truck.drawAt(tick);
    });
    tick++
}
