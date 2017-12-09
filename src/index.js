import Components from './components/index'

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

import AdminlteInputTextComponent from './components/AdminlteInputTextComponent.vue'

export { AdminlteInputTextComponent }
