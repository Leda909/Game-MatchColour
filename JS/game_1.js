const timeLeft = document.querySelector('#time-left');
let currentTime = 30;
let timerId = null;
let clickCount = 0;
let ballPrevious = null;

let colors = ["#3CC157", "#2AA7FF"];
let numBalls = 16;
const balls = [];

//create my balls
    for (let i = 0; i < numBalls; i++) {
        //Create x amount of elements from which even amount of element get the same background color
        const colorIndex = Math.floor(i / 2) % colors.length;
        const color = colors[colorIndex];
        let ball = document.createElement("div");
        ball.classList.add("ball");
        // Add individual ID to each ball, so it will be identificable at clicking
        ball.id = `ball-${i + 1}`; 
        ball.style.background = color;
        // vw = viewer point witdh & vh = viewer point height 
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.bottom = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        //To manipulate the size of the balls, Random number between max=10 and min=3 --> Math.random() * (max - min + 1) + min
        ball.style.width = `${Math.random()*(10-5+1)+5}em`;
        ball.style.height = ball.style.width;
        ball.style.borderRadius = "100%";      // remove css border radious
        ball.style.opacity = "0.95";

        balls.push(ball);
        document.body.append(ball);
    }

    // Add movement to balls ===> ForEach, KeyFrames
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

// Match colour Oncklick - function
// If I cklick on the same colour after each other ==> clear them out : else nothing happen
function matchColor(ball1, ball2) {
    if (
        ball1.style.background === ball2.style.background &&
        ball1.id !== ball2.id
      ) {
      ball1.remove();
      ball2.remove();
      numBalls -= 2;

      console.log(`BallsLength: ${numBalls}`);
      console.log(`ball.id: ${ball1.id}`);
      console.log(`ball.id: ${ball2.id}`);

    if (numBalls === 0) {
        clearInterval(countDownTimerId);
        alert('YOU WON!');
        
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
    
let countDownTimerId = setInterval(countDown, 1000)

