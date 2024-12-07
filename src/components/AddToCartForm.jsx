import { addCartItem, isCartOpen } from '../cartStore'

export default function AddToCartForm({ children }) {
  // we'll hardcode the item info for simplicity!
  const hardcodedItemInfo = {
    id: 'astronaut-figurine',
    name: 'Astronaut Figurine',
    imageSrc: '/images/astronaut-figurine.png',
  }

  function addToCart(e) {
    e.preventDefault()
    isCartOpen.set(true)
    addCartItem(hardcodedItemInfo)
  }

  return <form onSubmit={addToCart}>{children}</form>
}
