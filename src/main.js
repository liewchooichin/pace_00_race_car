/**
 * Main script for the race car.
 * Move the car left when key A or a is pressed.
 * Move the car right when key D or d is pressed.
 *
 * Compile with tsc:
 * tsc --module esnext --lib esnext,dom --target esnext --strict true main.ts
 */
"use strict";
/**
 * Get the necessary id const
 */
const road = document.querySelector("#road");
road.width = 1200;
const myBanner = document.querySelector("#myBanner");
const car = document.querySelector("#car");
/**
 * Convert style.left from integer xxx to "xxx.px".
 */
function convertIntToPx(pos) {
    // Format the pos into a string.
    const pos_px = pos.toString() + "px";
    console.log(`Current pos: ${pos_px}`);
    return pos_px;
}
/**
 * Test the function convertIntToPx
 */
function test_convertIntToPx() {
    const test_pos = 200;
    console.assert(convertIntToPx(test_pos) === "200px", "Fail: int to px conversion.");
}
test_convertIntToPx();
// set the x position of the car
// Current x position of the car
// This starting position will be used to move 
// the car later.
let start_pos = 150;
car.style.left = convertIntToPx(start_pos);
/**
 * Some info
 */
console.log(myBanner.clientWidth, myBanner.clientHeight);
console.log(road.width, road.height);
console.log(car.width, car.height);
/**
 * Event listener
 */
document.addEventListener("keydown", keyDownHandler, false);
/**
 * Key press variables
 */
let rightPressed = false;
let leftPressed = false;
/**
 * keyDownHandler
 * @param {*} event
 */
function keyDownHandler(event) {
    if (event.code === "KeyA") {
        // 0x001E KeyA
        leftPressed = true;
        console.log(`Down ${event.code}`);
    }
    if (event.code === "KeyD") {
        // 0x0020 KeyD 
        rightPressed = true;
        console.log(`Down ${event.code}`);
    }
    if (event.code === "ArrowLeft") {
        // 0xE04B	ArrowLeft
        leftPressed = true;
        console.log(`Down ${event.code}`);
    }
    else if (event.code === "ArrowRight") {
        // 0xE04D	ArrowRight
        rightPressed = true;
        console.log(`Down ${event.code}`);
    }
    // After we have determined the direction,
    // move the car.
    moveCar();
}
/**
 * Move the car left or right
 */
function moveCar() {
    // Check the window width, bound the car within the window width
    let new_pos = 0;
    // let the leftmost edge at 10px from the left
    const leftmost = 10;
    // let the rightmost edge be at 10px from the right
    // rightmost edget = 10 + width of car
    //const rightmost = window.innerWidth - 10;
    // this is taking the rightmost according to the width
    // of the road set in the question.
    const rightmost = road.width - car.width - 10;
    // Check that the positions are all positive whole number
    const test_valid_pos = ((new_pos >= 0) && (leftmost >= 0)
        && (rightmost >= 0));
    console.assert(test_valid_pos == true, "Fail: Some positions are not a positive whole number");
    if (leftPressed) {
        console.log("Move to the left");
        new_pos = start_pos - 10;
        // let the leftmost edge at 10px from the left
        if (new_pos < leftmost) {
            new_pos = leftmost;
            console.log("At the leftmost edge");
        }
    }
    else if (rightPressed) {
        console.log("Move to the right");
        new_pos = start_pos + 10;
        // let the rightmost edge be at 10px from the right
        // 10 + width of car
        //const rightmost = window.innerWidth - car.width -10;
        if (new_pos > rightmost) {
            new_pos = rightmost;
            console.log("At the rightmost edge");
        }
    }
    // Make sure the car is within the range
    const boo_test = ((leftmost <= new_pos) && (new_pos <= rightmost));
    console.assert(boo_test == true, "Fail: The car range is out.");
    // convert the pos int to "xxx.px" format
    car.style.left = convertIntToPx(new_pos);
    console.log(`new pos: ${new_pos}`);
    // Reset the starting position
    start_pos = new_pos;
    leftPressed = false;
    rightPressed = false;
}
/**
 * Fun
 */
const mainBody = document.querySelector("#main_body");
mainBody.addEventListener("click", (event) => { console.log("Welcome to the race."); }, false);
