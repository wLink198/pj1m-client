<template>
  <div>
    <div class="products">
			<div class="container">
				<div class="row products_bar_row">
					<div class="col">
						<div class="products_bar d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-lg-start justify-content-center">
							<div class="products_bar_links">
								<ul class="d-flex flex-row align-items-start justify-content-start">
									<li @click="currentCate=item" v-for="(item, index) in categories" :key="index" :class="currentCate==item ? 'active' : ''">
										<router-link :to="''">{{item}}</router-link>
									</li>
								</ul>
							</div>
							<div class="products_bar_side d-flex flex-row align-items-center justify-content-start ml-lg-auto">
								<div class="products_dropdown product_dropdown_sorting">
									<div class="isotope_sorting_text"><span>Default Sorting</span><i class="fa fa-caret-down" aria-hidden="true"></i></div>
									<ul>
										<li class="item_sorting_btn" data-isotope-option='{ "sortBy": "original-order" }'>Default</li>
										<li class="item_sorting_btn" data-isotope-option='{ "sortBy": "price" }'>Price</li>
										<li class="item_sorting_btn" data-isotope-option='{ "sortBy": "name" }'>Name</li>
									</ul>
								</div>
								<div class="product_view d-flex flex-row align-items-center justify-content-start">
									<div class="view_item active"><img src="images/view_1.png" alt=""></div>
									<div class="view_item"><img src="images/view_2.png" alt=""></div>
									<div class="view_item"><img src="images/view_3.png" alt=""></div>
								</div>
								<div class="products_dropdown text-right product_dropdown_filter">
									<div class="isotope_filter_text"><span>Filter</span><i class="fa fa-caret-down" aria-hidden="true"></i></div>
									<ul>
										<li class="item_filter_btn" data-filter="*">All</li>
										<li class="item_filter_btn" data-filter=".hot">Hot</li>
										<li class="item_filter_btn" data-filter=".new">New</li>
										<li class="item_filter_btn" data-filter=".sale">Sale</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row products_row products_container grid">
					
					<!-- Product -->
					<div v-for="(item, index) in products" v-bind:key="index" class="col-xl-4 col-md-6 grid-item new">
						<div class="product">
							<router-link :to="'/product/'+item.code">
								<div class="product_image"><img :src="item.pictureTitle" alt=""></div>
							</router-link>				
							<div class="product_content">
								<div class="product_info d-flex flex-row align-items-start justify-content-start">
									<div>
										<div>
											<div class="product_name"><a href="product.html">{{item.name}}</a></div>
										</div>
									</div>
									<div class="ml-auto text-right">
										<div class="product_price text-right">{{item.versions[0] ? item.versions[0].price : ''}}<span>vnd</span></div>
									</div>
								</div>
								<div class="product_buttons">
									<div class="text-right d-flex flex-row align-items-start justify-content-start">
										<div class="product_button product_fav text-center d-flex flex-column align-items-center justify-content-center">
											<div><div><img src="images/heart_2.svg" class="svg" alt=""><div>+</div></div></div>
										</div>
										<div @click="addCart(item)" class="product_button product_cart text-center d-flex flex-column align-items-center justify-content-center">
											<div><div><img src="images/cart.svg" class="svg" alt=""><div>+</div></div></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row page_nav_row">
					<div class="col">
						<div class="page_nav">
							<ul class="d-flex flex-row align-items-start justify-content-center">
								<li v-if="page > 1"><a v-on:click="page=page-1" href="javascript:void(0)">&lt;</a></li>
								<li v-bind:class="{'active' : page==n}" v-for="n in totalPages" v-bind:key="n">
									<a v-on:click="page=n" href="javascript:void(0)">{{n}}</a>
								</li>
								<li v-if="page < totalPages"><a v-on:click="page=page+1" href="javascript:void(0)">&gt;</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<style scoped>
	.product_image{
      position: relative;
      width: 100%;
      padding-bottom: 100%;
    }

    .product_image img {
      position: absolute;
      left: 0;
      top: 0;
      width : 100%;
      height: 100%;
    }
</style>

<script>
import '../assets/styles/category.css';
import '../assets/styles/category_responsive.css';

export default {
	data() {
		return {
			products: [],
			categories: [],
			currentCate: '',
			page: 1,
			totalPages: 2,
			totalItems: '',
		}
	},
	created: function() {
		this.$http.get(`${this.baseUrl}/producer?page=1`)
		.then(res => {
			let arr = [];

			function capitalize(string) {
				return string[0].toUpperCase() + string.slice(1);
			}

			for (let i=0; i<6; i++) {
				arr.push(capitalize(res.data.data[i].name))
			}
			
			this.currentCate = arr[0];
			this.categories = arr;
		})
		.then(() => {
			this.$http.get(`${this.baseUrl}/mobile/${this.categories[0]}?page=1&pageItem=9`)
			.then(res => {
				this.page = res.data.paging.page;
				this.totalPages = res.data.paging.totalPages;
				this.totalItems = res.data.paging.totalItems;
				this.products = res.data.data;
			})
		})
		.catch(function (error) {
			console.log(error);
		});
	},
	watch: {
		page: function() {
			this.$http.get(`${this.baseUrl}/mobile/${this.currentCate}?page=${this.page}&pageItem=9`)
			.then(res => {
				this.products = res.data.data;
			})
		},
		currentCate: function() {
			this.$http.get(`${this.baseUrl}/mobile/${this.currentCate}?page=1&pageItem=9`)
			.then(res => {
				this.page = res.data.paging.page;
				this.totalPages = res.data.paging.totalPages;
				this.totalItems = res.data.paging.totalItems;
				this.products = res.data.data;
			})
		}
	},
}
</script>
