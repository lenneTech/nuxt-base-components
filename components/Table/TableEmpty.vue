<script lang="ts" setup>
import {tv} from 'tailwind-variants';

const props = withDefaults(
    defineProps<{
      class?: any;
      colspan?: number;
    }>(),
    {
      colspan: 1,
    },
);

const styles = tv({
  base: 'whitespace-nowrap p-4 align-middle text-sm text-foreground',
});
</script>

<template>
  <TableRow>
    <TableCell :class="styles({ class: props.class })" :colspan="colspan">
      <slot></slot>
    </TableCell>
  </TableRow>
</template>
