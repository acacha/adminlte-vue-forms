import changeCase from 'change-case'
import {mapGetters} from 'vuex'

let getTitleCaseName = function () {
  return changeCase.titleCase(this.name)
}

const FormComponent = {
  data: function () {
    return {
      internalForm: null
    }
  },
  computed: {
    ...mapGetters({
      store_form: 'acacha-forms/form'
    })
  },
  methods: {
    updateFormField (value, field) {
      field = field || this.name
      this.$store.dispatch('acacha-forms/updateFormFieldAction', {
        field: field,
        value: value
      })
    },
    getFormFromStore () {
      if (this.formName) {
        return this.getFormFromStoreByName(this.formName)
      } else {
        if (this.store_form) return this.store_form
        throw new Error("Form 'form' not found in Vuex store under namespace acacha-forms")
      }
    },
    getFormFromStoreByName (formName) {
      if (!this.$store.state['acacha-forms']) throw new Error('No Vuex state found for acacha-forms : this.$store.state.acacha-forms')
      if (this.$store.state['acacha-forms'][formName]) return this.$store.state['acacha-forms'][formName]
      throw new Error(`Form ${formName} not found in Vuex store under namespace acacha-forms`)
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      required: false
    },
    formName: {
      type: String,
      required: false
    },
    id: {
      type: String,
      default: function () {
        return this.name
      }
    },
    placeholder: {
      type: String,
      default: getTitleCaseName
    }
  },
  created () {
    this.internalForm = this.form || this.getFormFromStore()
  }
}

export {
  FormComponent
}

export default FormComponent
