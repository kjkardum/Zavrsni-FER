<script setup lang="ts">
import type {ControllerEndpointType} from "@/parser/openapiParser";

defineProps<{
    controllerMetadata: ControllerEndpointType
}>();

</script>
<template>
    <div>
        <h1>Controller {{ controllerMetadata.name }}</h1>
        <h2>Metadata:</h2>
        <pre>{{ controllerMetadata }}</pre>
    </div>
</template>

<style scoped>

</style>