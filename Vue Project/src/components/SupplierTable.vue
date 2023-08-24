<template>
  <div class="table-container">
    <div class="table-header">
      <div class="table-title">Supplier</div>
      <button class="tambah-barang-button" @click="showTambahBarangForm">
        Tambah Supplier
      </button>
    </div>
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
            <button
              style="background-color: #ffac33"
              class="action-button update-button"
              @click="showUpdateForm(item.id)"
            >
              Update
            </button>
            <button
              class="action-button delete-button"
              @click="deleteItem(item.id)"
            >
              Delete
            </button>
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
  <div
    class="update-form-container"
    v-if="updateItemId !== null || showTambahForm"
  >
    <div class="update-form login-form">
      <div class="form-header">
        <h2>
          {{
            updateItemId !== null ? "Update Supplier" : "Tambah Supplier Baru"
          }}
        </h2>
      </div>
      <form>
        <label for="nama">Nama Supplier</label>
        <input type="text" id="nama" v-model="updateItemData.namaSupplier" />
        <label for="harga">No Telp</label>
        <input type="text" id="harga" v-model="updateItemData.noTelp" />
        <label for="stok">Alamat</label>
        <input type="text" id="stok" v-model="updateItemData.alamat" />

        <div class="form-buttons">
          <button class="cancel-button" @click="cancelUpdate">Kembali</button>
          <button
            class="update-button"
            @click="updateItemId !== null ? updateSupplier : addSupplier"
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
  data() {
    return {
      showTambahForm: false,
      updateItemId: null,
      updateItemData: {
        namaSupplier: "",
        noTelp: "",
        alamat: "",
      },
    };
  },
  computed: {
    ...mapState(useCounterStore, [
      "supplier",
      "currentPage",
      "totalPages",
      "perPage",
      "singleSupplier",
    ]),
  },
  created() {
    this.currentPage = 1;
    this.perPage = 20;
    this.fetchSupplier(0, this.perPage);
  },
  methods: {
    ...mapActions(useCounterStore, [
      "fetchSupplier",
      "setCurrentPage",
      "deleteSupplier",
      "fetchSingleSupplier",
    ]),
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.setCurrentPage(pageNumber);
        this.fetchSupplier((pageNumber - 1) * this.perPage, this.perPage);
      }
    },
    deleteItem(id) {
      this.deleteSupplier(id);
    },
    cancelUpdate() {
      this.updateItemId = null;
      this.updateItemData = {
        namaSupplier: "",
        noTelp: "",
        alamat: "",
       
      };
    },
     showTambahBarangForm() {
      this.showTambahForm = true;
      this.updateItemId = null; 
      this.updateItemData = {
        namaSupplier: "",
        noTelp: "",
        alamat: "",
       
      };
    },
    async addSupplier() {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.post(
          "http://159.223.57.121:8090/supplier/create",
          this.updateItemData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.status === "OK") {
          
          this.fetchSupplier((this.currentPage - 1) * this.perPage, this.perPage);
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
    async showUpdateForm(id) {
      this.updateItemId = id;
      await this.fetchSingleSupplier(id);
      this.updateItemData.namaSupplier = this.singleSupplier.namaSupplier;
      this.updateItemData.noTelp = this.singleSupplier.noTelp;
      this.updateItemData.alamat = this.singleSupplier.alamat;

     
     
    },
    async updateSupplier() {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.put(
          `http://159.223.57.121:8090/supplier/update/${this.updateItemId}`,
          this.updateItemData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          this.fetchSupplier(
            (this.currentPage - 1) * this.perPage,
            this.perPage
          );
          this.cancelUpdate();
          console.log("Supplier updated successfully!");
        } else {
          throw new Error("Failed to update supplier");
        }
      } catch (error) {
        console.error("Error updating supplier:", error);
        console.log("Response data:", error.response.data);
      }
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
}

.update-button {
  background-color: #ffac33; 
  color: white;
  margin-right: 5px;
}

.delete-button {
  background-color: #ff6347; 
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  color: white;
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
</style>
