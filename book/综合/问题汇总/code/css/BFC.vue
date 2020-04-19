<!-- 理解BFC -->
<template>
  <div class="bfc-wrap full-page fui-transitions">
    <f-close :close-type="'header'"></f-close>
    <!-- 规则1: BFC内部元素一次排列，内部相邻元素margin会重叠，子元素与包含它的元素左边界相接 -->
    <section class="bfc-rules-wrap">
      <h3>1. 内部的元素会在垂直方向上一个接一个放置</h3>
      <article class="bfc-rules-1">
        <div class="inner-1 item">1</div>
        <div class="inner-2 item">2</div>
        <div class="inner-3-bfc">
          <div class="inner-3 item">3:父元素overflow:hidden创建BFC</div>
        </div>
      </article>
    </section>
    <!-- BFC子元素不会超出包含他的元素，positon为absolute的子元素可以
        问题：对inner-1设置position:absolute，并没有超出父元素的边界?
     -->
    <section class="bfc-rules-wrap">
      <h3>2. 内部的元素不会超出BFC </h3>
      <article class="bfc-rules-2">
        <div class="inner-1 item">1. float + absolute</div>
        <div class="inner-2 item">2. float</div>
        <div class="inner-3 item">3. float</div>
      </article>
    </section>

    <!-- BFC元素不会与float元素重叠 -->
    <section class="bfc-rules-wrap">
      <h3>3.1 BFC元素不会与float元素重叠</h3>
      <article class="bfc-rules-3">
        <div class="inner-float">float:left</div>
        <div class="inner-bfc">创建BFCdisplay: table-caption;</div>
      </article>

      <h3>3.2 非BFC元素的情况</h3>
      <article class="bfc-rules-3">
        <div class="inner-float">float:left</div>
        <div class="inner-bfc-no">非BFC</div>
      </article>
    </section>

    <section class="bfc-rules">
      <h3>计算高度时，浮动子元素也参与计算</h3>
      <article class="bfc-rules-4">
        <div class="float"></div>
      </article>
    </section>
  </div>
</template>

<script lang="ts">
export default {

}
</script>
<style lang='scss' scoped>
.bfc-wrap{
  .bfc-rules-1{
    width: 400px;
    background-color: #e2e2e2;
     /* display 创建BFC的属性：
      inline-block
      table-cell、table-caption（table也能设置成BFC因为table会默认生成一个匿名的table-cell）
      flex、inline-flex
      grid、inline-grid
    */
    display: inline-block;
    .item{
      width: 100px;
      height: 100px;
      margin: 10px 0; // BFC元素内部的元素 margin会重叠
    }
    .inner-1{background-color: rgb(133, 54, 54)}
    .inner-2{background-color: rgb(187, 148, 148)}
    .inner-3{background-color: rgb(82, 168, 33)}
    .inner-3-bfc{
      /*overflow不为visible,就能创建BFC*/
      overflow: hidden;
    }
  }


  .bfc-rules-2{
    width: 400px;
    background-color: #e2e2e2;
    margin-left: 30px;
    // display: table;
    /*
      column-count: 不为auto;
      column-width: 不为auto
      colunm-span: all
    */
    // column-count: 1;
    display: inline-block;
     .item{
      width: 100px;
      height: 100px;
      margin: 10px 0;
    }
    .inner-1{
      background-color: rgb(204, 202, 228);
      float: left;
       position: absolute;
      }
    .inner-2{
      background-color: rgb(187, 148, 148);
      width: 120px;
      float: left;
      }
    .inner-3{
      background-color: rgb(82, 168, 33);
      float: left;
    }
  }

  .bfc-rules-3{
    width: 400px;
    background-color: #e2e2e2;
    .inner-float{
      width: 100px;
      height: 100px;
      background-color: rgb(187, 148, 148);
      float:left;
    }
    .inner-bfc{
      background-color: rgb(204, 202, 228);
      width: 200px;
      height: 120px;
      display: table-caption;
    }
    .inner-bfc-no{
      background-color: rgb(204, 202, 228);
      width: 200px;
      height: 120px;
    }
  }



  .bfc-rules-4{
    display: inline-block;
    // overflow: hidden;
    // position: absolute;
    // display: table-caption;
    // column-count: 1;
    // column-span: all;
    // column-width: 200px;
    .float{
      width: 100px;
      height: 100px;
      float: left;
      background-color: #333;
    }
  }
}
</style>
