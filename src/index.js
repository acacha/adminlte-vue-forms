import Components from './components/index'

let AdminlteVueForms = {
  install (Vue) {
    // install our components
    Components(Vue)
  }
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(AdminlteVueForms)
}

export default AdminlteVueForms

import Box from './components/AdminlteInputTextComponent.vue'

export { Box }
