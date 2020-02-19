<template>
    <div class="checkout">
        <div class="container">
            <div class="row">
                
                <!-- Billing -->
                <div class="col-lg-6">
                    <div class="billing">
                        <div v-if="errors.length>0" class="alert alert-danger" role="alert">
                            <p style="color:red" v-for="(item, index) in errors" :key="index">{{item}}</p>
                        </div>
                        <div class="checkout_title">Billing</div>
                        <div class="checkout_form_container">
                            <form id="formCheckout" class="checkout_form">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <!-- Name -->
                                        <input v-model="info.firstname" type="text" class="checkout_input" placeholder="First Name" required>
                                    </div>
                                    <div class="col-lg-6">
                                        <!-- Last Name -->
                                        <input v-model="info.lastname" type="text" class="checkout_input" placeholder="Last Name" required="required">
                                    </div>
                                </div>
                                <div>
                                    <!-- Address -->
                                    <input v-model="info.address" type="text" class="checkout_input" placeholder="Address" required="required">
                                </div>
                                <div>
                                    <!-- City -->
                                    <select v-model="info.provinceId" class="dropdown_item_select checkout_input" require="required">
                                        <option value="0" disabled>Province / City</option>
                                        <option v-for="(item, index) in listProvince" :key="index" :value="item.id">{{item.name}}</option>
                                    </select>
                                </div>
                                <div v-if="listDistrict.length>0">
                                    <!-- District -->
                                    <select v-model="info.districtId" class="dropdown_item_select checkout_input" require="required">
                                        <option value="0" disabled>District</option>
                                        <option v-for="(item, index) in listDistrict" :key="index" :value="item.id">{{item.name}}</option>
                                    </select>
                                </div>
                                <div v-if="listWard.length>0">
                                    <!-- Ward -->
                                    <select v-model="info.wardId" class="dropdown_item_select checkout_input" require="required">
                                        <option value="0" disabled>Ward</option>
                                        <option v-for="(item, index) in listWard" :key="index" :value="item.id">{{item.name}}</option>
                                    </select>
                                </div>
                                <div>
                                    <!-- Phone no -->
                                    <input v-model="info.phone" type="phone" class="checkout_input" placeholder="Phone No." required="required">
                                </div>
                                <div>
                                    <!-- Email -->
                                    <input v-model="info.email" type="email" class="checkout_input" placeholder="Email" required="required">
                                </div>
                                <div class="checkout_button trans_200"><a @click="submitCheckout" href="javascript:;">place order</a></div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Cart Total -->
                <div class="col-lg-6 cart_col">
                    <div class="cart_total">
                        <div class="cart_extra_content cart_extra_total">
                            <div class="checkout_title">Cart Total</div>
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
                            <div class="payment_options">
                                <div class="checkout_title">Payment</div>
                                <ul>
                                    <li class="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label @click="info.typePay='Paypal'" class="radio_container">
                                            <input type="radio" id="radio_1" name="payment_radio" class="payment_radio">
                                            <span class="radio_mark"></span>
                                            <span class="radio_text">Paypal</span>
                                        </label>
                                    </li>
                                    <li class="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label @click="info.typePay='Cash on Delivery'" class="radio_container">
                                            <input type="radio" id="radio_2" name="payment_radio" class="payment_radio">
                                            <span class="radio_mark"></span>
                                            <span class="radio_text">Cash on Delivery</span>
                                        </label>
                                    </li>
                                    <li class="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label @click="info.typePay='Credit Card'" class="radio_container">
                                            <input type="radio" id="radio_3" name="payment_radio" class="payment_radio" checked>
                                            <span class="radio_mark"></span>
                                            <span class="radio_text">Credit Card</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/styles/checkout.css';
import '../assets/styles/checkout_responsive.css';

export default {
    data() {
        return {
            total: 0,
            info: {
                firstname: '',
                lastname: '',
                address: '',
                phone: '',
                email: '',
                provinceId: '0',
                districtId: '0',
                wardId: '0',
                typePay: 'Credit Card'
            },
            listProvince: [],
            listDistrict: [],
            listWard: [],
            errors: []
        }
    },
    created() {
        this.getTotal();
        this.getProvince();  
    },
    computed: {
        city() {
            return this.info.provinceId;
        },
        district() {
            return this.info.districtId;
        }
    },
    watch: {
        city() {
            this.getDistrict();
            this.info.districtId = '0';
            this.listWard = [];
        },
        district() {
            this.getWard();
            this.info.wardId = '0';
        },
    },
    methods: {
        getTotal() {
            this.total = 0;
            this.store.map(item => this.total += (item.quantity*item.versions[0].price));
        },
        getProvince() {
            this.$http.get(`${this.baseUrl}/province`)
			.then(res => {
                this.listProvince = res.data;
			})
        },
        getDistrict() {
            this.$http.get(`${this.baseUrl}/district/${this.info.city}`)
			.then(res => {
                this.listDistrict = res.data;
			})
        },
        getWard() {
            this.$http.get(`${this.baseUrl}/ward/${this.info.district}`)
			.then(res => {
                this.listWard = res.data;
			})
        },
        submitCheckout() {
            const { info } = this;
            this.errors = [];
            for (let key in info) {
                if (info.hasOwnProperty(key)) {
                    if (info[key] == '') {
                        this.errors.push(`${key.charAt(0).toUpperCase() + key.slice(1)} can not be empty!`);
                    }
                }
            }
            // if (this.errors.length>0) {
            //     return;
            // }
            info['products'] = [];
            for (let i=0; i<this.store.length; i++) {
                let obj = {};
                obj['productId'] = this.store[i].id;
                obj['quantity'] = this.store[i].quantity;               
                info['products'].push(obj);
            }
            let total = 0;
            this.store.map(item => total += (item.quantity*item.versions[0].price));
            info['totalPrice'] = total;
            
            this.$http.post(`${this.baseUrl}/shopcart`, info)
			.then(res => {
				console.log(res);
			})
        }
    }
}
</script>