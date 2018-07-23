<template>
    <header>
        <div class="nav">
            <div class="nav-left">
                <a href="javascript:void(0)">
                    <img src="../../static/logo1.png" class="brand-logo"> 
                </a>
            </div>
            <div class="nav-right">
                <div class="nav-menu">
                    <span class="nav-link" v-text="nickName" v-if="nickName"></span>
                    <a href="javascript:void(0)" class="nav-link" 
                       @click="loginModal=true" v-if="!nickName">Login
                    </a>
                    <a href="javascript:void(0)" class="nav-link"
                       @click="logOut" v-else>Logout
                    </a>
                    <div class="nav-cart">
                        <span class="nav-cart-count" v-if="cartCount>0">{{cartCount}}</span>
                        <a href="#" class="nav-cart-logo">
                            <svg class="nav-cart-logo">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart">
                                </use>
                            </svg>
                        </a>
                    </div>
                </div>
                
            </div>

        </div>
        <div class="md-modal" :class="{'md-show':loginModal}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">Login in</div>
                    <button class="md-close" @click="loginModal=false">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <div class="error-wrap">
                            <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
                        </div>
                        <ul>
                            <li class="regi-form-input">
                                <i class="icon IconPeople"></i>
                                <input type="text" class="regi_login_input regi_login_input_left" name="loginname" placeholder="User Name">
                            </li>
                            <li class="regi-form-input">
                                <i class="icon IconPwd"></i>
                                <input type="password" class="regi_login_input" name="password" placeholder="Password">
                            </li>

                        </ul>
                    </div>
                    <div class="login-wrap">
                        <a href="javascript:void(0)" class="btn-login" @click="login">登录</a>
                    </div>
                </div>
            </div>

        </div>
         <div class="md-overlay" v-if="loginModal" @click="loginModal=false"></div>
    </header>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            userName: 'admin',
            userPwd: '123456',
            errorTip: false,
            loginModal: false
        }
    },
    computed: {

    },
    methods: {
        checkLogin() {
            axios:get("users/checkLogin").then( response => {
               let res = response.data
               if(res.status == '0') {
                
               }
            })
        },
        login() {
            if(!this.userName || !this.userPwd) {
                this.errorTip = true
                return 
            }
            axios.post("/users/login",{
                userName: this.userName,
                userPwd: this.userPwd
            }).then( response => {
                let res = response.data
                if(res.status == "0") {
                    this.errorTip = false
                    this.loginModal = false

                }else {
                    this.errorTip = true
                }
            })
        },
        logOut() {
           axios.post("users/logout").then( response => {
               let res = response.data
               if(res.status == "0") {                 
               }
           })
        }
    }
};
</script>

<style>
</style>
