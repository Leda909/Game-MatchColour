//Building together the levels ==> init() function
const timeLeft = document.querySelector('#time-left');
let currentTime = null;
let countDownTimerId = null;
let timerId = null;
let numBalls = null;
let level = null;

function matchColor(ball1, ball2) {
    if (ball1.style.background === ball2.style.background && ball1.id !== ball2.id) {
      ball1.remove();
      ball2.remove();
      numBalls = numBalls-2;
      console.log(`BallsLenght: ${numBalls}`);
      if (numBalls === 0){
        clearInterval(countDown);
        alert('Congratulation! You can move to level '+ level + '!');
        init (24, "#FCBC0F", 60, 3);
      }
    }       
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    
    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('GAME OVER!');
    }
    }  

function init(pNumBalls, pPushColor, pCurrentTime, pLevel){
    numBalls = pNumBalls;
    currentTime = pCurrentTime;
    level = pLevel;
    let colors = ["#3CC157", "#2AA7FF"];
    console.log(`pPushColor: ${pPushColor}`);
    if (pPushColor !== undefined && pPushColor !== null){
        colors.push(pPushColor);
    }
    
    let clickCount = 0;
    let ballPrevious = null;
    const balls = [];
    
    //create my balls
    for (let i = 0; i < numBalls; i++) {
        //Create x amount of elements from which even amount of element get the same background color
        const colorIndex = Math.floor(i / 2) % colors.length;
        const color = colors[colorIndex];
        let ball = document.createElement("div");
        ball.classList.add("ball");
        // Add individual ID to each ball, so it will be identificable at clicking
        ball.id =`ball-${i + 1}`;
        ball.style.background = color;
        // vw = viewer point witdh & vh = viewer point height 
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.bottom = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        //To manipulate the size of the balls, Random number between max=10 and min=3 --> Math.random() * (max - min + 1) + min
        ball.style.width = `${Math.random()*(10-3+1)+3}em`;
        ball.style.height = ball.style.width;
        ball.style.borderRadius = "100%";      // remove css border radious
        ball.style.opacity = "0.95";

        balls.push(ball);
        document.body.append(ball);
    }

    if ( pLevel<3 ) {
        // Keyframes
        balls.forEach((elem, i, ra) => {
            elem.id = `ball-${i + 1}`;
        
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
            console.log(`Click count: ${clickCount}`);
            
            if (clickCount%2 === 0){
                console.log('EvenClick');
                matchColor(ballPrevious,elem);
            }
            ballPrevious = elem;
            console.log(`Clicked ball ID: ${elem.id}`);
            });
            });
    } else {
    // Keyframes
        balls.forEach((elem, i, ra) => {
        elem.id = `ball-${i + 1}`;

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

        // Function to randomly change between borderRadius 100% and 0
        function changeBorderRadius(ball) {
            const borderRadius = Math.random() < 0.5 ? "100%" : "0";
            ball.style.borderRadius = borderRadius;
        } 

        // Function to generate a random color
        const getRandomColor = (ball) => {
            return colors[Math.floor(Math.random() * colors.length)];
        };

        // Random borderRadius from LEVEL 3//
        if ( pLevel>=3 ){setInterval(() => changeBorderRadius(elem), Math.random() * 3000 + 1000);}
        // ---- Random Opacity from LEVEL 4 -------//
        if ( pLevel>=4 ){animateOpacityChange(10000, 50);}
        // ---- Random Colour changes from LEVEL 6 -------//
        if ( pLevel>=6 ){
            setInterval(() => {
                balls.forEach((ball) => {
                    ball.style.background = getRandomColor();
                });
            }, 3000); // Change colors every 3 second 
        }
       
        // colors[x] chosen color for faster movement
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
        console.log(`Click count: ${clickCount}`);
        
        if (clickCount%2 === 0){
            console.log('EvenClick');
            matchColor(ballPrevious,elem);
        }
        ballPrevious = elem;
        console.log(`Clicked ball ID: ${elem.id}`);
        });
        });
    }

    countDownTimerId = setInterval(countDown, 1000);
}