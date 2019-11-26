<template>
  <div>
    <cmtbox sort="goods" :id="$route.params.id"></cmtbox>
  </div>
</template>

<script>
import cmtbox from "../subcomponents/comment.vue";

export default {
  components: {
    cmtbox
  }
};
</script>
