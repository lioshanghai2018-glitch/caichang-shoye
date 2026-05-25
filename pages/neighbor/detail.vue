<template>
  <view class="page">
    <!-- 顶部导航 -->
    <view class="nav-bar">
      <view class="back-btn" @tap="goBack">
        <text class="back-arrow">‹</text>
      </view>
      <text class="nav-title">帖子详情</text>
    </view>

    <!-- 帖子内容 -->
    <view class="post-card">
      <!-- 作者信息 -->
      <view class="author-row">
        <view class="author-avatar">
          <view class="avatar-head"></view>
          <view class="avatar-body"></view>
        </view>
        <view class="author-info">
          <text class="author-name">{{ post.author }}</text>
          <text class="post-time">{{ post.time }}</text>
        </view>
        <view class="follow-btn" v-if="!post.isFollowed" @tap="toggleFollow">
          <text>关注</text>
        </view>
        <view class="followed-btn" v-else @tap="toggleFollow">
          <text>已关注</text>
        </view>
      </view>

      <!-- 标题 -->
      <text class="post-title">{{ post.title }}</text>

      <!-- 内容 -->
      <text class="post-content">{{ post.content }}</text>

      <!-- 图片 -->
      <view class="post-images" v-if="post.images && post.images.length > 0">
        <image class="post-img" v-for="(img, idx) in post.images" :key="idx" :src="img" mode="aspectFill" />
      </view>

      <!-- 标签 -->
      <view class="tag-row">
        <view class="tag" v-for="(tag, idx) in post.tags" :key="idx">
          <text>{{ tag }}</text>
        </view>
      </view>

      <!-- 互动栏 -->
      <view class="action-row">
        <view class="action-item" @tap="toggleLike">
          <view class="iconfont" :class="post.isLiked ? 'icon-dianzan1' : 'icon-dianzan'"></view>
          <text>{{ post.likes }}</text>
        </view>
        <view class="action-item">
          <view class="iconfont icon-pinglun"></view>
          <text>{{ post.comments }}</text>
        </view>
      </view>
    </view>

    <!-- 评论列表 -->
    <view class="comment-section">
      <text class="comment-title">评论 ({{ post.comments }})</text>
      <view class="comment-list">
        <view class="comment-item" v-for="(comment, idx) in comments" :key="idx">
          <view class="comment-avatar"></view>
          <view class="comment-body">
            <text class="comment-author">{{ comment.author }}</text>
            <text class="comment-text">{{ comment.text }}</text>
            <text class="comment-time">{{ comment.time }}</text>
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
      postId: '',
      post: {
        author: '邻居小李',
        time: '2小时前',
        title: '今日新鲜到货',
        content: '今天早上去了趟批发市场，新鲜的蔬菜水果都到货了。有需要的邻居可以下单，明日自提。价格公道，质量有保证，欢迎大家来看看！',
        images: ['/static/images/shucailan.png'],
        tags: ['#邻里互助', '#新鲜蔬菜', '#自提'],
        likes: 12,
        comments: 5,
        isLiked: false,
        isFollowed: false
      },
      comments: [
        { author: '邻居王阿姨', text: '太好了，明天我也想要一些', time: '1小时前' },
        { author: '邻居张大哥', text: '西红柿怎么卖？', time: '45分钟前' },
        { author: '邻居小李', text: '回复邻居张大哥：有机西红柿8.8元一份', time: '30分钟前' },
        { author: '邻居小美', text: '已下单，期待！', time: '10分钟前' },
        { author: '邻居老陈', text: '支持邻里经济！', time: '5分钟前' }
      ]
    }
  },
  onLoad(options) {
    if (options.id) {
      this.postId = options.id
    }
    if (options.title) this.post.title = options.title
    if (options.content) this.post.content = options.content
    if (options.author) this.post.author = options.author
    if (options.time) this.post.time = options.time
    if (options.images) this.post.images = [options.images]
  },
  methods: {
    goBack() { uni.navigateBack() },
    toggleLike() {
      this.post.isLiked = !this.post.isLiked
      this.post.likes += this.post.isLiked ? 1 : -1
    },
    toggleFollow() {
      this.post.isFollowed = !this.post.isFollowed
      uni.showToast({ title: this.post.isFollowed ? '已关注' : '取消关注', icon: 'none' })
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

.post-card { background-color: #FFFFFF; margin: 16rpx 20rpx; border-radius: 16rpx; padding: 24rpx; margin-top: 104rpx; }
.author-row { display: flex; align-items: center; }
.author-avatar { width: 80rpx; height: 80rpx; border-radius: 50%; background-color: #E8F5E9; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.avatar-head { width: 36rpx; height: 36rpx; border: 2rpx solid #B0BEC5; border-radius: 50%; }
.avatar-body { width: 48rpx; height: 24rpx; border: 2rpx solid #B0BEC5; border-top: none; border-radius: 0 0 24rpx 24rpx; margin-top: -4rpx; }
.author-info { flex: 1; margin-left: 16rpx; display: flex; flex-direction: column; }
.author-name { font-size: 28rpx; font-weight: 600; color: #333; }
.post-time { font-size: 22rpx; color: #999; margin-top: 4rpx; }
.follow-btn { border: 2rpx solid #4F9A42; border-radius: 32rpx; padding: 8rpx 24rpx; }
.follow-btn text { font-size: 24rpx; color: #4F9A42; }
.followed-btn { background-color: #E8F5E9; border-radius: 32rpx; padding: 8rpx 24rpx; }
.followed-btn text { font-size: 24rpx; color: #666; }

.post-title { font-size: 32rpx; font-weight: 600; color: #333; display: block; margin-top: 20rpx; }
.post-content { font-size: 28rpx; color: #333; line-height: 1.6; display: block; margin-top: 12rpx; }
.post-images { display: flex; flex-wrap: wrap; gap: 12rpx; margin-top: 16rpx; }
.post-img { width: 200rpx; height: 200rpx; border-radius: 12rpx; }
.tag-row { display: flex; flex-wrap: wrap; gap: 12rpx; margin-top: 16rpx; }
.tag { background-color: #E8F5E9; border-radius: 8rpx; padding: 4rpx 12rpx; }
.tag text { font-size: 22rpx; color: #4F9A42; }
.action-row { display: flex; gap: 48rpx; margin-top: 24rpx; padding-top: 16rpx; border-top: 1rpx solid #F0F0F0; }
.action-item { display: flex; align-items: center; gap: 8rpx; }
.action-item .iconfont { font-size: 36rpx; color: #666; }
.action-item text { font-size: 26rpx; color: #666; }

.comment-section { background-color: #FFFFFF; margin: 16rpx 20rpx; border-radius: 16rpx; padding: 24rpx; }
.comment-title { font-size: 28rpx; font-weight: 600; color: #333; display: block; margin-bottom: 20rpx; }
.comment-list { }
.comment-item { display: flex; margin-bottom: 24rpx; }
.comment-avatar { width: 64rpx; height: 64rpx; border-radius: 50%; background-color: #E8F5E9; flex-shrink: 0; }
.comment-body { flex: 1; margin-left: 16rpx; display: flex; flex-direction: column; }
.comment-author { font-size: 26rpx; font-weight: 600; color: #333; }
.comment-text { font-size: 26rpx; color: #333; margin-top: 6rpx; line-height: 1.4; }
.comment-time { font-size: 20rpx; color: #999; margin-top: 6rpx; }
</style>