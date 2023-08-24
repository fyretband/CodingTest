<template>
    <div class="login-container">
      <div class="welcome">
        <div class="welcome-content">
          <div class="logo">
            <img src="@/assets/logo3.png" alt="Logo Marketplace Sinau Coding" />
          </div>
          <h4 style="color: #0070f3; margin-bottom: -80px;">MarketPlace Sinau Coding</h4>
          <h1 style="color: #0070f3;">Selamat Datang</h1>
        </div>
      </div>
      <div class="login-form">
        <h3 class="login-header" style="text-align: center;">Login</h3>
        <form @submit.prevent="handleSubmitLogin">
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" />
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" />
          <button class="login-button" type="submit">Masuk</button>
        </form>
        <p class="register-link"><a href="/register">Belum punya akun?</a></p>
      </div>
    </div>
  </template>
  
  <script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
        ...mapActions(useCounterStore,['handleLogin']),
        handleSubmitLogin(){
            this.handleLogin(this.username,this.password)
        }
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    padding: 20px;
  }
  
  .welcome {
    flex: 1;
  }
  
  .welcome {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .welcome-content {
    text-align: center;
  }
  
  .logo img {
    max-height: 150px; 
  }
  
  .login-form {
    flex: 1;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .login-header {
    background-color: #82c8ff;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button.login-button {
    background-color: #0070f3;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: block;
    margin: 0 auto;
  }
  
  .register-link {
    margin-top: 10px;
    text-align: center;
  }
  </style>
  