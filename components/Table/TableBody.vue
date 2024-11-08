<script lang="ts" setup>
import {tv} from 'tailwind-variants';

const props = defineProps<{
  class?: any;
}>();

const styles = tv({
  base: '[&_tr:last-child]:border-0',
});
</script>

<template>
  <tbody :class="styles({ class: props.class })">
  <slot></slot>
  </tbody>
</template>
