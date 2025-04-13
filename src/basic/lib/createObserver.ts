export const createObserver = () => {
  const listeners = new Set();
  const subscribe = (fn) => listeners.add(fn);
  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  return { subscribe, notify };
};
