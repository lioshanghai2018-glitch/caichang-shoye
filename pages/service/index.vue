<template>
  <view class="page">
    <!-- 顶部导航 -->
    <view class="nav-bar">
      <view class="back-btn" @tap="goBack">
        <text class="back-arrow">‹</text>
      </view>
      <text class="nav-title">客服中心</text>
    </view>

    <!-- 联系客服 -->
    <view class="card">
      <view class="service-header">
        <text class="service-title">联系我们</text>
        <text class="service-subtitle">随时为您服务</text>
      </view>
      <view class="service-btns">
        <view class="service-btn" @tap="makePhoneCall">
          <view class="iconfont icon-dianhua service-icon"></view>
          <text class="btn-text">拨打电话</text>
        </view>
        <view class="service-btn" @tap="goOnlineService">
          <view class="iconfont icon-kefuzhongxin service-icon"></view>
          <text class="btn-text">在线客服</text>
        </view>
      </view>
      <view class="service-time">
        <text class="time-label">服务时间</text>
        <text class="time-value">周一至周日 08:00-22:00</text>
      </view>
    </view>

    <!-- 常见问题 -->
    <view class="card">
      <text class="card-title">常见问题</text>
      <view class="faq-list">
        <view class="faq-item" v-for="(item, index) in faqList" :key="index">
          <view class="faq-question" @tap="toggleFaq(index)">
            <text class="faq-q-text">{{ item.question }}</text>
            <view class="faq-arrow" :class="{ open: item.expanded }">›</view>
          </view>
          <view class="faq-answer" v-if="item.expanded">
            <text>{{ item.answer }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      faqList: [
        { question: '如何修改收货地址？', answer: '进入"我的-收货地址"页面，点击右上角"新增地址"即可添加，或点击已有地址进行编辑修改。', expanded: false },
        { question: '如何申请退款？', answer: '订单未发货前，可在订单详情页申请退款；如已发货，请联系客服处理。退款会在1-3个工作日内退回原支付账户。', expanded: false },
        { question: '自提点和配送范围？', answer: '目前支持阳光小区、四季花城、幸福里、锦绣花园、金地名郡等小区自提，配送范围以页面显示为准。', expanded: false },
        { question: '如何成为会员？', answer: '购物即可自动成为会员，累计成长值可升级会员等级，享受更多专属优惠。', expanded: false },
        { question: '优惠券如何使用？', answer: '结算时选择可用优惠券，系统会自动抵扣。每笔订单仅限使用一张优惠券。', expanded: false },
        { question: '订单如何查看？', answer: '进入"订单"页面可查看当前订单和历史订单，点击订单卡片可查看详情。', expanded: false }
      ]
    }
  },
  methods: {
    goBack() { uni.navigateBack() },
    makePhoneCall() {
      uni.makePhoneCall({ phoneNumber: '400-800-1234', fail: () => uni.showToast({ title: '客服功能开发中', icon: 'none' }) })
    },
    goOnlineService() {
      uni.showToast({ title: '在线客服开发中', icon: 'none' })
    },
    toggleFaq(index) {
      this.faqList[index].expanded = !this.faqList[index].expanded
    }
  }
}
</script>

<style>
.page { min-height: 100vh; background-color: #F5F1EB; padding-bottom: 40rpx; }
.nav-bar { display: flex; align-items: center; height: 88rpx; background-color: #FFFFFF; padding: 0 24rpx; position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
.back-btn { width: 56rpx; height: 56rpx; display: flex; align-items: center; justify-content: center; }
.back-arrow { font-size: 44rpx; color: #333; font-weight: 300; }
.nav-title { flex: 1; font-size: 32rpx; font-weight: 600; color: #333; text-align: center; }

.card { background-color: #FFFFFF; margin: 16rpx 20rpx; border-radius: 16rpx; padding: 24rpx; }

.service-header { text-align: center; margin-bottom: 32rpx; }
.service-title { font-size: 32rpx; font-weight: 600; color: #333; display: block; }
.service-subtitle { font-size: 24rpx; color: #999; margin-top: 8rpx; display: block; }

.service-btns { display: flex; justify-content: center; gap: 48rpx; margin-bottom: 32rpx; }
.service-btn { display: flex; flex-direction: column; align-items: center; }
.service-icon { font-size: 64rpx; color: #4F9A42; }
.btn-text { font-size: 26rpx; color: #333; margin-top: 12rpx; }

.service-time { display: flex; justify-content: center; align-items: center; padding-top: 16rpx; border-top: 1rpx solid #F0F0F0; }
.time-label { font-size: 24rpx; color: #999; }
.time-value { font-size: 24rpx; color: #333; margin-left: 12rpx; }

.card-title { font-size: 28rpx; font-weight: 600; color: #333; display: block; margin-bottom: 16rpx; }
.faq-list { }
.faq-item { border-bottom: 1rpx solid #F0F0F0; }
.faq-item:last-child { border-bottom: none; }
.faq-question { display: flex; justify-content: space-between; align-items: center; padding: 20rpx 0; }
.faq-q-text { font-size: 26rpx; color: #333; flex: 1; }
.faq-arrow { font-size: 32rpx; color: #CCC; transition: transform 0.2s; }
.faq-arrow.open { transform: rotate(90deg); }
.faq-answer { padding: 0 0 20rpx 0; }
.faq-answer text { font-size: 24rpx; color: #666; line-height: 1.6; }
</style>