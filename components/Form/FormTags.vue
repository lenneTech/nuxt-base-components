<script lang="ts" setup>
import {ErrorMessage, useField} from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
      disabled?: boolean;
      helperText?: string;
      label?: string;
      modelValue?: any;
      name: string;
      options?: string[];
      placeholder?: string;
      position: 'bottom' | 'top';
      readOnly?: boolean;
      standalone?: boolean;
      tabindex?: string;
      useCustomTags?: boolean;
      validateOnInput?: boolean;
    }>(),
    {
      position: 'top',
      readOnly: false,
      standalone: false,
      useCustomTags: true,
      validateOnInput: false,
    },
);

const {errors, handleBlur, meta, setTouched, setValue, value} = useField(() => props.name, undefined, {
  controlled: !props.standalone,
  initialValue: props.standalone ? props.modelValue : undefined,
  syncVModel: props.standalone,
});

const attributes = useAttrs() as { class: string };
const tags = ref<string[]>(value.value?.length ? (value.value as string[]) : []);

const inputValue = ref<string>('');
const inputRef = ref<HTMLElement>();
const inputFocus = ref<boolean>(false);

let defaultOptions: string[];
let selectOptions = ref<string[]>([]);
if (props?.options) {
  defaultOptions = [...props.options];
  selectOptions = ref<string[]>([...props.options]);
}

watch(value, () => {
  tags.value = value.value?.length ? (value.value as string[]) : [];
});

function addTag() {
  if (!inputValue.value?.trim() || !props.useCustomTags) {
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
  if (props.options) {
    selectOptions.value = defaultOptions.filter((e: string) => !value.value.includes(e));
  }
  setValue(tags.value, meta.validated);
}

function handleSelect(input: string) {
  const tag = selectOptions.value.find((e) => e === input?.trim());
  const included = tags.value?.find((e) => e === tag) ?? false;

  if (!tag) {
    return;
  }

  if (!included) {
    tags.value.push(...tag.trim().split(' '));
    setValue(tags.value, meta.validated);
    selectOptions.value = defaultOptions.filter((e: string) => !value.value.includes(e));
  }
  inputValue.value = '';
}

function handleInput(event: any) {
  const value = event.target.value?.toLowerCase()?.trim();
  if (props.options) {
    if (!value) {
      selectOptions.value = defaultOptions;
    } else {
      selectOptions.value = defaultOptions.filter((e: string) => e.toLowerCase().includes(value));
    }
  }
}

function setFocus() {
  inputFocus.value = true;
  inputValue.value = '';
  setTouched(true);
  if (props.options) {
    selectOptions.value = defaultOptions.filter((e: string) => !value.value?.includes(e));
  }
}

function customBlurHandle() {
  handleBlur();
  inputFocus.value = false;

  // Remove input value after timeout to use it as value on click on create custom tag
  setTimeout(() => {
    inputValue.value = '';
  }, 200);
}
</script>

<template>
  <div class="mt-4">
    <div class="flex justify-between">
      <label
          v-if="label"
          :class="attributes.class"
          :for="name"
          class="block text-base font-medium leading-6 text-foreground"
      >{{ label }}{{ meta.required ? '*' : '' }}
      </label>
      <slot name="suffix"></slot>
    </div>
    <div v-if="position === 'top'" class="flex flex-wrap gap-3">
      <span
          v-for="(tag, index) of tags"
          :key="index"
          class="px-3 bg-white py-1 text-sm rounded-full border border-primary-200 flex items-center"
      >{{ tag }} <span class="text-lg text-gray-500 ms-2 cursor-pointer i-bi-x" @click="removeTag(tag)"></span>
      </span>
    </div>
    <div class="relative my-2 text-left">
      <div class="relative w-full flex items-center" @click="inputRef?.focus()">
        <input
            :id="name"
            ref="inputRef"
            v-model="inputValue"
            :class="[
            inputFocus && defaultOptions?.length ? 'rounded-b-none' : '',
            { '!ring-red-500 !text-red-500': meta.validated && errors?.length },
          ]"
            :name="name"
            :placeholder="placeholder"
            autocomplete="off"
            class="bg-background px-3 block w-full rounded-md border-0 p-2.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-foreground/50 focus:ring-1 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            type="text"
            @blur="customBlurHandle()"
            @focus="setFocus"
            @input="handleInput"
            @keydown.enter.prevent="addTag()"
        />
        <span v-if="options" class="i-bi-chevron-down absolute right-1"></span>
        <span
            v-if="!options && useCustomTags"
            class="text-xl i-bi-plus absolute right-1 cursor-pointer"
            @click="addTag()"
        ></span>
      </div>
      <TransitionFade v-if="options" :leave-duration="200" :start-duration="200">
        <div
            v-show="inputFocus && defaultOptions.length"
            :class="`bg-white ring-primary-400 rounded-b-md overflow-hidden${
            inputFocus && defaultOptions.length ? ' ring-1 ring-inset' : ''
          }`"
            :style="`top: ${inputRef ? inputRef.clientHeight : 0}px; max-height: 250px;`"
            class="absolute right-0 left-0 -top-5 z-50 overflow-x-hidden overflow-y-auto flex flex-col justify-start items-start"
        >
          <div v-if="selectOptions.length" class="w-full">
            <button
                v-for="option of selectOptions"
                :key="option"
                :class="[
                { '!text-primary': inputValue === option },
                { 'rounded-b-md': selectOptions.indexOf(option) === selectOptions.length - 1 },
              ]"
                class="text-base font-normal py-2 px-3 hover:bg-primary-100 w-full text-start disabled:text-gray-400 ring-primary-400 hover:ring-1 hover:ring-inset"
                type="button"
                @click="handleSelect(option)"
            >
              {{ option }}
            </button>
          </div>
          <div v-else-if="inputValue && !selectOptions.length" class="w-full">
            <button
                class="text-base font-normal py-2 px-3 hover:bg-primary-100 w-full text-start disabled:text-gray-400"
                @click="addTag()"
            >
              {{ useCustomTags ? `Eintrag ${inputValue} nicht gefunden. Erstellen?` : 'Keine Einträge gefunden' }}
            </button>
          </div>
        </div>
      </TransitionFade>
      <div v-if="helperText" class="text-xs text-gray-500 mt-1">{{ helperText }}</div>
      <ErrorMessage v-if="meta.validated" :name="name" class="absolute -bottom-2.5 text-xs font-light text-red-600"/>
    </div>
    <div v-if="position === 'bottom'" class="flex flex-wrap gap-3">
      <span v-for="(tag, index) of tags" :key="index" class="px-3.5 py-1 rounded-full bg-primary-200 flex items-center"
      >{{ tag }} <span class="text-lg ms-2 cursor-pointer i-bi-x" @click="removeTag(tag)"></span>
      </span>
    </div>
  </div>
</template>
