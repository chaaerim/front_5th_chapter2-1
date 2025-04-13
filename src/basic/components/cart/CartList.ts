import { globalStore } from "../../store/globalStore";

export const CartList = () => {
  const cartList = globalStore.getState().cartList;
  console.log(cartList);
  return `<div id="cart-items">
  ${cartList
    .map(
      (item) => `<span>${item.name} - ${item.price}원 x ${item.count}</span>
    <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id=${item.id} data-change="-1">-</button>
    <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id=${item.id} data-change="1">+</button>
    <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id=${item.id}>삭제</button>
    `,
    )
    .join("")}
  </div>`;
};

const changeQuantity = (productId: string, change: number) => {
  const cartList = globalStore.getState().cartList;
  const product = cartList.find((item) => item.id === productId);
  product.quantity += change;
};
