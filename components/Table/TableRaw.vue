<script lang="ts" setup>
import {tv} from 'tailwind-variants';

const props = defineProps<{
  class?: any;
}>();

const styles = tv({
  base: 'w-full caption-bottom text-sm table-auto',
});
</script>

<template>
  <table :class="styles({ class: props.class })">
    <slot></slot>
  </table>
</template>
