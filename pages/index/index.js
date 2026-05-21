Page({
  data: {
    // 倒计时相关
    countdown: '02:59:59',
    countdownBackground: '#F5F5F5',
    countdownColor: '#333333',

    // 顶部品牌区数据
    brandName: '大研菜场',
    brandSubtitle: '新鲜·安心 每一天',
    brandDesc: '源头直采·新鲜到家',
    buttonText: '立即选购',

    // 问候模块数据
    greeting: 'Hi,亲爱的邻居',
    vipLevel: 'V1',

    // 买菜邻里模块
    quickActions: [
      {
        icon: '/pages/index/images/icon_vegetable.png',
        title: '买菜',
        subtitle: '新鲜食材'
      },
      {
        icon: '/pages/index/images/icon_neighbor.png',
        title: '邻里',
        subtitle: '社区互动'
      }
    ],

    // 限时特惠商品数据
    flashSaleProducts: [
      {
        id: 1,
        name: '有机西红柿',
        weight: '500g/份',
        originalPrice: '¥12.8',
        currentPrice: '¥8.8'
      },
      {
        id: 2,
        name: '新鲜鸡蛋',
        weight: '10枚/盒',
        originalPrice: '¥15.0',
        currentPrice: '¥9.9'
      },
      {
        id: 3,
        name: '有机青菜',
        weight: '300g/份',
        originalPrice: '¥6.0',
        currentPrice: '¥3.8'
      },
      {
        id: 4,
        name: '胡萝卜',
        weight: '400g/份',
        originalPrice: '¥5.0',
        currentPrice: '¥2.9'
      }
    ],

    // 团购模块数据
    groupTitle: '新鲜好菜 团购更优惠',
    groupSubtitle: '当日下单·次日自提',
    currentSwiper: 0
  },

  onLoad() {
    this.startCountdown();
  },

  onUnload() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },

  // 倒计时逻辑
  startCountdown() {
    let totalSeconds = 2 * 3600 + 59 * 60 + 59; // 2:59:59

    this.countdownTimer = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const countdownText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        this.setData({
          countdown: countdownText
        });
      } else {
        // 重置倒计时
        totalSeconds = 2 * 3600 + 59 * 60 + 59;
      }
    }, 1000);
  },

  // 轮播图变化
  onSwiperChange(e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  },

  // 添加商品到购物车
  addToCart(e) {
    const productId = e.currentTarget.dataset.id;
    console.log('添加商品到购物车:', productId);
  },

  // 立即选购点击
  onShopNow() {
    console.log('立即选购');
  },

  // 查看更多点击
  onViewMore() {
    console.log('查看更多');
  }
});