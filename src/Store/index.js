import { createStore } from "vuex";


export default createStore({
    state:{
        likes: 0,
    },
    getters:{

    },
    mutations:{
        LikePlus(state){
            state.likes++;
        },
    },
    actions:{
        
    },
    modules:{

    }
})