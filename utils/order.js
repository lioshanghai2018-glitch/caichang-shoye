// 订单工具函数
const ORDER_KEY = 'order_list'

export function getOrderList() {
  try {
    const data = uni.getStorageSync(ORDER_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    return []
  }
}

export function saveOrderList(orders) {
  uni.setStorageSync(ORDER_KEY, JSON.stringify(orders))
}

export function addOrder(order) {
  const orders = getOrderList()
  const newOrder = {
    id: order.id || ('ORD' + Date.now()),
    status: order.status || 'pending',
    createdAt: Date.now(),
    paidAt: order.status === '配送中' || order.status === 'shipped' || order.status === 'completed' ? Date.now() : null,
    ...order
  }
  orders.unshift(newOrder)
  saveOrderList(orders)
  return newOrder
}

export function updateOrderStatus(id, status) {
  const orders = getOrderList()
  const index = orders.findIndex(o => o.id === id)
  if (index > -1) {
    orders[index].status = status
    if (status === 'paid') {
      orders[index].paidAt = Date.now()
    }
  }
  saveOrderList(orders)
  return orders
}

export function getOrderById(id) {
  const orders = getOrderList()
  return orders.find(o => o.id === id)
}

// 创建模拟订单数据（用于演示）
export function initMockOrders() {
  const existing = getOrderList()
  if (existing.length > 0) return

  const mockOrders = [
    {
      id: 'ORD20240515001',
      status: 'completed',
      createdAt: Date.now() - 7 * 24 * 3600 * 1000,
      paidAt: Date.now() - 7 * 24 * 3600 * 1000,
      products: [
        { name: '有机西红柿', spec: '约500g/份', currentPrice: '¥8.80', qty: 2, image: '/static/images/有机西红柿.png' },
        { name: '新鲜鸡蛋', spec: '10枚/盒', currentPrice: '¥9.90', qty: 1, image: '/static/images/新鲜鸡蛋.png' }
      ],
      address: { name: '张三', phone: '188****5678', address: '阳光小区', doorNo: '某栋101' },
      deliveryType: 'self',
      deliveryTime: '明日自提 09:00',
      remark: '早点取',
      totalAmount: 27.50,
      deliveryFee: 0,
      discount: 2,
      actualPaid: 25.50
    },
    {
      id: 'ORD20240518001',
      status: 'paid',
      createdAt: Date.now() - 2 * 24 * 3600 * 1000,
      paidAt: Date.now() - 2 * 24 * 3600 * 1000,
      products: [
        { name: '有机青菜', spec: '约300g/份', currentPrice: '¥3.80', qty: 3, image: '/static/images/有机青菜.png' }
      ],
      address: { name: '张三', phone: '188****5678', address: '阳光小区', doorNo: '某栋101' },
      deliveryType: 'delivery',
      deliveryTime: '今日配送 14:00-18:00',
      remark: '',
      totalAmount: 11.40,
      deliveryFee: 2,
      discount: 0,
      actualPaid: 13.40
    },
    {
      id: 'ORD20240523001',
      status: 'shipped',
      createdAt: Date.now() - 1 * 24 * 3600 * 1000,
      paidAt: Date.now() - 1 * 24 * 3600 * 1000,
      products: [
        { name: '胡萝卜', spec: '约400g/份', currentPrice: '¥2.90', qty: 5, image: '/static/images/胡萝卜.png' }
      ],
      address: { name: '张三', phone: '188****5678', address: '阳光小区', doorNo: '某栋101' },
      deliveryType: 'self',
      deliveryTime: '今日自提 09:00',
      remark: '',
      totalAmount: 14.50,
      deliveryFee: 0,
      discount: 1,
      actualPaid: 13.50
    }
  ]

  saveOrderList(mockOrders)
}