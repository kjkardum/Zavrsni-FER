import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        VDataTable: typeof import('vuetify/labs/VDataTable')['VDataTableServer']
        // other lab components here
    }
}