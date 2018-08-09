// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Customers from './components/Customers'
import About from './components/About'
import Add from './components/Add'
import Edit from './components/Edit'
import CustomerDetails from './components/CustomerDetails'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.use(Vuetify)
Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter ({
	mode: 'history',
	base: __dirname,
	routes: [
		{path:'/', component: Customers},
		{path:'/about', component: About},
		{path:'/add', component: Add},
		{path:'/customer/:id', component: CustomerDetails},
		{path:'/edit/:id', component: Edit}
	]
})

/* eslint-disable no-new */
new Vue({
  router,
  template: `
  <div id="app">
  	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  	<div class="container">
	  <a class="navbar-brand" href="#">cProjects Do</a>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>
	  <div class="collapse navbar-collapse" id="navbarSupportedContent">
	    <ul class="navbar-nav mr-auto">
	      <li class="nav-item">
	        <router-link class="nav-link" to="/">Home </router-link>
	      </li>
	      <li class="nav-item">
	        <router-link class="nav-link" to="/about">Store </router-link>
	      </li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
        <li><router-link to="/add" class="btn btn-light">Add Task</router-link></li>
      </ul>
	  </div>
	 </div>
	</nav>
  	<router-view></router-view>
  </div>
  `
}).$mount('#app')
