<script lang="ts" setup>
const isExpanded = ref(false)
</script>

<template>
  <div>
    <p class="text-red-500">Test</p>
    <Button appearance="regular" color="primary" size="md">
      Regular
    </Button>
    <Accordion :expanded="isExpanded" class="text-left" @click="isExpanded = !isExpanded">
      <template #title>
        <p class="font-semibold"> Example</p>
      </template>
      <p class="whitespace-pre-wrap"> Example Content </p>
    </Accordion>
  </div>
</template>
