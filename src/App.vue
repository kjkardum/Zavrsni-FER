<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import {currentRouter} from "@/parser/openapiRouter";
import {computed} from "vue";

const route = useRoute();

const logout = () => {
    localStorage.removeItem('token');
    currentRouter.router.push('login');
}

const identifier = computed(() => {
    return localStorage.getItem('identifier') || '';
});
</script>

<template>
    <v-app id="inspire">
        <v-system-bar>
            <v-spacer></v-spacer>
            <v-icon>mdi-square</v-icon>
            <v-icon>mdi-circle</v-icon>
            <v-icon>mdi-triangle</v-icon>
        </v-system-bar>

        <v-navigation-drawer v-model="drawer" :style="{display: route.path === '/login' ? 'none' : 'block'}">
            <v-sheet
                    color="grey-lighten-4"
                    class="pa-4"
            >
                <v-avatar
                        class="mb-4"
                        color="grey-darken-1"
                        size="64"
                >{{ identifier[0].toUpperCase() }}</v-avatar>
                <div>{{ identifier }}</div>
            </v-sheet>

            <v-divider></v-divider>

            <v-list>
                <v-list-item
                        v-for="[icon, text, link, controllerName] in links"
                        :active="route.path.includes(controllerName)"
                        :key="icon"
                        :to="link"
                        link
                >
                    <template v-slot:prepend>
                        <v-icon>{{ icon }}</v-icon>
                    </template>

                    <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item>
              <v-list-item
                @click="logout"
              >
                <template v-slot:prepend>
                  <v-icon>mdi-logout</v-icon>
                </template>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container
                    class="py-8 px-6"
                    fluid
            >
                <RouterView/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import controllerEndpoints from "@/parser/openapiParser";

export default {
    data: () => ({
        cards: ['Today', 'Yesterday'],
        drawer: null,
        links: [
            ['mdi-home', 'Home', '/', '-'],
            ...controllerEndpoints.map(controller =>
                ['mdi-list-box', controller.titleCaseName, `/controller/${controller.name}`, controller.name]
            ),
            ['mdi-information', 'About', '/about', '-'],
        ],
    }),
}
</script>
