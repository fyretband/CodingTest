import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import swal from "sweetalert2";

export const useCounterStore = defineStore("useCounterStore", {
  state: () => ({
    isLoggedIn: false,
    barang: [],
    supplier: [],
    currentPage: 1,
    perPage: 20,
    totalRows: 0,
    totalPages: 0,
    singleBarang: {},
    singleSupplier: {},
  }),
  getters: {
    isAuthenticated: (state) => {
      return state.isLoggedIn;
    },
  },

  actions: {
    setCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    checkState() {
      if (localStorage.getItem("access_token")) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      console.log(this.isLoggedIn)
    },
    async handleRegister(username, profileName, password) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `http://159.223.57.121:8090/auth/register`,
          data: {
            username: username,
            profileName: profileName,
            password: password,
          },
        });

        swal.fire({
          icon: "success",
          title: "Successfully register",
        });
        this.router.push("/login");
      } catch (err) {
        console.log(err);
        swal.fire({
          icon: "warning",
          title: `${err.response.data.message}`,
          showConfirmButton: false,
        });
      }
    },

    async handleLogin(username, password) {
      try {
        const response = await axios.post(
          "http://159.223.57.121:8090/auth/login",
          {
            username: username,
            password: password,
          }
        );

        if (response.status === 200 && response.data.status === "OK") {
          swal.fire({
            icon: "success",
            title: "Successfully Login",
            timer: 1000,
          });

          const token = response.data.data.token; 

          

          localStorage.setItem("access_token", token);
         

          this.isLoggedIn = true;
          this.router.push("/");
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        console.log(error);
        swal.fire({
          icon: "warning",
          title: `${
            error.response ? error.response.data.message : "Login failed"
          }`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
    async fetchBarang(offset, limit) {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(
          "http://159.223.57.121:8090/barang/find-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              offset: offset,
              limit: limit,
            },
          }
        );

        if (response.status === 200) {
          this.barang = response.data.data;
          this.totalRows = response.data.total_record; 
          this.totalPages = Math.ceil(
            response.data.total_record / this.perPage
          ); 
          console.log(response);
        } else {
          throw new Error("Failed to fetch barang data");
        }
      } catch (error) {
        console.error(error);
        
      }
    },
    async deleteBarang(id) {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.delete(
          `http://159.223.57.121:8090/barang/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          this.fetchBarang((this.currentPage - 1) * this.perPage, this.perPage);
        } else {
          throw new Error("Failed to delete barang data");
        }
      } catch (error) {
        console.error(error);
        
      }
    },
    async fetchSingleBarang(id) {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(
          `http://159.223.57.121:8090/barang/find-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          this.singleBarang = response.data.data;
          console.log(this.singleBarang);

          console.log(response, "ini response barang single");
          console.log(response.data.data, "cek donnnngg");
        } else {
          throw new Error("Failed to fetch single barang data");
        }
      } catch (error) {
        console.error(error);
       
      }
    },
    async fetchSingleSupplier(id) {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(
          `http://159.223.57.121:8090/supplier/find-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          this.singleSupplier = response.data.data;
          console.log(this.singleSupplier);

          console.log(response, "ini response barang single");
          console.log(response.data.data, "cek donnnngg");
        } else {
          throw new Error("Failed to fetch single barang data");
        }
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    },

    async fetchSupplier(offset, limit) {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(
          "http://159.223.57.121:8090/supplier/find-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              offset: offset,
              limit: limit,
            },
          }
        );

        if (response.status === 200) {
          this.supplier = response.data.data;
          this.totalRows = response.data.total_record; // Update totalRows with the total count from the response
          this.totalPages = Math.ceil(
            response.data.total_record / this.perPage
          ); // Calculate total pages
          console.log(response);
        } else {
          throw new Error("Failed to fetch barang data");
        }
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    },
    async deleteSupplier(id) {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.delete(
          `http://159.223.57.121:8090/supplier/delete/${id}`,
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
        } else {
          throw new Error("Failed to delete barang data");
        }
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    },
  },
});
