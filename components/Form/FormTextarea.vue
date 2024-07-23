<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
      cols?: number;
      disabled?: boolean;
      label?: string;
      maxlength?: number;
      modelValue?: string;
      name: string;
      placeholder?: string;
      standalone?: boolean;
      tabindex?: string;
    }>(),
    {
      disabled: false,
      standalone: false,
    },
);

const attributes = useAttrs() as { class: string };

const { errors, handleBlur, meta, setTouched, setValue, value } = useField(() => props.name, undefined, {
  controlled: !props.standalone,
  initialValue: props.standalone ? props.modelValue : undefined,
  syncVModel: props.standalone,
});

function handleInput(e: any) {
  setValue(e.target.value, meta.validated);
}
</script>

<template>
  <div class="mt-4">
    <label
        v-if="label"
        :for="name"
        class="block text-base font-medium leading-6 text-foreground"
        :class="attributes.class"
    >{{ label }}{{ meta.required ? '*' : '' }}</label
    >
    <div class="relative mt-2 pb-2 text-left">
      <textarea
          :id="name"
          :value="value as string"
          :cols="cols"
          :maxlength="maxlength"
          :name="name"
          :tabindex="tabindex"
          :disabled="disabled"
          class="bg-background h-28 block resize-none w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-foreground/50 focus:ring-1 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
          :class="{ '!ring-error !text-error': meta.validated && errors?.length }"
          :placeholder="placeholder"
          @blur="handleBlur"
          @focus="setTouched(true)"
          @input="handleInput"
      ></textarea>
      <ErrorMessage v-if="meta.validated" class="absolute -bottom-2.5 text-xs font-light text-red-600" :name="name" />
    </div>
  </div>
</template>
