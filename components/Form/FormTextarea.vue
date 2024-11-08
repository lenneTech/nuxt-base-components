<script lang="ts" setup>
import {ErrorMessage, useField} from 'vee-validate';

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

const {errors, handleBlur, meta, setTouched, setValue, value} = useField(() => props.name, undefined, {
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
        :class="attributes.class"
        :for="name"
        class="block text-base font-medium leading-6 text-foreground"
    >{{ label }}{{ meta.required ? '*' : '' }}</label
    >
    <div class="relative mt-2 pb-2 text-left">
      <div class="relative">
        <textarea
            :id="name"
            :class="{ '!ring-red-500 !text-red-500': meta.validated && errors?.length }"
            :cols="cols"
            :disabled="disabled"
            :maxlength="maxlength"
            :name="name"
            :placeholder="placeholder"
            :tabindex="tabindex"
            :value="value as string"
            class="bg-background h-28 block resize-none w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-foreground/50 focus:ring-1 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            @blur="handleBlur"
            @focus="setTouched(true)"
            @input="handleInput"
        ></textarea>
        <span class="absolute bottom-2 right-2 text-gray-500 text-base font-light">{{ value?.length }}</span>
      </div>
      <ErrorMessage v-if="meta.validated" :name="name" class="absolute -bottom-2.5 text-xs font-light text-red-600"/>
    </div>
  </div>
</template>
