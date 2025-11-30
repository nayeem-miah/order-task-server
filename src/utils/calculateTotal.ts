export const calculateTotal = (items: Array<{price:number,quantity:number}>) =>
  items.reduce((s,i)=> s + i.price * i.quantity, 0);
