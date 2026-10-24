import { state } from "./state.js";
import { loadAllData } from "./dataService.js";

async function init() {
  try {
    const data = await loadAllData();
    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;
    console.log("State après chargement :", state);
  } catch (error) {
    console.error(error);
  }
}

init();