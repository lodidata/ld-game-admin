
import store from '@/store'
const auth = {
    inserted: function (el, binding) {
        let all = store.state.user.allRoutes
        let permission = binding.value // 获取到 v-auth
        if (permission) {
            let hasPermission = all.includes(permission)
            if (!hasPermission) {
                // 没有权限 移除Dom元素
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    },
}

export default auth

