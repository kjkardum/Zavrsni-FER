<script setup lang="ts">
import type {ControllerEndpointType} from "@/parser/openapiParser";
import type {Ref} from "vue";
import {ref, toRef, watch} from "vue";
import {tr} from "vuetify/locale";

const props = defineProps<{
    controller: ControllerEndpointType
    dialogDelete: boolean
    setDialogDelete: (value: boolean, toDelete?: boolean) => void
}>();
const dialogDelete = toRef(props, 'dialogDelete');
watch(dialogDelete, (value) => {
    props.setDialogDelete(value);
})
const closeDialogDelete = () => props.setDialogDelete(false);
const closeDialogAndDelete = () => props.setDialogDelete(false, true)

</script>

<template>
    <v-toolbar
            flat
    >
        <v-toolbar-title>Controller {{ props.controller.name }}</v-toolbar-title>
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