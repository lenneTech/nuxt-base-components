<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  disabled?: boolean;
  label?: string;
  multiple?: boolean;
  name: string;
  options: Option[];
  placeholder?: string;
  tabindex?: string;
}>();

interface Option {
  label: string;
  value: any;
}

const attributes = useAttrs() as { class: string };

const { errors, handleBlur, meta, setTouched, setValue, value } = useField(() => props.name);

function handleInput(e: any) {
  setValue(e.target.value, meta.validated);
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
    <select
      :id="name"
      :value="value"
      :name="name"
      :multiple="multiple ?? false"
      :disabled="disabled"
      :tabindex="tabindex"
      class="bg-background mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-foreground ring-1 ring-inset ring-border focus:ring-1 focus:ring-primary-500 sm:text-sm sm:leading-6"
      :class="{ '!ring-error !text-error': meta.validated && errors?.length }"
      @blur="handleBlur"
      @focus="setTouched(true)"
      @input="handleInput"
    >
      <option class="text-foreground/50" :value="null" disabled selected>{{ placeholder }}</option>
      <option v-for="option of options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
    <ErrorMessage v-if="meta.validated" class="absolute -bottom-2.5 text-xs font-light text-red-600" :name="name" />
  </div>
</template>
