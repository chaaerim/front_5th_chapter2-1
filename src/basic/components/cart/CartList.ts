import { globalStore } from "../../store/globalStore";
import { addEvent } from "../../utils/eventUtils";
export const CartList = () => {
  const cartList = globalStore.getState().cartList;
  return `<div id="cart-items">
   ${cartList
     .map(
       (item) => `
      <div id="${item.id}" class="flex justify-between items-center mb-2">
      <span>${item.name} - ${item.price}원 x ${item.count}</span>
      <div>
    <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id=${item.id} data-change="-1">-</button>
    <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id=${item.id} data-change="1">+</button>
    <button id="remove-item" class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id=${item.id}>삭제</button>
    </div>
    </div>
    `,
     )
     .join("")}
  </div>`;
};

const handleQuantityChange = (productId: string, change: number) => {
  console.log(productId, change);
  const cartList = globalStore.getState().cartList;

  const productList = globalStore.getState().productList;
  const product = productList.find((item) => item.id === productId);
  if (!product) return;

  if (product.count - change < 0) {
    alert("재고가 부족합니다.");
    return;
  }
  const updatedProduct = { ...product, count: product.count - change };
  const updatedProductList = productList.map((item) => (item.id === productId ? updatedProduct : item));

  const updatedCartList = cartList
    .map((item) => (item.id === productId ? { ...item, count: item.count + change } : item))
    .filter((item) => item.count > 0);

  const newTotal = updatedCartList.reduce((acc: number, item) => acc + item.price * (item.count || 1), 0);

  globalStore.setState({ productList: updatedProductList, cartList: updatedCartList, totalPrice: newTotal });
};

const handleItemRemove = (productId: string) => {
  //TODO: 삭제되면 상품 재고 증가
  const cartList = globalStore.getState().cartList;
  const productList = globalStore.getState().productList;

  // 삭제될 항목(cartItem)을 찾습니다.
  const removedCartItem = cartList.find((item) => item.id === productId);
  if (!removedCartItem) return;

  // 상품 정보를 productList에서 찾습니다.
  const product = productList.find((item) => item.id === productId);
  if (!product) return;

  // cartList에서 해당 상품을 필터링하여 제거합니다.
  const updatedCartList = cartList.filter((item) => item.id !== productId);

  const newTotal = updatedCartList.reduce((acc: number, item) => acc + item.price * (item.count || 1), 0);

  // 제거된 상품의 count만큼 상품의 재고를 증가시킵니다.
  const updatedProductList = productList.map((item) =>
    item.id === productId ? { ...item, count: item.count + removedCartItem.count } : item,
  );

  // const discountRate = calculateDiscountRate(updatedCartList);
  // console.log("discountRate", discountRate);

  globalStore.setState({
    cartList: updatedCartList,
    productList: updatedProductList,
    totalPrice: newTotal,
    // totalDiscountRate: discountRate,
  });
};

addEvent("click", ".quantity-change", (e) => {
  const productId = e.target.dataset.productId;
  const change = e.target.dataset.change;
  console.log(productId, change);
  handleQuantityChange(productId, Number(change));
});

addEvent("click", "#remove-item", (e) => {
  const productId = e.target.dataset.productId;
  handleItemRemove(productId);
});
