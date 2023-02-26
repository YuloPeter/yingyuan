// pages/citylist/citylist.js
const  map=require("../../libs/map");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        maps:'',
        currentLetter:'A'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    tapLetter(e){
        let letter=e.currentTarget.dataset.letter
        console.log(e.currentTarget.dataset.letter)
        this.setData({
            currentLetter:letter
        })
    },
    chooseCity(e){
        let city=e.currentTarget.dataset.city
        getApp().globalData.cityname=city
        wx.navigateBack()
    },
    onLoad(options) {
        this.setData({
            maps:map
        })
        console.log(this.data.maps)
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