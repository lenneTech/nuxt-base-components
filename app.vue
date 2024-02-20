<script setup lang="ts">
const isExpanded = ref(false)
</script>

<template>
  <div>
    <p class="text-red-500">Test</p>
    <Button size="md" color="primary" appearance="regular">
      Regular
    </Button>
    <Accordion class="text-left" :expanded="isExpanded" @click="isExpanded = !isExpanded">
      <template #title>
        <p class="font-semibold"> Example</p>
      </template>
      <p class="whitespace-pre-wrap"> Example Content </p>
    </Accordion>
  </div>
</template>
