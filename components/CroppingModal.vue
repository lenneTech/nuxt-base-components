<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper';

import {type ModalContext, useModal} from '~/composables/use-modal';

const props = defineProps<{
  context: ModalContext<{ aspectRatio: number; confirm: (file: File | null) => void; img: File }>;
}>();

const { close } = useModal();
const base64File = ref<string>('');
const cropperRef = ref();

const toBase64 = (file: File | undefined) =>
  new Promise<string>((resolve, reject) => {
    if (!file) {
      return reject('No file');
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

onMounted(async () => {
  if (props.context.data?.img) {
    base64File.value = await toBase64(props.context.data.img);
  }
});

function submit() {
  const { canvas } = cropperRef.value.getResult();

  canvas.toBlob(
    async (blob: any) => {
      if (blob && props.context.data?.img) {
        const file = new File([blob], props.context.data.img.name);

        if (file) {
          props.context.data?.confirm(file);
        }
      }
    },
    props.context.data?.img.type,
    1,
  );
}
</script>

<template>
  <Modal
    class="p-10 relative overflow-y-hidden"
    :show="context.show"
    :show-inner="context.showInner"
    :size="context.size"
    @cancel="context.closable ? close() : null"
  >
    <div class="flex flex-col gap-4 items-center justify-center mb-2">
      <div class="size-11 bg-primary rounded-full flex justify-center items-center">
        <span class="i-bi-crop text-xl text-white" />
      </div>
      <h6>Bildausschnitt festlegen</h6>
      <button class="absolute top-5 right-5" @click="close()">
        <span class="i-bi-x text-2xl hover:text-primary-500 duration-200"></span>
      </button>
    </div>
    <div class="text-center dark:text-white mb-6 flex items-center justify-center">
      <Cropper
        v-if="base64File"
        ref="cropperRef"
        class="w-full !max-h-[45vh]"
        :src="base64File"
        :stencil-props="{
          aspectRatio: context.data?.aspectRatio ?? 4 / 3,
        }"
      />
    </div>
    <div class="flex items-center justify-center gap-5">
      <Button appearance="outline" @click="context.data?.confirm(null)">
        Abbrechen
      </Button>
      <Button color="primary" @click="submit()">
        Weiter
      </Button>
    </div>
  </Modal>
</template>

<style>
.vue-advanced-cropper__foreground {
  background: black;
}
</style>
