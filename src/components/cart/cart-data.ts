export type CartItem = {
  id: string;
  title: string;
  variant: string;
  price: number;
  quantity: number;
  image?: string;
};

export const cartItems: CartItem[] = [
  {
    id: "1",
    title: "Popy English For Today",
    variant: "Class Nine • 2025 Edition",
    price: 575,
    quantity: 1,
    image: "/english.png",
  },
  {
    id: "2",
    title: "HSC Bangla Literature Anthology",
    variant: "Revision Notes",
    price: 420,
    quantity: 2,
    image: "/gonit.png",
  },
  {
    id: "3",
    title: "IELTS Writing Masterclass",
    variant: "Digital Access",
    price: 520,
    quantity: 1,
    image: "/biggan.png",
  },
];

export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = subtotal > 1500 ? Math.round(subtotal * 0.1) : 0;
  const delivery = 70;
  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
};
