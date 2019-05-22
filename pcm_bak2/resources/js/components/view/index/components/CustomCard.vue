<template>
  <div class="customCard">
    <div class="smallCard">
      <slot name="header"></slot>
      <!-- <slot name="style" v-bind:test="test"></slot> -->
    </div>
    <div class="bigCard">
      
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // test: '123'
      }
    },
    methods: {
    }
  }
</script>
<style>
  .customCard {
    padding: 0 30px 0 0;
  }
  .customCard .smallCard {
    background: #cbe4f0;
    border: aliceblue;
    width: 30%;
    height: 35px;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    line-height: 35px;
    /*border-top-left-radius: 5px;
    border-top-right-radius: 5px;*/
  }
  .customCard .bigCard {
    background: white;
    border: aliceblue;
    width: 100%;
    height: 135px;
    border-radius: 5px;
  }
</style>