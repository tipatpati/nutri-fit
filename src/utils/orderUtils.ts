
// Shared utility functions and mock data for orders
export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  meals: OrderMeal[];
  totalPrice: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  orderDate: string;
  deliveryDate: string;
  createdAt: string;
}

export interface OrderMeal {
  id: number;
  name: string;
  image: string;
  category: string;
  premium: boolean;
  quantity: number;
  price: number;
}

// Mock orders data that simulates orders from the order page
export const mockOrders: Order[] = [
  {
    id: "order-001",
    customerName: "Marie Dubois",
    customerEmail: "marie.dubois@email.com",
    meals: [
      {
        id: 1,
        name: "Bol de quinoa à l'épicé",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center",
        category: "Équilibré",
        premium: false,
        quantity: 2,
        price: 12.99
      },
      {
        id: 3,
        name: "Repas protéiné",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center",
        category: "Prise de masse",
        premium: true,
        quantity: 1,
        price: 15.99
      }
    ],
    totalPrice: 41.97,
    status: 'preparing',
    orderDate: '2025-01-03',
    deliveryDate: '2025-01-03',
    createdAt: '2025-01-02T10:30:00Z'
  },
  {
    id: "order-002",
    customerName: "Pierre Martin",
    customerEmail: "pierre.martin@email.com",
    meals: [
      {
        id: 5,
        name: "Saumon grillé aux légumes",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&crop=center",
        category: "Prise de masse",
        premium: false,
        quantity: 3,
        price: 12.99
      }
    ],
    totalPrice: 38.97,
    status: 'pending',
    orderDate: '2025-01-03',
    deliveryDate: '2025-01-03',
    createdAt: '2025-01-02T14:15:00Z'
  },
  {
    id: "order-003",
    customerName: "Sophie Laurent",
    customerEmail: "sophie.laurent@email.com",
    meals: [
      {
        id: 2,
        name: "Crevettes à l'ail épicé",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
        category: "Perte de poids",
        premium: true,
        quantity: 1,
        price: 15.99
      },
      {
        id: 7,
        name: "Salade de poulet et riz",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center",
        category: "Perte de poids",
        premium: false,
        quantity: 2,
        price: 12.99
      }
    ],
    totalPrice: 41.97,
    status: 'ready',
    orderDate: '2025-01-03',
    deliveryDate: '2025-01-03',
    createdAt: '2025-01-02T16:45:00Z'
  }
];

// Calculate meal statistics from orders
export const calculateMealStats = (orders: Order[], targetDate: string) => {
  const ordersForDate = orders.filter(order => order.deliveryDate === targetDate);
  const mealStats: Record<string, { orders: number; prepared: number; remaining: number; description: string }> = {};

  ordersForDate.forEach(order => {
    order.meals.forEach(meal => {
      if (!mealStats[meal.name]) {
        mealStats[meal.name] = {
          orders: 0,
          prepared: order.status === 'ready' || order.status === 'delivered' ? meal.quantity : 
                   order.status === 'preparing' ? Math.floor(meal.quantity * 0.6) : 0,
          remaining: 0,
          description: `${meal.category} - ${meal.premium ? 'Premium' : 'Standard'}`
        };
      }
      mealStats[meal.name].orders += meal.quantity;
    });
  });

  // Calculate remaining
  Object.keys(mealStats).forEach(mealName => {
    mealStats[mealName].remaining = mealStats[mealName].orders - mealStats[mealName].prepared;
  });

  return Object.entries(mealStats).map(([name, stats]) => ({
    name,
    ...stats
  }));
};

// Calculate ingredient requirements from orders
export const calculateIngredientRequirements = (orders: Order[], targetDate: string) => {
  const ordersForDate = orders.filter(order => order.deliveryDate === targetDate);
  const ingredients = [
    { name: "Poulet Bio", factor: 0.15, unit: "kg", available: 3.0 },
    { name: "Quinoa", factor: 0.08, unit: "kg", available: 1.2 },
    { name: "Brocoli", factor: 0.12, unit: "kg", available: 2.5 },
    { name: "Huile d'olive", factor: 0.02, unit: "L", available: 0.2 },
    { name: "Avocat", factor: 0.5, unit: "pcs", available: 25 }
  ];

  const totalMeals = ordersForDate.reduce((sum, order) => 
    sum + order.meals.reduce((mealSum, meal) => mealSum + meal.quantity, 0), 0);

  return ingredients.map(ingredient => {
    const needed = totalMeals * ingredient.factor;
    return {
      ingredient: ingredient.name,
      totalNeeded: `${needed.toFixed(ingredient.unit === "pcs" ? 0 : 1)} ${ingredient.unit}`,
      available: `${ingredient.available} ${ingredient.unit}`,
      status: needed <= ingredient.available ? "OK" : "Manque"
    };
  });
};

export const getOrdersForDate = (orders: Order[], date: string) => {
  return orders.filter(order => order.deliveryDate === date);
};
