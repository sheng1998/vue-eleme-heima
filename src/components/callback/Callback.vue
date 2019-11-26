<template>
  <div>
    <comment-box sort="callback" id=0></comment-box>
  </div>
</template>

<script>
//导入评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  components: {
    "comment-box": comment
  }
};
</script>