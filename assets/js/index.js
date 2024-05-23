import Ball from "./class/ball.js";
import Block from "./class/block.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const divFirstColor = document.querySelector(".firstColor"), divSecondColor = document.querySelector(".secondColor");
// let width = (canvas.width = window.innerWidth), height = (canvas.height = window.innerHeight);
let width = (canvas.width = window.innerWidth > 600 ? 600 : window.innerWidth), height = (canvas.height = window.innerWidth > 600 ? 600 : window.innerWidth), ballSpeed = 5;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const balls = [], blocks = [];
let blockWidth = 0, blockHeight = 0, firstColor = "#0C9C4C", secondColor = "#CCC";

function createPlayground() {
    divFirstColor.style.background = firstColor;
    divSecondColor.style.background = secondColor;
    blockWidth = width / 10;
    blockHeight = height / 10;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const block = new Block(j * blockWidth, i * blockWidth, j < 5 ? "#CCC" : firstColor, blockWidth);
            blocks.push(block);
        }
    }
    balls.push(new Ball(blockWidth / 2, 4 * (blockHeight / 2), ballSpeed, -ballSpeed * 2, (blockWidth * 0.5), firstColor));
    balls.push(new Ball(width - blockWidth / 2, height - (blockHeight * 1.5), -ballSpeed, ballSpeed * 2, (blockWidth * 0.5), secondColor));

    animate();
}

function animate() {
    blocks.forEach(block => { block.draw(ctx) });
    balls.forEach(ball => {
        blocks.forEach(block => {
            if (block.color == ball.color) {
                ball.collision(block, firstColor, secondColor);
            }
        });
        ball.update(ctx, width, height);
    });
    divFirstColor.textContent = blocks.filter(block => block.color == firstColor).length;
    divSecondColor.textContent = blocks.filter(block => block.color == secondColor).length;
    requestAnimationFrame(animate);
}

createPlayground();

// MALLORY     MAMAN    PAPA    ELEONORE   THEIA   HERA                                                         JE T AIME