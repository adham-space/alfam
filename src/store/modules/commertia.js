/* eslint-disable */
import request from '@/utils/request'

const state = {
    partners: [],
    gettingPartners: false,
    innertTableData: [],
    gettingInnerTable: false,
    outerTableData: [],
    gettingOuterTable: false,
    currentTable: 'orderInventar',
    currentOrder: {},
    currentOrderHeader: {
        customer: '',
        product: '',
        order_name: ''
    }
}

const mutations = {
    SET_ORDER: (state, order) => {
        state.currentOrder = order
    },
    SET_LOADER: (state, loadingConfig) => {
        state[loadingConfig.name] = loadingConfig.value
    },
    SET_PARTNERS: (state, data) => {
        state.partners = data
    },
    SET_TABLE_DATA: (state, data) => {
        state[data.tableName] = data.value
    },
    SET_CURRENT_TABLE: (state, data) => {
        state.currentTable = data
    },
    SET_CURRENT_ORDER_HEADER: (state, { customer, product, order_name }) => {
        customer = customer.name
        state.currentOrderHeader = {
            customer,
            product,
            order_name
        }
    }
}
const actions = {
    get_partners: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit('SET_LOADER', { name: 'gettingPartners', value: true })
            request({
                    method: 'GET',
                    url: '/info/get-shops-other'
                })
                .then((res) => {
                    commit('SET_LOADER', { name: 'gettingPartners', value: false })
                    commit('SET_PARTNERS', res.data)
                    resolve()
                })
                .catch((err) => {
                    commit('SET_LOADER', { name: 'gettingPartners', value: false })
                    commit('SET_PARTNERS', [])
                    reject(err)
                })
        })
    },
    get_outer_table_data: ({ commit }, { id }) => {
        return new Promise(async(resolve, reject) => {
            try {
                commit('SET_LOADER', { name: 'gettingOuterTable', value: true })
                const { data } = await request({
                    method: 'GET',
                    url: '/orders/get-outer-table-zavskald',
                    params: {
                        partner_id: id
                    }
                }).catch((err) => {
                    throw err
                })
                commit('SET_LOADER', { name: 'gettingOuterTable', value: false })
                commit('SET_TABLE_DATA', { tableName: 'outerTableData', value: data })
                resolve()
            } catch (error) {
                commit('SET_LOADER', { name: 'gettingOuterTable', value: false })
                commit('SET_TABLE_DATA', { tableName: 'outerTableData', value: [] })
                reject(error)
            }
        })
    },
    get_inner_table_data: ({ commit }, { time, _id }) => {
        return new Promise(async(resolve, reject) => {
            try {
                commit('SET_LOADER', { name: 'gettingInnerTable', value: true })
                const { data } = await request({
                    method: 'GET',
                    url: '/orders/get-partner-orders',
                    params: {
                        time,
                        partner_id: _id
                    }
                }).catch((err) => {
                    throw err
                })
                commit('SET_LOADER', { name: 'gettingInnerTable', value: false })
                commit('SET_TABLE_DATA', { tableName: 'innertTableData', value: data })
                resolve()
            } catch (error) {
                commit('SET_LOADER', { name: 'gettingInnerTable', value: false })
                commit('SET_TABLE_DATA', { tableName: 'innertTableData', value: [] })
                reject(error)
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}