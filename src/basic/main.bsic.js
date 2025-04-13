import { CartList } from "./components/cart/CartList";
import { ProductSelector } from "./components/cart/ProductSelector";
import { SoldOutList } from "./components/cart/SoldOutList";
import { TotalPrice } from "./components/cart/TotalPrice";
import { Header } from "./components/common/Header";
import { globalStore } from "./store/globalStore";
import { registerGlobalEvents } from "./utils/eventUtils";

function main() {
  const root = document.getElementById("app");

  root.innerHTML = `
    <div class="bg-gray-100 p-8">
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
            ${Header()}
            ${CartList()}
            ${TotalPrice()}
            ${ProductSelector()}
            ${SoldOutList()}
        </div>
    </div>
    `;

  registerGlobalEvents();
}

main();
globalStore.subscribe(main);
