<template>
    <div>
        <div class="product">
			<div class="container">
				<div class="row">
					
					<!-- Product Image -->
					<div class="col-lg-6">
						<div class="product_image_slider_container">
							<div id="slider" class="flexslider">
								<ul class="slides">
									<li>
										<img :src="product.pictureTitle" />
									</li>
								</ul>
							</div>
							<div class="carousel_container"></div>
						</div>
					</div>

					<!-- Product Info -->
					<div class="col-lg-6 product_col">
						<div class="product_info">
							<div class="product_name">{{product.name}}</div>
							<div class="product_category">In <a href="category.html">{{product.producer.name}}</a></div>
							<div class="product_rating_container d-flex flex-row align-items-center justify-content-start">
								
							</div>
							<div class="product_price">{{product.versions[0] ? product.versions[0].price : '6900000'}}<span>vnd</span></div>
							<div class="product_size">
								<div class="product_size_title">Chọn Màu</div>
								<ul class="d-flex flex-row align-items-start justify-content-start">
									<li v-for="(item, index) in product.versions" :key="index">
										<input type="radio" :id="'radio_'+item.color" name="product_radio" class="regular_radio">
										<label @click="product['color']=item.color" :for="'radio_'+item.color">{{item.color[0].toUpperCase() + item.color.slice(1)}}</label>
									</li>
								</ul>
							</div>
							<div class="product_text">
								<p>{{product.display}}</p>
							</div>
							<div class="product_buttons">
								<div class="text-right d-flex flex-row align-items-start justify-content-start">
									<div class="product_button product_fav text-center d-flex flex-column align-items-center justify-content-center">
										<div><div><img src="/images/heart_2.svg" class="svg" alt=""><div>+</div></div></div>
									</div>
									<div @click="addCart(product)" class="product_button product_cart text-center d-flex flex-column align-items-center justify-content-center">
										<div><div><img src="/images/cart.svg" class="svg" alt=""><div>+</div></div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<style scoped>
.product {
    background: #FFFFFF;
    padding-top: 99px;
    padding-bottom: 31px;
}
.product_name {
    font-size: 30px;
    line-height: 1.2;
    color: #4a4a4a;
    font-weight: 500;
    margin-top: 1px;
	max-width: none;
}
.product_category, .product_category a {
    font-size: 18px;
    color: #969696;
    font-style: italic;
    font-weight: 400;
}
.product_category a:hover {
    color: #2fce98;
}
.product_price {
    font-size: 61.32px;
    color: #4a4a4a;
    font-weight: 500;
    margin-top: 37px;
    line-height: 0.75;
}
.product_size_title {
    font-size: 18px;
    font-weight: 700;
    color: #4a4a4a;
}
.regular_radio:checked + label {
    color: #2fce98;
    border-color: #2fce98;
}
.product_size ul {
    margin-top: 22px;
}
.product_size_title {
    font-size: 18px;
    font-weight: 700;
    color: #4a4a4a;
}
.regular_radio + label {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    width: 36px;
    height: 36px;
    background: transparent;
    border: solid 2px #4a4a4a;
    color: #4a4a4a;
    cursor: pointer;
    margin-right: 14px;
    font-weight: 700;
	padding: 20px;
}
.regular_radio {
    display: none;
}
.product_size {
    margin-top: 43px;
}
.product_buttons {
    width: 100%;
    height: 57px;
    margin-top: 49px;
}
</style>

<script>
export default {
	data() {
		return {
			product: {
				name: '',
				producer: {
					name: ''
				},
				versions: [
					{
						price: ''
					}
				]
			}
		}
	},
	created: function() {
		this.$http.get(`${this.baseUrl}/electronic/${this.$route.params.id}`)
		.then(res => {
			this.product = res.data;
		})
		.catch(function (error) {
			console.log(error);
		});
	},
}
</script>