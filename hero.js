document.querySelectorAll(".hero-image-wrapper .floating-item").forEach((item, i) => {
  // Floating animation and positioning
  item.style.animationDelay = `${i * 0.8}s`;

  const sides = ["top", "right", "bottom", "left"];
  const side = sides[i % sides.length];

  const totalItems = document.querySelectorAll(".hero-image-wrapper .floating-item").length;
  const itemsPerSide = Math.ceil(totalItems / sides.length);

  const slotIndex = Math.floor(i / sides.length);
  const slotSize = 70 / itemsPerSide;
  const slotStart = 15 + slotIndex * slotSize;
  const pos = `${slotStart + Math.random() * slotSize}%`;

  const placement = {
    top: { top: "-25px", left: pos },
    bottom: { top: "100%", left: pos },
    left: { top: pos, left: "-25px" },
    right: { top: pos, left: "100%" },
  }[side];

  Object.assign(item.style, placement);
});

document.querySelectorAll(".floating-item svg").forEach((svg) => {
  // Mouse tracking animation
  svg.addEventListener("mousemove", (e) => {
    const rect = svg.getBoundingClientRect();
    const deltaX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const deltaY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    svg.style.transform = `translate(${deltaX * 12}px, ${deltaY * 12}px)`;
  });

  svg.addEventListener("mouseleave", () => {
    svg.style.transform = "translate(0, 0)";
  });
});
