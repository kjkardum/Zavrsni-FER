<script setup lang="ts">

import type {ControllerEndpointType} from "@/parser/openapiParser";
import {computed} from "vue";
import openapiSpecification from "@/assets/openapiSpecification";
import {getSpecificationModelChildren} from "@/parser/util/specificationModelChildrenResolver";
import {loadControllerConfig} from "@/parser/util/overrideableConfigGetter";
import {config} from "@/parser/openapiParser";
import {sentenceCase} from "sentence-case";

const props = defineProps<{
  controller: ControllerEndpointType,
  editId?: any,
}>();

const configGetter = computed(() => loadControllerConfig(props.controller.name));
const responseSchema = computed(() => openapiSpecification.paths[props.controller[props.editId ? 'put' : 'post'] as any].post.requestBody.content["application/json"].schema);
const fields = computed(() => {
  let _fields: any;
  _fields = getSpecificationModelChildren(responseSchema.value, 3);
  console.log('form', JSON.stringify(_fields, null, 2));
  return _fields;
})
const getEnumValues = (field) => {
  if (field["ref"] && config.globals.enumMapping[field["ref"]]) {
    const res = Object.keys(config.globals.enumMapping[field["ref"]]).map(key => ({
      key,
      title: config.globals.enumMapping[field["ref"]][key]
    }))
    console.log(res);
    return res;
  }
  return field.value.map(value => ({
    key: value,
    title: value
  }))
}

</script>

<template>
    <v-container>
      <v-row
        v-for="field in fields"
        :key="field.name">
        <!-- {{ JSON.stringify(field, null, 2)}} -->
        <v-text-field
          v-if="field.type === 'string' || field.type === 'number'"
          :type="field.type"
          :label="sentenceCase(field.name)"/>
        <v-select
          v-if="field.value !== undefined"
          :label="sentenceCase(field.name)"
          :items="getEnumValues(field)"
          />
        <v-switch
          v-if="field.type === 'boolean'"
          :label="sentenceCase(field.name)"/>
      </v-row>
    </v-container>
</template>

<style scoped>

</style>