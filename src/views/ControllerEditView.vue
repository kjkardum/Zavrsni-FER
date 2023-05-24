<script setup lang="ts">

import type {ControllerEndpointType} from "@/parser/openapiParser";
import ControllerForm from "@/components/DataTable/ControllerForm.vue";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import {currentRouter} from "@/parser/openapiRouter";
import {config, idPattern} from "@/parser/openapiParser";
import ControllerDataTable from "@/components/DataTable/ControllerDataTable.vue";

const route = useRoute();
const props = defineProps<{
  controller: ControllerEndpointType,
  parentController?: ControllerEndpointType,
}>();

const controllerPrefix = computed(() => {
  return props.parentController ? props.parentController.name + '/' : '';
});

const editId = computed(() => route.params.id as string);
const parentId = computed(() => {
  return props.parentController ? route.params['parentId'] as string : undefined;
});


const router = currentRouter.router;
const cancelEdit = () => {
  router.back();
}

const fields = ref({});

const save = () => {
  const fetchMethod = editId.value ? 'put' : 'post';
  const fetchUrlWithMethod = parentId.value ? props.controller[fetchMethod]?.replace(new RegExp(`\\{${idPattern}\\}`), String(parentId.value)) : props.controller[fetchMethod];
  const fetchUrl = editId.value ? fetchUrlWithMethod?.replace(new RegExp(`\\{${idPattern}\\}`), String(editId.value)) : fetchUrlWithMethod;
  console.log(fetchMethod, fetchUrl, fields.value);
  if (!fetchUrl) throw new Error('missing fetch url');
  fetch(config.globals.baseUrl + fetchUrl, {
    method: fetchMethod.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(fields.value)
  }).then(() => {
    router.back();
  });
}

</script>

<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>{{ editId ? 'Edit' : 'New' }} {{ props.controller.titleCaseName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" @click="cancelEdit">
        Cancel
      </v-btn>
      <v-btn
          color="blue darken-1"
          @click="save"
      >
        Save
      </v-btn>
    </v-toolbar>
    <controller-form :controller="props.controller" :editId="editId" :update-feilds="f => fields = f" :parent-id="parentId" :controller-prefix="controllerPrefix"/>
    <code>{{ JSON.stringify(fields, null, 2) }}</code>
  </v-card>

  <v-card
    v-for="controllerMetadata in props.controller.relatedEntities"
  >
    <controller-data-table :controller="controllerMetadata as any" :parent-id="editId" :controller-prefix="controllerPrefix + props.controller.name + '/'" />
  </v-card>
</template>

<style scoped>

</style>
