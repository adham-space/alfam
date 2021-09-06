/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const informationRouter = {
  path: '/information',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Information',
  meta: {
    roles: ['admin', 'seller', 'zav. sklad'],
    title: 'Маълумотлар',
    icon: 'el-icon-document'
  },
  children: [
    {
      path: 'users',

      component: () => import('@/views/information/users/index'),
      name: 'Users',
      meta: {
        roles: ['admin'],
        title: 'Фойдаланувчилар ', noCache: false }
    },
    {
      path: 'stuff',
      component: () => import('@/views/information/stuffs/index'),
      name: 'Stuffs',
      meta: {
        roles: ['admin'],
        title: 'Ҳодимлар', noCache: false }
    },
    {
      path: 'shops',
      component: () => import('@/views/information/shops/index'),
      name: 'Shops',
      meta: {
        roles: ['admin'],
        title: 'Диллерлар', noCache: false }
    },
    {
      path: 'drivers',
      component: () => import('@/views/information/drivers/index'),
      name: 'Drivers',
      meta: {
        roles: ['admin', 'seller', 'zav. sklad'],
        title: 'Шофёрлар ', noCache: false }
    },
    {
      path: 'customers',
      component: () => import('@/views/information/customers/index'),
      name: 'Customers',
      meta: {
        roles: ['admin', 'seller', 'zav. sklad'],
        title: 'Клиентлар ', noCache: false }
    }
  ]
}
export default informationRouter
