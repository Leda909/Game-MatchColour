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