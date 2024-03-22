<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    label?: string;
    name: string;
    placeholder?: string;
    readonly?: boolean;
    tabindex?: string;
    validateOnInput?: boolean;
  }>(),
  {
    readonly: false,
    validateOnInput: false,
  },
);

const { errors, handleBlur, meta, setTouched, setValue, value } = useField(() => props.name);

const attributes = useAttrs() as { class: string };

const tags = ref<string[]>(value.value?.length ? (value.value as string[]) : []);
const inputValue = ref<string>('');

function addTag() {
  if (!inputValue.value?.trim()) {
    return;
  }

  if (inputValue.value?.trim()) {
    tags.value.push(...inputValue.value.trim().split(' '));
  }

  setValue(tags.value, meta.validated);

  inputValue.value = '';
}

function removeTag(tag: string) {
  tags.value.splice(
    tags.value.findIndex((e) => e === tag),
    1,
  );
  setValue(tags.value, meta.validated);
}
</script>

<template>
  <div class="mt-4">
    <div class="flex justify-between">
      <label
        v-if="label"
        :for="name"
        class="block text-base font-medium leading-6 text-foreground"
        :class="attributes.class"
        >{{ label }}{{ meta.required ? '*' : '' }}
      </label>
      <slot name="suffix"></slot>
    </div>
    <div class="flex flex-wrap gap-3">
      <span v-for="(tag, index) of tags" :key="index" class="px-3.5 py-1 rounded-full bg-primary-200"
        >{{ tag }} <Icon name="xmark" class="text-xs ms-2 cursor-pointer" @click="removeTag(tag)" />
      </span>
    </div>
    <div class="relative mt-2 pb-3 text-left">
      <input
        :id="name"
        v-model="inputValue"
        type="text"
        :name="name"
        :readonly="readonly"
        :tabindex="tabindex"
        :disabled="disabled"
        class="bg-background block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-foreground/50 focus:ring-1 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
        :class="{ '!ring-error !text-error': meta.validated && errors?.length }"
        :placeholder="placeholder"
        @blur="handleBlur"
        @focus="setTouched(true)"
        @keydown.enter.prevent="addTag()"
      />
      <button
        type="button"
        class="absolute top-0 h-9 right-2 flex items-center justify-center text-2xl"
        @click="addTag()"
      >
        <Icon name="plus" class="text-xl" />
      </button>
      <ErrorMessage v-if="meta.validated" class="absolute -bottom-2.5 text-xs font-light text-red-600" :name="name" />
    </div>
  </div>
</template>
