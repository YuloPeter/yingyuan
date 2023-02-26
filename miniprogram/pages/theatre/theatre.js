// pages/theatre/theatre.js
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie:[],
        nowLocation:''
    },
    onMovie(e){
        console.log(e)
        let index=e.currentTarget.dataset.num
        let t=this.data.movie[index]
        console.log(t)
        wx.openLocation({
          latitude: t.location.lat,
          longitude: t.location.lng,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'XZUBZ-T6VL4-OL4UD-XLU4N-VYUO7-MKBEY'
        });
        wx.getStorage({
            key: 'test',
        }).then(res=>{
        console.log('获取缓存成功')
        this.setData({
            nowLocation:res.data
        })
        })
        qqmapsdk.search({
            keyword: '影院',
            success:(res) =>{
                console.log(res);
                res.data.forEach(item=>{
                    item._distance=(item._distance/1000).toFixed(2)
                })
                this.setData({
                    movie:res.data
                })
            },
        }) 
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