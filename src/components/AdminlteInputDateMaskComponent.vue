<template>
    <div class="form-group has-feedback" :class="{ 'has-error': hasError() }">
        <transition name="fade">
            <label key="error" class="help-block" v-if="hasError()" v-text="error()"></label>
            <slot name="label" v-else>
                <label key="regular" :for="id">{{placeholder}}</label>
            </slot>
        </transition>

        <div class="input-group">
            <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
            </div>

            <input ref="inputDate"
                   type="text"
                   class="form-control"
                   :data-inputmask="inputMask"
                   data-mask=""
                   :id="id"
                   :name="name"
                   :value="localeDate"
                   @change="updateDate($event.target.value)"
                   :disabled="internalForm.submitting">
        </div>

    </div>
</template>

<style src="./fade.css"></style>

<style>
    /*Sets z-index to auto to avoid input group appearing over multiselect*/
  .input-group .form-control {
    position: relative;
    z-index: auto;
    float: left;
    width: 100%;
    margin-bottom: 0;
  }
</style>

<script>
  import FormComponent from './mixins/FormComponent'
  import Inputmask from 'inputmask/dist/inputmask/inputmask.date.extensions'
  import { toLaravelDate, fromLaravelDate } from './LaravelDates'

  export default {
    name: 'AdminLTEInputDateMask',
    mixins: [ FormComponent ],
    data () {
      return {
        inputMask: "'alias': '" + window.acacha_relationships.config.dateMask + "'"
      }
    },
    props: {
      name: {
        type: String,
        default: 'date'
      }
    },
    watch: {
      date (newVal) {
        this.internalDate = newVal
      }
    },
    computed: {
      localeDate: {
        get () {
          return fromLaravelDate(this.internalForm[this.name])
        },
        set (newValue) {
          this.newDate = toLaravelDate(newValue)
        }
      }
    },
    methods: {
      updateDate (date) {
        date = date ? toLaravelDate(date) : ''
        this.updateFormField(date)
      }
    },
    mounted () {
      Inputmask().mask(this.$refs.inputDate)
    }
  }
</script>