<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'

const route = useRoute();
</script>

<template>
    <v-app id="inspire">
        <v-system-bar>
            <v-spacer></v-spacer>

            <v-icon>mdi-square</v-icon>

            <v-icon>mdi-circle</v-icon>

            <v-icon>mdi-triangle</v-icon>
        </v-system-bar>

        <v-navigation-drawer v-model="drawer">
            <v-sheet
                    color="grey-lighten-4"
                    class="pa-4"
            >
                <v-avatar
                        class="mb-4"
                        color="grey-darken-1"
                        size="64"
                >K</v-avatar>

                <div>kjkardum@gmail.com</div>
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
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container
                    class="py-8 px-6"
                    fluid
            >
                <RouterView/>

<!--              <v-row>
                    <v-col
                            v-for="card in cards"
                            :key="card"
                            cols="12"
                    >
                        <v-card>

                            <v-list lines="two">
                                <v-list-subheader>{{ card }}</v-list-subheader>
                                <template v-for="n in 6" :key="n">
                                    <v-list-item>
                                        <template v-slot:prepend>
                                            <v-avatar color="grey-darken-1"></v-avatar>
                                        </template>

                                        <v-list-item-title>Message {{ n }}</v-list-item-title>

                                        <v-list-item-subtitle>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus
                                            distinctio similique
                                        </v-list-item-subtitle>
                                    </v-list-item>

                                    <v-divider
                                            v-if="n !== 6"
                                            :key="`divider-${n}`"
                                            inset
                                    ></v-divider>
                                </template>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>-->

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
            ['mdi-list-box', 'Dummy table', '/dummyTable', '-'],
            ...controllerEndpoints.map(controller =>
                ['mdi-list-box', controller.titleCaseName, `/controller/${controller.name}`, controller.name]
            ),
            ['mdi-information', 'About', '/about', '-'],
        ],
    }),
}
</script>