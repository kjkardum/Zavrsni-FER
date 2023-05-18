import {createRouter, createWebHistory} from 'vue-router'
import type {Router} from "vue-router";
import controllerEndpoints from "@/parser/openapiParser";

export const currentRouter: {router: Router} = {router: undefined};
const createOpenapiRouter = () => {
    currentRouter.router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: '/',
                name: 'home',
                component: () => import('../views/HomeView.vue')
            },
            {
                path: '/about',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (About.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('../views/AboutView.vue')
            },
            ...controllerEndpoints.map(controller => ([
                {
                    path: '/controller/' + controller.name,
                    name: controller.name,
                    component: () => import('../views/ControllerView.vue'),
                    props: {
                        controllerMetadata: controller
                    }
                },
                {
                    path: '/controller/' + controller.name + '/:id',
                    name: controller.name + '-edit',
                    component: () => import('../views/ControllerEditView.vue'),
                    props: {
                        controller: controller
                    }
                },
                {
                    path: '/controller/' + controller.name + '/new',
                    name: controller.name + '-new',
                    component: () => import('../views/ControllerEditView.vue'),
                    props: {
                        controller: controller
                    }
                }
            ])).flat(),
            {
                path: '/dummyTable',
                name: 'dummyTable',
                component: () => import('../views/DataTableViewDummy.vue')
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'not-found',
                component: () => import('../views/NotFoundView.vue')
            }
        ]
    });
    return currentRouter.router;
};

export default createOpenapiRouter;