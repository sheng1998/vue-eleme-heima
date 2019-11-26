<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch ref="myswitch" v-model="item.selection" @change="selectedChanged(i,item.id)"></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{ item.title }}</h1>
            </div>
          </div>

          <div style="float:right; padding:2px 18px 15px 0;">
            <span class="price">￥{{ item.sell_price }}</span>
            <numbox @getcount="getSelectedCount" :value="item.Num" :goodsId="item.id"></numbox>
            <a href="#" @click.prevent="remove(item.id, i)">删除</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red"></span> 件， 总价
              <span class="red">￥</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: [] // 购物车中所有商品的数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 获取购物车商品列表
      this.$http.get("goods/getshopcarlist").then(function(result) {
        if (result.body.status === 0) {
          this.goodslist = result.body.message;
          for (let i = 0; i < this.goodslist.length; i++) {
            if (this.goodslist[i].selection === 0) {
              this.goodslist[i].selection = false;
            } else {
              this.goodslist[i].selection = true;
            }
          }
        }
      });
    },
    remove(id, index) {
      // 删除购物车商品
      this.$http.get("goods/removegoods/" + id).then(function(result) {
        if (result.body.status === 0) {
          this.goodslist.splice(index, 1);
        }
      });
    },
    selectedChanged(i, id) {
      //改变商品选中状态
      var val = 1;
      if (this.$refs.myswitch[i].value) {
        val = 0;
      }
      this.$http.get("goods/goodschange/" + id + "?selection=" + val).then();
    },
    getSelectedCount(count, id) {
      // 修改购物车商品数量
      this.$http.get("goods/goodschange/" + id + "?Num=" + count).then();
    }
  },
  components: {
    numbox: numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h1 {
        margin-left: 15px;
      }
    }
    .price {
      color: red;
      font-weight: bold;
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
