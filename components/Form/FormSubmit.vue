<script setup lang="ts">
const props = defineProps<{
  block?: boolean;
  disabled?: boolean;
  isSubmitting?: boolean;
  label: string;
  tabindex?: string;
}>();
</script>

<template>
  <div>
    <Button v-if="isSubmitting" :block="block" type="button" disabled>
      <span class="animate-bounce">.</span>
      <span class="animate-bounce delay-150">.</span>
      <span class="animate-bounce delay-300 me-1">.</span>
      Loading
    </Button>
    <Button v-else :block="block" type="submit" :disabled="disabled" :tabindex="tabindex">
      <span v-if="$slots.default" class="flex items-center justify-center gap-3">
        <slot></slot>
      </span>
      <span v-else>{{ label }}</span>
    </Button>
  </div>
</template>
