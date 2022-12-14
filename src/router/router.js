import Main from "@/Pages/Main.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import posts from "@/Pages/posts.vue";
import weather from "@/Pages/weather.vue";


const routes = [
    {
        path:'/',
        component: Main
    },
    {
        path:'/posts',
        component: posts
    },
    {
        path:'/weather',
        component: weather
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})


export default router;