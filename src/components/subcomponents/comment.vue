<template>
  <div class="cmt-container">
    <h1>发表评论</h1>
    <hr />
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" required v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item._id">
        <div
          class="cmt-title"
        >第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
      </div>
    </div>
    <mt-button ref="myButton" type="danger" size="large" plain @click="getMore" v-text="more"></mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      more: "加载更多",
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      Number: 0,
      msg: "" //评论输入
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get(`getcomments/${this.sort}/${this.id}?pageindex=${this.pageIndex}`)
        .then(
          function(result) {
            if (result.body.status === 0) {
              this.comments = this.comments.concat(result.body.message);
              this.Number = result.body.Number;
            } else {
              Toast("获取评论信息失败！");
            }
          },
          function(err) {
            Toast("获取评论信息失败！");
          }
        );
    },
    getMore() {
      // 加载更多
      if (this.Number === this.comments.length) {
        this.more = "已经加载所有评论";
        return Toast("已经加载所有评论");
      }
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不可以为空！");
      }
      this.$http
        .post(`postcomment/${this.sort}/${this.id}`, {
          content: this.msg.trim()
        })
        .then(
          function(result) {
            if (result.body.status === 0) {
              // 1. 拼接出一个评论对象
              var cmt = {
                user_name: "匿名用户",
                add_time: Date.now(),
                content: this.msg.trim()
              };
              this.comments.unshift(cmt);
              this.msg = "";
              Toast("评论发表成功！");
            }
          },
          function(err) {
            Toast("评论内容上传失败！");
          }
        );
    }
  },
  props: ["sort", "id"]
};
</script>


<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
