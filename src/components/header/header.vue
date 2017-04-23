<template>
  <div class="header">
    <span>
      <i class="iconfont icon-suofang"></i>
    </span>
    <span>
      {{ time }}
    </span>
    <span>
      <i class="iconfont icon-iconfontnaoling"></i>
    </span>
  </div>
</template>

<script>

export default {
  props: {
    time: {
      type: String,
      default: '日事清'
    }
  },
  created () {
    console.log(this.getToday);
  },
  computed: {
    getToday () {
      this.$store.commit('GET_TODAY');
      return this.$store.state.today;
    }
  }
};
</script>

<style lang="stylus" >
 .header
   display: flex
   margin-bottom: 10px
   justify-content: space-between
   color: #fff
   font-size: 18px
</style>
