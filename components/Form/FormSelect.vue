<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
      arrayMode?: boolean;
      disabled?: boolean;
      label?: string;
      modelValue?: string;
      multiple?: boolean;
      name: string;
      options: Option[];
      placeholder?: string;
      readOnly?: boolean;
      standalone?: boolean;
      tabindex?: string;
    }>(),
    {
      readOnly: false,
      standalone: false,
    },
);

interface Option {
  label: string;
  value: any;
}

const attributes = useAttrs() as { class: string };

const { errors, handleBlur, meta, setTouched, setValue, value } = useField(() => props.name, undefined, {
  controlled: !props.standalone,
  initialValue: props.standalone ? props.modelValue : undefined,
  syncVModel: props.standalone,
});

function handleInput(e: any) {
  setValue(props.arrayMode ? [e.target.value] : e.target.value, meta.validated);
  setTouched(true);
}
</script>

<template>
  <div class="relative mt-4">
    <label
        v-if="label"
        :for="name"
        class="block text-base font-medium leading-6 text-foreground"
        :class="attributes.class"
    >{{ label }}{{ meta.required ? '*' : '' }}</label
    >
    <div class="mt-2 pb-3">
      <select
          :id="name"
          :value="value"
          :name="name"
          :multiple="multiple ?? false"
          :disabled="disabled || readOnly"
          :tabindex="tabindex"
          class="bg-background text-base block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-foreground ring-1 ring-inset ring-border focus:ring-1 focus:ring-primary-500 sm:text-sm sm:leading-6"
          :class="{
          '!ring-error !text-error': meta.validated && errors?.length,
          'text-foreground/50': !value,
          'bg-white-100 ring-white-100 focus:ring-white-100 opacity-100': readOnly,
        }"
          @blur="handleBlur"
          @focus="setTouched(true)"
          @change="handleInput"
      >
        <option value="" disabled :selected="true">{{ placeholder }}</option>
        <option v-for="option of options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
    <ErrorMessage v-if="meta.validated" class="absolute -bottom-2.5 text-xs font-light text-red-600" :name="name" />
  </div>
</template>
