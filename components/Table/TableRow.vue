<script lang="ts" setup>
import { tv } from 'tailwind-variants';

const props = defineProps<{
  class?: any;
}>();

const styles = tv({
  base: "border-b transition-colors bg-background hover:bg-zinc-50 data-[state=selected]:bg-zinc-50",
});
</script>

<template>
  <tr :class="styles({ class: props.class })">
    <slot />
  </tr>
</template>