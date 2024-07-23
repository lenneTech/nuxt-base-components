<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="has-tooltip flex items-center justify-center">
    <span class="tooltip w-72 border border-primary rounded-xl shadow-lg p-2 bg-white text-foreground">{{ text }}</span>
    <slot></slot>
  </div>
</template>

<style>
.has-tooltip {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  visibility: hidden;

  /* vertically center */
  top: 50%;
  transform: translateY(-50%);

  /* move to right */
  left: 100%;
  margin-left: 10px; /* and add a small left margin */
}

.has-tooltip:hover .tooltip {
  visibility: visible;
  z-index: 50;
}
</style>
