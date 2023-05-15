import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        VDataTableServer: typeof import('vuetify/labs/VDataTable')['VDataTableServer'],
        VDataTable: typeof import('vuetify/components/VDataTable')['VDataTable']
        // other lab components here
    }
}