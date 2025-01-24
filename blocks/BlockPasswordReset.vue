<script lang="ts" setup>
import {toTypedSchema} from '@vee-validate/yup';
import {useForm} from 'vee-validate';
import {object, string} from 'yup';

import {useAuthentication} from '~/composables/use-authentication';


const {sendResetPasswordMail} = useAuthentication();

const schema = object({
  email: string().email().lowercase().trim().required(),
});

const {handleSubmit, isSubmitting, meta, setFieldError} = useForm({
  validationSchema: toTypedSchema(schema),
});

const onSubmit = handleSubmit.withControlled(async (values) => {
  const {data, error} = await sendResetPasswordMail(values.email);

  if (error) {
    if (error.startsWith('No user found')) {
      setFieldError('email', 'Diese E-Mail wurde nicht gefunden.');
    }
  }

  if (data) {
    navigateTo('/auth');
  }
});
</script>

<template>
  <div class="flex min-h-dvh flex-1 flex-col justify-center">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <NuxtImg alt="Logo" class="mx-auto w-auto" src="https://placehold.co/100x20/png"/>
      <h2 class="mt-6 text-black text-2xl font-semibold text-center">Passwort zurücksetzen</h2>
    </div>

    <div class="mt-12 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <p>
        Sollten Sie Ihr Passwort vergessen haben, können Sie es hier zurücksetzen. Sie erhalten eine E-Mail mit einem
        Link, mit dessen Hilfe Sie ein neues Passwort vergeben können.
      </p>

      <form novalidate @submit="onSubmit">
        <FormInput autocomplete="email" label="E-Mail-Adresse" name="email" type="email"/>
        <FormSubmit
            :disabled="!meta.dirty"
            :is-submitting="isSubmitting"
            class="flex items-center justify-center mt-12"
            label="E-Mail anfordern"
        />
      </form>
    </div>
  </div>
</template>
