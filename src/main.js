import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.mixin({
  data() {
      return {
          baseUrl: 'http://192.168.2.30:88/api',
          store: '',
      }
  },
  methods: {
		addCart(item) {
			let { store } = this;
			for (let i=0; i<store.length; i++) {
				if (item.id===store[i].id) {
					store[i]['quantity'] ++;
					localStorage.setItem("cart", JSON.stringify(store));
					return;
				}
			}
			item['quantity'] = 1;
			store.push(item);
			localStorage.setItem("cart", JSON.stringify(store));
		}
	},
  created() {
    this.store = JSON.parse(localStorage.getItem("cart"));
    if (!this.store) this.store = [];
  },
  watch: {
    store() {
      document.getElementById("cartNum").innerHTML = this.store.length;
    }
  }
})

router.beforeEach((to, from, next) => {
  if (!document.getElementById("home_title")) {
    next();
  } else {
    document.getElementById("home_title").innerHTML = `${to.meta.title}`;
    next();
  } 
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
