<script setup lang="ts">
const props = defineProps<{
  isSubmitting: boolean;
  meta: any;
}>();

const emit = defineEmits<{
  (event: 'reset'): void;
}>();
</script>

<template>
  <div class="h-16 flex gap-3 items-center justify-end">
    <TransitionFade>
      <Button v-show="meta.dirty" appearance="outline" @click="emit('reset')">Zurücksetzen</Button>
    </TransitionFade>
    <TransitionFade>
      <FormSubmit
        v-show="meta.dirty"
        class="flex items-center justify-center"
        label="Speichern"
        :is-submitting="isSubmitting"
      />
    </TransitionFade>
  </div>
</template>
