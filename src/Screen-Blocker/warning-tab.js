// warning tab Javascript
const overlay_id = document.querySelector("#sd_overlay");
if (overlay_id == undefined) {
  const container = document.createElement("div");
  const text = document.createElement("p");

  container.id = "sd_overlay";
  container.append(text);
  // center text
  text.innerHTML = "get back to work!";
  text.style.fontSize = "100px";
  text.style.opacity = "100%";
  text.style.color = "red";

  // set property of overlay
  container.style.zIndex = 10_000;
  container.style.position = "fixed";
  container.style.background = "grey";
  container.style.height = "100%";
  container.style.width = "100%";
  container.style.opacity = "0.7";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";

  document.body.append(container);
}
