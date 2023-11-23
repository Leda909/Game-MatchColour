//import { something, animation } from './animation.js'
//import { catContainer } from './cat.js'

//Building together the levels ==> init() function onload by moving further levels
const timeLeft = document.querySelector('#time-left');
let countDownTimerId = null;
let currentTime = null;
let timerId = null;
let Mlevel = 1;
let numBalls = null;
let MnumBalls = [18, 28, 40, 52, 14, 70];
let McurrentTime = [30, 60, 120, 180, 220, 250];
let Mcolors = ["#3CC157", "#2AA7FF", "#ff5050", "#ff9900", "#7a00cc", "#ffa31a", "#00e6b8"];
let balls = [];
let fish = null;

function hexToRgb(hex) {
    // Remove the # character if present
    hex = hex.replace("#", "");
    // Convert the hex value to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Return the RGB value as a string
    console.log(`rgb(${r}, ${g}, ${b})`);
    return `rgb(${r}, ${g}, ${b})`;
}

function handleFishClick(fish) {
    console.log("Fish clicked!");
    console.log(fish.style.background === hexToRgb("#2AA7FF"));
    console.log(fish.style.background === "rgb(42, 167, 255)");
    if (fish.style.background === hexToRgb("#2AA7FF")) {
        console.log("Fish clicked after!");
        //const targetColor = hexToRgb("#ff5050");
        const targetColor = hexToRgb(Mcolors[Math.floor(Math.random() * Mcolors.length)]);
        const matchingFishBalls = balls.filter(ball => ball.style.background === targetColor);
        matchingFishBalls.forEach(ball => {
            removeBall(ball);
            // ball.remove();
            // numBalls--;
            console.log(`FishClick removedBallID: ${ball.id}`);
            console.log(`FishClick_numBalls: ${numBalls}`);
        });
        console.log(`Fish clicked. Color: ${targetColor}`);
    }
    checkNumBalls();
}

// ---- Part of matchFour ===> the Fourth Ball Removal ---
function getFourthBall(thirdBallColor, thirdBallId) {
    const matchingBalls = balls.filter(
        (ball) =>
            ball.style.background === thirdBallColor && ball.id !== thirdBallId
    );
    if (matchingBalls.length > 0) {
        const ball4 = matchingBalls[Math.floor(Math.random() * matchingBalls.length)];
        return ball4;
    }
    console.log(`matchFourthBall: value null`);
    return null;
}

function generateRandomIndex() {
    let randomIndex = Math.floor(Math.random() * balls.length);
    // console.log(`randomIndex: ${randomIndex}`);
    // console.log(`removedList_1: ${removedList}`);
    return randomIndex;
}

function removeBall(ballElement) {
    const index = balls.findIndex(ball => ball.id === ballElement.id);
    // Remove ball from screen
    ballElement.remove();
    // Remove ball from array
    balls.splice(index, 1);
}

function matchTwo(ball1, ball2) {
    if (ball1.style.background === ball2.style.background &&
        ball1.id !== ball2.id) {
        //console.log("numBallsTWO_Before: ${numBalls}");
        removeBall(ball1);
        removeBall(ball2);
        console.log(`Ball2 First removed: ${ball1.id}`);
        console.log(`Ball2 Second removed: ${ball2.id}`);
        // numBalls -= 2;
        //console.log("numBallsTWO_After: ${numBalls}");
        //console.log("RemoveTwo");
    }
}

function matchFour(ball1, ball2) {
    // Check if numBalls is 4 or less
    if (balls.length <= 4) {
        return false;
    }

    if (ball1 && ball2 && ball1.style && ball2.style &&
        ball1.style.borderRadius === ball2.style.borderRadius &&
        ball1.style.background === ball2.style.background &&
        ball1.id !== ball2.id) {
        removeBall(ball1);
        removeBall(ball2);

        console.log(`Ball4 First removed: ${ball1.id}`);
        console.log(`Ball4 Second removed: ${ball2.id}`);

        const thirdBallIndex = generateRandomIndex();
        const ball3 = balls[thirdBallIndex];
        const thirdBallColor = ball3.style.background;
        const ball4 = getFourthBall(thirdBallColor, ball3.id);

        removeBall(ball3);
        removeBall(ball4);

        console.log(`Ball4 third removed: ${ball3.id}`);
        console.log(`Ball4 fourth removed: ${ball4.id}`);

        return true;
    }
    return false;
}

// If I cklick on the same colour after each other ==> clear them out, if form also match 4 elem
function matchColor(ball1, ball2) {
    if (Mlevel > 2) {
        if (!matchFour(ball1, ball2)) {
            matchTwo(ball1, ball2);
            //console.log(`numballsIF: ${numBalls}`);
        };
    } else {
        matchTwo(ball1, ball2);
        //console.log(`numballsELSE: ${numBalls}`);
    }
    checkNumBalls();
}

function checkNumBalls() {
    console.log(balls);
    console.log(`checkNumBalls numBalls: ${balls.length}`);
    //if (balls.length === 0)
    if (balls.length === 0) {
        clearInterval(countDown);

        if (Mlevel === 6) {
            balls.forEach(ball => { ball.remove(); });
            fish.remove(); // clear out the last remainings
            alert('You won!!! You are the best!');
            return; // Stop the game progression
        }

        let nextLevel = Mlevel + 1;
        setTimeout(() => {
            alert('Congratulations! You can move to level ' + (nextLevel) + '!');
            init(nextLevel);
        }, 1000);
    }
}

// Create the cat container
const catContainer = document.createElement("div");
catContainer.classList.add("cat");

// Create the cat elements array of objects
const elements = [
    { class: "left-ear", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
    { class: "right-ear", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
    { class: "left-inear", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
    { class: "right-inear", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
    { class: "head", borderRadius: "50%" },
    { class: "left-eye" },
    { class: "left-iris" },
    { class: "right-eye" },
    { class: "right-iris" },
    { class: "jaw", borderRadius: "50%" },
    { class: "mount", borderRadius: "50%" },
    { class: "left-whisker1" },
    { class: "left-whisker2" },
    { class: "left-whisker3" },
    { class: "right-whisker1" },
    { class: "right-whisker2" },
    { class: "right-whisker3" },
    { class: "nose", borderRadius: "50%" },
    { class: "cattail", borderRadius: "50% 50% 0 0" },
];

// Append the cat elements to the cat container
elements.forEach((element) => {
    const catElement = document.createElement("div");
    catElement.classList.add(element.class);
    if (element.clipPath) {
        catElement.style.clipPath = element.clipPath;
    }
    if (element.borderRadius) {
        catElement.style.borderRadius = element.borderRadius;
    }
    catContainer.appendChild(catElement);
});

document.body.appendChild(catContainer);

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('Game over');
        window.location.reload();
    }
}

function init(pLevel) {
    Mlevel = pLevel;
    numBalls = MnumBalls[Mlevel - 1];
    let colors = Mcolors.slice(0, Mlevel + 1);
    currentTime = McurrentTime[Mlevel - 1];
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
        ball.id = `${i}`;
        ball.style.background = color;
        // vw = viewer point witdh & vh = viewer point height 
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.bottom = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        //To manipulate the size of the balls, Random number between max=10 and min=3 --> Math.random() * (max - min + 1) + min
        ball.style.width = `${Math.random() * (10 - 3 + 1) + 3}em`;
        ball.style.height = ball.style.width;
        ball.style.borderRadius = "100%";      // remove css border radious
        if (Mlevel > 4) {
            ball.style.opacity = Math.random() < 0.2 ? "0.2" : "0.99";  //aproximetly 1/3 of balls get more opacity
        } else {
            ball.style.opacity = "1";
        }

        balls.push(ball);
        document.body.append(ball);
    }

    if (Mlevel < 3) {
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

                if (clickCount % 2 === 0) {
                    console.log('EvenClick');
                    matchColor(ballPrevious, elem);
                }
                ballPrevious = elem;
                //console.log(`Clicked ball ID: ${elem.id}`);
            });
        });
    } else {
        // CreateFish element from level 5 ------------//
        if (Mlevel === 5) {
            const fishContainer = document.getElementById("fish-container");
            for (let i = 0; i < 1; i++) {
                const fish = document.createElement("div");
                fish.classList.add("fish");
                fish.innerHTML = `
                  <div class="fins left-fin"></div>
                  <div class="fins right-fin"></div>
                  <div class="body"></div>
                  <div class="tail"></div>
                  <div class="eye"></div>
                `;
                fishContainer.appendChild(fish);
            }

            fish = fishContainer.querySelector(".fish");

            // Function to change the background color of all elements within the fish-container
            function changeBackgroundColor() {
                const fishContainer = document.getElementById("fish-container");
                const fishElements = fishContainer.querySelectorAll("div:not(.eye)");
                let randomFishColor = "#2AA7FF";
                //let randomFishColor = Mcolors[Math.floor(Math.random() * Mcolors.length)];
                fishElements.forEach((fish) => {
                    fish.style.background = randomFishColor;
                });
            }
            // Call the changeBackgroundColor function every random interval
            function animateBackgroundChange() {
                const randomInterval = Math.random() * 10000 + 2000; // Random interval between 1 and 4 seconds
                changeBackgroundColor();
                setTimeout(animateBackgroundChange, randomInterval);
            }
            // Start the animation
            animateBackgroundChange();

            // Function to generate random values
            function getRandom(min, max) {
                return Math.random() * (max - min) + min;
            }

            // Function to move fish randomly on the screen
            function swimFish(fish) {
                // Generate random coordinates within the container boundaries
                const randomX = getRandom(-150, 1100);
                const randomY = getRandom(-150, 550);
                // Apply the random coordinates to move the fish
                fish.style.left = randomX + "px";
                fish.style.top = randomY + "px";
                // Schedule the next swim movement
                setTimeout(() => swimFish(fish), getRandom(1000, 200));
            }

            // Start the swim movement for each fish
            const fishes = document.querySelectorAll(".fish");
            fishes.forEach((fish) => {
                swimFish(fish);
            });

            fish.addEventListener("click", () => handleFishClick(fish));

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

            // Function to generate a random color balls
            const getRandomColor = (ball) => {
                return colors[Math.floor(Math.random() * colors.length)];
            };

            // Random borderRadius from LEVEL 3 //
            if (Mlevel > 2) {
                function changeBorderRadius(ball) {
                    const borderRadius = Math.random() < 0.5 ? "100%" : "0";
                    ball.style.borderRadius = borderRadius;
                }
                setInterval(() => changeBorderRadius(elem), Math.random() * 3000 + 1000);
            }
            // ---- Random Opacity from LEVEL 4 -------//
            if (Mlevel > 3) { animateOpacityChange(10000, 40); }

            // ---- Random Colour changes from LEVEL 6 -------//
            if (Mlevel > 5) {
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

                if (clickCount % 2 === 0) {
                    console.log('EvenClick');
                    matchColor(ballPrevious, elem);
                }
                ballPrevious = elem;
                //console.log(`Clicked ball ID: ${elem.id}`);
            });
        });
    }

    countDownTimerId = setInterval(countDown, 1000);
}