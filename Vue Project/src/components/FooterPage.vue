<template>
  <div class="footer">
    <div class="footer-text">
      <p style="color: #0070f3;">MarketPlace Sinau Coding</p>
    </div>
    <div class="footer-logo">
      <img src="@/assets/logo2.png" alt="Logo Marketplace Sinau Coding" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterPage',
};
</script>

<style scoped>
.footer {
  background-color: #82c8ff; /* Warna biru muda latar belakang */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px; /* Sesuaikan dengan kebutuhan */
}

.footer-text {
  margin-right: 20px; /* Jarak antara teks dan logo */
}

.footer-text p {
  color: white; /* Warna teks */
  font-weight: bold;
  margin: 0;
}

.footer-logo img {
  max-height: 40px; /* Ukuran logo */
}
</style>
