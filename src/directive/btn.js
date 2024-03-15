
import store from '@/store'
const btn = {
    inserted: function (el, binding) {
        let all = store.state.user.allRoutes
        let permission = binding.value // 获取到 权限
        if (permission) {
            let hasPermission = all.includes(permission)
            if (!hasPermission) {
                // 没有权限 对button设置disabled
                el && el.setAttribute('disabled', true)
            }
        }
    },
}

export default btn