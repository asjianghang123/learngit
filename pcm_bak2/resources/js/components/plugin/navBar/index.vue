<template>
 <div class="wrap">
   <ul id="nav">
      <li>加入购物车</li>
      <li>加入收藏
        <ul>
          <li>123</li>
        </ul>
      </li>
      <li>立即购买</li>
   </ul>
 </div>
</template>

<style>
  /* body {
       padding:0;
       margin:0;
   }*/
   #nav {
       width:100%;
       height:60px;
       background-image: -webkit-linear-gradient(0deg, #128bc1, #0eb093);
       color:#fff;
       line-height:60px;
       text-align:center;
       padding:0;
       margin:0;
       list-style:none;
   }
   #nav li {
       float:left;
       width:20%;
       height:60px;
   }
   .fix {
       position:fixed;
       top:0;
       left:0;
   }
</style>