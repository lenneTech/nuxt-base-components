<script setup lang="ts">
const props = defineProps<{
  actionPayload: any;
  items: { action: () => any; icon: string; label: string }[];
  showActions: boolean;
  showNavigation: boolean;
}>();

const emit = defineEmits<{
  navigate: (actionPayload: any) => void;
}>();
</script>

<template>
  <div class="flex items-center gap-3 justify-center">
    <button
      v-if="showNavigation"
      type="button"
      class="p-2 rounded-md border flex items-center justify-center border-transparent hover:border-zinc-200"
      @click="emit('navigate', actionPayload)"
    >
      <span class="i-bi-chevron-right size-4"></span>
    </button>
    <ThreeDotMenu v-if="showActions" :items="items" :action-payload="actionPayload" />
  </div>
</template>
