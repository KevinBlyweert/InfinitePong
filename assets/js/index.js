import Ball from "./class/ball.js";
import Block from "./class/block.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// let width = (canvas.width = window.innerWidth), height = (canvas.height = window.innerHeight);
let width = (canvas.width = 600), height = (canvas.height = 600);

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const balls = [], blocks = [];
let blockWidth = 0, blockHeight = 0, firstColor = "#0C9C4C", secondColor = "#CCC";

function createPlayground() {
    blockWidth = width / 10;
    blockHeight = height / 10;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const block = new Block(j * blockWidth, i * blockWidth, j < 5 ? "#CCC" : firstColor, blockWidth);
            blocks.push(block);
        }
    }

    balls.push(new Ball(blockWidth / 2, height - 3 * (blockHeight / 2), 5, -3, (blockWidth / 2), firstColor));
    balls.push(new Ball(width - (blockWidth / 2), 3 * blockHeight / 2, -5, 3, (blockWidth / 2), secondColor));

    animate();
}

function animate() {
    blocks.forEach(block => { block.draw(ctx) });
    balls.forEach(ball => {
        blocks.forEach(block => {
            if (block.color == ball.color) {
                let side = "";
                let blockX = block.x;
                let blockY = block.y;
                if (ball.x <= block.x) { blockX = block.x; side = "left-"; side += ball.velY > 0 ? "up" : "down"; }
                else if (ball.x >= block.x + block.width) { blockX = block.x + block.width; side = "right-"; side += ball.velY > 0 ? "up" : "down"; }
                if (ball.y <= block.y) { blockY = block.y; side = "up-"; side += ball.velX > 0 ? "left" : "right"; }
                else if (ball.y >= block.y + block.width) { blockY = block.y + block.width; side = "down-"; side += ball.velX > 0 ? "left" : "right"; }
                let distX = ball.x - blockX;
                let distY = ball.y - blockY;
                let distance = Math.sqrt((distX * distX) + (distY * distY));
                if (distance <= ball.radius) {
                    block.color = block.color == firstColor ? secondColor : firstColor;
                    console.log(side);
                    switch (side) {
                        case "left-up":
                        case "left-down":
                        case "right-up":
                        case "right-down":
                            ball.velX = -ball.velX;
                            break;
                        case "up-left":
                        case "up-right":
                        case "down-left":
                        case "down-right":
                            ball.velY = -ball.velY;
                            break;
                    }
                }
            }
        });
        ball.update(ctx, width, height);
    });
    requestAnimationFrame(animate);
}

createPlayground();

// MALLORY     MAMAN    PAPA    ELEONORE   THEIA   HERA                                                         JE T AIME