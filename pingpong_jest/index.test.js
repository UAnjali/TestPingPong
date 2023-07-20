require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { fireEvent, getByText } from '@testing-library/dom';
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
let dom;
let document;
let window;
let addnumber;
describe("The final output has been printed correctly", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously"});
    document = dom.window.document;
    window = dom.window;
    addnumber = window.addnumber;
    // main = window.add;
  });
  
  test('Ball should move when Enter key is pressed',async () => {
    // Mock the ball element
    const ball = document.getElementById('ball');
    const initialBallLeft = ball.style.left;
    const initialBallTop = ball.style.top;
    // Trigger the Enter key press event
    fireEvent.keyPress(window, { code: 'Enter' });
    // Ball should now move, check if its position has changed
    setTimeout(() => {
      const updatedBallLeft = ball.style.left;
      const updatedBallTop = ball.style.top;
      console.log(updatedBallLeft);
      expect(initialBallLeft).not.toEqual(updatedBallLeft);
      expect(initialBallTop).not.toEqual(updatedBallTop);
      done();
    }, 5000);});
  // Test the rod movement on key up and down events
  test('Rod should move when A and D keys are pressed', () => {
    // Mock the rod elements
    const rod1 = document.getElementById('rod1');
    const initialRod1Left = rod1.style.left;
    const rodWidth = rod1.offsetWidth;
    // Trigger the A key press event
    fireEvent.keyPress(window, { code: 'KeyA' });
    // Rod1 should now move left, check if its position has changed
    setTimeout(()=>{
    const updatedRod1Left = rod1.style.left;
    expect(initialRod1Left).not.toEqual(updatedRod1Left);
    },1000);
    // Trigger the D key press event
    fireEvent.keyPress(window, { code: 'KeyD' });
    // Rod1 should now move back to its initial position, check if its position has changed
    setTimeout(()=>{
    const finalRod1Left = rod1.style.left;
    expect(finalRod1Left).toEqual(initialRod1Left);
  },1000);
    // Trigger the D key press event again
    fireEvent.keyPress(window, { code: 'KeyD' });
    // Rod1 should now move right, check if its position has changed
    setTimeout(()=>{
    const updatedRod1LeftAgain = rod1.style.left;
    expect(updatedRod1LeftAgain).not.toEqual(initialRod1Left);
  },1000);
    // // Check if the rod2 is moving with the rod1 (since they have the same position)
    // const rod2 = document.getElementById('rod2');
    // expect(rod2.style.left).toEqual(updatedRod1LeftAgain);
  });
});