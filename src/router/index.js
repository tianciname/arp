import { createRouter, createWebHistory } from 'vue-router'
import arLogin from "@/views/ar-login";
import arTable from "@/views/ar-table";
const routes = [
    {
        path: '/',
        name: 'ar-login',
        component: arLogin,

    },
    {
        path: '/table',
        name: 'ar-table',
        component: arTable,

    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next)=>{
    if (to.path ==="/"){
        next();
    }else {
        if (from.path === "/"){
            next();
        }else{
            next("/");
        }
    }
})
export default router