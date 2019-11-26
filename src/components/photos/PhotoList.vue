<template>
  <div>
    <mt-navbar style="padding-top:40px;" fixed>
        
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            href="#/home/photolist"
            v-for="item in allCategory"
            :key="item.id"
            @tap="getPhotoListByCateId(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    </mt-navbar>

    <!-- 图片列表区域 -->
    <ul class="photo-list" style="padding-top:50px;">
      <router-link
        v-for="item in list"
        :key="item.id"
        :to="'/home/photoinfo/' + item.img_id"
        tag="li"
      >
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 导入 Toast 弹窗 mintUI 组件
import { Toast } from "mint-ui";
// 导入 mui 的js文件
import mui from "../../lib/mui/dist/js/mui.min.js";

//导入评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      allCategory: [], // 所有分类的列表数组
      list: [] // 图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0); // 默认进入页面，就主动请求 所有图片列表的数据
  },
  mounted() {
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      //获取所有图片分类
      this.$http.get("getimgcategory").then(
        function(result) {
          if (result.body.status === 0) {
            this.allCategory = result.body.message;
            this.allCategory.unshift({ title: "全部", id: 0 });
          } else {
            Toast("获取图片分类失败！");
          }
        },
        function(err) {
          Toast("获取图片分类失败！");
        }
      );
    },
    getPhotoListByCateId(cateId) {
      // 根据 分类Id，获取图片列表
      this.$http.get(`getimages/${cateId}`).then(
        function(result) {
          if (result.body.status === 0) {
            this.list = result.body.message;
          }
        },
        function(err) {
          Toast("获取图片失败！");
        }
      );
    }
  },
  components: {
    "comment-box": comment
  }
};
</script>

<style scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}
.photo-list li {
  background-color: #ccc;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 0 9px #999;
  position: relative;
}
.photo-list li img {
  width: 100%;
  vertical-align: middle;
}
.photo-list li img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photo-list li .info {
  width: 100%;
  color: white;
  text-align: left;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  max-height: 84px;
}
.photo-list li .info .info-title {
  font-size: 14px;
}
.photo-list li .info .info-body {
  font-size: 13px;
}
</style>