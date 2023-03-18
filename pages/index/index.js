// const request = require('../../utils/request')
import promiseRequest from '../../utils/request'
// promiseRequest(url, data, method=get)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    recommendList:[],
    rankList:[],
  },

  async getBannerList(){
    let res = await promiseRequest('/banner',{type: 1})
    // console.log(res);
    if(res.code == 200){
      this.setData({
        bannerList: res.banners
      })
    }
  },

  async getRecommendList(){
    let res = await promiseRequest('/personalized',{limit: 10})
    // console.log(res);
    if(res.code == 200){
      this.setData({
        recommendList: res.result
      })
    }
  },

  // 用promise.all同时发送5个请求
  promiseConcurrent (){
    let promiseArray = this.createPromiseList()
    Promise.all(promiseArray).then(res=>{
      let rankList = []
      res.forEach(item=>{
        let rankListObj = {
          id: item.playlist.id,
          name: item.playlist.name,
          musicList: item.playlist.tracks.splice(0,3)
        }
        rankList.push(rankListObj)
      })
      this.setData({
        rankList: rankList
      })
    }).catch(err=>{
      console.log(err);
    })

  },

  // 创建5个promise
  createPromiseList(){
    let promiseList = []
    for (let index = 0; index < 5; index++) {
     let promise =  promiseRequest('/top/list',{idx: index})
     promiseList.push(promise)
    }
    return promiseList
  },

  // async getRankList(){
  //     for (let i = 0; i < 5; i++) {
  //       let {playlist} = await promiseRequest('/top/list',{idx: i})
  //     // console.log(playlist);
  //     // console.log(playlist.name);
  //     // console.log(playlist.tracks);
  //       let rankListObj = {
  //         name: playlist.name,
  //         tracks: playlist.tracks.splice(0, 3)
  //       }
  //       this.setData({
  //         rankList: [...this.data.rankList, rankListObj]
  //       })
  //     }
  // },

  // // 生成numberCount个minNumber到maxNumber的随机数
  //  createRandomNumber(numberCount, minNumber, maxNumber){
  //   for (let i = 0; i < numberCount; i++) {
  //     let idx = Math.floor(Math.random()*(maxNumber-minNumber+1)+minNumber)
  //     for(let j=0;j<this.data.idxArray.length;j++){
  //       if(this.data.idxArray[j]==idx){
  //           this.data.idxArray.splice(j,1);
  //           i--;
  //       }
  //   }
  //   this.data.idxArray.push(idx);
  //   }
  // },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Promise.all([this.getBannerList(), this.getRecommendList(), this.promiseConcurrent()]).then(res=>{

    }).catch(err=>{
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})