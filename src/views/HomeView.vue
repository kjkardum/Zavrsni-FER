<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import {config} from "@/parser/openapiParser";
</script>

<template>
  <main>
      <h2>Config stuff...</h2>
      <pre>{{ config }}</pre>
    <TheWelcome />
  </main>
</template>
