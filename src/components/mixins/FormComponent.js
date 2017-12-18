import changeCase from 'change-case'

let getTitleCaseName = function () {
  return changeCase.titleCase(this.name)
}

const FormComponent = {
  data: function () {
    return {
      internalForm: null,
      internalFormModule: null
    }
  },
  computed: {
    default_store_form () {
      if (this.$store.getters['acacha-forms/form']) return this.$store.getters['acacha-forms/form']
      return null
    }
  },
  methods: {
    hasError () {
      return this.internalForm.errors.has(this.name)
    },
    error () {
      return this.internalForm.errors.get(this.name)
    },
    action (name) {
      if (this.internalFormModule) return this.sanitize(this.internalFormModule) + name
      return 'acacha-forms/' + name
    },
    sanitize (name) {
      if (name.endsWith('/')) return name
      return name + '/'
    },
    updateFormField (value, field) {
      field = field || this.name
      this.$store.dispatch(this.action('updateFormFieldAction'), {
        field: field,
        value: value
      })
    },
    getFormFromStore () {
      if (this.formName) {
        return this.getFormFromStoreByName(this.formName)
      } else {
        if (this.default_store_form) return this.default_store_form
        throw new Error("Default Acacha Form 'acacha-forms/form' not found in Vuex store!")
      }
    },
    cleanFormName (formName) {
      if (formName.endsWith('/')) return formName.substring(0, formName.length - 1)
      return formName
    },
    getFormFromStoreByName (formName) {
      const name = this.cleanFormName(formName)
      if (!this.$store.state[name]) throw new Error('No Vuex state found: this.$store.state.' + name)
      if (this.$store.state[name].form) return this.$store.state[name].form
      throw new Error(`Form ${name}.fom not found in Vuex store`)
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
    if (!this.form) this.internalFormModule = this.formName || 'acacha-forms'
  }
}

export {
  FormComponent
}

export default FormComponent
