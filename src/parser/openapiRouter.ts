import {createRouter, createWebHistory} from 'vue-router'
import type {Router, RouteRecordRaw} from "vue-router";
import controllerEndpoints from "@/parser/openapiParser";
import * as jwt from 'jsonwebtoken';
// @ts-ignore
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
            {
                path: '/login',
                name: 'login',
                component: () => import('../views/LoginView.vue')
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
                    path: '/controller/' + controller.name + '/edit/:id',
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
                },
                ...controller.relatedEntities.map(relatedEntity => ([
                    {
                        path: '/controller/' + controller.name + '/related/:parentId/' + relatedEntity.name,
                        name: `${controller.name}/${relatedEntity.name}`,
                        component: () => import('../views/ControllerView.vue'),
                        props: {
                            controllerMetadata: relatedEntity,
                            parentController: controller,
                        }
                    },
                    {
                        path: '/controller/' + controller.name + '/related/:parentId/' + relatedEntity.name + '/edit/:id',
                        name: `${controller.name}/${relatedEntity.name}` + '-edit',
                        component: () => import('../views/ControllerEditView.vue'),
                        props: {
                            controller: relatedEntity,
                            parentController: controller,
                        }
                    },
                    {
                        path: '/controller/' + controller.name + '/related/:parentId/' + relatedEntity.name + '/new',
                        name: `${controller.name}/${relatedEntity.name}` + '-new',
                        component: () => import('../views/ControllerEditView.vue'),
                        props: {
                            controller: relatedEntity,
                            parentController: controller,
                        }
                    },
                ])).flat()
            ] as RouteRecordRaw[])).flat(),
            {
                path: '/:pathMatch(.*)*',
                name: 'not-found',
                component: () => import('../views/NotFoundView.vue')
            }
        ]
    });
    currentRouter.router.beforeEach((to, from, next) => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt.decode(token) as any;
            if (decoded) {
                const exp = decoded.exp;
                const now = new Date().getTime() / 1000;
                if (exp > now) {
                    next();
                    return;
                }
            }
        }
        if (to.name === 'login') {
            next();
            return;
        }
        next({name: 'login'});
    });
    return currentRouter.router;
};


export default createOpenapiRouter;
