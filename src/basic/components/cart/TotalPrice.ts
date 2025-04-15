import { globalStore } from "../../store/globalStore";

export const TotalPrice = () => {
  const totalPrice = globalStore.getState().totalPrice;
  const totalDiscountRate = globalStore.getState().totalDiscountRate;
  console.log(totalPrice);
  console.log(globalStore.getState());

  return `<div id="cart-total" class="text-xl font-bold my-4">총액: ${totalPrice}원${totalDiscountRate > 0 ? `<span class="text-green-500 ml-2">(${totalDiscountRate * 100}% 할인 적용)</span>` : ""}<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${totalPrice / 1000})</span></div>`;
};
