<script lang="ts" setup>
import {tv} from 'tailwind-variants';

const props = defineProps<{
  class?: any;
}>();

const styles = tv({
  base: 'whitespace-nowrap text-wrap p-4 align-middle',
});
</script>

<template>
  <td :class="styles({ class: props.class })">
    <slot></slot>
  </td>
</template>
