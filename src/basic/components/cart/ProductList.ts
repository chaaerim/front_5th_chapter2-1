import { globalStore } from "../../store/globalStore";

export const ProductList = () => {
  const productList = globalStore.getState().productList;
  return `<select id="product-select" class="border rounded p-2 mr-2">
  ${productList.map((item) => `<option value="${item.id}">${item.name} - ${item.val}원</option>`).join("")}
  </select>`;
};
