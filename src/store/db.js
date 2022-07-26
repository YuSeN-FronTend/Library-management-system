const db = {
    state: {
        token: '',
    },
    getters: {
        token: state => state.token
    },
    mutations: {
        // 存储token
        setToken: (state, value) => {
            state.token = value
        }
    },
    actions: {}
}
export default db