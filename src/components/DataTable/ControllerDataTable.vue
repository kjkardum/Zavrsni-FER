<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import type {VDataTableServer} from "vuetify/labs/VDataTable";
import type {ControllerEndpointType} from "@/parser/openapiParser";
import {config, idPattern} from "@/parser/openapiParser";
import openapiSpecification from "@/assets/openapiSpecification";
import {sentenceCase} from "sentence-case";
import {getSpecificationModelChildren} from "@/parser/util/specificationModelChildrenResolver";
import {createProxyPath} from "@/parser/util/proxyPathFollower";
import {loadControllerConfig} from "@/parser/util/overrideableConfigGetter";
import ControllerTableHeader from "@/components/DataTable/ControllerTableHeader.vue";
import {currentRouter} from "@/parser/openapiRouter";

const props = defineProps<{
    controller: ControllerEndpointType,
    controllerPrefix: string,
    parentId?: string
}>();

const controllerName = computed(() => props.controllerPrefix + props.controller.name);
const controllerGet = computed(() => props.parentId ? props.controller.get?.replace(new RegExp(`\\{${idPattern}\\}`), String(props.parentId)) : props.controller.get);
const controllerDelete = computed(() => props.parentId ? props.controller.delete?.replace(new RegExp(`\\{${idPattern}\\}`), String(props.parentId)) : props.controller.delete);

const configGetter = computed(() => loadControllerConfig(controllerName.value));
const useClientPagination = computed(() => configGetter.value(t => t.pagination.source) === 'client');
const itemsPerPageOptions = computed(() => configGetter.value(t => t.pagination.pageSizeOptions).map((value: number) => ({
    title: String(value),
    value: value
})));
const itemsPerPage = computed(() => configGetter.value(t => t.pagination.defaultPageSize));
const firstPage = computed(() => configGetter.value(t => t.pagination.firstPageNumber));

const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)

const init_data = async () => {
    if (useClientPagination.value) {
        loading.value = true;
        const res = await fetch(
            config.globals.baseUrl + controllerGet.value,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
        const data = await res.json();
        let mappedData = config.controllers[controllerName.value].pagination.paginationResponse(data)?.data ?? data;
        if (!mappedData) throw new Error('Pagination response not found');
        mappedData = mappedData.map(item => {
            const newItem = {};
            for (const key in item) {
                const field = fields.value.find(field => field.name === key);
                const lowerName = field.name.toLowerCase();
                const controllersForFields = Object.keys(config.controllers[controllerName.value].controllersForValues);
                const controllerForFieldKey = controllersForFields.find(controller => lowerName.includes(controller.toLowerCase()));
                const {name: controllerForField} = config.controllers[controllerName.value].controllersForValues[controllerForFieldKey ?? '__'] ?? {};
                if (field["ref"] && config.globals.enumMapping[field["ref"]]) {
                    newItem[key] = config.globals.enumMapping[field["ref"]][item[key]];
                } else {
                    newItem[key] = typeof item[key] === 'object'
                        ? (controllerForField && item[key] ? config.controllers[controllerForField].representation(item[key]) : JSON.stringify(item[key]))
                        : item[key].toString();
                }
            }
            return newItem;
        })
        serverItems.value = mappedData;
        console.log('mappedData', mappedData);
        loading.value = false;
    } else {
        await loadServerData({page: 1, itemsPerPage: itemsPerPage.value, sortBy: []});
    }
}
const loadServerData = async ({page, itemsPerPage, sortBy}: { page: number, itemsPerPage: number, sortBy: any }) => {
    const actualPage = page - 1 + firstPage.value;
    loading.value = true;
    const res = await fetch(
        config.globals.baseUrl + controllerGet.value + '?' + new URLSearchParams(
            configGetter.value(t => t.pagination.paginationQueryParams(actualPage, itemsPerPage, '', sortBy))
        ),
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
    const data = await res.json();
    const mappedData = config.controllers[controllerName.value].pagination.paginationResponse(data) ??
        config.globals.pagination.paginationResponse(data);
    if (!mappedData) throw new Error('Pagination response not found');
    console.log(mappedData)
    mappedData.data = mappedData.data.map(item => {
        const newItem = {};
        for (const key in item) {
            const field = fields.value.find(field => field.name === key);
            if (!field) continue;
          if (field["ref"] && config.globals.enumMapping[field["ref"]]) {
                newItem[key] = config.globals.enumMapping[field["ref"]][item[key]];
            } else {
                newItem[key] = item[key].toString();
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
                || key.length !== 2 && !key.toLowerCase().includes(controllerName.value.toLowerCase()))
        ) || typeof mappedData?.data[0][key] === 'object'))
    //TODO: originally set headers here based on filteredKeys
    loading.value = false;
};
const editItem = (item: any) => {
  currentRouter.router?.push({
    name: controllerName.value + '-edit',
    params: {
      id: item.id
    }
  });

}

const dialogDelete = ref(false);
const dialogDeleteItem = ref(null as any);
const deleteItem = (item: any) => {
    dialogDelete.value = true;
    dialogDeleteItem.value = item;
    console.log('delete', item);
}
const setDialogDelete = (value: boolean, toDelete = false) => {
    dialogDelete.value = value;
    if (toDelete && dialogDeleteItem.value) {
        loading.value = true;
        fetch(
            config.globals.baseUrl + controllerDelete.value!.replace(new RegExp(`\\{${idPattern}\\}`), dialogDeleteItem.value.id),
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then(() => {
            loading.value = false;
            serverItems.value = serverItems.value.filter((item: any) => item.id !== dialogDeleteItem.value?.id);
            dialogDeleteItem.value = null;
        });
    }
}

const responseSchema = computed(() => openapiSpecification.paths[props.controller.get as any].get.responses["200"].content["application/json"].schema);

const fields = computed(() => {
    let _fields: any;
    const paginationMap = configGetter.value(t => t.pagination.paginationResponse(createProxyPath()));
    if (!useClientPagination.value) {
        _fields = getSpecificationModelChildren(responseSchema.value, paginationMap?.data._ProxyPath.length + 3);
        for (const pathItem of paginationMap.data._ProxyPath) {
            _fields = _fields.find((field: any) => field.name === pathItem).value;
        }
    } else {
        _fields = getSpecificationModelChildren(responseSchema.value, 3);
    }
    if (_fields['type'] == 'array') {
        _fields = _fields.value;
    }
    console.log('spec', JSON.stringify(_fields, null, 2));
    return _fields;
})


const headers = ref([] as any[]);
watch(fields, async () => {
    headers.value = [...fields.value.map((field: any) => {
        return {
            title: sentenceCase(field.name),
            align: 'start',
            sortable: false,
            key: field.name,
        }
    }),
        {
            text: 'Actions',
            sortable: false,
            key: 'actions',
        }];
    console.log('headers', headers.value);
    await init_data();
}, {immediate: true})
</script>

<template>
    <v-card v-if="!useClientPagination">
        <v-data-table-server
                v-model:items-per-page="itemsPerPage"
                :items-per-page-options="itemsPerPageOptions"
                :headers="headers"
                :items-length="totalItems"
                :items="serverItems"
                :loading="loading"
                class="elevation-1"
                @update:options="loadServerData"
        >
          <template v-slot:top>
            <ControllerTableHeader :controllerName="controllerName" :parent-id="parentId ?? ''" :dialog-delete="dialogDelete" :set-dialog-delete="setDialogDelete"/>
          </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item.raw)" v-if="props.controller.put">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item.raw)" v-if="props.controller.delete">mdi-delete</v-icon>
            </template>
        </v-data-table-server>
    </v-card>
    <v-card v-else>
        <v-data-table
                v-model:items-per-page="itemsPerPage"
                :items-per-page-options="itemsPerPageOptions"
                :headers="headers"
                :items="serverItems"
                :loading="loading"
                class="elevation-1"
        >
            <template v-slot:top>
                <ControllerTableHeader :controllerName="controllerName" :parent-id="parentId ?? ''" :dialog-delete="dialogDelete" :set-dialog-delete="setDialogDelete"/>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item.raw)" v-if="props.controller.put">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item.raw)" v-if="props.controller.delete">mdi-delete</v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts">
</script>
