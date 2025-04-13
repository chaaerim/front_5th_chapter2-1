import { globalStore } from "../../store/globalStore";

export const TotalPrice = () => {
  const totalPrice = globalStore.getState().totalPrice;
  console.log(totalPrice);
  console.log(globalStore.getState());

  return `<div id="cart-total" class="text-xl font-bold my-4">총 가격: ${totalPrice}원
  <span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${totalPrice / 1000})</span>
  </div>`;
};
