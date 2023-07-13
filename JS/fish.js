// Create fish elements and add to the container
const fishContainer = document.getElementById("fish-container");
let colors = ["#3CC157", "#2AA7FF", "#ff5050", "#ff9900", "#7a00cc", "#ffa31a", "#00e6b8"];

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

// Function to change the background color of all elements within the fish-container
function changeBackgroundColor() {
  const fishContainer = document.getElementById("fish-container");
  const fishElements = fishContainer.querySelectorAll("div:not(.eye)");
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  fishElements.forEach((element) => {
    element.style.backgroundColor = randomColor;
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
  const containerWidth = fishContainer.offsetWidth;
  const containerHeight = fishContainer.offsetHeight;
  const fishWidth = fish.offsetWidth;
  const fishHeight = fish.offsetHeight;

  // Generate random coordinates within the container boundaries
  const randomX = getRandom(containerWidth - fishWidth, 0);
  const randomY = getRandom(containerHeight - fishHeight, 0);
  const randomNumber = Math.floor(Math.random() * 11) - 5;

  // Apply the random coordinates to move the fish
  fish.style.left = randomX + "px";
  fish.style.top = randomY + "px";
  fish.style.zIndex = randomNumber + "px";

  // Schedule the next swim movement
  setTimeout(() => swimFish(fish), getRandom(1000, 200));
}

// Start the swim movement for each fish
const fishes = document.querySelectorAll(".fish");
//fishes.forEach((fish) => {
  //swimFish(fish);
//});