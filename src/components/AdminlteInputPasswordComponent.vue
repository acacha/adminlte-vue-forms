<template>
    <div class="form-group has-feedback" :class="{ 'has-error': hasError() }">
        <transition name="fade">
            <label key="error" class="help-block" v-if="hasError()" v-text="error()"></label>
            <slot name="label" v-else>
                <label key="regular" :for="id">{{placeholder}}</label>
            </slot>
        </transition>
        <input type="password"
               class="form-control"
               :id="id"
               :placeholder="placeholder"
               :name="name"
               :value="internalForm[name]"
               @input="update($event.target.value)"
               :disabled="internalForm.submitting">
    </div>
</template>

<style src="./fade.css" ></style>

<script>
 import FormComponent from './mixins/FormComponent'

 export default {
   name: 'AdminLTEInputPassword',
   mixins: [ FormComponent ],
   props: {
     name: {
       type: String,
       default: 'password'
     }
   },
   methods: {
     update (value) {
       this.updateFormField(this.trim(value))
     },
     trim (value) {
       if (typeof value === 'string' || value instanceof String) {
         return value.trim()
       }
       return value
     }
   }
 }
</script>