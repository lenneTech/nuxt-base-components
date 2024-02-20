<script setup lang="ts">
const isExpanded = ref(false)
</script>

<template>
  <div>
    <p class="text-red-500">Test</p>
    <BaseButton size="md" color="primary" appearance="regular">
      Regular
    </BaseButton>
    <BaseAccordion class="text-left" :expanded="isExpanded" @click="isExpanded = !isExpanded">
      <template #title>
        <p class="font-semibold"> Example</p>
      </template>
      <p class="whitespace-pre-wrap"> Example Content </p>
    </BaseAccordion>
  </div>
</template>
