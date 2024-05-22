export default class Ball {
    constructor(x, y, velX, velY, radius, color) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.radius = radius;
        this.color = color;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }
    update(ctx, width, height) {
        if (this.x + this.radius > width || this.x - this.radius <0) this.velX = -this.velX;
        if (this.y + this.radius > height || this.y - this.radius < 0) this.velY = -this.velY;
        this.x += this.velX;
        this.y += this.velY;
        this.draw(ctx);
    }
}