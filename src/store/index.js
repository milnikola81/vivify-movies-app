import Vue from 'vue'
import Vuex from 'vuex'
import MoviesService from './../services/MoviesService' 

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        movies: [],
        title: ''
    },
    mutations: {
        setMovies(state, movies) {
            state.movies = movies
        },
        setSearchTerm(state, title) {
            state.title = title
        }
    },
    getters: {
        filteredMovies(state) {
            return state.movies.filter((movie) => {
                return movie.title.indexOf(state.title) >= 0
            })
        }
    },
    actions: {
        async fetchMovies(context) {
            let response = await MoviesService.index()
            // kod ispod ove linije se izvrsava tek nakon sto se ova linija izvrsi
            context.commit('setMovies', response.data)
            return Promise.resolve() // vraca informaciju da je promise resolvovan
        }
        // ^ isto kao i ovo gore sa async/await
        // fetchMovies(context) {
        //     MoviesService.index()
        //     .then(({ data }) => { // same as response.data
        //         context.commit('setMovies', data)
        //     })
        // }
    }
})