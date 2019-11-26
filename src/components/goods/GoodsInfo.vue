<template>
  <div class="goodsinfo-container">
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in rotationList" :key="item.src">
              <img :src="item.src" alt />
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            商品货号：
            <br />
            {{ goodsinfo.goods_no }}
          </p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// 导入 数字选择框 组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data , 方便后期调用
      rotationList: [], // 轮播图的数据
      goodsinfo: {}, // 获取到的商品的信息
      selectedCount: 1 // 保存用户选中的商品数量， 默认，认为用户买1个
    };
  },
  created() {
    this.getRotation();
    this.getGoodsInfo();
  },
  methods: {
    getRotation() {
      this.$http.get("getthumimages/" + this.id).then(function(result) {
        if (result.body.status === 0) {
          this.rotationList = result.body.message;
        } else {
          Toast("加载轮播图失败");
        }
      });
    },
    getGoodsInfo() {
      // 获取商品的信息
      this.$http.get("goods/getinfo/" + this.id).then(function(result) {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 点击跳转到 评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {// 添加到购物车
      this.$http.get('goods/addtoshopcar/' + this.id + "?Num=" + this.selectedCount).then(function(result) {
          if (result.body.status === 0) {
            Toast("成功添加到购物车！");
          } else {
            Toast("添加到购物车失败！");
          }
        },
        function(err) {
          Toast("添加到购物车失败！");
        })
    },
    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.selectedCount = count;
      // console.log(this.selectedCount)
    }
  },
  components: {
    numbox: numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .mint-swipe {
    height: 200px;
    .mint-swipe-item {
      &:nth-child(1) {
        background-color: cyan;
      }
      &:nth-child(2) {
        background-color: pink;
      }
      &:nth-child(3) {
        background-color: yellowgreen;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  // .ball {
  //   width: 15px;
  //   height: 15px;
  //   border-radius: 50%;
  //   background-color: red;
  //   position: absolute;
  //   z-index: 99;
  //   top: 390px;
  //   left: 146px;
  // }
}
</style>
