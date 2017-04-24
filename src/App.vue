<template>
  <div id="app">
    <v-header></v-header>
    <div class="content">
      <content-header
        :width="viewWidth"
        :height="viewHeight"
      >  
      </content-header>
      <div></div>
      <footer>
        <span class="circle"></span>

      </footer>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import contentHeader from 'components/content-header/content-header';
import header from 'components/header/header';

export default {
  data () {
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;

    return {
      viewWidth: width - 0.04 * width,
      viewHeight: height - 0.04 * height
    };
  },
  watch: {
    // watch document.documentElement.clientWidth && clientHeight
    viewWidth (val) {
      this.viewWidth = val;
    },
    viewHeight (val) {
      this.viewHeight = val;
    }
  },
  mounted () {
      const that = this;
      // watch viewSize
      window.onresize = () => {
          return (() => {
              let width = document.documentElement.clientWidth;
              let height = document.documentElement.clientHeight;

              that.viewWidth = Math.floor(width - 0.04 * width);
              that.viewHeight = Math.floor(height - 0.04 * height);
          })();
      };
  },
  components: {
    'v-header': header,
    'content-header': contentHeader
  }
};
</script>

<style lang="stylus" >
  #app
    padding: 2%
    .content
      display: relative
      width: 100%
      margin: 0 auto
      border-radius: 10px
      background: #fff
      overflow: hidden
      footer
        display: fixed
        width: 100%
        height: 96px
        bottom: 0
        left: 0
        border-radius: 0 0 10px 10px

</style>
