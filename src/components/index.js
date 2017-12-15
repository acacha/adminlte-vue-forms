import AdminlteInputTextComponent from './AdminlteInputTextComponent.vue'
import AdminlteInputEmailComponent from './AdminlteInputEmailComponent.vue'
import AdminlteInputPasswordComponent from './AdminlteInputPasswordComponent.vue'
import AdminlteInputDateMaskComponent from './AdminlteInputDateMaskComponent.vue'
import AdminlteInputLocationComponent from './AdminlteInputLocationComponent.vue'

export default function (Vue) {
  Vue.component('adminlte-input-text', AdminlteInputTextComponent)
  Vue.component('adminlte-input-email', AdminlteInputEmailComponent)
  Vue.component('adminlte-input-password', AdminlteInputPasswordComponent)
  Vue.component('adminlte-input-date-mask', AdminlteInputDateMaskComponent)
  Vue.component('adminlte-input-location', AdminlteInputLocationComponent)
}
