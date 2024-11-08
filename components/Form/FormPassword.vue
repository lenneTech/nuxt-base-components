<script lang="ts" setup>
import {ErrorMessage, useField} from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  autocomplete?: string;
  label: string;
  name: string;
  placeholder?: string;
  tabindex?: string;
}>();

enum InputType {
  PASSWORD = 'password',
  TEXT = 'text',
}

const type = ref<InputType>(InputType.PASSWORD);
const attributes = useAttrs() as { class: string };

const {errors, handleBlur, meta, setTouched, setValue, value} = useField(() => props.name);

function handleInput(e: any) {
  setValue(e.target.value, meta.validated);
}

function changeType() {
  type.value = type.value === InputType.PASSWORD ? InputType.TEXT : InputType.PASSWORD;
}
</script>

<template>
  <div class="mt-4">
    <div class="flex justify-between items-center">
      <label
          v-if="label"
          :class="attributes.class"
          :for="name"
          class="block text-base font-medium leading-6 text-foreground"
      >{{ label }}{{ meta.required ? '*' : '' }}</label
      >
      <slot name="suffix"></slot>
    </div>
    <div class="relative mt-2 pb-2 text-left">
      <div class="relative">
        <input
            :id="name"
            :autocomplete="autocomplete"
            :class="{ '!ring-red-500 !text-red-500': meta.validated && errors?.length }"
            :name="name"
            :placeholder="placeholder"
            :tabindex="tabindex"
            :type="type"
            :value="value"
            class="bg-background block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-foreground/50 focus:ring-1 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            @blur="handleBlur"
            @focus="setTouched(true)"
            @input="handleInput"
        />
        <button
            class="absolute right-2 bottom-1/2 transform translate-y-1/2 text-primary flex items-center hover:text-primary-700"
            tabindex="-1"
            type="button"
            @click="changeType()"
        >
          <span v-if="type === 'password'" class="i-bi-eye"></span>
          <span v-else class="i-bi-eye-slash"></span>
        </button>
      </div>
      <ErrorMessage v-if="meta.validated" :name="name" class="absolute -bottom-2.5 text-xs font-light text-red-600"/>
    </div>
  </div>
</template>
