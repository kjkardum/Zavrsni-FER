<script setup lang="ts">

import type {ControllerEndpointType} from "@/parser/openapiParser";
import {computed, onMounted, ref, watch} from "vue";
import openapiSpecification from "@/assets/openapiSpecification";
import {getSpecificationModelChildren} from "@/parser/util/specificationModelChildrenResolver";
import {loadControllerConfig} from "@/parser/util/overrideableConfigGetter";
import controllerEndpoints, {config, idPattern} from "@/parser/openapiParser";
import {sentenceCase} from "sentence-case";

const props = defineProps<{
  controller: ControllerEndpointType,
  editId?: any,
  updateFeilds: (fields: any) => void,
}>();

const configGetter = computed(() => loadControllerConfig(props.controller.name));
const responseSchema = computed(() => openapiSpecification.paths[props.controller[props.editId ? 'put' : 'post'] as any][props.editId ? 'put' : 'post'].requestBody.content["application/json"].schema);
const fieldValues = ref({});
const fields = computed(() => {
  let _fields: any;
  _fields = getSpecificationModelChildren(responseSchema.value, 3);
  console.log('form', JSON.stringify(_fields, null, 2));
  return _fields;
})
const getEnumValues = (field) => {
  if (field["ref"] && config.globals.enumMapping[field["ref"]]) {
    const res = Array.from(config.globals.enumMapping[field["ref"]], ([key, value]) => ({
      key,
      title: value
    }));
    console.log(res);
    return res;
  }
  console.log("missing enum mapping", field)
  return field.value.map(value => ({
    key: value,
    title: value
  }))
}
const currentRelatedEntityValues = ref({} as { [key: string]: { key: string, title: string, all_data: any }[]});
const pageSizeForEntityValue = ref({} as { [key: string]: number });
const reachedEnd = ref({} as { [key: string]: boolean });
const hideIntersectWhileLoading = ref({} as { [key: string]: boolean });
const loadedPage = ref({} as { [key: string]: number });
const relatedValueFilters = ref({} as { [key: string]: any });
const getRelatedEntityValues = (field) => {
  const lowerName = field.name.toLowerCase();
  const controllersForFields = Object.keys(config.controllers[props.controller.name].controllersForValues);
  const controllerForFieldKey = controllersForFields.find(controller => lowerName.includes(controller.toLowerCase()));
  if (!controllerForFieldKey) return [];
  const {name: controllerForField, filter: controllerForFieldFilter} = config.controllers[props.controller.name].controllersForValues[controllerForFieldKey];
  relatedValueFilters.value[field.name] = controllerForFieldFilter ?? ((x) => x);
  const controllerMetadata = controllerEndpoints.find(controller => controller.name === controllerForField);
  const controllerConfigGetter = loadControllerConfig(controllerForField);
  const paginationSource = controllerConfigGetter(t => t.pagination.source);
  console.log(controllerForFieldKey, controllerForField, paginationSource, controllerMetadata);
  if (paginationSource === 'client') {
    if (reachedEnd.value[field.name]) return currentRelatedEntityValues.value[field.name];
    hideIntersectWhileLoading.value[field.name] = true;
    fetch(config.globals.baseUrl + controllerMetadata.get, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(data => {
      //const mappedData = controllerConfigGetter(t => t.pagination.paginationResponse(data));
      //console.log(mappedData);
      currentRelatedEntityValues.value[field.name] = data.map(t => ({
        key: t.id,
        title: config.controllers[controllerForField].representation(t)
      }));
      reachedEnd.value[field.name] = true;
      hideIntersectWhileLoading.value[field.name] = false;
      console.log(config.controllers[controllerForField])
      console.log(currentRelatedEntityValues.value[field.name]);
    })
  } else {
    if (reachedEnd.value[field.name]) return currentRelatedEntityValues.value[field.name];
    const DEFAULT_PER_PAGE = 10;
    const actualPage = ((currentRelatedEntityValues.value[field.name] ?? []).length/(pageSizeForEntityValue.value[field.name] ?? DEFAULT_PER_PAGE)) + controllerConfigGetter(t => t.pagination.firstPageNumber)
    hideIntersectWhileLoading.value[field.name] = true;
    fetch(config.globals.baseUrl + controllerMetadata.get + '?' + new URLSearchParams(
        controllerConfigGetter(t => t.pagination.paginationQueryParams(actualPage, pageSizeForEntityValue.value[field.name] ?? DEFAULT_PER_PAGE, '', {order: 'asc', key: 'id'}))
    ), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(data => {
      const mappedData = controllerConfigGetter(t => t.pagination.paginationResponse(data));
      console.log(mappedData);
      if (loadedPage.value[field.name] && loadedPage.value[field.name] >= mappedData.page) {
        return;
      }
      currentRelatedEntityValues.value[field.name] = [...(currentRelatedEntityValues.value[field.name] ?? []),...mappedData.data.map(t => ({
        key: t.id,
        title: config.controllers[controllerForField].representation(t),
        all_data: t,
      }))];
      pageSizeForEntityValue.value[field.name] = pageSizeForEntityValue.value[field.name] ?? mappedData.pageSize;
      loadedPage.value[field.name] = mappedData.page;
      if (mappedData.totalCount <= (currentRelatedEntityValues.value[field.name] ?? []).length) {
        reachedEnd.value[field.name] = true;
      }
      hideIntersectWhileLoading.value[field.name] = false;
      console.log(config.controllers[controllerForField])
      console.log(currentRelatedEntityValues.value[field.name]);
      console.log(reachedEnd.value[field.name]);
    })
  }
  return currentRelatedEntityValues[field.name];
}

const endIntersectField = (field) => () => getRelatedEntityValues(field);

watch(props.editId, (newVal) => {
  if (props.editId) {
    console.log("fetching", props.editId);
    fetch(config.globals.baseUrl + props.controller.getById.replace(new RegExp(`\\{${idPattern}\\}`), String(props.editId)), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(data => {
      fieldValues.value = data;
      //load related for necessary
    })
  }
}, {immediate: true});

watch(fieldValues, (newVal) => {
  props.updateFeilds(newVal);
}, {deep: true})

</script>

<template>
    <v-container>
      <v-row
        v-for="field in fields"
        :key="field.name">
        <!-- {{ JSON.stringify(field, null, 2)}} -->
        <v-text-field
          v-if="(field.type === 'string' || field.type === 'number') && !field.name.match(new RegExp(idPattern))"
          :type="field.type"
          :label="sentenceCase(field.name)"
          :model-value="fieldValues[field.name]"
          @update:model-value="fieldValues[field.name] = field.type === 'number' ? Number($event) : $event"
        />
        <v-select
          v-if="(field.type === 'string' || field.type === 'number') && field.name.match(new RegExp(idPattern))"
          :label="sentenceCase(field.name)"
          :items="(relatedValueFilters[field.name] ? currentRelatedEntityValues[field.name].filter(t => relatedValueFilters[field.name](t.all_data)) : currentRelatedEntityValues[field.name])"
          item-value="key"
          item-text="title"
          v-model="fieldValues[field.name]"
        >
          <template v-slot:append-item>
            <div
                :style="{display: hideIntersectWhileLoading[field.name] ? 'none' : 'block'}"
                v-intersect="endIntersectField(field)" />
          </template></v-select>
        <v-select
          v-if="field.value !== undefined && (typeof field.value[0] === 'string' || typeof field.value[0] === 'number')"
          :label="sentenceCase(field.name)"
          :items="getEnumValues(field)"
          item-value="key"
          item-text="title"
          v-model="fieldValues[field.name]"
        />
        <v-switch
          v-if="field.type === 'boolean'"
          :label="sentenceCase(field.name)"
          v-model="fieldValues[field.name]"
          />
      </v-row>
    </v-container>
</template>

<style scoped>

</style>