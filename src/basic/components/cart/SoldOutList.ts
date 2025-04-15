import { globalStore } from "../../store/globalStore";

export const SoldOutList = () => {
  const productList = globalStore.getState().productList;
  const soldOutList = productList.filter((item) => item.count < 5);
  return `<div id="stock-status" class="text-sm text-gray-500 mt-2">
    ${soldOutList
      .map((item) =>
        item.count === 0
          ? `<span>${item.name}: 품절 </span>`
          : `<span>${item.name} 재고 부족 (${item.count}개 남음)</span>`,
      )
      .join("")}
  </div>`;
};
