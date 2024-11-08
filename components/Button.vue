<script lang="ts" setup>
import type {RouteLocationRaw} from 'vue-router';

import {NuxtLink} from '#components';
import {twMerge} from 'tailwind-merge';

const props = withDefaults(
    defineProps<{
      appearance?: 'none' | 'outline' | 'regular';
      block?: boolean; // or width full
      color?: 'danger' | 'green' | 'primary' | 'secondary' | 'yellow';
      href?: string;
      loading?: boolean;
      loadingText?: string;
      size?: 'auto' | 'lg' | 'md' | 'sm';
      textColor?: '' | 'black' | 'gray' | 'primary' | 'white';
      to?: RouteLocationRaw;
      type?: 'button' | 'submit';
    }>(),
    {
      appearance: 'regular',
      block: false,
      color: 'primary',
      loading: false,
      loadingText: 'Loading',
      size: 'md',
      textColor: '',
      type: 'button',
    },
);

const appearanceClasses: Record<typeof props.appearance, string> = {
  regular: 'rounded-md text-white',
  outline:
      'rounded-md border border-primary bg-background hover:bg-primary-500 text-primary hover:text-white disabled:bg-transparent disabled:text-gray-400 disabled:border-gray-200',
  none: 'bg-transparent border-transparent hover:text-primary-500 text-foreground hover:bg-transparent',
};

const sizeClasses: Record<typeof props.size, string> = {
  sm: 'min-w-[100px] py-1.5 px-1.5 text-sm',
  md: 'min-w-[100px] py-1.5 px-2 text-base',
  lg: 'min-w-[240px] py-3 px-4 text-lg',
  auto: 'text-sm lg:text-lg',
};

const colorClasses: Record<typeof props.color, string> = {
  danger: 'bg-red-500 hover:bg-red-400 text-red-950',
  green: 'bg-green-500 hover:bg-green-400 text-green-50',
  primary: 'bg-primary-500 hover:bg-primary-400 text-black',
  secondary: 'bg-secondary-500 hover:bg-secondary-400',
  yellow: 'bg-yellow-500 hover:bg-yellow-400 text-yellow-950',
};

const textColorClasses: Record<typeof props.textColor, string> = {
  '': '',
  black: 'text-black',
  gray: 'text-gray-400',
  primary: 'text-primary',
  white: 'text-white',
};

const LoadingIcon = defineComponent({
  render: () =>
      h('svg', {class: 'animate-spin h-5 w-5 text-white', fill: 'none', viewBox: '0 0 24 24'}, [
        h('circle', {
          class: 'opacity-25',
          cx: '12',
          cy: '12',
          r: '10',
          stroke: 'currentColor',
          'stroke-width': '4',
        }),
        h('path', {
          class: 'opacity-75',
          d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
          fill: 'currentColor',
        }),
      ]),
});
const defaultClasses =
    'duration-200 flex gap-2 justify-center items-center whitespace-nowrap text-center disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400';
const classes = twMerge(
    defaultClasses,
    sizeClasses[props.size],
    colorClasses[props.color],
    appearanceClasses[props.appearance],
    textColorClasses[props.textColor],
);
</script>

<template>
  <component
      :is="props.href ? 'a' : props.to ? NuxtLink : 'button'"
      :active-class="props.appearance === 'none' ? '!text-primary-500' : ''"
      :class="[
      classes,
      {
        'w-full': props.block,
        'cursor-wait': props.loading,
      },
    ]"
      :href="props.href"
      :to="props.to"
      :type="props.type"
  >
    <LoadingIcon v-if="props.loading"/>
    <p v-if="props.loadingText && props.loading" v-text="props.loadingText"></p>
    <slot v-else></slot>
  </component>
</template>
