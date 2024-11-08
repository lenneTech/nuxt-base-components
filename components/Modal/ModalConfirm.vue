<script lang="ts" setup>
import type {ModalContext} from '~/composables/use-modal';

const props = defineProps<{
  context: ModalContext<{
    cancelText: string;
    confirmColor?: 'danger' | 'green' | 'lightprimary' | 'primary' | 'secondary' | 'yellow';
    confirmText: string;
    text: string;
    title: string;
  }>;
}>();
const {close} = useModal();
</script>

<template>
  <Modal
      :show="context.show"
      :show-inner="context.showInner"
      :size="context.size"
      class="p-10 relative"
      @cancel="context.closable ? close() : null"
  >
    <div class="flex items-center justify-center mb-2">
      <div class="font-semibold text-xl text-foreground">
        {{ context?.data?.title }}
      </div>
      <button class="absolute top-5 right-5" @click="close()">
        <span class="i-bi-x text-2xl hover:text-primary-500 duration-200"></span>
      </button>
    </div>
    <div class="mb-5 text-foreground">
      {{ context?.data?.text }}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Button appearance="outline" @click="context?.confirm?.(false)">
        {{ context?.data?.cancelText || 'Abbrechen' }}
      </Button>
      <Button :color="context?.data?.confirmColor || 'primary'" @click="context?.confirm?.(true)">
        {{ context?.data?.confirmText || 'Ok' }}
      </Button>
    </div>
  </Modal>
</template>
