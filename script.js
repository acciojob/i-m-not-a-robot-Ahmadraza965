const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const para = document.getElementById("para");
const h = document.getElementById("h");

let selectedImages = [];

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function renderImages() {
  const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
  const selectedClass = imageClasses[getRandomIndex(imageClasses)];

  const images = imageClasses.concat(selectedClass);
  images.sort(() => Math.random() - 0.5);

  for (let i = 0; i < images.length; i++) {
    const img = document.createElement("img");
    img.src = "https://via.placeholder.com/150"; // Replace this with your image API endpoint
    img.alt = "";
    img.classList.add(images[i]);
    img.addEventListener("click", handleImageClick);
    imageContainer.appendChild(img);
  }
}

function handleImageClick(event) {
  const clickedImg = event.target;
  if (selectedImages.length < 2 && !selectedImages.includes(clickedImg)) {
    selectedImages.push(clickedImg);
    clickedImg.classList.add("selected");

    if (selectedImages.length === 2) {
      if (
        selectedImages[0].classList[1] === selectedImages[1].classList[1]
      ) {
        para.textContent = "You are a human. Congratulations!";
      } else {
        para.textContent =
          "We can't verify you as a human. You selected the non-identical tiles.";
      }
      verifyButton.style.display = "block";
    }
  }
}

function resetState() {
  selectedImages = [];
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.classList.remove("selected");
  });
  para.textContent = "";
  verifyButton.style.display = "none";
  resetButton.style.display = "none";
  h.style.display = "block";
  renderImages();
}

verifyButton.addEventListener("click", function () {
  verifyButton.style.display = "none";
  resetButton.style.display = "block";
});

resetButton.addEventListener("click", function () {
  resetState();
});

renderImages();
