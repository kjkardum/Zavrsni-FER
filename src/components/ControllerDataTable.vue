<script setup lang="ts">
import {onMounted, ref} from 'vue'
import type {VDataTableServer} from "vuetify/labs/VDataTable";
import type {ControllerEndpointType} from "@/parser/openapiParser";
import controllerEndpoints, {config} from "@/parser/openapiParser";
import openapiSpecification from "@/assets/openapiSpecification";
import {sentenceCase} from "sentence-case";

const props = defineProps<{
    controller: ControllerEndpointType
}>();


const itemsPerPage = ref(config.controllers[props.controller.name].pagination.defaultPageSize ?? config.globals.pagination.defaultPageSize);
const firstPage = config.controllers[props.controller.name].pagination.firstPageNumber ?? config.globals.pagination.firstPageNumber;
const loadData = async ({page, itemsPerPage, sortBy}: { page: number, itemsPerPage: number, sortBy: any }) => {
    const actualPage = page - 1 + (firstPage ?? 0);
    loading.value = true;
    const res = await fetch(
        config.globals.baseUrl + props.controller.get + '?' + new URLSearchParams(
            config.controllers[props.controller.name].pagination.paginationQueryParams(actualPage, itemsPerPage, '', sortBy) ??
            config.globals.pagination.paginationQueryParams(actualPage, itemsPerPage, '', sortBy) as any
        ),
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    const data = await res.json();
    const mappedData = config.controllers[props.controller.name].pagination.paginationResponse(data) ??
        config.globals.pagination.paginationResponse(data);
    if (!mappedData) throw new Error('Pagination response not found');
    console.log(mappedData)
    mappedData.data = mappedData.data.map(item => {
        const newItem = {};
        for (const key in item) {
            const field = fields.find(field => field.name === key);
            if (field["enum"] && config.globals.enumMapping[field["enum"]]) {
                newItem[key] = config.globals.enumMapping[field["enum"]][item[key]];
            } else {
                newItem[key] = item[key];
            }
        }
        return newItem;
    })
    serverItems.value = mappedData?.data;
    totalItems.value = mappedData?.totalCount;
    //get keys from items and set headers (ignore objects and their foreign keys (objectName '+ objectNameId)
    const keys = Object.keys(mappedData?.data[0])
    const filteredKeys = keys.filter(key => !(
        (key.toLowerCase().endsWith('id') && (
                keys.includes(key.slice(0, -2))
                || key.length !== 2 && !key.toLowerCase().includes(props.controller.name.toLowerCase()))
        ) || typeof mappedData?.data[0][key] === 'object'))
    headers.value = filteredKeys.map(key => {
        return {
            title: sentenceCase(key),
            align: 'start',
            sortable: false,
            key: key,
        }
    })
    loading.value = false;
};

console.log(props.controller.get);
const responseSchema = openapiSpecification.paths[props.controller.get as any].get.responses["200"].content["application/json"].schema;

const createProxyPath = (path: string[] = []) => {
    return new Proxy({}, {
        get(target, name) {
            if (name === '__proto__') {
                return {_ProxyPath: path};
            }
            if (name === '_ProxyPath') {
                return path;
            }
            return createProxyPath([...path, name.toString()]);
        }
    });
}

const getSpecificationModelChildren = (specificationItem: any, levels=20) => {
    if (levels <= 0) {
        return {};
    }
    if (specificationItem["$ref"]) {
        const ref = specificationItem["$ref"].split('/');
        const refName = ref[ref.length - 1];
        return getSpecificationModelChildren(openapiSpecification.components.schemas[refName], levels);
    }
    if (specificationItem.type === 'object') {
        return Object.keys(specificationItem.properties).map(key => {
            const additionalData = {}
            if (specificationItem.properties[key]["$ref"]) {
                additionalData['enum'] = specificationItem.properties[key]["$ref"].split('/').pop();
            }
            return {
                name: key,
                type: specificationItem.properties[key].type,
                value: getSpecificationModelChildren(specificationItem.properties[key], levels - 1),
                ...additionalData
            }
        });
    }
    if (specificationItem.type === 'array') {
        return {
            name: 'array',
            type: 'array',
            value: getSpecificationModelChildren(specificationItem.items, levels - 1)
        }
    }
    if (specificationItem.enum) {
        return specificationItem.enum
    }
}

const paginationMap = config.controllers[props.controller.name].pagination.paginationResponse(createProxyPath()) ??
    config.globals.pagination.paginationResponse(createProxyPath());

console.log(responseSchema);
console.log(paginationMap?.data._ProxyPath, paginationMap?.totalCount._ProxyPath);
let fields = getSpecificationModelChildren(responseSchema, paginationMap?.data._ProxyPath.length + 3);
console.log(fields)
for (const pathItem of paginationMap?.data._ProxyPath) {
    fields = fields.find((field: any) => field.name === pathItem).value;
}
if (fields['type'] == 'array') {
    fields = fields.value;
}

console.log('spec', JSON.stringify(fields, null, 2));

const headers = ref(fields.map((field: any) => {
    return {
        title: sentenceCase(field.name),
        align: 'start',
        sortable: false,
        key: field.name,
    }
}));

const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)
const itemsPerPageOptions = (config.controllers[props.controller.name].pagination.pageSizeOptions ?? config.globals.pagination.pageSizeOptions as number[]).map((value: number) => ({
    title: String(value),
    value: value
}));
</script>

<template>
    <v-card>
        <v-data-table-server
                v-model:items-per-page="itemsPerPage"
                :items-per-page-options="itemsPerPageOptions"
                :headers="headers"
                :items-length="totalItems"
                :items="serverItems"
                :loading="loading"
                class="elevation-1"
                @update:options="loadData"
        ></v-data-table-server>
    </v-card>
</template>

<script lang="ts">
</script>

<style scoped>

</style>