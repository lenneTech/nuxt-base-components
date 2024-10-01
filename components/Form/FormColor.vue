<script lang="ts" setup>
import {useField} from 'vee-validate';
import {type Color, useTheme} from "~/composables/use-theme";

const props = defineProps<{
  name: string;
  paletteLabel: string;
  primaryLabel: string;
}>();

const {generateColorPalette, setBlack} = useTheme();
const input = ref<HTMLElement>();
const iconColor = ref();
const palette = ref<Color>({});


const {setValue, value} = useField(() => props.name, undefined, {});

if (!value.value) {
  value.value = '#000000'
}

watch(
    () => value.value,
    (newValue) => {
      if (newValue) {
        palette.value = generateColorPalette(newValue);
        iconColor.value = setBlack(newValue) ? 'black' : 'white';
      }
    },
    {immediate: true},
);

function onChangePalette(event: any) {
  setValue(event.target.value);
}
</script>

<template>
  <div>
    <div>
      <label class="block" for="customColor">{{ primaryLabel }}</label>
      <div class="flex gap-3">
        <div class="relative w-fit">
          <input
              id="customColor"
              ref="input"
              :value="value"
              class="size-20 cursor-pointer bg-transparent"
              name="settings.customColor"
              type="color"
              @input="onChangePalette($event)"
          />
          <span :style="{color: iconColor}"
                class="i-bi-brush text-xl absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                @click="input?.click()"></span>
        </div>
        <div class="mt-0.5">
          <p>{{ Object.keys(palette).find((key) => palette[key] === value) }}</p>
          <p class="text-black-400">{{ value }}</p>
        </div>
      </div>
    </div>
    {{ paletteLabel }}
    <div class="flex flex-wrap gap-3 ms-0.5">
      <div v-for="key of Object.keys(palette)" :key="key" class="w-[75px]">
        <div :style="{ backgroundColor: palette[key] }" class="ring-border ring-1 size-[75px] rounded-xl"></div>
        <div class="mt-2.5">
          <p>{{ key }}</p>
          <p class="text-black-400">{{ palette[key] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

input[type='color']::-webkit-color-swatch {
  outline: 0;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0);
  border-radius: 0.75rem;
}

</style>
