<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/movies">Movies</router-link>
    <div class="navbar-nav">
      <router-link
        class="nav-item nav-link"
        to="/add-movie"
      >
        Add Movie
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
