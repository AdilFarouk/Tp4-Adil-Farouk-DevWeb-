import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import { getCategories } from "./selectors.js";
import { render, renderCategoryOptions, showError } from "./view.js";

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

init();