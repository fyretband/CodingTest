<template>
    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Supplier</th>
            <th>Alamat</th>
            <th>No Telp</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in supplier" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.namaSupplier }}</td>
            <td>{{ item.noTelp }}</td>
            <td>{{ item.alamat }}</td>
            <td>
              <button class="action-button update-button" @click="updateSupplier(item.id)">Update</button>
              <button class="action-button delete-button" @click="deleteItem(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
    </div>
  </template>
  
  <script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

  export default {
    computed: {
    ...mapState(useCounterStore, [
     
      "supplier",
      "currentPage",
      "totalPages",
      "perPage",
    ]),
  },
    created() {
    this.currentPage = 1;
    this.perPage = 20;
    this.fetchSupplier(0, this.perPage);
  },
    methods: {
        ...mapActions(useCounterStore, ["fetchSupplier", "setCurrentPage","deleteSupplier"]),
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.setCurrentPage(pageNumber);
        this.fetchSupplier((pageNumber - 1) * this.perPage, this.perPage);
      }
    },
    deleteItem(id){
      this.deleteSupplier(id);
    },
    },
  };
  </script>
  
  <style scoped>


  /* Gaya untuk container tabel */
  .table-container {
    overflow-x: auto;
     /* Membuat tabel scroll horizontal jika overflow */
  }
  
  /* Gaya untuk tabel */
  .custom-table {
    width: 100%; /* Menyebabkan tabel memenuhi lebar parent container */
    border-collapse: collapse;
 }
  
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    white-space: nowrap; /* Mencegah pemotongan teks pada sel */
    min-width: 100px; /* Lebar minimum untuk setiap sel */
    text-align: center;
    
  }
  
  /* Gaya tombol Aksi (Update dan Delete) */
  .action-button {
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .update-button {
    background-color: #ffac33; /* Warna kuning oranye */
    color: white;
    margin-right: 5px;
  }
  
  .delete-button {
    background-color: #ff6347; /* Merah */
    color: white;
  }
  </style>
  