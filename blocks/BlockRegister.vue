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
          <div class="text-center">
            <span class="text-sm font-light leading-snug">Du hast bereits einen Account? </span>
            <NuxtLink class="text-sm font-semibold" to="/auth">Jetzt Einloggen</NuxtLink>
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
              <IconGoogle></IconGoogle>
              <span class="text-sm/6 font-semibold">Google</span>
            </button>

            <button
                class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset hover:bg-gray-50 ring-primary focus-visible:ring-transparent"
                @click="signUpViaApple()"
            >
              <IconApple></IconApple>
              <span class="text-sm/6 font-semibold">Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
