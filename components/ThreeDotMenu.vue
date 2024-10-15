<script setup lang="ts">
import {onClickOutside, useElementSize} from '@vueuse/core';

const props = defineProps<{
  items: { icon: string; label: string; action: () => void }[];
}>();

const buttonRef = ref<HTMLElement>();
const containerRef = ref<HTMLElement>();
const active = ref(false);
const openUpwards = ref(false);
const contents = ref<HTMLElement>();

const { height: targetHeight } = useElementSize(contents, undefined, {
  box: 'border-box',
});

const height = computed(() => (active.value ? targetHeight.value : 0));

const findScrollableContainer = () => {
  if (buttonRef.value) {
    containerRef.value = buttonRef.value.closest('.menu-container') as HTMLElement;

    if (!containerRef.value) {
      containerRef.value = buttonRef.value.parentElement as HTMLElement;
    }
  }
};

const checkDropdownDirection = () => {
  if (buttonRef.value && height.value && containerRef.value) {
    const buttonRect = buttonRef.value.getBoundingClientRect();
    const containerRect = containerRef.value.getBoundingClientRect();
    const spaceBelow = containerRect.bottom - buttonRect.bottom;
    const spaceAbove = buttonRect.top - containerRect.top;

    openUpwards.value = spaceBelow < height.value && spaceAbove > height.value;
  }
};

onClickOutside(buttonRef, () => {
  active.value = false;
});

function activate() {
  findScrollableContainer();
  active.value = !active.value;
  nextTick(() => {
    checkDropdownDirection();
  });
}
</script>

<template>
  <div class="relative">
    <button
        class="p-2 rounded-md border flex items-center justify-center border-transparent hover:border-zinc-200"
        :class="active ? 'border-zinc-200' : ''"
        ref="buttonRef"
        @click="activate()"
    >
      <span class="i-bi-three-dots-vertical size-4"></span>
    </button>

    <TransitionFade :leave-duration="200" :start-duration="200">
      <div
          :style="{
              height: `${height}px`,
              top: openUpwards ? `-${height || 0}px`  : `${buttonRef?.clientHeight || 0}px`,
              maxHeight: '250px',
           }"
          :class="[height ? 'border' : 'border-0']"
          class="absolute right-3.5 z-40 bg-white rounded-md overflow-hidden overflow-y-auto flex flex-col justify-start items-start border border-zinc-200"
      >
        <div v-if="items?.length" ref="contents" class="w-full">
          <button
              v-for="(item, index) of items"
              :key="index"
              class="text-sm py-2 px-3 hover:bg-primary-100 w-full flex items-center gap-3 text-start disabled:text-gray-400"
              type="button"
              @click="item.action()"
          >
            <span v-if="item.icon" :class="[item.icon, 'size-4']"></span>
            {{ item.label }}
          </button>
        </div>
      </div>
    </TransitionFade>
  </div>
</template>
