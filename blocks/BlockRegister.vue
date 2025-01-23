<script lang="ts" setup>
import {toTypedSchema} from '@vee-validate/yup';
import {useForm} from 'vee-validate';
import {object, ref as yupRef, string} from 'yup';

import {useAuthentication} from '~/composables/use-authentication';

const props = defineProps<{
  enableSso?: boolean;
}>();

const {signUp, signUpViaApple, signUpViaGoogle} = useAuthentication();

const schema = object({
  email: string().email().lowercase().trim().required(),
  password: string().min(6).required(),
  password_confirm: string()
      .required()
      .oneOf([yupRef('password')], 'Die Passwörter stimmen nicht überein.'),
});

const {handleSubmit, isSubmitting, meta, setFieldError} = useForm({
  validationSchema: toTypedSchema(schema),
});

const onSubmit = handleSubmit.withControlled(async (values) => {
  const {data, error} = await signUp(values);
  if (error?.message.includes('No user found with email:')) {
    setFieldError('email', 'Es konnte kein Nutzer mit dieser E-Mail gefunden werden.');
  }
  if (error?.message.includes('Wrong password')) {
    setFieldError('password', 'Falsches Passwort.');
  }
  if (data) {
    await navigateTo('/app');
  }
});
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <NuxtImg alt="Logo" class="mx-auto w-auto" src="https://placehold.co/100x20/png"/>
      <h2 class="mt-6 text-black text-2xl font-semibold text-center">Registrieren</h2>
    </div>

    <div class="mt-12 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form novalidate @submit="onSubmit">
          <FormInput
              autocomplete="email"
              class="text-sm font-semibold"
              label="E-Mail"
              name="email"
              tabindex="1"
              type="email"
          />
          <div class="mt-6">
            <FormPassword
                autocomplete="current-password"
                class="text-sm font-semibold"
                label="Passwort"
                name="password"
                tabindex="2"
            />
          </div>
          <div class="mt-6">
            <FormPassword
                autocomplete="current-password"
                class="text-sm font-semibold"
                label="Passwort wiederholen"
                name="password_confirm"
                tabindex="2"
            />
          </div>

          <FormSubmit
              :block="true"
              :disabled="!meta.dirty"
              :is-submitting="isSubmitting"
              class="mt-12"
              label="Registrieren"
              tabindex="3"
          />
        </form>

        <div class="mt-12">
          <div class="w-[360px] text-center">
            <span class="text-[#333333] text-sm font-light leading-snug">Du hast bereits einen Account? </span>
            <NuxtLink class="text-[#333333] text-sm font-semibold" to="/auth">Jetzt Einloggen</NuxtLink>
          </div>
        </div>

        <div v-if="enableSso">
          <div class="relative mt-12">
            <div aria-hidden="true" class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm/6 font-medium">
              <span class="bg-white px-6 text-gray-900">Oder weiter mit</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <button
                class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset hover:bg-gray-50 ring-primary focus-visible:ring-transparent"
                @click="signUpViaGoogle()"
            >
              <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24">
                <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                />
                <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                />
                <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                />
                <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                />
              </svg>
              <span class="text-sm/6 font-semibold">Google</span>
            </button>

            <button
                class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset hover:bg-gray-50 ring-primary focus-visible:ring-transparent"
                @click="signUpViaApple()"
            >
              <svg class="size-5" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"
                />
                <path
                    d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"
                />
              </svg>
              <span class="text-sm/6 font-semibold">Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
