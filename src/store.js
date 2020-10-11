/* eslint-disable prettier/prettier */
/**
 * @arbo77
 */

import { useEffect, useState } from 'react'

const State = {}

const AsyncStorage = window.localStorage

const store = (options) => {
  State[options.key] = {
    key: options.key,
    value: options.default,
    type: options.type,
    subscribers: [],
    get() {
      return {
        ...this.value,
        clear: () => {
          this.set(null)
          AsyncStorage.removeItem(this.key)
        }
      }
    },
    set(newValue) {
      if (newValue !== null) {
        this.value = { ...this.value, ...newValue }
        AsyncStorage.setItem(options.key, JSON.stringify(this.value))
      } else {
        this.value = newValue
      }
      this.subscribers.forEach((s) => s(this.value))
    },
    subscribe(callback) {
      this.subscribers.push(callback)
    },
    unsubscribe(callback) {
      this.subscribers = this.subscribers.filter((s) => s !== callback)
    }
  }
    ; (() => {
      const value = AsyncStorage.getItem(options.key)
      if (value) {
        State[options.key].set(JSON.parse(value))
      }
    })()
}

export function useStore(key, options) {
  if (!key) {
    throw Error('Missing key argument')
  }
  if (!State[key]) {
    store(Object.assign(options || {}, { key: key }))
  }
  const state = State[key]
  const [, setBridgeValue] = useState(state.get())

  useEffect(() => {
    const subscription = (updatedValue) => {
      setBridgeValue(updatedValue)
    }
    state.subscribe(subscription)
    return () => {
      state.unsubscribe(subscription)
    }
  }, [state])

  return [
    state.get(),
    (newValue) => {
      return new Promise((resolve, reject) => {
        state.set(newValue)
        resolve(state.get())
      })
    }
  ]
}

export function purgeStore() {
  for(const s in State) {
    State[s].get().clear()
  }
}