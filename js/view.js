import { findCustomer, getOrderTotal, getFilteredOrders, getStats } from "./selectors.js";


export function showError(message) {
  const box = document.getElementById("error");
  box.textContent = message;
  box.classList.remove("d-none");
}

export function renderCategoryOptions(categories) {
  const select = document.getElementById("categoryFilter");
  categories.forEach(cat => {
    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

function renderStats(state) {
  const stats = getStats(state);
  const cards = [
    { label: "Clients", value: stats.customers },
    { label: "Produits", value: stats.products },
    { label: "Commandes", value: stats.orders },
    { label: "Montant cumulé", value: stats.totalAmount + " MAD" }
  ];
  document.getElementById("stats").innerHTML = cards.map(card => `
    <div class="col-6 col-md-3">
      <div class="card shadow-sm text-center">
        <div class="card-body">
          <div class="text-muted">${card.label}</div>
          <div class="fs-4 fw-bold">${card.value}</div>
        </div>
      </div>
    </div>`).join("");
}

function renderOrders(state) {
  const orders = getFilteredOrders(state);
  const body = document.getElementById("ordersBody");

  if (orders.length === 0) {
    body.innerHTML = `<tr><td colspan="6" class="text-center">Aucune commande trouvée</td></tr>`;
    return;
  }

  body.innerHTML = orders.map(order => {
    const customer = findCustomer(state.customers, order.customerId);
    const total = getOrderTotal(order, state.products);
    return `
      <tr>
        <td>#${order.id}</td>
        <td>${customer.name}</td>
        <td>${order.date}</td>
        <td>${order.status}</td>
        <td>${total} MAD</td>
        <td><button class="btn btn-sm btn-primary" data-id="${order.id}">Détail</button></td>
      </tr>`;
  }).join("");
}


export function render(state) {
  renderStats(state);
  renderOrders(state);
}