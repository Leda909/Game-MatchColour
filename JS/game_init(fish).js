//Building together the levels ==> init() function onload by moving further levels
const fishContainer = document.getElementById("fish-container");
let fish = null;
const timeLeft = document.querySelector('#time-left');
let countDownTimerId = null;
let currentTime = null;
let timerId = null;
let Mlevel = 1;
let numBalls = null;
let MnumBalls = [18, 28, 40, 56, 74, 80];
let McurrentTime = [30, 60, 120, 180, 220, 250];
let Mcolors = ["#3CC157", "#2AA7FF", "#ff5050", "#ff9900", "#7a00cc", "#ffa31a", "#00e6b8"];
let balls = [];
 
function handleFishClick() {
    console.log("Fish clicked!");
    // Perform any actions you want when the fish is clicked
}

// Part of matchFour
function matchFourthBall(thirdBallColor) {
    const matchingBalls = balls.filter(
       (ball) =>
         ball.style.background === thirdBallColor && !removedList.includes(ball.id)
    );
    if (matchingBalls.length > 0) {
    const fourthBallRemoved = matchingBalls[Math.floor(Math.random() * matchingBalls.length)];
        //console.log(`Fourth Ball ID: ${fourthBallRemoved.id}`);
        fourthBallRemoved.remove();
        //console.log(`numBallsFourthMatchBefore: ${numBalls}`);
        numBalls--;
        //console.log(`numBallsFourthMatchAfter: ${numBalls}`);
        //console.log(`Ball4 Fourth removed: ${fourthBallRemoved.id}`);
    return fourthBallRemoved;
  }
  console.log(`matchFourthBall: value null`);
  return null;
}

function generateRandomIndex() {
    let randomIndex = Math.floor(Math.random() * balls.length);
    // console.log(`randomIndex: ${randomIndex}`);
    // console.log(`removedList_1: ${removedList}`);
    while (removedList.includes(`${randomIndex+1}`)) {
        //Keep on guessing a random index while the random index guess is not in the removedList.
        randomIndex = Math.floor(Math.random() * balls.length);
    }
    return randomIndex;
}

function removeRandomBall() {
    //console.log(`removedList_2: ${removedList}`);
    const randomIndex = generateRandomIndex();
    const removedBall = balls.splice(randomIndex, 1)[0];
    removedBall.remove();
    numBalls--;
    //console.log(`numBallsRemoveRandom: ${numBalls}`);
    //console.log(`Ball4 Third removed: ${removedBall.id}`);
    return removedBall;
}
  
function matchTwo(ball1, ball2){
    if ( ball1.style.background === ball2.style.background &&
        ball1.id !== ball2.id){
        //console.log("numBallsTWO_Before: ${numBalls}");
        ball1.remove();
        ball2.remove();
        //console.log(`Ball2 First removed: ${ball1.id}`);
        //console.log(`Ball2 Second removed: ${ball2.id}`);
        numBalls -= 2;
        //console.log("numBallsTWO_After: ${numBalls}");
        //console.log("RemoveTwo");
    }
}

function matchFour(ball1, ball2){
    if (ball1.style.borderRadius === ball2.style.borderRadius && 
        ball1.style.background === ball2.style.background && 
        ball1.id !== ball2.id){
        //console.log("numBallsFOUR_Before: ${numBalls}");
        ball1.remove();
        ball2.remove();
        //console.log(`Ball4 First removed: ${ball1.id}`);
        //console.log(`Ball4 Second removed: ${ball2.id}`);
        removedList = [ball1.id, ball2.id];
        const thirdBallRemoved = removeRandomBall(`${removedList}`);
        removedList.push(thirdBallRemoved.id);
        const thirdBallColor = thirdBallRemoved.style.background;
        const fourthBallRemoved = matchFourthBall(thirdBallColor);
        numBalls -= 2;
        //console.log("numBallsFOUR_After: ${numBalls}");
        //console.log("RemoveFour");
        return true;
        } 
    return false;
}
// If I cklick on the same colour after each other ==> clear them out, if form also match 4 elem
function matchColor(ball1, ball2) {
    if(Mlevel>2){
        if (!matchFour(ball1, ball2)){
            matchTwo(ball1, ball2);
            //console.log(`numballsIF: ${numBalls}`);
        };
    } else {
        matchTwo(ball1, ball2);
        //console.log(`numballsELSE: ${numBalls}`);
    }
    //if (balls.length === 0) {
    if (numBalls <= 0) {
        clearInterval(countDown);
        if (Mlevel === 6) {
          alert('You won!!! You are the best!');
          return; // Stop the game progression
        }
        let nextLevel = Mlevel + 1;
        balls.forEach(ball => {
            ball.remove();
        });
        if (fish) {
            fish.remove();
          }
        alert('Congratulations! You can move to level ' + (nextLevel) + '!');
        init(nextLevel);
      }    
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    
    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('Game over');
        // balls.forEach(ball => {
        //     ball.remove();
        // });
        // fish.remove();
        // init(1);
        window.location.reload();
    }
}  

function init(pLevel){
    Mlevel = pLevel;
    numBalls = MnumBalls[Mlevel-1];
    let colors = Mcolors.slice(0,Mlevel+1);
    currentTime = McurrentTime[Mlevel-1];    
    let clickCount = 0;
    let ballPrevious = null;
    balls = [];

    //create my balls
    for (let i = 0; i < numBalls; i++) {
        //Create x amount of elements from which even amount of element get the same background color
        const colorIndex = Math.floor(i / 2) % colors.length;
        const color = colors[colorIndex];
        let ball = document.createElement("div");
        ball.classList.add("ball");
        // Add individual ID to each ball, so it will be identificable at clicking
        ball.id =`${i + 1}`;
        ball.style.background = color;
        // vw = viewer point witdh & vh = viewer point height 
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.bottom = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        //To manipulate the size of the balls, Random number between max=10 and min=3 --> Math.random() * (max - min + 1) + min
        ball.style.width = `${Math.random()*(10-3+1)+3}em`;
        ball.style.height = ball.style.width;
        ball.style.borderRadius = "100%";      // remove css border radious
        if (Mlevel > 4) {
            ball.style.opacity = Math.random() < 0.2 ? "0.2" : "0.99";  //aproximetly 1/3 of balls get more opacity
        } else {
            ball.style.opacity = "0.95";
        }
        
        balls.push(ball);
        document.body.append(ball);
    }

    if ( Mlevel<3 ) {
        // Keyframes
        balls.forEach((elem, i, ra) => {
            elem.id = `${i + 1}`;
        
            let to = {
                x: Math.random() * (i % 2 === 0 ? -12 : 12),
                y: Math.random() * 10
            };
        
            let anim = elem.animate(
                [
                { transform: "translate(0, 0)" },
                { transform: `translate(${to.x}rem, ${to.y}rem)` }
                ],
                {
                duration: (Math.random() + 1) * 2000, // random duration
                direction: "alternate",
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out"
                }
            );
        
            let katt = elem.addEventListener("click", () => {
            clickCount++;
            //console.log(`Click count: ${clickCount}`);
            
            if (clickCount%2 === 0){
                console.log('EvenClick');
                matchColor(ballPrevious,elem);
            }
            ballPrevious = elem;
            //console.log(`Clicked ball ID: ${elem.id}`);
            });
            });
    } else {
        // Fish.js from level 5 ------------//
        if (Mlevel === 5 ) {
            // Create a <script> element for adding fish_copy.js
            var script = document.createElement('script');
            script.src = 'JS/fish2.js';
            script.onload = function() {
              const fishContainer = document.getElementById("fish-container");
              const fish = createFish();
              fishContainer.appendChild(fish);
              
              //swimFish(fish, fishContainer);
              // Add event listener to the fish element
              fish.addEventListener("click", handleFishClick);
            };
            document.head.appendChild(script);
        }
        // Keyframes
        balls.forEach((elem, i, ra) => {
        elem.id = `${i + 1}`;

        let to = {
            x: Math.random() * (i % 2 === 0 ? -12 : 12),
            y: Math.random() * 10
        };

        //Add disappear effect ==> Start to play with Opacity
        const originalOpacity = 0.95;
        const alternateOpacity = 0.08;
        let isAlternateOpacity = false;

        function toggleOpacity() {
        balls.forEach((ball) => {
            ball.style.opacity = isAlternateOpacity ? alternateOpacity : originalOpacity;
            });
        isAlternateOpacity = !isAlternateOpacity;
        }
        function animateOpacityChange(duration, alternateDuration) {
            toggleOpacity();
            setInterval(toggleOpacity, duration + alternateDuration);
        } // ------ End of Opacity ------------
    
        // Function to generate a random color
        const getRandomColor = () => {
            return colors[Math.floor(Math.random() * colors.length)];
        };

        // Random borderRadius from LEVEL 3 //
        if ( Mlevel > 2 ){
            function changeBorderRadius(ball) {
                const borderRadius = Math.random() < 0.5 ? "100%" : "0";
                 ball.style.borderRadius = borderRadius;
            } 
            setInterval(() => changeBorderRadius(elem), Math.random() * 3000 + 1000);
        }
        // ---- Random Opacity from LEVEL 4 -------//
        if ( Mlevel > 3 ){animateOpacityChange(10000, 40);}
        
        // ---- Random Colour changes from LEVEL 6 -------//
        if ( Mlevel > 5 ){
            setInterval(() => {
                balls.forEach((ball) => {
                    ball.style.background = getRandomColor();
                });
            }, 3000); // Change colors every 3 second 
        }
       
        // colors[x] chosen color for faster movement ===> From level 2
        const fasterColor = elem.style.background === colors[2];

        let anim = elem.animate(
            [
            { transform: "translate( 0, 5)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ],
            {
            duration: fasterColor ? (Math.random() + 1) * 5000 : (Math.random() + 1) * 2000, // random duration for fast or regular movement
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
            }
        );

        let katt = elem.addEventListener("click", () => {
        clickCount++;
        //console.log(`Click count: ${clickCount}`);
        
        if (clickCount%2 === 0){
            console.log('EvenClick');
            matchColor(ballPrevious,elem);
        }
        ballPrevious = elem;
        //console.log(`Clicked ball ID: ${elem.id}`);
        });
        });
    }

    countDownTimerId = setInterval(countDown, 1000);
}

