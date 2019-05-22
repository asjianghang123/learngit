window.Vue = require('vue');
window.VueRouter = require('vue-router');

Vue.use( VueRouter );

// import homeComponent from './components/HomeComponent.vue';
// import _1 from './components/tab/tabs/_1.vue';
// import VG from './components/VGComponent';
import login from './components/Login.vue';
import layout from './components/layout/Layout.vue';
// import index from './components/view/index/Index.vue';

export default new VueRouter({
  // mode: 'history',
  routes: [{ 
      path: '/',
      // name: 'home',
      components: {
          //
          login
      },
      hidden: true
    },
    { 
      path: '/login',
      // name: 'home',
      components: {
          //
          login
      },
      hidden: true
    },
    {
      path: '/dashboard',
      redirect: '/dashboard/index'
    },
    {
      path: '/dashboard/:tab',
      // path: '/dashboard',
      components: {layout},
      meta: {
        // role: ['admin'],
        // icon: 'user',
        title: '布局管理'
      },
      children: [{ 
        path: '', 
        components: {
          // homeComponent,
            // _1
            // index
        } 
      }]
      // redirect: '/dashboard',
      // children: [{
      //   path: '/dashboard',
      //   components: {layout},
      // }]
    }/*,{
      path: '/VG',
      name: 'VG',
      components: {
        VG: VG
      }
    }*/
   /* {
      path: '*',
      // redirect: '/home',
      components: {
          //
          homeComponent
      },
      hidden: true
    }*/
  ],
  scrollBehavior: () => ({
    y: 0
  }),
});