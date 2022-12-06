import Main from "@/Pages/Main.vue";
import PostPage from "@/Pages/PostPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
    {
        path:'/',
        component: Main
    },
    {
        path:'/Posts',
        component: PostPage
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})


export default router;