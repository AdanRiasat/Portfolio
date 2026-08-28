function drawSignature() {
  const path = document.getElementById("signature-path");
  const pathLength = path.getTotalLength();

  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;
  path.style.opacity = 1;

  const style = document.createElement("style");
  style.innerHTML = `
        @keyframes drawSignature {
            to {
                stroke-dashoffset: 0;
            }
        }
    `;
  document.head.appendChild(style);

  path.style.animation = "drawSignature 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards";
}

window.addEventListener("load", () => {
  let loader = document.querySelector(".loader");

  const LOADER_DURATION = 3000;

  document.body.classList.add("no-scroll");

  drawSignature();

  setTimeout(() => {
    loader.classList.add("exit");
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
      loader.remove();
    }, 2000);
  }, LOADER_DURATION);
});
