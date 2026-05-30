// 邻里社区 API
const baseURL = 'https://fc-mp-ae9bd108-da40-4ae6-923b-c3007dedec12.next.bspapp.com/merchant-api'

const request = (method, params = {}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseURL}/${method}`,
      method: 'POST',
      data: { method, params },
      success: (res) => {
        if (res.data && res.data.code === 0) {
          resolve(res.data)
        } else {
          reject(res.data || { error: '请求失败' })
        }
      },
      fail: (err) => reject(err)
    })
  })
}

// 分类配置
export const CATEGORIES = [
  { index: 0, name: '全部', apiValue: '' },
  { index: 1, name: '邻里互助', apiValue: 1 },
  { index: 2, name: '手艺服务', apiValue: 2 },
  { index: 3, name: '相约同行', apiValue: 3 },
  { index: 4, name: '相亲交友', apiValue: 4 },
  { index: 5, name: '二手闲置', apiValue: 5 }
]

// ==================== 帖子相关 ====================

// 获取帖子列表
export const getPostList = (params = {}) => {
  return request('getPosts', params)
}

// 获取帖子详情
export const getPostDetail = (params) => {
  return request('getPostDetail', params)
}

// 发布帖子
export const createPost = (postData) => {
  return request('createPost', postData)
}

// 编辑帖子
export const updatePost = (postId, data) => {
  return request('updatePost', { id: postId, ...data })
}

// 删除帖子
export const deletePost = (postId) => {
  return request('deletePost', { id: postId })
}

// 上架/下架帖子
export const togglePostStatus = (postId, status) => {
  return request('togglePostStatus', { id: postId, status })
}

// 获取我的发布
export const getMyPosts = (params = {}) => {
  return request('getMyPosts', params)
}

// ==================== 互动相关 ====================

// 点赞/取消点赞
export const toggleLike = (postId, userId) => {
  return request('toggleLike', { postId, userId })
}

// 关注/取消关注
export const toggleFollow = (targetUserId, userId) => {
  return request('toggleFollow', { targetUserId, userId })
}

// ==================== 评论相关 ====================

// 获取评论列表
export const getComments = (postId, page = 1, pageSize = 20) => {
  return request('getComments', { postId, page, pageSize })
}

// 发表评论
export const createComment = (postId, userId, content, authorName) => {
  return request('createComment', { postId, userId, content, authorName })
}

// ==================== 认证相关 ====================

// 获取认证状态
export const getCertStatus = (userId) => {
  return request('getCertStatus', { userId })
}

// 提交认证申请
export const submitCert = (certData) => {
  return request('submitCert', certData)
}

// 检查是否已认证（可用于发帖前检查）
export const checkCert = (userId) => {
  return request('checkCert', { userId })
}

// ==================== 本地认证状态管理 ====================

// 获取本地认证状态
export const getLocalCertStatus = () => {
  return uni.getStorageSync('cert_status') || 'none'
}

// 保存本地认证状态
export const saveLocalCertStatus = (status, data = {}) => {
  uni.setStorageSync('cert_status', status)
  if (data.idCardUrl) uni.setStorageSync('cert_id_card', data.idCardUrl)
  if (data.billUrl) uni.setStorageSync('cert_bill', data.billUrl)
  if (data.communityName) uni.setStorageSync('cert_community', data.communityName)
  if (data.submitTime) uni.setStorageSync('cert_submit_time', data.submitTime)
  if (data.rejectReason) uni.setStorageSync('cert_reject_reason', data.rejectReason)
}

// 检查是否可以发帖
export const canPublish = () => {
  const status = getLocalCertStatus()
  return status === 'certified'
}

// ==================== 辅助函数 ====================

export const formatRelativeTime = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const now = new Date()
  const diff = now - date
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
  if (diff < 604800000) return Math.floor(diff / 86400000) + '天前'
  return date.toLocaleDateString()
}

// 验证手机号
export const validatePhone = (phone) => {
  return /^1\d{10}$/.test(phone)
}