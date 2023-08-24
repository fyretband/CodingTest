<template>
  <div class="card-group">
    <div class="card sidebar">
      <img src="@/assets/profile.png" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ profileName }}</h5>
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
      <div class="content-header">
        <h3>{{ selectedItem === "barang" ? "Barang" : "Supplier" }}</h3>
        <div class="header-actions">
          <button
            class="tambah-barang-button"
            v-if="selectedItem === 'barang'"
            @click="showTambahBarangModal = true"
          >
            Tambah Barang
          </button>
          <button
            class="tambah-barang-button"
            v-else-if="selectedItem === 'supplier'"
            @click="showTambahSupplierModal = true"
          >
            Tambah Supplier
          </button>
        </div>
      </div>
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
  <div class="add-form-container" v-if="showTambahBarangModal">
    <div class="add-form">
      <h2>Tambah Barang</h2>
      <form>
        <label for="nama">Nama Barang</label>
        <input type="text" id="nama" v-model="newItemData.namaBarang" />
        <label for="harga">Harga Barang</label>
        <input type="number" id="harga" v-model="newItemData.hargaBarang" />
        <label for="stok">Stok Barang</label>
        <input type="number" id="stok" v-model="newItemData.stok" />
        <label for="supplier">Supplier</label>
        <input
          type="text"
          id="supplier"
          v-model="newItemData.supplier.namaSupplier"
        />
        <button class="add-button" @click="addBarang">Tambah</button>
        <button class="cancel-button" @click="cancelAdd">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import BarangTable from "@/components/BarangTable.vue";
import SupplierTable from "@/components/SupplierTable.vue";
import { mapState, mapActions } from "pinia"; // Sesuaikan dengan library state management Anda
import { useCounterStore } from "../stores/counter";

export default {
  computed: {
    ...mapState(useCounterStore, ["barang", "suppliers"]),
  },
  components: {
    BarangTable,
    SupplierTable,
  },
  data() {
    return {
      profileName: "John Doe",
      selectedItem: null,
      showTambahBarangModal: false, // New property
      newItemData: {
        namaBarang: "",
        hargaBarang: 0,
        stok: 0,
        supplier: {
          namaSupplier: "",
        },
      },
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
    addBarang() {
      // Implement your logic to add the new item
      // For example, if using Pinia for state management:
      // this.$store.addBarang(this.newItemData);
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
/* Gaya untuk sidebar */
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
  width: 100%; /* Make the underline span the whole width */
  height: 1px;
  background-color: #82c8ff;
  position: absolute;
  bottom: 25%; /* Adjust the position of the underline */
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
