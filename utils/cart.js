// 购物车工具函数
const CART_KEY = 'cartItems'

export function getCartItems() {
  try {
    const data = uni.getStorageSync(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    return []
  }
}

export function saveCartItems(items) {
  uni.setStorageSync(CART_KEY, JSON.stringify(items))
}

export function addToCart(product) {
  const cart = getCartItems()
  const existingIndex = cart.findIndex(item => item.id === product.id)
  if (existingIndex > -1) {
    cart[existingIndex].quantity += product.quantity || 1
  } else {
    cart.push({ ...product, quantity: product.quantity || 1 })
  }
  saveCartItems(cart)
  return cart
}

export function updateCartItem(id, quantity) {
  const cart = getCartItems()
  const index = cart.findIndex(item => item.id === id)
  if (index > -1) {
    if (quantity <= 0) {
      cart.splice(index, 1)
    } else {
      cart[index].quantity = quantity
    }
  }
  saveCartItems(cart)
  return cart
}

export function removeFromCart(id) {
  const cart = getCartItems().filter(item => item.id !== id)
  saveCartItems(cart)
  return cart
}

export function clearCart() {
  uni.removeStorageSync(CART_KEY)
}