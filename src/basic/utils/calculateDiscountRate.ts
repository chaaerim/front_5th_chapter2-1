import type { CartItem } from "../store/globalStore";

export const calculateDiscountRate = (
  totalPrice: number,
  currentDiscountRate: number,
  productId: string,
  cartList: CartItem[],
): number => {
  // 1. 해당 상품(cartItem) 가져오기. 없으면 할인율 0 반환.

  const cartItem = cartList.find((item) => item.id === productId);
  if (!cartItem) return 0;

  // 2. 상품별 할인: 해당 상품의 수량이 10개 이상이어야 할인 적용
  let productDiscount = 0;
  if (cartItem.count >= 10) {
    if (productId === "p1") productDiscount = 0.1;
    else if (productId === "p2") productDiscount = 0.15;
    else if (productId === "p3") productDiscount = 0.2;
    else if (productId === "p4") productDiscount = 0.05;
    else if (productId === "p5") productDiscount = 0.25;
  }

  const currentTotalPrice = totalPrice * (1 - productDiscount);

  // 3. 전체 카트의 총 상품 개수를 계산
  const overallItemCount = cartList.reduce((acc, item) => acc + item.count, 0);

  // 4. bulk 할인 적용: 전체 상품 수량이 30개 이상인 경우,
  //    해당 카트 아이템에 대해 bulk 할인(25%)와 상품별 할인 중 더 큰 절감 효과가 있는 할인을 적용
  let finalDiscount = productDiscount;
  if (overallItemCount >= 30) {
    const itemTotal = cartItem.price * cartItem.count;
    const savingWithProductDiscount = itemTotal * productDiscount;
    const savingWithBulk = itemTotal * 0.25;
    if (savingWithBulk > savingWithProductDiscount) {
      finalDiscount = 0.25;
    }
  }

  // 5. 화요일(요일이 2이면) 추가 할인: 할인율이 최소 10%가 되도록 보장
  if (new Date().getDay() === 2) {
    finalDiscount = Math.max(finalDiscount, 0.1);
  }

  finalDiscount = totalPrice - currentTotalPrice * finalDiscount;
  return finalDiscount;
};
