// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    movieList:[],
    cid:1,
    pageOn:1,
    city:''
  },
  topTocity(){
    wx.navigateTo({
      url: '../citylist/citylist',
    })
  },
  getLocation(){
    var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
    var qqmapsdk = new QQMapWX({
        key: 'XZUBZ-T6VL4-OL4UD-XLU4N-VYUO7-MKBEY'
    })
    qqmapsdk.reverseGeocoder({
        location:'',
        success:(res)=>{
            console.log(res.result)
            this.setData({
                city:res.result.address_component.city
            })
            wx.setStorage({ data: this.data.city, key: 'test', })
        }
    })
  },
    
    
  onPullDownRefresh(){
    let id=this.data.cid
    this.loadData(id).then(res=>{
        console.log(res)
        this.setData({
            movieList:res
        })
        wx.setStorage({
            key:id,
            data:res
        })
        wx.stopPullDownRefresh()
    })
  },
  
  tapNav(e){
      console.log(e)
      let id = e.target.dataset.id;
    //   
    if(id == this.data.cid){
        return;
    }
      this.setData({
          cid:id,
          pageOn:1//切换选项卡时，把pageon重置为1
      })
    //   先拿着id去缓存中找一圈，如果有数据，直接加载
    // 缓存中没有数据，发送请求获取当前选项卡下面的第一页数据，缓存下来
      wx.getStorage({
          key:id+'',
          success:(res)=>{
              console.log('111111111'+res)
              this.setData({
                movieList:res.data  
              })
          },
          fail:(err)=>{
            //   发送请求，获取当前选项卡下面的第一页电影数据
            this.loadData(id,0).then(res=>{
                console.log(res)
                this.setData({
                    movieList:res
                })
                //把res存到storage，把当前类别下的第一页数据缓存下来
                wx.setStorage({
                    key:id+'',
                    data:res
                })
            })
          }
      })


    
  },
  /**加载电影数据列表
   * cid 查询电影列表时传递的类别id
   * offset 分页加载时，读取记录的起始位置
   * 将以promise方式返回查到的结果
   */
  loadData(cid,offset){
      console.log('cid'+cid,'offset'+offset)
      return new Promise((resolve,reject)=>{
        wx.request({
            url: 'https://api.tedu.cn/index.php',
            method:'GET',
            data:{
                cid:cid,
                offset:offset
            },
            success:(res)=>{
            //    响应成功后，回调resolve,把电影列表交给loadData的调用者
            resolve(res.data)
            }
          })
      })
    
  },
  onLoad() {
    //   发送请求，打印数据
    this.getLocation()
    this.loadData(1,0).then(res=>{
        console.log(res)
        this.setData({
            movieList:res
        })
    })
    
  },
  onReachBottom(){
    //   发送请求加载下一页
    console.log('下一页')
    this.data.pageOn++;
    let cid = this.data.cid;
    let offset = (this.data.pageOn-1)*20;
    this.loadData(cid,offset).then(res=>{
        this.setData({
            movieList:[...this.data.movieList,...res]
        })
    })
  },
  onShow(){
      let city=getApp().globalData.cityname
      this.setData({
          city
      })
  }
})
