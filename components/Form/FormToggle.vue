<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  disabled?: boolean;
  label?: string;
  name: string;
}>();

const attributes = useAttrs() as { class: string };

const { meta, setTouched, setValue, value } = useField(() => props.name);

function handleInput(value: boolean) {
  setValue(value, meta.validated);
  setTouched(true);
}
</script>

<template>
  <div class="relative mt-4 pb-2">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium leading-6 text-foreground"
      :class="attributes.class"
      >{{ label }}{{ meta.required ? '*' : '' }}</label
    >
    <div class="flex justify-between items-center cursor-pointer" @click="handleInput(!value)">
      <div
        class="w-8 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
        :class="{ 'bg-green-400': value }"
      >
        <div
          class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
          :class="{ 'translate-x-2': value }"
        ></div>
      </div>
    </div>
    <ErrorMessage v-if="meta.validated" class="absolute -bottom-2.5 text-xs font-light text-red-600" :name="name" />
  </div>
</template>
