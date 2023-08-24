<template>
  <div class="table-container">
    <div class="table-header">
      <div class="table-title">Barang</div>
      <button class="tambah-barang-button" @click="showTambahBarangForm">
        Tambah Barang
      </button>
    </div>
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
            <button
              style="background-color: #ffac33"
              class="action-button update-button"
              @click="showUpdateForm(item.id)"
            >
              Update
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button
      class="pagination-button"
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
      class="pagination-button"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
  <div
    class="update-form-container"
    v-if="updateItemId !== null || showTambahForm"
  >
    <div class="update-form login-form">
      <div class="form-header">
        <h2>
          {{ updateItemId !== null ? "Update Barang" : "Tambah Barang Baru" }}
        </h2>
      </div>
      <form @submit.prevent="submitForm">
        <label for="nama">Nama Barang</label>
        <input type="text" id="nama" v-model="updateItemData.namaBarang" />
        <label for="harga">Harga Barang</label>
        <input type="number" id="harga" v-model="updateItemData.harga" />
        <label for="stok">Stok Barang</label>
        <input type="number" id="stok" v-model="updateItemData.stok" />
        <label for="supplier">Supplier</label>
        <select id="supplier" v-model="updateItemData.supplier.namaSupplier">
          <option
            v-for="supplie in supplier"
            :key="supplie.id"
            :value="supplie.namaSupplier"
          >
            {{ supplie.namaSupplier }}
          </option>
        </select>
        <div class="form-buttons">
          <button class="cancel-button" @click="cancelUpdate">Kembali</button>
          <button
            class="update-button"
            type="submit"
          >
            {{ updateItemId !== null ? "Update" : "Tambah" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
import axios from "axios";

export default {
  computed: {
    ...mapState(useCounterStore, [
      "barang",
      "supplier",
      "currentPage",
      "totalPages",
      "perPage",
      "singleBarang",
    ]),
  },
  data() {
    return {
      showTambahForm: false,
      updateItemId: null,
      updateItemData: {
        namaBarang: "",
        harga: 0,
        stok: 0,
        supplier: {
          namaSupplier: "",
        },
      },
    };
  },
  created() {
    this.currentPage = 1;
    this.perPage = 20;
    this.fetchBarang(0, this.perPage);
    this.fetchSupplier(0, 100);
  },

  methods: {
    ...mapActions(useCounterStore, [
      "fetchBarang",
      "setCurrentPage",
      "deleteBarang",
      "fetchSingleBarang",
      "fetchSupplier",
    ]),

    submitForm(){
      console.log("cekkkkkk");
      if (this.updateItemId !== null){
        console.log("update");
        this.updateBarang();
      }
      else{
        console.log("tambah");
        this.addBarang();
      }
    },
    showTambahBarangForm() {
      this.showTambahForm = true;
      this.updateItemId = null; 
      this.updateItemData = {
        namaBarang: "",
        harga: 0,
        stok: 0,
        supplier: {
          namaSupplier: this.supplier[0].namaSupplier, 
        },
      };
    },
    async addBarang() {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.post(
          "http://159.223.57.121:8090/barang/create",
          this.updateItemData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.status === "OK") {
          
          this.fetchBarang((this.currentPage - 1), this.perPage);
          this.cancelUpdate(); 

          
          this.setCurrentPage(this.totalPages);

          
          window.scrollTo(0, document.body.scrollHeight);

          console.log(response.data.message); 
        } else {
          throw new Error("Failed to add barang");
        }
      } catch (error) {
        console.error(error);
        
      }
    
      this.showTambahForm = false; 
    },
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.setCurrentPage(pageNumber);
        this.fetchBarang((pageNumber - 1), this.perPage);
      }
    },
    deleteItem(id) {
      this.deleteBarang(id);
    },
    async showUpdateForm(id) {
      this.updateItemId = id;
      await this.fetchSingleBarang(id);
      this.updateItemData.namaBarang = this.singleBarang.namaBarang;
      this.updateItemData.stok = this.singleBarang.stok;
      this.updateItemData.harga = this.singleBarang.harga;
      this.updateItemData.supplier.namaSupplier =
      this.singleBarang.supplier?.namaSupplier;
  
      await this.fetchSupplier(0, 100);
     
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
          this.fetchBarang((this.currentPage - 1), this.perPage);
          this.cancelUpdate();
        } else {
          throw new Error("Failed to update barang");
        }
      } catch (error) {
        console.error(error);
        
      }
    },
    cancelUpdate() {
      this.updateItemId = null;
      this.updateItemData = {
        namaBarang: "",
        harga: 0,
        stok: 0,
        supplier: {
          namaSupplier: "",
        },
      };
    },
  },
};
</script>

<style scoped>

.table-container {
  overflow-x: auto;
}


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
  background-color: rgba(0, 0, 0, 0.5); 
}

.update-form {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-header {
  background-color: #82c8ff;
  color: #0070f3;
  text-align: center;
  padding: 10px;
  border-radius: 5px 5px 0 0;
}

.update-form label {
  display: block;
  margin-bottom: 5px;
}

.update-form input,
.update-form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cancel-button,
.update-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  color: white;
}

.cancel-button {
  background-color: #ccc;
}

.update-button {
  background-color: #0070f3;
}


.update-button:hover,
.cancel-button:hover {
  background-color: #005bb5;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.table-title {
  font-size: 1.5rem;
}

.tambah-barang-button {
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination-button{
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
