import { useEffect, useState } from 'react'

const State = {};

const AsyncStorage = localStorage

const getState = () => {
  return State;
}

const store = (options) => {
  State[options.key] = {
    key: options.key,
    value: options.default,
    type: options.type,
    subscribers: [],
    get() {
      return this.value;
    },
    set(newValue) {
      this.value = { ...this.value, ...newValue };
      AsyncStorage.setItem(options.key, JSON.stringify(this.value))
      this.subscribers.forEach((s) => s(this.value));
    },
    subscribe(callback) {
      this.subscribers.push(callback);
    },
    unsubscribe(callback) {
      this.subscribers = this.subscribers.filter((s) => s !== callback);
    },
  };
  (() => {
    const value = AsyncStorage.getItem(options.key);
    if (value) {
      State[options.key].set(JSON.parse(value));
    }
  })();
}

export function useStore(key, options) {
  if (!key) { throw Error('Missing key argument'); }
  if (!State[key]) {
    store(Object.assign(options || {}, { key: key }));
  }
  const state = State[key];
  const [, setBridgeValue] = useState(state.get());

  useEffect(() => {
    const subscription = (updatedValue) => {
      setBridgeValue(updatedValue);
    };
    state.subscribe(subscription);
    return () => {
      state.unsubscribe(subscription);
    };
  }, [state]);

  return [
    state.get(),
    (newValue) => {
      state.set(newValue);
    },
  ];
}
