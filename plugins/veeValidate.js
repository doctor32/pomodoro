import Vue from 'vue';
import { ValidationProvider, ValidationObserver,  extend } from 'vee-validate';
import { required, min, max, email, confirmed } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: '{length}'
});

  // Register it globally
  Vue.component('ValidationProvider', ValidationProvider);
  Vue.component('ValidationObserver', ValidationObserver);