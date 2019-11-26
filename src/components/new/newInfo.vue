<template>
  <div>
    <div class="newsinfo-container">
      <!-- 大标题 -->
      <h3 class="title">{{ newinfo.title }}</h3>
      <!-- 子标题 -->
      <p class="subtitle">
        <span>发表时间：{{ newinfo.add_time | dateFormat }}</span>
        <span>点击：{{ newinfo.click }}次</span>
      </p>

      <hr />

      <!-- 内容区域 -->
      <div class="content" v-html="newinfo.content"></div>

      <!-- 评论子组件区域 -->
      <comment-box sort="news" :id="this.id"></comment-box>
    </div>
  </div>
</template>

<script>
// 导入 Toast 弹窗 mintUI 组件
import { Toast } from "mint-ui";

//导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      newinfo: {} // 新闻对象
    };
  },
  created() {
    this.getNewInfo();
  },
  methods: {
    getNewInfo() {
      this.$http.get("getnew/" + this.id).then(
        function(result) {
          if (result.body.status === 0) {
            this.newinfo = result.body.message[0];
          } else {
            Toast("获取新闻详情失败！");
          }
        },
        function(err) {
          Toast("获取新闻详情失败！");
        }
      );
    }
  },
  components:{
    'comment-box':comment
  }
};
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>