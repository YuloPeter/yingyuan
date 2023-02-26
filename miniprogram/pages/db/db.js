// pages/db/db.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    tapadd(){
        wx.cloud.init()
        const db=wx.cloud.database()
        
        db.collection('teacher').add({
            data:{
                "uname":'mary',
                "age":88,
                "married":false,
                "hobby":['学习','开车']
            },
            success:(res)=>{
                console.log(res)
            }
        })
    },
    tapsearch(){
        wx.cloud.init()
        const db = wx.cloud.database()
// 2. 构造查询语句
// collection 方法获取一个集合的引用
// where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
// get 方法会触发网络请求，往数据库取数据
db.collection('book').where({
  publishInfo: {
    country: 'United States'
  }
}).get({
  success: function(res) {
  // 输出 [{ "title": "The Catcher in the Rye", ... }]
  console.log(res)
 }
})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})