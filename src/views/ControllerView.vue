<script setup lang="ts">
import type {ControllerEndpointType} from "@/parser/openapiParser";
import ControllerDataTable from "@/components/DataTable/ControllerDataTable.vue";
import {computed} from "vue";
import {useRoute} from "vue-router";

const props = defineProps<{
    controllerMetadata: ControllerEndpointType,
    parentController?: ControllerEndpointType
}>();

const controllerPrefix = computed(() => {
    return props.parentController ? props.parentController.name + '/' : '';
});

const route = useRoute();
const parentId = computed(() => {
    return props.parentController ? route.params['parentId'] as string : undefined;
});

</script>
<template>
    <div>
        <controller-data-table :controller="controllerMetadata" :parent-id="parentId" :controller-prefix="controllerPrefix" />
        <h2>Metadata:</h2>
        <pre>{{ controllerMetadata }}</pre>
    </div>
</template>

<style scoped>

</style>
