export default class Block {
    constructor(x, y, color, width) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.width, this.width);
        ctx.fill();
        // Black border
        // ctx.strokeStyle = "#000";
        // ctx.stroke()
    }
}