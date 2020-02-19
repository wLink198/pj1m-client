<template>
    <div class="cart_section">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="cart_container">
                        
                        <!-- Cart Bar -->
                        <div class="cart_bar">
                            <ul class="cart_bar_list item_list d-flex flex-row align-items-center justify-content-end">
                                <li class="mr-auto">Product</li>
                                <li>Color</li>
                                <li>Size</li>
                                <li>Price</li>
                                <li>Quantity</li>
                                <li>Total</li>
                                <li>Remove</li>
                            </ul>
                        </div>

                        <!-- Cart Items -->
                        <div class="cart_items">
                            <ul class="cart_items_list">

                                <!-- Cart Item -->
                                <li v-for="(item, index) in store" :key="index" class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-lg-end justify-content-start">
                                    <div class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start mr-auto">
                                        <div><div class="product_number">{{index+1}}</div></div>
                                        <div><div class="product_image"><img :src="item.pictureTitle" alt=""></div></div>
                                        <div class="product_name_container">
                                            <div class="product_name"><a href="product.html">{{item.name}}</a></div>
                                            <div class="product_text">{{item.producer.name}}</div>
                                        </div>
                                    </div>
                                    <div class="product_color product_text"><span>Color: </span>{{item.color ? item.color : 'Optional'}}</div>
                                    <div class="product_size product_text"><span>Size: </span>Default</div>
                                    <div style="margin-top:0" class="product_price product_text"><span>Price: </span>{{item.versions[0].price}}</div>
                                    <div class="product_quantity_container">
                                        <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                                            <span class="product_text product_num">{{item.quantity}}</span>
                                            <div @click="minusQuantity(item)" class="qty_sub qty_button trans_200 text-center"><span>-</span></div>
                                            <div @click="addQuantity(item)" class="qty_add qty_button trans_200 text-center"><span>+</span></div>
                                        </div>
                                    </div>
                                    <div class="product_total product_text"><span>Total: </span>{{item.versions[0].price*item.quantity}}</div>
                                    <div @click="store.splice(index, 1)" class="text-center"><a href="javascript:void(0)">X</a></div>
                                </li>
                            </ul>
                        </div>

                        <!-- Cart Buttons -->
                        <div class="cart_buttons d-flex flex-row align-items-start justify-content-start">
                            <div class="cart_buttons_inner ml-sm-auto d-flex flex-row align-items-start justify-content-start flex-wrap">
                                <div v-if="store.length>0" @click="clearCart" class="button button_clear trans_200"><a href="javascript:void(0)">clear cart</a></div>
                                <div class="button button_continue trans_200"><a href="/">continue shopping</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row cart_extra_row">
                <div class="col-lg-6">
                    <div class="cart_extra cart_extra_1">
                        <div class="cart_extra_content cart_extra_coupon">
                            <div class="cart_extra_title">Coupon code</div>
                            <div class="coupon_form_container">
                                <form action="#" id="coupon_form" class="coupon_form">
                                    <input type="text" class="coupon_input" required="required">
                                    <button class="coupon_button">apply</button>
                                </form>
                            </div>
                            <div class="coupon_text">Phasellus sit amet nunc eros. Sed nec congue tellus. Aenean nulla nisl, volutpat blandit lorem ut.</div>
                            <div class="shipping">
                                <div class="cart_extra_title">Shipping Method</div>
                                <ul>
                                    <li class="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label class="radio_container">
                                            <input type="radio" id="radio_1" name="shipping_radio" class="shipping_radio">
                                            <span class="radio_mark"></span>
                                            <span class="radio_text">Next day delivery</span>
                                        </label>
                                        <div class="shipping_price ml-auto">$4.99</div>
                                    </li>
                                    <li class="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label class="radio_container">
                                            <input type="radio" id="radio_2" name="shipping_radio" class="shipping_radio">
                                            <span class="radio_mark"></span>
                                            <span class="radio_text">Standard delivery</span>
                                        </label>
                                        <div class="shipping_price ml-auto">$1.99</div>
                                    </li>
                                    <li class="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label class="radio_container">
                                            <input type="radio" id="radio_3" name="shipping_radio" class="shipping_radio" checked>
                                            <span class="radio_mark"></span>
                                            <span class="radio_text">Personal Pickup</span>
                                        </label>
                                        <div class="shipping_price ml-auto">Free</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 cart_extra_col">
                    <div class="cart_extra cart_extra_2">
                        <div class="cart_extra_content cart_extra_total">
                            <div class="cart_extra_title">Cart Total</div>
                            <ul class="cart_extra_total_list">
                                <li class="d-flex flex-row align-items-center justify-content-start">
                                    <div class="cart_extra_total_title">Subtotal</div>
                                    <div class="cart_extra_total_value ml-auto">{{total}} vnd</div>
                                </li>
                                <li class="d-flex flex-row align-items-center justify-content-start">
                                    <div class="cart_extra_total_title">Shipping</div>
                                    <div class="cart_extra_total_value ml-auto">Free</div>
                                </li>
                                <li class="d-flex flex-row align-items-center justify-content-start">
                                    <div class="cart_extra_total_title">Total</div>
                                    <div class="cart_extra_total_value ml-auto">{{total}} vnd</div>
                                </li>
                            </ul>
                            <div class="checkout_button trans_200"><router-link  :to="'/checkout'">proceed to checkout</router-link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/styles/cart.css';
import '../assets/styles/cart_responsive.css';

export default {
    data() {
        return {
            total: 0
        }
    },
    created() {
        this.getTotal();       
    },
    methods: {
        clearCart() {
            this.store = [];
            localStorage.setItem("cart", JSON.stringify(this.store));
        },
        minusQuantity(item) {
            let { store } = this;
            if (item.quantity > 1) {
                item.quantity--;
                for (let i=0; i<store.length; i++) {
                    if (item.id===store[i].id) {
                        store[i]['quantity'] = item.quantity;
                        localStorage.setItem("cart", JSON.stringify(store));
                        this.getTotal();
                        return;
                    }
                }
            } else {
                item.quantity = 1;
            }        
        },
        addQuantity(item) {
            let { store } = this;
            item.quantity++;
            for (let i=0; i<store.length; i++) {
                if (item.id===store[i].id) {
                    store[i]['quantity'] = item.quantity;
                    localStorage.setItem("cart", JSON.stringify(store));
                    this.getTotal();
                    return;
                }
            }
        },
        getTotal() {
            this.total = 0;
            this.store.map(item => this.total += (item.quantity*item.versions[0].price));
        }
    },
    watch: {
        store() {
            localStorage.setItem("cart", JSON.stringify(this.store));
        }
    }
}
</script>