<script lang="ts" setup>
import {toTypedSchema} from '@vee-validate/yup';
import {useForm} from 'vee-validate';
import {object, ref as yupRef, string} from 'yup';
import {useAuthentication} from "../composables/use-authentication";

const {checkToken, resetPassword} = useAuthentication();
const route = useRoute();
const token = ref<null | string>(route.params.token ?? null);

const schema = object({
  password: string().min(6).required(),
  password_confirm: string()
      .required()
      .oneOf([yupRef('password')], 'Die Passwörter stimmen nicht überein.'),
});

const {handleSubmit, isSubmitting, meta} = useForm({
  validationSchema: toTypedSchema(schema),
});

if (token.value) {
  await checkToken(token.value);
}

const onSubmit = handleSubmit.withControlled(async (values) => {
  if (!token.value) {
    return;
  }

  const result = await resetPassword(token.value, values.password);

  if (result) {
    await navigateTo('/auth');
  }
});
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <NuxtImg alt="Logo" class="mx-auto w-auto" src="https://placehold.co/100x20/png"/>
      <h2 class="mt-6 text-black text-2xl font-semibold text-center">Neues Passwort vergeben</h2>
    </div>

    <div class="mt-12 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="shadow sm:rounded-lg">
        <p>Das Passwort sollte eine Mindestlänge von 6 Zeichen haben.</p>

        <form novalidate @submit="onSubmit">
          <div class="mt-6">
            <FormPassword autocomplete="new-password" label="Neues Passwort eingeben" name="password"/>
          </div>
          <div class="mt-6">
            <FormPassword autocomplete="new-password" label="Neues Passwort wiederholen" name="password_confirm"/>
          </div>

          <FormSubmit
              :disabled="!meta.dirty"
              :is-submitting="isSubmitting"
              class="flex items-center justify-center mt-12"
              label="Speichern"
          />
        </form>
      </div>
    </div>
  </div>
</template>
