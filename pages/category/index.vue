<template>
	<view class="page">
		<!-- 顶部搜索栏 -->
		<view class="header">
			<view class="search-bar">
				<text class="back-arrow">‹</text>
				<view class="search-input">
					<text class="search-placeholder">搜索商品</text>
				</view>
				<view class="cart-icon-wrap">
					<text class="cart-icon">🛒</text>
					<view class="cart-badge">
						<text>3</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 优惠插图轮播 -->
		<swiper class="promo-swiper" circular="true" @change="onPromoChange">
			<swiper-item>
				<image class="promo-image" src="/static/images/shucailan.png" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item>
				<image class="promo-image" src="/static/images/shucailan.png" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="promo-indicators">
			<view class="indicator" :class="{ active: currentPromo === 0 }"></view>
			<view class="indicator" :class="{ active: currentPromo === 1 }"></view>
		</view>

		<!-- 左右分栏 -->
		<view class="content">
			<!-- 左侧分类栏 -->
			<scroll-view class="category-sidebar" scroll-y="true">
				<view
					class="category-item"
					:class="{ active: currentCategory === index }"
					v-for="(item, index) in categories"
					:key="index"
					@tap="selectCategory(index)"
				>
					<text>{{item.name}}</text>
				</view>
			</scroll-view>

			<!-- 右侧商品列表 -->
			<scroll-view class="product-area" scroll-y="true">
				<view class="product-item" v-for="item in products" :key="item.id">
					<image class="product-img" :src="item.image" mode="aspectFill"></image>
					<view class="product-detail">
						<text class="product-name">{{item.name}}</text>
						<text class="product-desc">{{item.desc}}</text>
						<view class="product-service-tag">
							<text>{{item.service}}</text>
						</view>
						<view class="price-row">
							<text class="original-price">{{item.originalPrice}}</text>
							<text class="current-price">{{item.currentPrice}}</text>
						</view>
						<view class="quantity-control">
							<view class="btn-minus" v-if="item.quantity > 0" @tap="decrease(item)">
								<text>−</text>
							</view>
							<text class="quantity-num" v-if="item.quantity > 0">{{item.quantity}}</text>
							<view class="btn-plus" @tap="increase(item)">
								<text>+</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentCategory: 0,
				currentPromo: 0,
				cartCount: 3,
				categories: [
					{ name: '叶菜类' },
					{ name: '茄果类' },
					{ name: '瓜果类' },
					{ name: '菌菇类' },
					{ name: '根茎类' },
					{ name: '豆制品' },
					{ name: '肉禽蛋' }
				],
				products: [
					{
						id: 1,
						name: '上海青 约500g',
						desc: '新鲜直采·产地直发',
						service: '当日下单·次日自提',
						originalPrice: '¥2.99',
						currentPrice: '¥2.19',
						image: '/static/images/胡萝卜.png',
						quantity: 1
					},
					{
						id: 2,
						name: '西红柿 约500g',
						desc: '自然成熟·酸甜可口',
						service: '当日下单·次日自提',
						originalPrice: '¥3.99',
						currentPrice: '¥2.99',
						image: '/static/images/有机西红柿.png',
						quantity: 0
					},
					{
						id: 3,
						name: '土鸡蛋 10枚',
						desc: '农家散养·营养健康',
						service: '当日下单·次日自提',
						originalPrice: '¥8.90',
						currentPrice: '¥6.90',
						image: '/static/images/新鲜鸡蛋.png',
						quantity: 0
					},
					{
						id: 4,
						name: '红富士苹果 约1kg',
						desc: '脆甜多汁·新鲜采摘',
						service: '当日下单·次日自提',
						originalPrice: '¥6.98',
						currentPrice: '¥4.98',
						image: '/static/images/有机青菜.png',
						quantity: 0
					}
				]
			}
		},
		methods: {
			selectCategory(index) {
				this.currentCategory = index
			},
			onPromoChange(e) {
				this.currentPromo = e.detail.current
			},
			increase(item) {
				item.quantity++
			},
			decrease(item) {
				if (item.quantity > 0) item.quantity--
			}
		}
	}
</script>

<style>
.page {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #FFFFFF;
}

/* 顶部搜索栏 */
.header {
	padding: 16rpx 24rpx;
}

.search-bar {
	display: flex;
	align-items: center;
	height: 80rpx;
}

.back-arrow {
	font-size: 48rpx;
	color: #333333;
	margin-right: 16rpx;
}

.search-input {
	flex: 1;
	height: 80rpx;
	background-color: #F5F5F5;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	padding: 0 24rpx;
}

.search-placeholder {
	font-size: 28rpx;
	color: #999999;
}

.cart-icon-wrap {
	position: relative;
	margin-left: 24rpx;
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.cart-icon {
	font-size: 40rpx;
}

.cart-badge {
	position: absolute;
	top: -8rpx;
	right: -16rpx;
	min-width: 32rpx;
	height: 32rpx;
	background-color: #FF3333;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 8rpx;
}

.cart-badge text {
	color: #FFFFFF;
	font-size: 20rpx;
}

/* 优惠插图轮播 */
.promo-swiper {
	width: 100%;
	height: 300rpx;
	overflow: hidden;
}

.promo-image {
	width: 100%;
	height: 100%;
}

.promo-indicators {
	display: flex;
	justify-content: center;
	margin-top: 12rpx;
}

.indicator {
	width: 12rpx;
	height: 12rpx;
	background-color: #CCCCCC;
	border-radius: 50%;
	margin: 0 8rpx;
}

.indicator.active {
	background-color: #2D5A27;
}

/* 左右分栏 */
.content {
	flex: 1;
	display: flex;
	overflow: hidden;
	padding-top: 24rpx;
}

/* 左侧分类栏 */
.category-sidebar {
	width: 170rpx;
	height: 100%;
	background-color: #F7F7F7;
}

.category-item {
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	font-weight: 400;
	color: #666666;
	position: relative;
	background-color: #F7F7F7;
}

.category-item.active {
	color: #2D5A27;
	font-weight: 600;
	background-color: #FFFFFF;
}

.category-item.active::before {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 6rpx;
	height: 36rpx;
	background-color: #2D5A27;
	border-radius: 3rpx;
}

/* 右侧商品区 */
.product-area {
	flex: 1;
	height: 100%;
	padding: 16rpx 24rpx;
}

.product-item {
	display: flex;
	margin-bottom: 24rpx;
	align-items: flex-start;
}

.product-img {
	width: 180rpx;
	height: 180rpx;
	border-radius: 12rpx;
	background-color: #f5f5f5;
	flex-shrink: 0;
}

.product-detail {
	flex: 1;
	margin-left: 20rpx;
	display: flex;
	flex-direction: column;
	position: relative;
}

.product-name {
	font-size: 28rpx;
	font-weight: 600;
	color: #333333;
	line-height: 40rpx;
}

.product-desc {
	font-size: 22rpx;
	color: #999999;
	margin-top: 6rpx;
}

.product-service-tag {
	display: inline-flex;
	background-color: #E8F5E9;
	border-radius: 4rpx;
	padding: 2rpx 10rpx;
	margin-top: 8rpx;
	align-self: flex-start;
}

.product-service-tag text {
	font-size: 20rpx;
	color: #4CAF50;
}

.price-row {
	display: flex;
	align-items: center;
	margin-top: 12rpx;
}

.original-price {
	font-size: 22rpx;
	color: #999999;
	text-decoration: line-through;
	margin-left: 8rpx;
}

.current-price {
	font-size: 32rpx;
	font-weight: 700;
	color: #4CAF50;
}

.quantity-control {
	display: flex;
	align-items: center;
	position: absolute;
	right: 0;
	bottom: 0;
}

.btn-minus,
.btn-plus {
	width: 44rpx;
	height: 44rpx;
	border-radius: 22rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn-minus {
	border: 2rpx solid #E0E0E0;
	background-color: #FFFFFF;
}

.btn-minus text {
	font-size: 28rpx;
	color: #999999;
}

.btn-plus {
	background-color: #2D5A27;
}

.btn-plus text {
	font-size: 28rpx;
	color: #FFFFFF;
}

.quantity-num {
	font-size: 26rpx;
	color: #333333;
	width: 40rpx;
	text-align: center;
}
</style>