<script setup lang="ts">
import type {ControllerEndpointType} from "@/parser/openapiParser";
import ControllerDataTable from "@/components/DataTable/ControllerDataTable.vue";

defineProps<{
    controllerMetadata: ControllerEndpointType
}>();

</script>
<template>
    <div>
        <controller-data-table :controller="controllerMetadata" />
        <h2>Metadata:</h2>
        <pre>{{ controllerMetadata }}</pre>
    </div>
</template>

<style scoped>

</style>