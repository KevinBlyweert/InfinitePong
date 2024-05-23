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
        // Black border
        // ctx.strokeStyle = "#000";
        // ctx.stroke();
    }
    update(ctx, width, height) {
        if (this.x + this.radius > width || this.x - this.radius < 0) this.velX = -this.velX;
        if (this.y + this.radius > height || this.y - this.radius < 0) this.velY = -this.velY;
        this.x += this.velX;
        this.y += this.velY;
        this.draw(ctx);
    }
    collision(block, firstColor, secondColor) {
        let side = "", blockCenterX = block.x + block.width / 2, blockCenterY = block.y + block.width / 2, blockWidth = block.width;

        if (this.intersect(blockCenterX, blockCenterY, blockWidth)) {
            block.color = block.color == firstColor ? secondColor : firstColor;

            if (this.x <= block.x) side = "left";
            else if (this.x > block.x + block.width) side = "right";

            if (this.y <= block.y) side = "up";
            else if (this.y > block.y + block.width) side = "down";

            switch (side) {
                case "left":
                case "right":
                    this.velX = -this.velX;
                    break;
                case "up":
                case "down":
                    this.velY = -this.velY;
                    break;
                default:
                    // this.velY = -this.velY;
                    // this.velX = -this.velX;
                    break;
            }
        }
    }
    intersect(blockCenterX, blockCenterY, blockWidth) {
        const distX = Math.abs(this.x - blockCenterX), distY = Math.abs(this.y - blockCenterY);
        if (distX > (blockWidth / 2 + this.radius)) return false;
        if (distY > (blockWidth / 2 + this.radius)) return false;
        if (distX <= (blockWidth / 2)) return true;
        if (distY <= (blockWidth / 2)) return true;
        const cDist_sq = Math.pow((distX - blockWidth / 2), 2) + Math.pow((distY - blockWidth / 2), 2);

        return (cDist_sq < (Math.pow(this.radius, 2)));
    }
}