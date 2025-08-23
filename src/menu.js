export function menu() {
  const content = document.querySelector("#content");
  content.textContent = "";

  const title = document.createElement("h1");
  const menuTable = document.createElement("table");
  const thMeals = document.createElement("th");
  const thPrices = document.createElement("th");
  const trHead = document.createElement("tr");

  title.textContent = "Menu";
  thMeals.textContent = "Meals";
  thPrices.textContent = "Prices";

  trHead.appendChild(thMeals);
  trHead.appendChild(thPrices);
  menuTable.appendChild(trHead);

  for (let i = 1; i <= 4; i++) {
    const tr = document.createElement("tr");
    const tdMeal = document.createElement("td");
    const tdPrice = document.createElement("td");

    tdMeal.textContent = `Meal ${i}`;
    tdPrice.textContent = `Price ${i}`;

    tr.appendChild(tdMeal);
    tr.appendChild(tdPrice);

    menuTable.appendChild(tr);
  }

  content.appendChild(title);
  content.appendChild(menuTable);
}