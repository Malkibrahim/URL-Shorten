const flag = false;
var inputbox = document.querySelector(".link-input");
const shortenButton = document.querySelector(".shortenBtn");
url = "https://getbootstrap.com/docs/4.5/components/navbar/";
async function shorten(url) {
  const short = await fetch("https://rel.ink/api/links/", {
    method: "post",
    body: JSON.stringify(url),
  });
  return short;
}
shortenButton.addEventListener("click", async () => {
  // debugger;
  if (inputbox.value === "") {
    document.querySelector(".link-input").classList.add("invalid");
    document.querySelector(".invalid-msg").classList.add("active");
  } else {
    document.querySelector(".link-input").classList.remove("invalid");
    document.querySelector(".invalid-msg").classList.remove("active");
    const hashedLink = (await shorten(inputbox.value)).url;
    const node = document.createElement("div");
    node.className = "shorten-link-container ";
    const originContent = document.createElement("div");
    originContent.className = "origin-link";
    originContent.textContent = inputbox.value;
    const hashedContent = document.createElement("div");
    hashedContent.className = "shorten-link";
    hashedContent.textContent = hashedLink;
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "Copy";
    node.appendChild(originContent);
    node.appendChild(hashedContent);

    node.appendChild(copyBtn);
    document.querySelector(".links-container").appendChild(node);
    document.querySelectorAll(".copy-btn").forEach(function (curr, i) {
      curr.addEventListener("click", () => {
        curr.classList.add("copied");
        curr.textContent = "Copied!";
      });
    });
  }
});
document
  .querySelector(".navbar-toggler")
  .addEventListener("click", function () {
    document.querySelector(".dropdown-menu").classList.toggle("active");
  });
