<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Barang</th>
          <th>Stock</th>
          <th>Nama Supplier</th>
          <th>Alamat Supplier</th>
          <th>No Telp Supplier</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in barang" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.namaBarang }}</td>
          <td>{{ item.stok }}</td>
          <td>{{ item.supplier.namaSupplier }}</td>
          <td>{{ item.supplier.alamat }}</td>
          <td>{{ item.supplier.noTelp }}</td>
          <td>
            <button
              class="action-button delete-button"
              @click="deleteItem(item.id)"
            >
              Delete
            </button>
            <button class="action-button update-button" @click="showUpdateForm(id)">Update</button>
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
  <div class="update-form-container" v-if="updateItemId">
  <div class="update-form login-form">
      <h2>Update Barang</h2>
      <form>
        <label for="nama">Nama Barang</label>
        <input type="text" id="nama" v-model="updateItemData.namaBarang">
        <label for="harga">Harga Barang</label>
        <input type="number" id="harga" v-model="updateItemData.hargaBarang">
        <label for="stok">Stok Barang</label>
        <input type="number" id="stok" v-model="updateItemData.stok">
        <label for="supplier">Supplier</label>
        <input type="text" id="supplier" v-model="updateItemData.supplier.namaSupplier">
        <button @click="updateBarang">Update</button>
        <button @click="cancelUpdate">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
import axios from 'axios'

export default {
  computed: {
    ...mapState(useCounterStore, [
      "barang",
      "suppliers",
      "currentPage",
      "totalPages",
      "perPage",
    ]),
  },
  data() {
    return {
      updateItemId: null,
      updateItemData: {
        namaBarang: "",
        hargaBarang: 0,
        stok: 0,
        supplier: {
          namaSupplier: ""
        }
      }
    };
  },
  created() {
    this.currentPage = 1;
    this.perPage = 20;
    this.fetchBarang(0, this.perPage);
  },

  methods: {
    ...mapActions(useCounterStore, ["fetchBarang", "setCurrentPage","deleteBarang","fetchSingleBarang"]),
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.setCurrentPage(pageNumber);
        this.fetchBarang((pageNumber - 1) * this.perPage, this.perPage);
      }
    },
    deleteItem(id){
      this.deleteBarang(id);
    },
    showUpdateForm(id) {
      this.updateItemId = id;
      this.fetchSingleBarang(id);
      console.log(id)
    },
   
    async updateBarang() {
      try {
        const token = localStorage.getItem("access_token");
  
        if (!token) {
          throw new Error("Access token not found");
        }
  
        const response = await axios.put(
          `http://159.223.57.121:8090/barang/update/${this.updateItemId}`,
          this.updateItemData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
         
          this.fetchBarang((this.currentPage - 1) * this.perPage, this.perPage);
          this.cancelUpdate(); 
        } else {
          throw new Error("Failed to update barang");
        }
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    },
    cancelUpdate() {
      this.updateItemId = null;
      this.updateItemData = {
        namaBarang: "",
        hargaBarang: 0,
        stok: 0,
        supplier: {
          namaSupplier: ""
        }
      };
    }
  },
};
</script>

<style scoped>
/* Gaya untuk container tabel */
.table-container {
  overflow-x: auto;
}

/* Gaya untuk tabel */
.custom-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  white-space: nowrap;
  min-width: 100px;
  text-align: center;
}

/* Gaya tombol Aksi (Delete dan Update) */
.action-button {
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

.delete-button {
  background-color: #ff6347;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
}

.update-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5); /* Transparansi latar belakang */
}

.update-form {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.update-form label {
  display: block;
  margin-bottom: 5px;
}

.update-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.update-button,
.cancel-button {
  background-color: orange;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
}

.cancel-button {
  background-color: #ccc;
}

/* Gaya untuk tombol-tombol */
.update-button:hover,
.delete-button:hover,
.cancel-button:hover {
  background-color: #005bb5;
}

</style>