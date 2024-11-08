<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
      isSubmitting: boolean;
      meta: any;
      resetText: string;
      submitText: string;
    }>(),
    {
      resetText: 'Zurücksetzen',
      submitText: 'Speichern',
    },
);

const emit = defineEmits<{
  (event: 'reset'): void;
}>();
</script>

<template>
  <div class="h-16 flex gap-3 items-center justify-end">
    <TransitionFade>
      <Button v-show="meta.dirty" appearance="outline" @click="emit('reset')">{{ props.resetText }}</Button>
    </TransitionFade>
    <TransitionFade>
      <FormSubmit
          v-show="meta.dirty"
          :is-submitting="isSubmitting"
          :label="props.submitText"
          class="flex items-center justify-center"
      />
    </TransitionFade>
  </div>
</template>
