import { atom, map } from 'nanostores'

export const isCartOpen = atom(false)

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} name
 * @property {string} imageSrc
 * @property {number} quantity
 */

/** @type {import('nanostores').MapStore<Record<string, CartItem>>} */
export const cartItems = map({})

export function addCartItem({ id, name, imageSrc }) {
  const existingEntry = cartItems.get()[id]
  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    })
  } else {
    cartItems.setKey(id, { id, name, imageSrc, quantity: 1 })
  }
}
