<script setup lang="ts">

import type {ControllerEndpointType} from "@/parser/openapiParser";
import ControllerForm from "@/components/DataTable/ControllerForm.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";
import {currentRouter} from "@/parser/openapiRouter";

const route = useRoute();
const props = defineProps<{
  controller: ControllerEndpointType,
}>();

const editId = computed(() => route.params.editId);

const router = currentRouter.router;
const cancelEdit = () => {
  router.back();
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
      <v-btn color="blue darken-1">
        Save
      </v-btn>
    </v-toolbar>
    <controller-form :controller="props.controller" :editId="editId" />
  </v-card>
</template>

<style scoped>

</style>