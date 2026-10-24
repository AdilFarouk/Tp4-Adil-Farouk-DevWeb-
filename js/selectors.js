
export function findCustomer(customers, id) {
  return customers.find(c => c.id === id);
}


export function findProduct(products, id) {
  return products.find(p => p.id === id);
}


export function getOrderLines(order, products) {
  return order.items.map(item => {
    const product = findProduct(products, item.productId);
    return {
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: item.quantity,
      amount: product.price * item.quantity   
    };
  });
}


export function getOrderTotal(order, products) {
  let total = 0;
  getOrderLines(order, products).forEach(line => {
    total += line.amount;
  });
  return total;
}


export function getFilteredOrders(state) {
  return state.orders.filter(order => {
    const customer = findCustomer(state.customers, order.customerId);

    const matchSearch = customer.name.toLowerCase().includes(state.search.toLowerCase());
    const matchStatus = state.status === "" || order.status === state.status;
    const matchCategory = state.category === "" || order.items.some(item => {
      const product = findProduct(state.products, item.productId);
      return product.category === state.category;
    });

    return matchSearch && matchStatus && matchCategory;
  });
}


export function getCategories(products) {
  const all = products.map(p => p.category);
  return all.filter((cat, index) => all.indexOf(cat) === index);
}


export function getStats(state) {
  let totalAmount = 0;
  state.orders.forEach(order => {
    totalAmount += getOrderTotal(order, state.products);
  });
  return {
    customers: state.customers.length,
    products: state.products.length,
    orders: state.orders.length,
    totalAmount: totalAmount
  };
}