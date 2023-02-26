// pages/movie/movie.js

Page({
    data: {
        movie:{},
        isOpen:false,
        comments:'',
    },
    tapthumb(e){
        let urls=[]
        this.data.movie.thumb.forEach(item=>{
            urls.push(item.split("@")[0])
        })
        console.log(e)
        wx.previewImage({
          urls: urls,
          current:urls[e.currentTarget.dataset.index]
        })

    },
    tapIntro(){
        this.setData({
            isOpen:!this.data.isOpen
        })
    },
    onLoad(options) {
        console.log(options)
        let id=options.id
        wx.request({
          url: 'https://api.tedu.cn/detail.php',
          method:'GET',
          data:{
              id
          },
          success:(res)=>{
              console.log(res)
              this.setData({
                movie:res.data
              })
          }
        })
        wx.cloud.init()
        const db = wx.cloud.database()
        db.collection('comments').where({
            'movieid':id
        }).get().then(res=> {
                    console.log(res)
                    this.setData({
                        comments:res.data
                    })
                }
        )
        
    
    },
   
})