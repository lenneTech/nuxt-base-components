<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    autocomplete?: string;
    disabled?: boolean;
    label?: string;
    modelValue?: any;
    name: string;
    placeholder?: string;
    readOnly?: boolean;
    standalone?: boolean;
    suffixIcon?: string;
    tabindex?: string;
  }>(),
  {
    readOnly: false,
    standalone: false,
  },
);

const { errors, handleBlur, meta, setTouched, setValue, value } = useField(() => props.name, undefined, {
  controlled: !props.standalone,
  initialValue: props.modelValue,
  syncVModel: props.standalone,
});

function handleInput(e: any) {
  setValue(e.target.checked, meta.validated);
}

const attributes = useAttrs() as { class: string };
</script>

<template>
  <div class="mt-4">
    <div class="relative flex gap-x-2 mt-2 pb-3 text-left">
      <input
        :id="name"
        :checked="value"
        :autocomplete="autocomplete"
        type="checkbox"
        :name="name"
        :readonly="readOnly"
        :tabindex="tabindex"
        :disabled="disabled"
        class="rounded border py-1.5 cursor-pointer"
        :class="{ '!ring-error !text-error': meta.validated && errors?.length }"
        :placeholder="placeholder"
        @blur="handleBlur"
        @focus="setTouched(true)"
        @input="handleInput"
      />
      <label
        :for="name"
        class="text-base font-medium leading-6 text-foreground cursor-pointer"
        :class="attributes.class"
        >{{ label }}{{ meta.required ? '*' : '' }}</label
      >
      <ErrorMessage v-if="meta.validated" class="absolute -bottom-2.5 text-xs font-light text-red-600" :name="name" />
    </div>
  </div>
</template>
