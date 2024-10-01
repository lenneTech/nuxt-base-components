<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate';

import ModalCroppingImage from '~/components/CroppingModal.vue';

const props = withDefaults(
  defineProps<{
    accept?: string;
    cropping?: boolean;
    disabled?: boolean;
    label?: string;
    maxSize?: number;
    multiple?: boolean;
    name: string;
    readonly?: boolean;
    required?: boolean;
    showMediaPool: boolean;
    tabindex?: string;
    validateOnInput?: boolean;
  }>(),
  {
    accept: 'image/*',
    maxSize: 4000000,
    multiple: false,
    readonly: false,
    validateOnInput: false,
  },
);

const config = useRuntimeConfig();
const { close, open } = useModal();
const { errors, handleBlur, meta, setErrors, setTouched, setValue, value } = useField(() => props.name);

const blob = ref<string>('');
const input = ref<HTMLElement>();

if (value.value) {
  await getPreviewUrl(value.value as string);
}

watch(
  () => value.value,
  async () => {
    await getPreviewUrl(value.value as string);
  },
);

async function handleInput(e: any) {
  if (!e) {
    blob.value = '';
    return;
  }
  const file = e.target.files[0];

  if (file.size > props.maxSize) {
    setErrors('Das Bild darf nicht größer als ' + props.maxSize / 1000000 + 'MB sein.');
    return;
  }

  if (props.cropping) {
    // open cropper modal
    open({
      component: ModalCroppingImage,
      data: {
        confirm: async (croppedFile: File | null) => {
          if (!croppedFile) {
            close();
            return;
          }
          // There is an error that is not affecting the function
          value.value = croppedFile;
          await getPreviewUrl(croppedFile);
          close();
        },
        img: file,
      },
      size: 'lg',
    });
  } else {
    await getPreviewUrl(file);
  }
}

async function getPreviewUrl(src: File | string) {
  if (!src) {
    blob.value = '';
    return;
  }

  const validHexChars = /^[0-9a-fA-F]{24}$/;
  if (typeof src === 'object' && validHexChars.test(src?.id)) {
    blob.value = config.public.apiUrl + '/files/' + src.id;
  } else if (typeof src === 'string' && validHexChars.test(src)) {
    blob.value = config.public.apiUrl + '/files/' + src;
  } else if (typeof src === 'string') {
    blob.value = src;
  } else if (src instanceof File) {
    blob.value = URL.createObjectURL(src);
  }
}
</script>

<template>
  <div class="mt-4">
    <div class="flex justify-between">
      <label v-if="label" :for="name" class="block text-base font-medium leading-6 text-foreground"
        >{{ label }}{{ meta.required ? '*' : '' }}</label
      >
      <slot name="suffix"></slot>
    </div>
    <div class="relative mt-2 pb-3 flex flex-col">
      <div v-show="!blob" class="flex gap-2">
        <div
          class="border-dashed border-primary border relative"
          :class="{
            'w-1/2 rounded-tl-lg': showMediaPool,
            'w-full rounded-t-lg': !showMediaPool,
            'border-red-500': errors?.length,
          }"
        >
          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex flex-col items-center">
              <Icon name="upload" class="mb-6 text-primary text-3xl" />
              <div class="text-center">Bild hier ablegen /</div>
              <div class="text-center">Klicken zum Hochladen</div>
            </div>
          </div>
          <input
            :id="name"
            ref="input"
            :multiple="multiple"
            type="file"
            :name="name"
            :tabindex="tabindex"
            :disabled="disabled"
            class="opacity-0 h-full w-full cursor-pointer"
            :accept="accept"
            @input="handleInput"
            @blur="handleBlur"
            @focus="setTouched(true)"
          />
        </div>
        <div
          v-if="showMediaPool"
          class="border-dashed border-primary border"
          :class="{
            'w-1/2 rounded-tr-lg': showMediaPool,
            '': !showMediaPool,
            'border-red-500': errors?.length,
          }"
        >
          <div class="flex flex-col items-center justify-center h-full">
            <Icon name="cabinet-filing" class="mb-6 text-primary text-3xl" />
            <div>Aus dem Medienpool</div>
            <div>auswählen</div>
          </div>
        </div>
      </div>
      <div v-if="blob" class="bg-black-100 rounded-t-lg flex justify-center cursor-pointer" @click="input?.click()">
        <img :src="blob" alt="Profilbild" class="h-[183px]" />
      </div>

      <div
        class="bg-white px-4 py-2 border-white-400 border-b border-x rounded-b-xl"
        :class="{ '!border-red-500': errors?.length }"
      >
        <div class="flex justify-end gap-3">
          <button
            class="bg-primary w-7 h-7 flex items-center justify-center rounded-lg"
            type="button"
            @click="input?.click()"
          >
            <Icon name="upload" class="text-white" />
          </button>
          <button
            v-if="showMediaPool"
            class="bg-primary w-7 h-7 flex items-center justify-center rounded-lg"
            type="button"
          >
            <Icon name="cabinet-filing" class="text-white" />
          </button>
        </div>
      </div>
      <ErrorMessage class="absolute -bottom-2.5 text-xs font-light text-red-600" :name="name" />
    </div>
  </div>
</template>

<style scoped>
::file-selector-button {
  cursor: pointer;
}
</style>
