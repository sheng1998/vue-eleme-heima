<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->
    <mt-header style="z-index:9999;" fixed title="固定在顶部">
      <div slot="left" @click="back">
        <mt-button id="back_button" icon="back" v-show="flag">返回</mt-button>
      </div>
    </mt-header>
    <!-- 顶部 Header 区域 -->

    <!-- 中间路由区域 -->
    <transition>
      <router-view></router-view>
    </transition>
    <!-- 中间路由区域 -->

    <!-- 底部导航栏 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-llb" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/car">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" ref="goods_number">{{ goods_number }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
    <!-- 底部导航栏 -->
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      flag: true,
      goods_number: 0
    };
  },
  created() {
    this.hasback();
  },
  methods: {
    hasback() {
      if (
        this.$route.path === "/home" ||
        this.$route.path === "/home/" ||
        this.$route.path === "/car" ||
        this.$route.path === "/car/" ||
        this.$route.path === "/search" ||
        this.$route.path === "/search/" ||
        this.$route.path === "/member" ||
        this.$route.path === "/member/"
      ) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    back() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function() {
      this.hasback();
    }
  }
};
</script>


<style scoped>
.app-container {
  padding: 40px 0 50px 0;
  overflow-x: hidden;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

/* 该类名，解决 tabbar 点击无法切换的问题 */
.mui-bar-tab .mui-tab-item-llb.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

