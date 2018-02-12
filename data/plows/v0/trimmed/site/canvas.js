var canvas = document.querySelector("#scene");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var HEIGHT = document.querySelector("#scene").height;
var WIDTH = document.querySelector("#scene").width;
var ctx = canvas.getContext("2d");
var tickrate = 1000 / 60 / 60 / 24;

window.addEventListener("resize", function() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    HEIGHT = document.querySelector("#scene").height;
    WIDTH = document.querySelector("#scene").width;
});

class Truck {
    constructor(route) {
        this.route = route
        
        this.tracks = []
    }
    
    drawAt(tick) {
        var i = tick
        var limit = 600
        
        this.tracks = this.tracks.filter(function(track) {
            return tick - track < limit;
        });
        
        if (this.route[tick]) {
            this.tracks.push(tick);
        }
        
        if (this.tracks.length > 1) {
            ctx.beginPath();
            ctx.moveTo(this.route[this.tracks[0]][0] * WIDTH,
                       this.route[this.tracks[0]][1] * HEIGHT);
            var self = this
            this.tracks.slice(1, this.tracks.length).forEach(function(track) {
                ctx.lineTo(self.route[track][0] * WIDTH,
                           self.route[track][1] * HEIGHT);
                ctx.stroke();
            });
        }
    }
}

var trucks = []

a.forEach(function(route) {
    trucks.push(new Truck(route))
});

ctx.lineWidth = 2
ctx.lineJoin = 'bevel'
var grd=ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");
//ctx.strokeStyle=grd;

var tick = 0
setInterval(run, tickrate);

function run() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    trucks.forEach(function(truck) {
        truck.drawAt(tick);
    });
    tick++
}