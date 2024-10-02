<script lang="ts" setup>
import {ErrorMessage, useField} from 'vee-validate';
import TransitionFade from "~/dev-components/Transition/TransitionFade.vue";

export interface SelectOption {
  label: string;
  value: null | string;
}

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
      options: SelectOption[];
      placeholder?: string;
      readOnly?: boolean;
      standalone?: boolean;
      tabindex?: string;
      searchable?: boolean;
      defaultLabel?: string;
      helperText?: string;
    }>(),
    {
      readOnly: false,
      defaultLabel: 'Keine Auswahl',
      standalone: false,
      searchable: false,
    },
);

const inputRef = ref<HTMLElement>();
const inputFocus = ref<boolean>(false);
const inputValue = ref<string>();

const defaultOptions: SelectOption[] = [...props?.options] || [];
const selectOptions = ref<SelectOption[]>([...props?.options]);


const attributes = useAttrs() as { class: string };

const {errors, handleBlur, meta, setTouched, setValue, value} = useField(() => props.name, undefined, {
  controlled: !props.standalone,
  initialValue: props.standalone ? props.modelValue : undefined,
  syncVModel: props.standalone,
});

if (!meta.required) {
  defaultOptions.unshift({
    label: props.defaultLabel,
    value: null
  })
  selectOptions.value.unshift({
    label: props.defaultLabel,
    value: null
  })
}

inputValue.value = props.modelValue;


function handleSelect(option: any) {
  if (option.value) {
    setValue(props.arrayMode ? [option.value] : option.value, meta.validated);
    inputValue.value = option.label;
  } else {
    setValue('');
    inputValue.value = '';
  }
  setTouched(true);

}

function handleInput(event: any) {
  const value = event.target.value?.toLowerCase()?.trim();

  if (!value) {
    selectOptions.value = defaultOptions;
  } else {
    selectOptions.value = defaultOptions.filter((e: SelectOption) => e.label.toLowerCase().includes(value));
  }
}

function setFocus() {
  inputFocus.value = true;
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
    <div class="relative">
      <div class="mt-2 pb-3">
        <div class="relative w-full flex items-center" @click="inputRef?.focus()">
          <input
              :id="name"
              ref="inputRef"
              v-model="inputValue"
              :class="[inputFocus ? 'rounded-b-none': '', searchable ? '':'cursor-pointer']"
              :name="name"
              :placeholder="placeholder"
              :readonly="!searchable"
              autocomplete="off"
              class="bg-background px-3 block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-foreground/50 focus:ring-1 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 read-only:bg-white-100 read-only:ring-white-100 read-only:focus:ring-white-100"
              type="text"
              @blur="handleBlur(); inputFocus = false; inputValue = '';"
              @focus="setFocus"
              @input="handleInput"
          />
          <span class="i-bi-chevron-down absolute right-1"></span>
        </div>
        <TransitionFade :leave-duration="200" :start-duration="200">
          <div
              v-show="inputFocus && defaultOptions.length"
              :class="'bg-white ring-primary-400 rounded-b-md overflow-hidden' + (inputFocus && defaultOptions.length ? ' ring-2' : '')"
              :style="`top: ${inputRef ? inputRef.clientHeight : 0}px; max-height: 250px;`"
              class="absolute right-0 left-0 -top-5 z-50 overflow-x-hidden overflow-y-auto flex flex-col justify-start items-start"
          >
            <div v-if="selectOptions.length" class="w-full">
              <button
                  v-for="option of selectOptions" :key="option.value!"
                  :class="{ '!text-primary': inputValue === option.label }"
                  class="text-base font-normal py-2 px-3 hover:bg-primary-100 text-primary w-full text-start disabled:text-gray-400"
                  type="button"
                  @click="handleSelect(option)"
              >
                {{ option.label }}
              </button>
            </div>
            <div
                v-else
                class="w-full">
              <button
                  class="text-base font-normal py-2 px-3 hover:bg-primary-100 text-primary w-full text-start disabled:text-gray-400">
                Keine Einträge gefunden
              </button>

            </div>
          </div>
        </TransitionFade>
        <div v-if="helperText" class="text-xs text-gray-500 mt-1">{{ helperText }}</div>
      </div>
      <ErrorMessage v-if="meta.validated" :name="name" class="absolute -bottom-2.5 text-xs font-light text-red-600"/>
    </div>
  </div>
</template>
