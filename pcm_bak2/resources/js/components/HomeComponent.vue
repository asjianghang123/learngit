<template>
  <div>HOME
    <button @click.stop="test">
      aaaaaa
      a
      s
      s

    </button>
    s'd''
    f
    f
    f
    `q
    w
    e
    r
    t
    y
    t
    d

    x`
  </div>
    <!-- <router-view name="homeComponent"></router-view> -->

</template>
<script>
  export default {
    methods: {
      test(){
       this.$router.push({ path: "dashboard" });
      }
    }
  }
</script>