# Match Colour Game

# The rules

The rule is very simplpe, just clear out the screan before time runs out. Click together two same colored balls via mouse, then balls remove... Each level gets a bit more difficult, as the number of balls, colours, parameters increasing... also will be added other challenging visual effects, such as randomly changeing colors on set Interval, then forms etc.

Remove function will also change:
    - If match two color ==> remove two elements
    - If match two color && form ==> remove four elements
    - If you can feed the cat with blue fish ==> remove every elements which is X colored ==> this one is still under construction.

Futher plan:
    - synchronize and unit test specifically on matchFourthBall() ==> in Debugs the code runs accuretly, acas removes balls, but when it should run real speed some balls remain on the screen despite balls array get empty, and also numBalls accuretly counted
    - adding the last remove function, by keeping the codes of the animated elements in another js file and import into game.js.