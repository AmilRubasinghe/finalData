export const state = () => ({
    isMoh: false,
    isDocter: false,
    
    })
    export const mutations = {
      SET_MOH (state, items) {
        state.isMoh = items
      },
      SET_DOCTER (state, items) {
        state.isDocter = items
      },
     
    }
    
    export const actions = {
      toogleIsMoh({ commit }, bool) {
        commit("SET_MOH", bool);
      },
      toogleIsDocter({ commit }, bool) {
        commit("SET_DOCTER", bool);
      },
      
    }
    