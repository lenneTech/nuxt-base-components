<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
      autocomplete?: string;
      disabled?: boolean;
      keySubmit?: boolean;
      iconSubmit?: boolean;
      label?: string;
      wrapperClass?: string;
      containerClass?: string;
      modelValue?: any;
      name: string;
      placeholder?: string;
      readOnly?: boolean;
      standalone?: boolean;
      suffixIcon?: string;
      tabindex?: string;
      type?: string;
    }>(),
    {
      iconSubmit: false,
      keySubmit: false,
      readOnly: false,
      standalone: false,
      type: 'text',
    },
);

const emit = defineEmits<{
  (event: 'submit', value: any): any;
}>();

const { errors, handleBlur, meta, setTouched, setValue, value } = useField(() => props.name, undefined, {
  controlled: !props.standalone,
  initialValue: props.modelValue,
  syncVModel: props.standalone,
});

function handleInput(e: any) {
  setValue(e.target.value, meta.validated);
}

function onSubmit(value: string) {
  emit('submit', value);
}

const attributes = useAttrs() as { class: string };
</script>


<template>
  <div :class="['mt-4', wrapperClass]">
    <div v-if="label" class="flex gap-5">
      <label :for="name" class="block text-base font-medium leading-3 text-foreground" :class="attributes.class"
      >{{ label }}{{ meta.required ? '*' : '' }}</label
      >
      <slot name="suffix"></slot>
    </div>
    <div :class="['relative mt-2 pb-3 text-left', containerClass]">
      <input
          :id="name"
          :value="value"
          :autocomplete="autocomplete"
          :type="type"
          :name="name"
          :readonly="readOnly"
          :tabindex="tabindex"
          :disabled="disabled"
          class="bg-background block w-full rounded-md border-0 p-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-foreground/50 focus:ring-1 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 read-only:bg-white-100 read-only:ring-white-100 read-only:focus:ring-white-100 disabled:opacity-60"
          :class="{ '!ring-error !text-error': meta.validated && errors?.length }"
          :placeholder="placeholder"
          @blur="handleBlur"
          @focus="setTouched(true)"
          @input="handleInput"
          @keydown.enter="keySubmit ? onSubmit(value) : null"
      />
      <span
          v-if="suffixIcon"
          class="absolute top-2.5 right-2.5 size-4"
          :class="[iconSubmit ? 'cursor-pointer' : '', suffixIcon]"
          @click="iconSubmit ? onSubmit(value) : null"
      ></span>
      <ErrorMessage v-if="meta.validated" class="absolute -bottom-2.5 text-xs font-light text-red-600" :name="name" />
    </div>
  </div>
</template>
