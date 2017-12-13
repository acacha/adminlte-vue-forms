import Components from './components/index'
import AdminlteInputTextComponent from './components/AdminlteInputTextComponent.vue'
import AdminlteInputDateMaskComponent from './components/AdminlteInputDateMaskComponent.vue'
import AdminlteInputLocationComponent from './components/AdminlteInputLocationComponent.vue'
import FormComponent from './components/mixins/FormComponent'

let AdminlteVueForms = {
  install (Vue) {
    // install components
    Components(Vue)
  }
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(AdminlteVueForms)
}

export default AdminlteVueForms

export {
  AdminlteInputTextComponent,
  AdminlteInputDateMaskComponent,
  AdminlteInputLocationComponent,
  FormComponent
}
