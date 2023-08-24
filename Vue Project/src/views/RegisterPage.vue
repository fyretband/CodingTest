<template>
    <div class="register-container">
      <div class="welcome">
        <div class="welcome-content">
          <div class="logo">
            <img src="@/assets/logo3.png" alt="Logo Marketplace Sinau Coding" />
          </div>
          <h4 style="color: #0070f3; margin-bottom: -80px;">MarketPlace Sinau Coding</h4>
          <h1 style="color: #0070f3;">Selamat Datang</h1>
        </div>
      </div>
      <div class="register-form">
        <h3 class="register-header" style="text-align: center;">Register</h3>
        <form @submit.prevent="handleSubmit">
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" />
          <label for="profile">Profile Name:</label>
          <input type="text" v-model="profileName" id="profile" />
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" />
          <button class="register-button" type="submit">Daftar</button>
        </form>
        <p class="login-link"><a href="/">Sudah punya akun?</a></p>
      </div>
    </div>
  </template>
  
  <script>
import { useCounterStore } from '../stores/counter';
import { mapActions } from 'pinia';

  export default {
    data() {
      return {
        username: '',
        profileName: '',
        password: '',
      };
    },
    methods: {
        ...mapActions(useCounterStore, ['handleRegister']),
        handleSubmit(){
            this.handleRegister(this.username,this.profileName,this.password)
            console.log('masuk ya disini')
           
            
        }
    }
};
  </script>
  
  <style scoped>
  .register-container {
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
  
  .register-form {
    flex: 1;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .register-header {
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
  
  button.register-button {
    background-color: #0070f3;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: block;
    margin: 0 auto;
  }
  
  .login-link {
    margin-top: 10px;
    text-align: center;
  }
  </style>
  