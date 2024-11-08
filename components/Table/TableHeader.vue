<script lang="ts" setup>
import {tv} from 'tailwind-variants';

const props = defineProps<{
  class?: any;
}>();

const styles = tv({
  base: '[&_tr]:border-0',
});
</script>

<template>
  <thead :class="styles({ class: props.class })">
  <slot></slot>
  </thead>
</template>
