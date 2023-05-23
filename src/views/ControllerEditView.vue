<script setup lang="ts">

import type {ControllerEndpointType} from "@/parser/openapiParser";
import ControllerForm from "@/components/DataTable/ControllerForm.vue";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import {currentRouter} from "@/parser/openapiRouter";
import {config, idPattern} from "@/parser/openapiParser";

const route = useRoute();
const props = defineProps<{
  controller: ControllerEndpointType,
}>();

const editId = computed(() => route.params.id);

const router = currentRouter.router;
const cancelEdit = () => {
  router.back();
}

const fields = ref({});

const save = () => {
  const fetchMethod = editId.value ? 'put' : 'post';
  const fetchUrl = editId.value ? props.controller[fetchMethod].replace(new RegExp(`\\{${idPattern}\\}`), String(editId.value)) : props.controller[fetchMethod];
  console.log(fetchMethod, fetchUrl, fields.value);
  fetch(config.globals.baseUrl + fetchUrl, {
    method: fetchMethod.toUpperCase(),
    headers: {
      'Content-Type': 'application/json'
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
    <controller-form :controller="props.controller" :editId="editId" :update-feilds="f => fields = f"/>
    <code>{{ JSON.stringify(fields, null, 2) }}</code>
  </v-card>
</template>

<style scoped>

</style>