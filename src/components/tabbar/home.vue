<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in rotationList" :key="item._id">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 轮播图区域 -->

    <!-- 九宫格中的六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/callback/0">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
    <!-- 九宫格中的六宫格 -->
  </div>
</template>

<script>
// 导入 Toast 弹窗 mintUI 组件
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      rotationList: []
    };
  },
  created() {
    this.getRotation();
  },
  methods: {
    getRotation() {
      this.$http.get("rotation").then(
        function(result) {
          if (result.body.status === 0) {
            this.rotationList = result.body.message;
          } else {
            Toast("加载轮播图失败");
          }
        },
        function(err) {
          Toast("加载轮播图失败");
        }
      );
    }
  }
};
</script>


<style scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item:nth-child(1) {
  background-color: cyan;
}
.mint-swipe-item:nth-child(2) {
  background-color: pink;
}
.mint-swipe-item:nth-child(3) {
  background-color: yellowgreen;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}
.mui-grid-view.mui-grid-9 {
  background-color: white;
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  background-color: white;
  border: none;
}
.mui-grid-view.mui-grid-9 img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.mui-grid-view.mui-grid-9 .mui-media-body {
  font-size: 13px;
}
</style>