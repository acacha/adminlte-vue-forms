<template>
    <div class="form-group has-feedback" :class="{ 'has-error': hasError() }">
        <transition name="fade">
            <label key="error" class="help-block" v-if="hasError()" v-text="error()"></label>
            <slot name="label" v-else>
                <label key="regular" :for="id">{{placeholder}}</label>
            </slot>
        </transition>

        <multiselect :id="id"
                     :name="name"
                     :placeholder="placeholder"
                     :value="location"
                     @input="updateLocation"
                     :options="locations"
                     select-label=""
                     deselect-label=""
                     track-by="id"
                     :show-labels="false"
                     :custom-label="customLabel"
                     :disabled="internalForm.submitting"
                     :loading="loading"
                     :allow-empty="true">
        </multiselect>

    </div>
</template>

<style src="./fade.css" ></style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
  import FormComponent from './mixins/FormComponent'
  import Multiselect from 'vue-multiselect'
  import axios from 'axios'

  export default {
    name: 'AdminLTEInputLocation',
    components: { Multiselect },
    mixins: [ FormComponent ],
    data () {
      return {
        locations: [],
        loading: false
      }
    },
    props: {
      name: {
        type: String,
        default: 'location'
      },
      placeholder: {
        type: String,
        default: 'Select location'
      }
    },
    computed: {
      location () {
        return this.locationObject()
      }
    },
    methods: {
      updateLocation (location) {
        let locationId = location ? location.id : ''
        this.updateFormField(locationId)
        locationId && this.clearError()
      },
      clearError () {
        this.$store.dispatch('acacha-forms/clearErrorAction', this.name)
      },
      customLabel ({ name }) {
        return `${name}`
      },
      fetchLocations () {
        const url = '/api/v1/location'
        this.loading = true
        axios.get(url).then((response) => {
          this.locations = response.data
        }).catch((error) => {
          console.log(error)
        }).then(() => {
          this.loading = false
        })
      },
      locationObject () {
        return this.locations.find((location) => {
          return location.id === this.internalForm[this.name]
        })
      }
    },
    mounted () {
      this.fetchLocations()
    }
  }
</script>