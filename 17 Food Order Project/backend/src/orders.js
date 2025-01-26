import availableMeals from '../available-meals.json' with { type: 'json' };

const meals = availableMeals;
const orders = [];

export async function findAllMeals(delaySeconds = 0.5) {
  await sleep(delaySeconds);
  return meals;
}

export async function createOrder(order, delaySeconds = 0.5) {
  await sleep(delaySeconds);
  const newOrder = { ...order, id: (Math.random() * 1000).toString() };
  orders.push(newOrder);
  return newOrder;
}

async function sleep(seconds) {
  return await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
