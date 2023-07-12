const timeLeft = document.querySelector('#time-left');
let currentTime = 90;
let timerId = null;
let clickCount = 0;
let ballPrevious = null;

let colors = ["#3CC157", "#2AA7FF", "#ff5050", "#ff9900", "#7a00cc"];
let numBalls = 8;
const balls = [];
let removedList = new Array();

//create my balls
    for (let i = 0; i < numBalls; i++) {
        //Create x amount of elements from which even amount of element get the same background color
        const colorIndex = Math.floor(i / 2) % colors.length;
        const color = colors[colorIndex];
        let ball = document.createElement("div");
        ball.classList.add("ball");
        // Add individual ID to each ball, so it will be identificable at clicking
        ball.id = `${i + 1}`; 
        ball.style.background = color;
        // vw = viewer point witdh & vh = viewer point height 
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.bottom = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        //To manipulate the size of the balls, Random number between max=10 and min=3 --> Math.random() * (max - min + 1) + min
        ball.style.width = `${Math.random()*(10-3+1)+3}em`;
        ball.style.height = ball.style.width;
        ball.style.borderRadius = "100%";      // remove css border radious
        ball.style.opacity = 1; 

        balls.push(ball);
        document.body.append(ball);
    }

    //Add disappear effect
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
    }
    // Usage: animateOpacityChange(opacityDuration, alternateDuration);
    //animateOpacityChange(10000, 40);


    // Add movement to balls ===> ForEach, KeyFrames
    balls.forEach((elem, i, ra) => {
        elem.id = `${i + 1}`;

        let to = {
            x: Math.random() * (i % 2 === 0 ? -12 : 12),
            y: Math.random() * 12
        };
        
        // Function to randomly change between borderRadius 100% and 0
        function changeBorderRadius(ball) {
          const borderRadius = Math.random() < 0.5 ? "100%" : "0";
          ball.style.borderRadius = borderRadius;
        }
        setInterval(() => changeBorderRadius(elem), Math.random() * 6000 + 3000); // Random interval to change borderRadius
        
        // colors[x] chosen color for faster movement
        const isFastColor = elem.style.background === colors[Math.floor(Math.random() * colors.length)];

        let anim = elem.animate(
            [
            { transform: "translate( 0, 4)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ],
            {
            duration: isFastColor ? (Math.random() + 1) * 10000 : (Math.random() + 1) * 5000, // random duration for fast or regular movement
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
            }
        );

        let katt = elem.addEventListener("click", () => {
        clickCount++;
        console.log(`Click count: ${clickCount}`);
        
        if (clickCount%2 === 0){
            console.log('EvenClick');
            matchColor(ballPrevious,elem);
        }
        ballPrevious = elem;
        console.log(`Clicked ball ID: ${elem.id}`);
        }); 
    });

    // pick a random index
    // find that ball
    // if ball color === firstRemovedBall color then remove ball
    // else pick another ball and try again

// function matchThirdFourth(thirdBallRemoved) {
//     const randomIndex = generateRandomIndex();
//     const removedBall = balls[randomIndex];
    
//     while (
//         removedList.includes(randomIndex + 1) &&
//         removedBall.style.background === thirdBallRemoved.style.background
//     ) {
//         removedBall.remove();
//         const newRandomIndex = generateRandomIndex();
//         removedBall = balls[newRandomIndex];
//     }
// }
      
function matchFourthBall(thirdBallColor) {
    const matchingBalls = balls.filter(
       (ball) =>
         ball.style.background === thirdBallColor && !removedList.includes(ball.id)
    );
    const fourthBallRemoved = matchingBalls[Math.floor(Math.random() * matchingBalls.length)];
    fourthBallRemoved.remove();
    return fourthBallRemoved;
}

function generateRandomIndex() {
    let randomIndex = Math.floor(Math.random() * balls.length);
    // console.log(`randomIndex: ${randomIndex}`);
    // console.log(`removedList_1: ${removedList}`);
    while (removedList.includes(`${randomIndex+1}`)) {
        //Keep on while guessing a new random index while is not included in the removedList. 
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
    return removedBall;
}
  

// If I cklick on the same colour after each other ==> clear them out, if form also match 4 elem
function matchColor(ball1, ball2) {
    switch (true) {
        case (ball1.style.borderRadius === ball2.style.borderRadius && 
            ball1.style.background === ball2.style.background && 
            ball1.id !== ball2.id):

            ball1.remove();
            ball2.remove();
            removedList = [ball1.id, ball2.id];
            const thirdBallRemoved = removeRandomBall(`${removedList}`);
            removedList.push(thirdBallRemoved.id);
            const thirdBallColor = thirdBallRemoved.style.background;
            const fourthBallRemoved = matchFourthBall(thirdBallColor);
            numBalls -= 4;
            break;

        case ( ball1.style.background === ball2.style.background &&
            ball1.id !== ball2.id):

            ball1.remove();
            ball2.remove();
            numBalls -= 2;
            break;
    }
    // if (ball1.style.borderRadius === ball2.style.borderRadius && 
    //     ball1.style.background === ball2.style.background && 
    //     ball1.id !== ball2.id) {
    //       //console.log(`BallsLengthBefore: ${numBalls}`);
    //       // Remove four balls
    //     ball1.remove();
    //     ball2.remove();
    //     removedList = [ball1.id, ball2.id ];
    //       //console.log(`BallsLengthMiddle: ${numBalls}`);
    //       //console.log(`removedList_3: ${removedList}`);
    //     const thirdBallRemoved = removeRandomBall(`${removedList}`);
    //     removedList.push(thirdBallRemoved.id);
    //     const thirdBallColor = thirdBallRemoved.style.background;
    //     const fourthBallRemoved = matchFourthBall(thirdBallColor);
    //     //removeRandomBall()
    //     numBalls -= 4;
    //       //console.log(`ball.borderRadius: ${ball1.style.borderRadius}`);
    //       //console.log(`ball.color: ${ball1.style.background}`);
    //       //console.log(`ball.borderRadius: ${ball2.style.borderRadius}`);
    //       //console.log(`ball.color: ${ball2.style.background}`);
    //       //console.log(`BallsLengthAfter: ${numBalls}`);
    // } else if ( ball1.style.background === ball2.style.background &&
    //         ball1.id !== ball2.id) {
    //       //console.log(`BallsLengthBefore: ${numBalls}`);      
    //     ball1.remove();
    //     ball2.remove();
    //     numBalls -= 2;
    //       //console.log(`BallsLengthAfter: ${numBalls}`);
    //       //console.log(`ball.id: ${ball1.id}`);
    //       //console.log(`ball.id: ${ball2.id}`);
    // }

    if (numBalls <= 0) {
        clearInterval(countDownTimerId);
        alert('You Won! Move to level 5!');
        //window.location.href = 'index5.html';
    }
}


function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    
    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('GAME OVER!');
        //window.location.href = 'index1.html';
    }
}
    
let countDownTimerId = setInterval(countDown, 1000)
