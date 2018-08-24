<template>
  <div class="container">

    <movie-search
      @search-term-change="onSearchTermChanged"
      class="mt-4"
    />

    <div class="pt-3">
      <div
        class="row mb-2"
        v-if="movies.length"
      >
        <div class="col-md">
          <b-badge
            pill
            variant="primary"
          >
            Selected: {{ selectedMoviesCounter }}
          </b-badge>
        </div>
        <div class="col-md">
          <b-button
            size="sm"
            variant="warning"
            class="float-right"
            @click="deselectAll"
          >
            Deselect All
          </b-button>

          <b-button
            size="sm"
            variant="primary"
            class="float-right mr-1"
            @click="selectAll"
          >
              Select All
          </b-button>

          <b-dropdown
            class="float-right mr-1"
            size="sm"
            text="Sort By"
          >
            <b-dropdown-item
              @click="sortBy('title', 'asc')"
            >
              Name ASC
            </b-dropdown-item>
            <b-dropdown-item
              @click="sortBy('title', 'desc')"
            >
              Name DESC
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item
              @click="sortBy('duration', 'asc')"
            >
              Duration ASC
            </b-dropdown-item>
            <b-dropdown-item
              @click="sortBy('duration', 'desc')"
            >
              Duration DESC
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <movie-row
        v-for="movie in visibleCollectionOfMovies"
        :key="movie.id"
        :movie="movie"
        :selected-movies-ids="selectedMoviesIds"
        @on-selected-movie="onSelectedMovie"
      />

      <MoviePaginator
        :number-of-pages="totalNumberOfPages"
        :current-page="currentPage"
        @selected-page="changeCurrentPage"
      />

      <b-alert
        show
        variant="warning"
        v-if="!movies.length"
      >
        No Movies
      </b-alert>
    </div>
  </div>
</template>

<script>
import MoviesService from './../services/MoviesService'
import MovieRow from './MovieRow.vue'
import MovieSearch from './MovieSearch.vue'
import MovieForm from './MovieForm.vue'
import MoviePaginator from './MoviePaginator.vue'

import { store } from './../store'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'AppMovies',
  components: {
    MovieRow,
    MovieSearch,
    MovieForm,
    MoviePaginator
  },
  data() {
    return {
      // movies: [],
      selectedMoviesIds: [],
      currentPage: 1
    }
  },
  computed: {
    ...mapState ({
      movies: 'movies'
    }),
    ...mapGetters ({
      filteredMovies: 'filteredMovies'
    }),
    selectedMoviesCounter() {
      return this.selectedMoviesIds.length
    },
    totalNumberOfPages() {
      return Math.ceil(this.movies.length / 5)
    },
    visibleCollectionOfMovies() {
      let bottomIndexLimit = (this.currentPage - 1) * 5
      let topIndexLimit = bottomIndexLimit + 5
      return this.filteredMovies.filter(
        (movie, index) => index >= bottomIndexLimit && index < topIndexLimit)
    }
  },
  methods: {
    ...mapActions({
      fetchMovies: 'fetchMovies'
    }),
    storeMovie() {
      MoviesService.store(this.movieForm)
    },
    onSearchTermChanged(term) {
      MoviesService.index(term)
        .then(({ data }) => {
          this.movies = data
        })
    },
    onSelectedMovie(movie) {
      if (this.selectedMoviesIds.indexOf(movie.id) > -1) {
        return;
      }
      this.selectedMoviesIds.push(movie.id)
    },
    selectAll() {
      this.selectedMoviesIds = this.movies.map((movie) => movie.id);
    },
    deselectAll() {
      this.selectedMoviesIds = [];
    },
    sortBy(prop, order) {
      let orderCoefficient = order === 'asc' ? 1 : -1;
      this.movies = this.movies.sort((movie1, movie2) => {
        return movie1[prop] >= movie2[prop] ?
          orderCoefficient : -orderCoefficient
      })
    },
    changeCurrentPage(page) {
      this.currentPage = page;
    }
  },
  // created() {
  //   this.fetchMovies()
  // },
  beforeRouteEnter(to, from, next) {
    store.dispatch('fetchMovies').then(() => {
      next()
    })
    // importujemo store jer nemamo pristup instanci komponente (nemamo this)


    // MoviesService.index().then(({ data }) => {
    //   next((context) => {
    //     context.movies = data.map(movie =>
    //       Object.assign(movie, { duration: parseFloat(movie.duration) }));
    //   })
    // })

  }
}
</script>
