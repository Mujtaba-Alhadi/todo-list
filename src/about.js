export function about() {
  const content = document.querySelector("#content");
  content.textContent = "";

  const title = document.createElement("h1");
  const description = document.createElement("p");

  title.textContent = "About Us";
  description.textContent = "This is realy a real restaurant and it is not fake."

  content.appendChild(title);
  content.appendChild(description);
}