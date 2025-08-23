import restaurantImage from "./restaurant-img.jpg";

export function home() {
  const content = document.querySelector("#content");
  content.textContent = "";
  
  const title = document.createElement("h1");
  const description = document.createElement("p");
  const image = document.createElement("img");

  title.textContent = "Restaurant";
  description.textContent = "This is a real restaruant";
  image.src = restaurantImage;

  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(image);
}