import { configureStore } from "@reduxjs/toolkit";
import authenticationSlices from "./authenticationSlices";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import productSlices from "./productSlices";
import waiterSlice from "./waiterSlice";
import State from "types/AuthSliceState";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

const store: ToolkitStore<IStore> = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    auth: authenticationSlices,
    product: productSlices,
    waiter: waiterSlice,
  },
});

interface IStore {
  cart: { cartItems: any; totalQuantity: any; totalAmount: any };
  cartUi: { cartIsVisible: boolean };
  auth: State;
  product: {
    categories: any[];
    category: {};
    sellerCategories: any[];
    isErrorP: boolean;
    isSuccessP: boolean;
    isLoadingP: boolean;
    messageP: string;
    products: any[];
    orders: any[];
    order: {};
    product: {};
    sellerProducts: any[];
    adminDashBoard: {};
    promotions: any[];
  };
  waiter: {
    waiters: any[];
    waiter: {};
    isErrorW: boolean;
    isSuccessW: boolean;
    isLoadingW: boolean;
  };
}

export default store;
