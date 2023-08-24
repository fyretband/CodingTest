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
  background-color: #82c8ff; 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px; 
}

.footer-text {
  margin-right: 20px; 
}

.footer-text p {
  color: white; 
  font-weight: bold;
  margin: 0;
}

.footer-logo img {
  max-height: 40px; 
}
</style>
