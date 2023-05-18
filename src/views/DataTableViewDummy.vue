<script setup lang="ts">

import ControllerDataTable from "@/components/DataTable/ControllerDataTable.vue";
import type {ControllerEndpointType} from "@/parser/openapiParser";
import controllerEndpoints from "@/parser/openapiParser";
import ControllerForm from "@/components/DataTable/ControllerForm.vue";

const articlesController = controllerEndpoints.find(controller => controller.name === 'Articles');
</script>

<template>
  <h2>Data table</h2>
  <controller-data-table :controller="articlesController as ControllerEndpointType"/>
  <h2>Form</h2>
  <controller-form :controller="articlesController as ControllerEndpointType"/>
  <h2>Rest</h2>
</template>

<style scoped>

</style>