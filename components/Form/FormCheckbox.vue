<script lang="ts" setup>
import {ErrorMessage, useField} from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
      ariaLabel?: string;
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
      wrapperClass?: string;
    }>(),
    {
      readOnly: false,
      standalone: false,
    },
);

const {errors, handleBlur, meta, setTouched, setValue, value} = useField(() => props.name, undefined, {
  controlled: !props.standalone,
  initialValue: props.modelValue,
  syncVModel: props.standalone,
});

const indeterminate = ref<boolean>(false);

watch(value, () => {
  indeterminate.value = value.value === 'indeterminate';
});

function handleInput(e: any) {
  setValue(e.target.checked, meta.validated);
}

const attributes = useAttrs() as { class: string };
</script>

<template>
  <div :class="[wrapperClass]" class="mt-4">
    <div class="relative flex gap-x-2 mt-2 pb-3 text-left">
      <input
          :id="name"
          :aria-label="ariaLabel"
          :autocomplete="autocomplete"
          :checked="value"
          :class="{ '!ring-red-500 !text-red-500': meta.validated && errors?.length }"
          :disabled="disabled"
          :indeterminate="indeterminate"
          :name="name"
          :placeholder="placeholder"
          :readonly="readOnly"
          :tabindex="tabindex"
          class="rounded border py-1.5 cursor-pointer"
          type="checkbox"
          @blur="handleBlur"
          @focus="setTouched(true)"
          @input="handleInput"
      />
      <label
          :class="attributes.class"
          :for="name"
          class="text-base font-medium leading-6 text-foreground cursor-pointer"
      >{{ label }}{{ meta.required && label ? '*' : '' }}</label
      >
      <slot name="suffix"></slot>
      <ErrorMessage v-if="meta.validated" :name="name" class="absolute -bottom-2.5 text-xs font-light text-red-600"/>
    </div>
  </div>
</template>
