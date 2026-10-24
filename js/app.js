
import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import { getCategories } from "./selectors.js";
import { render, renderCategoryOptions, showError, showOrderDetail } from "./view.js";

async function init() {
  try {
    const data = await loadAllData();
    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    renderCategoryOptions(getCategories(state.products));
    render(state);          
  } catch (error) {
    console.error(error);   
    showError("Erreur de chargement des données : " + error.message);
  }
}


document.getElementById("search").addEventListener("input", event => {
  state.search = event.target.value;
  render(state);
});

document.getElementById("statusFilter").addEventListener("change", event => {
  state.status = event.target.value;
  render(state);
});

document.getElementById("categoryFilter").addEventListener("change", event => {
  state.category = event.target.value;
  render(state);
});


document.getElementById("ordersBody").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (button) {
    showOrderDetail(state, Number(button.dataset.id));
  }
});

init();