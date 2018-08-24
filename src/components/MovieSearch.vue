<template>
  <div>
    <b-input
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Search Movies"
      @input="emitInputChangeEvent"
    />
  </div>
</template>

<script>
export default {
  name: 'MovieSearch',
  methods: {
    emitInputChangeEvent(term) {
      this.$store.commit('setSearchTerm', term)
      // this.$emit('search-term-change', term)
    }
  }
}
</script>
