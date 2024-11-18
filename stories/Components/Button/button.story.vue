<script lang="ts" setup>
import Button from '../../../components/Button.vue';
import { logEvent } from 'histoire/client'
import {ref} from "vue";

const text = ref('Click me');
</script>

<template>
  <Story
      title="Components/Button/Button"
      :layout="{ type: 'single', iframe: false }"
  >
    <Button @click="logEvent('click', $event)">{{text}}</Button>

    <template #controls>
      <HstText title="default slot" v-model="text" />
    </template>
  </Story>
</template>