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

export function getCategories(products) {
  const all = products.map(p => p.category);
  return all.filter((cat, index) => all.indexOf(cat) === index);
}