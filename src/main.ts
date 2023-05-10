import {createApp} from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components: {...components, ...labsComponents},
    directives,
})

import './assets/main.css'
import controllerEndpoints, {config} from "@/parser/openapiParser";
import createOpenapiRouter from "@/parser/openapiRouter";

const app = createApp(App)

config.globals.baseUrl = 'https://localhost:7009';
config.globals.pagination.firstPageNumber = 1;
config.globals.pagination.paginationQueryParams = (page: number, pageSize: number, filter: string, sort: any) => ({
    pageNumber: page,
    pageSize: pageSize,
    filter: filter,
})

config.globals.pagination.paginationResponse = (data) => ({
    page: data.pageNumber,
    pageSize: data.pageSize,
    totalCount: data.count,
    data: data.items,
});

config.globals.defineEnumNames("ArticleType", {
    1: "Physical good",
    2: "Digital good",
    3: "Subscription",
    4: "Service",
})

console.log(controllerEndpoints);

console.log(config);

const router = createOpenapiRouter();

app.use(router);

app.use(vuetify);

app.mount('#app')
