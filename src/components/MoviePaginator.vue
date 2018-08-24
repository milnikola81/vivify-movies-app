<template>
  <nav
    v-if="numberOfPages > 1"
  >
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ 'active': currentPage === page }"
        v-for="page in numberOfPages"
        :key="page"
      >
        <a
          class="page-link"
          @click="selectPage(page)"
        >{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MoviePaginator',
  props: {
    numberOfPages: {
      type: Number,
      required: true,
      default: 0
    },
    currentPage: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    selectPage(page) {
      this.$emit('selected-page', page)
    }
  }
}
</script>
