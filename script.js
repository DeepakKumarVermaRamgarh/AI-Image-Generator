const searchInput = document.querySelector(".search-input");
const generatedImg = document.getElementById("generated-img");

const loadingText = document.getElementById("loading-text");
const loadingBar = document.getElementById("loading-bar");

async function generateImage() {
  if (searchInput.value.trim() !== "") {
    loadingText.classList.replace("loading-text-blank", "loading-text");
    loadingBar.classList.replace("loading-bar-empty", "loading-bar-full");
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer OpenAI API Key Here",
        },
        body: JSON.stringify({
          prompt: `${searchInput.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    const { data } = await response.json();
    generatedImg.src = "";
    generatedImg.src = `${data[0].url}`;
    searchInput.value = "";
    loadingText.classList.replace("loading-text", "loading-text-blank");
    loadingBar.classList.replace("loading-bar-full", "loading-bar-empty");
  }
}
