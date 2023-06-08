<script setup lang="ts">
import * as jwt from 'jsonwebtoken';

import {ref, watch} from "vue";
import openapiSpecification from "@/assets/openapiSpecification";
import {config} from "@/parser/openapiParser";
import {getSpecificationModelChildren} from "@/parser/util/specificationModelChildrenResolver";
import {sentenceCase} from "sentence-case";

const loginSchema = openapiSpecification.paths[config.globals.authentication.loginRoute ?? config.globals.baseUrl +  '/login' ].post.requestBody.content["application/json"].schema;

const fields = getSpecificationModelChildren(loginSchema, 3);
const fieldValidators: any = {};
console.log(fields);
fields.forEach(field => {
  fieldValidators[field.name] = {
    regex: field.pattern,
    format: field.format,
    minLength: field.minLength,
    maxLength: field.maxLength,
    required: field.required
  };
});
const vueFormRules = (field) => {
  const rules: any[] = [];
  if (fieldValidators[field.name].required) {
    rules.push((v) => !!v || `${field.name} is required`);
  }
  if (fieldValidators[field.name].minLength) {
    rules.push((v) => (v && v.length >= fieldValidators[field.name].minLength) || `${field.name} must be at least ${fieldValidators[field.name].minLength} characters`);
  }
  if (fieldValidators[field.name].maxLength) {
    rules.push((v) => (v && v.length <= fieldValidators[field.name].maxLength) || `${field.name} must be at most ${fieldValidators[field.name].maxLength} characters`);
  }
  if (fieldValidators[field.name].regex) {
    rules.push((v) => (v && new RegExp(fieldValidators[field.name].regex).test(v)) || `${field.name} must match ${fieldValidators[field.name].regex}`);
  }
  if (fieldValidators[field.name].format === 'email') {
    rules.push((v) => (v && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) || `${field.name} must be valid email`);
  }
  return rules;
}
const rules = {};
fields.forEach(field => {
  rules[field.name] = vueFormRules(field);
});
const fieldValues = ref({});

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
const valid = ref(false);

const submit = async () => {
  if (valid.value) {
    const res = await fetch(config.globals.baseUrl + config.globals.authentication.loginRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fieldValues.value)
    });
    if (res.status === 200) {
      const data = await res.json();
      const token = config.globals.authentication.loginResponseToken(data);
      localStorage.setItem('token', token);
      try {
        const jwt_decoded = jwt.decode(token) as any;

        if (jwt_decoded.email) {
          localStorage.setItem('identifier', jwt_decoded.email);
        } else if (jwt_decoded.username) {
          localStorage.setItem('identifier', jwt_decoded.username);
        } else {
          localStorage.setItem('identifier', 'logged in');
        }
      } catch (e) {
        localStorage.setItem('identifier', 'logged in');
      }
      window.location.href = '/';
    } else {
      console.log(res);
    }
  }
}
</script>

<template>
  <main>
          <v-card class="py-4 px-8">
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <div v-for="field in fields" :key="field.name">
                    <v-select
                        v-if="field.value"
                        :items="getEnumValues(field)"
                        :label="sentenceCase(field.name)"
                        v-model="fieldValues[field.name]"
                        :rules="rules[field.name]"
                    ></v-select>
                    <v-text-field
                        v-else
                        :label="sentenceCase(field.name)"
                        v-model="fieldValues[field.name]"
                        :rules="rules[field.name]"
                        :type="field.format === 'password' ? 'password' : field.type"
                    ></v-text-field>
                  </div>
                  <v-layout justify-space-between>
                    <v-btn @click="submit" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Login</v-btn>
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
  </main>
</template>

<style scoped>

</style>
