<template>
    <div class="tambah-barang-form" v-if="showForm">
      <h3>Tambah Barang Baru</h3>
      <form @submit.prevent="addNewBarang">
        <div class="form-group">
          <label for="namaBarang">Nama Barang</label>
          <input v-model="namaBarang" type="text" id="namaBarang" required />
        </div>
        <div class="form-group">
          <label for="hargaBarang">Harga Barang</label>
          <input v-model="hargaBarang" type="number" id="hargaBarang" required />
        </div>
        <div class="form-group">
          <label for="stokBarang">Stok Barang</label>
          <input v-model="stokBarang" type="number" id="stokBarang" required />
        </div>
        <div class="form-group">
          <label for="supplier">Supplier</label>
          <select v-model="selectedSupplier" id="supplier" required>
            <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
          </select>
        </div>
        <button type="submit">Simpan</button>
        <button @click="cancelForm">Batal</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['suppliers'],
    data() {
      return {
        showForm: false,
        namaBarang: '',
        hargaBarang: 0,
        stokBarang: 0,
        selectedSupplier: null
      };
    },
    methods: {
      addNewBarang() {
        // Lakukan tindakan untuk menambahkan barang baru ke dalam penyimpanan
        // Misalnya, panggil action atau metode dari state management Anda
        // dengan data yang diperlukan
        this.$emit('new-barang', {
          nama: this.namaBarang,
          harga: this.hargaBarang,
          stok: this.stokBarang,
          supplierId: this.selectedSupplier
        });
        this.cancelForm();
      },
      cancelForm() {
        this.showForm = false;
        this.namaBarang = '';
        this.hargaBarang = 0;
        this.stokBarang = 0;
        this.selectedSupplier = null;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Gaya untuk formulir tambah barang */
  .tambah-barang-form {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .form-group {
    margin-bottom: 10px;
  }
  label {
    display: block;
    font-weight: bold;
  }
  input, select {
    width: 100%;
    padding: 5px;
  }
  button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  