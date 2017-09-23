/*projectile icons
  
*/

//I copied these icons from web, you can use any icon or any Letters symbols instead.

//Initializing variables

var ctx, init;
var projectiles = [];
//If you can't find any of these symbols, you can exchange these for alphabets or symbols.
var emoji = {
    explosion: '🌪',
    projectiles: ['🐋', '☠️', '👾', '🚲', '🐙', '🐊', '🦑']
}
canvasSetup();
render();

function canvasSetup(){
    ctx = document.querySelector('canvas').getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    if(!init){
        window.addEventListener('resize', function(){
            canvasSetup();
            init = true;
        })
    }
}

function render(){
    setTimeout(render, 1000/60);
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);

    //Generate New projectiles
    generateProjectiles();
    for(var projectile of projectiles){
        projectile.draw();
        projectile.move();
    }
    //Draw the exploseion animation
    drawEmoji({
        emoji: emoji.explosion,
        x: ctx.canvas.width/2,
        y:ctx.canvas.height/2,
        size: 100
    })
}
function generateProjectiles(){
    projectiles = projectiles.filter(function(e){
        return e.life >0
    })
    if(Math.random() < 0.075){
        projectiles.push(createProjectile())
    }
    return;
}

function createProjectile(){
    return {
        emoji: emoji.projectiles[Math.floor(emoji.projectiles.length*Math.random())],
        size: Math.random()*25 + 25,
        seed : 4,
        direction: Math.floor(Math.random()*180)+180,
        angle: 0,
        x: ctx.canvas.width/2,
        y: ctx.canvas.height/2,
        spin: 0.01,
        life: 60,
        maxLife: 60,
        move: function(){
            this.life -= 1;
            var speed = Math.ceil(this.life/this.maxLife * this.seed);
            var toRadians = this.direction/180*3*Math.PI;
            this.x += speed * Math.cos(toRadians)
            this.y += speed * Math.sin(toRadians)
            this.angle += this.spin
        },
        draw: function(){
            drawEmoji({
                emoji: this.emoji,
                x: this.x,
                y: this.y,
                size: this.size,
                angle: this.angle,
                alpha: this.life/this.maxLife
            })
        }
    }
}
function drawEmoji(info){
ctx.font = info.size+"px Arial"
ctx.textAlign='center';
ctx.textBaseline='middle';
ctx.save(); /// To restore the state later on using ctx.restore();
ctx.globalAlpha = info.alpha || 1;
ctx.translate(info.x, info.y);
ctx.rotate(info.angle)
ctx.fillText(info.emoji, 0,0);
ctx.restore();
//restoring state





}