<script lang="ts" setup>
import {ErrorMessage, useField} from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
      autocomplete?: string;
      disabled?: boolean;
      label?: string;
      name: string;
      placeholder?: string;
      readOnly?: boolean;
      tabindex?: string;
    }>(),
    {
      readOnly: false,
    },
);

const {errors, handleBlur, meta, setTouched, setValue, value} = useField(() => props.name);

const dateAsString = ref();

watch(value, () => {
  dateAsString.value = value.value ? formatDate(value.value as string) : null;
});

function handleInput(e: any) {
  const dateStr = e.target.value;
  if (dateStr[0] === '1' || dateStr[0] === '2') {
    setValue(dateStr, meta.validated);
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const attributes = useAttrs() as { class: string };
</script>

<template>
  <div class="mt-4">
    <div v-if="label" class="flex justify-between">
      <label :class="attributes.class" :for="name" class="block text-base font-medium leading-6 text-foreground">
        {{ label }}{{ meta.required ? '*' : '' }}
      </label>
      <slot name="suffix"></slot>
    </div>
    <div class="relative mt-2 pb-3 text-left">
      <input
          :id="name"
          :autocomplete="autocomplete"
          :class="{ '!ring-red-500 !text-red-500': meta.validated && errors?.length }"
          :disabled="disabled"
          :name="name"
          :placeholder="placeholder"
          :readonly="readOnly"
          :tabindex="tabindex"
          :value="dateAsString"
          class="bg-background block w-full rounded-md border-0 p-2.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-foreground/50 focus:ring-1 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 read-only:bg-white-100 read-only:ring-white-100 read-only:focus:ring-white-100"
          type="date"
          @blur="handleBlur"
          @focus="setTouched(true)"
          @input="handleInput"
      />
      <ErrorMessage v-if="meta.validated" :name="name" class="absolute -bottom-2.5 text-xs font-light text-red-600"/>
    </div>
  </div>
</template>
