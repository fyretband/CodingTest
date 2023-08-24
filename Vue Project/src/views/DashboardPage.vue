<template>
  <div class="card-group">
    <div class="card sidebar">
      <img src="@/assets/profile.png" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ userData?.profileName }}</h5>
       
      </div>
      <div class="card">
        <div class="card-body">
          <div class="section">
            <h5
              class="section-title"
              style="
                background-color: #82c8ff;
                color: #0070f3;
                text-align: center;
                height: 25px;
              "
            >
              Menu
            </h5>
          </div>
          <div
            class="section"
            :class="{ selected: selectedItem === 'barang' }"
            @click="selectItem('barang')"
          >
            <h5 class="section-title">Barang</h5>
          </div>
          <div
            class="section"
            :class="{ selected: selectedItem === 'supplier' }"
            @click="selectItem('supplier')"
          >
            <h5 class="section-title">Supplier</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <h2 style="background-color: #82c8ff; color: #0070f3">Dashboard</h2>
    
      <div class="table-container">
        <barang-table
          v-if="selectedItem === 'barang'"
          :barang="barang"
          style="display: block"
        />
        <supplier-table
          v-else-if="selectedItem === 'supplier'"
          :suppliers="suppliers"
          style="display: block"
        />
      </div>
    </div>
  </div>

</template>

<script>
import BarangTable from "@/components/BarangTable.vue";
import SupplierTable from "@/components/SupplierTable.vue";
import { mapState,  } from "pinia"; 
import { useCounterStore } from "../stores/counter";
import axios from "axios";
export default {
  computed: {
    ...mapState(useCounterStore, ["barang", "suppliers"]),
  },
  created() {
    this.getUserData('jojo'); 
  },
  components: {
    BarangTable,
    SupplierTable,
  },
  data() {
    return {
      profileName: "John Doe",
      selectedItem: null,
      showTambahBarangModal: false, 
      newItemData: {
        namaBarang: "",
        hargaBarang: 0,
        stok: 0,
        supplier: {
          namaSupplier: "",
        },
      },
      userData: null,
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
    
    async getUserData(username) {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(
          `http://159.223.57.121:8090/users/find-by-username?username=${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "OK") {
          this.userData = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    addBarang() {
      
      this.newItemData = {
        namaBarang: "",
        hargaBarang: 0,
        stok: 0,
        supplier: {
          namaSupplier: "",
        },
      };
      this.showTambahBarangModal = false;
    },
    cancelAdd() {
      this.newItemData = {
        namaBarang: "",
        hargaBarang: 0,
        stok: 0,
        supplier: {
          namaSupplier: "",
        },
      };
      this.showTambahBarangModal = false;
    },
  },
};
</script>

<style scoped>

.sidebar {
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: unset;
  width: 25%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.section-title {
  font-size: 1rem;
  margin-bottom: 5px;
}

.card {
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: unset;
}
.selected {
  background-color: #0070f3;
  color: white;
}
.dashboard {
  display: flex;
  align-items: stretch;
}

.sidebar {
  width: 25%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-group {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.card {
  flex: 1;
  margin: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: unset;
}

.card-img-top {
  max-width: 100%;

  height: auto;
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 10px;
  text-align: center;
  background-color: #82c8ff;
  color: #0070f3;
}

.card-text {
  margin-bottom: 10px;
}

.text-muted {
  color: #6c757d;
}
.underline {
  width: 100%; 
  height: 1px;
  background-color: #82c8ff;
  position: absolute;
  bottom: 25%; 
  left: 0;
}

.profile p {
  background-color: #82c8ff;
  padding: 10px;
  text-align: center;
  color: white;
}
.menu-dropdown {
  display: flex;
  flex-direction: column;
}

.main-content {
  width: 75%;
  padding: 20px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tambah-barang-button {
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.table-container {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  border-left-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
  border-right-width: 0px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>
