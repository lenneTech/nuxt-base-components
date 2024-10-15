<script lang="ts" setup>
import { tv } from 'tailwind-variants';

const props = withDefaults(
    defineProps<{
      colspan?: number;
      class?: any;
    }>(),
    {
      colspan: 1,
    }
);

const styles = tv({
  base: "whitespace-nowrap p-4 align-middle text-sm text-foreground",
});
</script>

<template>
  <TableRow>
    <TableCell :colspan="colspan" :class="styles({ class: props.class })">
      <slot />
    </TableCell>
  </TableRow>
</template>