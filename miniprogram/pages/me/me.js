// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
        avatarUrl:'',
        nickName:'点击登录'
    },
    islogin:false
  },
  tapavatar(){
    if(this.data.islogin){
        wx.chooseMedia({
            count:1,
            mediaType:['image'],
            sizeType:['compressed']
            ,success:(res)=>{
                console.log('选择头像图片',res)
                let path=res.tempFiles[0].tempFilePath
                let userInfo=this.data.userInfo
                userInfo.avatarUrl=path
                this.setData({
                    userInfo
                })
                this.upload(path)
            }
        })
    }
  },
  upload(path){
    let hz=path.split('.')[1]
    let cpath=Math.random()+'_'+Date.now()+"."+hz
    wx.cloud.uploadFile({
        filePath:path,
        cloudPath:cpath,
        success:(res)=>{
            console.log('上传成功'+res)
            let fileID=res.fileID
            this.updateUseravatar(fileID)
        }
    })
  },
  updateUseravatar(fileID){
    wx.cloud.init()
    const db=wx.cloud.database()
    let id= this.data.userInfo._id
    db.collection('users').doc(id).update({
        data:{
            avatarUrl:fileID
        },
        success:(res)=>{
            wx.showToast({
              title: '头像修改成功',
              icon:'success'
            })
        }
    })
  },
  tapLogin(){
      if(this.data.islogin){
          return
      }
    wx.getUserProfile({
      desc: '获取微信用户信息',
      success:(res)=>{
          console.log('获取成功',res)
        this.setData({
            userInfo:res.userInfo,
            islogin:true
        })
        this.queryUserState()
      },
      fail:(err)=>{
          console.log('获取失败',err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  queryUserState(){
        wx.cloud.init()
        const db = wx.cloud.database()
        db.collection('users').get().then(res=> {
                    console.log(res)
                    if(res.data.length==0){
                        this.regist()
                    }else{
                        let userInfo=res.data[0]
                        this.setData({
                            userInfo
                        })
                    }
                }
        )
  },
  regist(){
        wx.cloud.init()
        const db = wx.cloud.database()
        db.collection('users').add({
            data:this.data.userInfo
        }).then(res=>{
            console.log(用户名,res)
        })
        
  },
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