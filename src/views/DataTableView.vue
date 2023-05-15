<script setup lang="ts">

import ControllerDataTable from "@/components/DataTable/ControllerDataTable.vue";
import type {ControllerEndpointType} from "@/parser/openapiParser";
import controllerEndpoints from "@/parser/openapiParser";

const articlesController = controllerEndpoints.find(controller => controller.name === 'Articles');
</script>

<template>
    <controller-data-table :controller="articlesController as ControllerEndpointType" />
</template>

<style scoped>

</style>