import { createObserver } from "./createObserver";

export const createStore = <T>(initialStore: T) => {
  const { subscribe, notify } = createObserver();

  let state = { ...initialStore };

  const setState = (newState) => {
    state = { ...state, ...newState };
    notify();
  };

  const getState = () => ({ ...state });

  return { getState, setState, subscribe };
};
