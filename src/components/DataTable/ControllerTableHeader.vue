<script setup lang="ts">
import type {ControllerEndpointType} from "@/parser/openapiParser";
import type {Ref} from "vue";
import {computed, ref, toRef, watch} from "vue";
import {tr} from "vuetify/locale";
import {currentRouter} from "@/parser/openapiRouter";
import {sentenceCase} from "sentence-case";

const props = defineProps<{
    controllerName: string,
    controllerPath: string,
    dialogDelete: boolean
    setDialogDelete: (value: boolean, toDelete?: boolean) => void,
    parentId: string,
}>();
const dialogDelete = toRef(props, 'dialogDelete');
watch(dialogDelete, (value) => {
    props.setDialogDelete(value);
})
const closeDialogDelete = () => props.setDialogDelete(false);
const closeDialogAndDelete = () => props.setDialogDelete(false, true)
const newItem = () => {
  currentRouter.router?.push({
    name:  props.controllerName + '-new',
    params: {
      parentId: props.parentId
    }
  });
}
const printableControllerName = computed(() => sentenceCase(props.controllerName.replace('/', ' ')))
</script>

<template>
    <v-toolbar
            flat
    >
        <v-toolbar-title>{{ printableControllerName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            @click="newItem"
        >
            New
        </v-btn>
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="closeDialogDelete">Cancel</v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="closeDialogAndDelete">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-toolbar>
</template>