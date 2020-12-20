<template>
  <footer id="footer" class="area-footer">
    <hr />
    <div class="footer-content">
      <p>
        Music Paradigm is an open source platform developped for managing remote
        mutiusers musical training experiments.
      </p>
    </div>
  </footer>
</template>

<script>
export default{
	'name': 'Footer'
};
</script>

<style scoped>
#footer {
  display: block;
  background-color: rgb(18, 18, 18);
  color: rgb(50, 50, 50);
  position: static;
  padding: 20px 50px;
  text-align: center;
  max-height: 80px;
}

hr {
  border: 1px solid rgb(25, 25, 25);
  margin: 0 0 10px;
}

.footer-content {
  display: inline-block;
  max-width: 800px;
  text-align: center;
}
</style>
