<template>
  <div id="app">
    <!-- Menu -->
    <div class="menu">

      <!-- Search -->
      <div class="menu_search">
        <form action="#" id="menu_search_form" class="menu_search_form">
          <input type="text" class="search_input" placeholder="Search Item" required="required">
          <button class="menu_search_button"><img src="/images/search.png" alt=""></button>
        </form>
      </div>
      <!-- Navigation -->
      <div class="menu_nav">
        <ul>
          <li><a href="#">Women</a></li>
          <li><a href="#">Men</a></li>
          <li><a href="#">Kids</a></li>
          <li><a href="#">Home Deco</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <!-- Contact Info -->
      <div class="menu_contact">
        <div class="menu_phone d-flex flex-row align-items-center justify-content-start">
          <div><div><img src="/images/phone.svg" alt="https://www.flaticon.com/authors/freepik"></div></div>
          <div>+1 912-252-7350</div>
        </div>
        <div class="menu_social">
          <ul class="menu_social_list d-flex flex-row align-items-start justify-content-start">
            <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
            <li><a href="#"><i class="fa fa-youtube-play" aria-hidden="true"></i></a></li>
            <li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
            <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
          </ul>
        </div>
      </div>
    </div>

    <header class="header">
      <div class="header_overlay"></div>
      <div class="header_content d-flex flex-row align-items-center justify-content-start">
        <div @click="currentPage=''" class="logo">
          <router-link :to="'/'">
            <div class="d-flex flex-row align-items-center justify-content-start">
              <div><img src="/images/logo_1.png" alt=""></div>
              <div>Little Shop</div>
            </div>
          </router-link>	
        </div>
        <div class="hamburger"><i class="fa fa-bars" aria-hidden="true"></i></div>
        <nav class="main_nav">
          <ul class="d-flex flex-row align-items-start justify-content-start">
            <li @click="currentPage=value" v-for="(value, key) in pages" :key="key" :class="currentPage==value ? 'active' : ''">
              <router-link :to="'/'+value">{{key}}</router-link>
            </li>
          </ul>
        </nav>
        <div class="header_right d-flex flex-row align-items-center justify-content-start ml-auto">
          <!-- Search -->
          <div class="header_search">
            <form @submit.prevent="searchProd">
              <input @keyup.enter="searchProd" v-model="search" type="text" class="search_input" placeholder="Search Item" required="required">
              <button class="header_search_button"><img src="/images/search.png" alt=""></button>
            </form>
          </div>
          <!-- User -->
          <div class="user"><a href="#"><div><img src="/images/user.svg" alt="https://www.flaticon.com/authors/freepik"></div></a></div>
          <!-- Cart -->
          <div @click="currentPage='cart'" class="cart"><router-link :to="'/cart'">
			  <div>
				  <img class="svg" src="/images/cart.svg" alt="https://www.flaticon.com/authors/freepik">
				  <div id="cartNum">{{store.length}}</div>
				</div>
			</router-link></div>
          <!-- Phone -->
          <div class="header_phone d-flex flex-row align-items-center justify-content-start">
            <div><div><img src="/images/phone.svg" alt="https://www.flaticon.com/authors/freepik"></div></div>
            <div>+1 912-252-7350</div>
          </div>
        </div>
      </div>
    </header>

<div class="super_container_inner">
		<div class="super_overlay"></div>

		<!-- Home -->

		<div class="home" style="height:200px!important">
			<div class="home_container d-flex flex-column align-items-center justify-content-end">
				<div class="home_content text-center">
					<div id="home_title" class="home_title">{{currentPage ? currentPage[0].toUpperCase() + currentPage.slice(1) : 'Home'}}</div>
				</div>
			</div>
		</div>

    <router-view/>

    <!-- Footer -->
		<footer class="footer">
			<div class="footer_content">
				<div class="container">
					<div class="row">
						
						<!-- About -->
						<div class="col-lg-4 footer_col">
							<div class="footer_about">
								<div class="footer_logo">
									<a href="#">
										<div class="d-flex flex-row align-items-center justify-content-start">
											<div class="footer_logo_icon"><img src="/images/logo_2.png" alt=""></div>
											<div>Little Closet</div>
										</div>
									</a>		
								</div>
								<div class="footer_about_text">
									<p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Fusce venenatis vel velit vel euismod.</p>
								</div>
							</div>
						</div>

						<!-- Footer Links -->
						<div class="col-lg-4 footer_col">
							<div class="footer_menu">
								<div class="footer_title">Support</div>
								<ul class="footer_list">
									<li>
										<a href="#"><div>Customer Service<div class="footer_tag_1">online now</div></div></a>
									</li>
									<li>
										<a href="#"><div>Return Policy</div></a>
									</li>
									<li>
										<a href="#"><div>Size Guide<div class="footer_tag_2">recommended</div></div></a>
									</li>
									<li>
										<a href="#"><div>Terms and Conditions</div></a>
									</li>
									<li>
										<a href="#"><div>Contact</div></a>
									</li>
								</ul>
							</div>
						</div>

						<!-- Footer Contact -->
						<div class="col-lg-4 footer_col">
							<div class="footer_contact">
								<div class="footer_title">Stay in Touch</div>
								<div class="newsletter">
									<form action="#" id="newsletter_form" class="newsletter_form">
										<input type="email" class="newsletter_input" placeholder="Subscribe to our Newsletter" required="required">
										<button class="newsletter_button">+</button>
									</form>
								</div>
								<div class="footer_social">
									<div class="footer_title">Social</div>
									<ul class="footer_social_list d-flex flex-row align-items-start justify-content-start">
										<li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
										<li><a href="#"><i class="fa fa-youtube-play" aria-hidden="true"></i></a></li>
										<li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
										<li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="footer_bar">
				<div class="container">
					<div class="row">
						<div class="col">
							<div class="footer_bar_content d-flex flex-md-row flex-column align-items-center justify-content-start">
								<div class="copyright order-md-1 order-2"><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy; 2020 All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></div>
								<nav class="footer_nav ml-md-auto order-md-2 order-1">
									<ul class="d-flex flex-row align-items-center justify-content-start">
										<li><a href="category.html">Women</a></li>
										<li><a href="category.html">Men</a></li>
										<li><a href="category.html">Kids</a></li>
										<li><a href="category.html">Home Deco</a></li>
										<li><a href="#">Contact</a></li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
  </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			pages: {
				'Trang chủ': '',
				'Liên hệ': 'contact',
				'Giới thiệu': 'about',
				'Giỏ hàng': 'cart'
			},
			currentPage: '',
			search: ''
		}
	},
	created: function() {
		this.getCurrentPage();
	},
	updated: function () {
		this.getCurrentPage();
	},
	methods: {
		getCurrentPage() {
			var url = new URL(window.location).pathname;
			this.currentPage = url.split("/")[1];
		},
		searchProd() {
			if (!this.search) return;
			
			this.$http.get(`${this.baseUrl}/mobile?search=${this.search}`)
			.then(res => {
				console.log(res);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
}
</script>
