import { globalStore } from "../../store/globalStore";
import type { CartItem } from "../../store/globalStore";
import { addEvent } from "../../utils/eventUtils";

interface Product {
  id: string;
  name: string;
  price: number;
  count: number;
}

export const ProductSelector = () => {
  const productList = globalStore.getState().productList;
  console.log(productList);

  return `
  <select id="product-select" class="border rounded p-2 mr-2">
  ${productList.map((product) => `<option value="${product.id}" ${product.count <= 0 ? "disabled = true" : ""}}>${product.name} - ${product.price}원</option>`).join("")}
  </select>
  <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
  `;
};

const addProduct = () => {
  const selectedProduct = document.getElementById("product-select") as HTMLSelectElement;
  const selectedProductId = selectedProduct?.value;

  const state = globalStore.getState();

  const product = state.productList.find((item: Product) => item.id === selectedProductId);
  if (!product) return;

  // 재고가 없으면 중단
  if (product.count <= 0) {
    console.log("재고 부족");
    return;
  }

  // 4. 상품의 재고(q)를 1 감소시킨 새로운 상품 객체 생성
  const updatedProduct = { ...product, count: product.count - 1 };
  console.log(updatedProduct);
  const updatedProductList = state.productList.map((item: Product) =>
    item.id === selectedProductId ? updatedProduct : item,
  );

  // 5. cartList에 해당 상품을 추가하는데,
  // 이미 카트에 있으면 수량(count)을 1 증가시키고,
  // 없으면 count:1로 새 항목을 추가
  let updatedCartList: CartItem[];
  const existingCartItem = state.cartList.find((item: CartItem) => item.id === selectedProductId);
  if (existingCartItem) {
    updatedCartList = state.cartList.map((item: CartItem) =>
      item.id === selectedProductId ? { ...item, count: (item.count || 1) + 1 } : item,
    );
  } else {
    updatedCartList = [...state.cartList, { ...updatedProduct, count: 1 }];
  }

  // 6. 카트에 있는 모든 상품의 가격 합계를 계산
  const newTotal = updatedCartList.reduce((acc: number, item: CartItem) => acc + item.price * (item.count || 1), 0);

  // 7. globalStore에 변경된 값 반영
  globalStore.setState({
    productList: updatedProductList,
    cartList: updatedCartList,
    total: newTotal,
  });
};

addEvent("click", "#add-to-cart", addProduct);
