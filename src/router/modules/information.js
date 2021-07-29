/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const informationRouter = {
  path: '/information',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Information',
  meta: {
    roles: ['admin', 'seller', 'zav. sklad'],
    title: 'Information',
    icon: 'el-icon-document'
  },
  children: [
    {
      path: 'users',

      component: () => import('@/views/information/users/index'),
      name: 'Users',
      meta: {
        roles: ['admin'],
        title: 'Users ', noCache: false }
    },
    {
      path: 'stuff',
      component: () => import('@/views/information/stuffs/index'),
      name: 'Stuffs',
      meta: {
        roles: ['admin'],
        title: 'Stuffs', noCache: false }
    },
    {
      path: 'shops',
      component: () => import('@/views/information/shops/index'),
      name: 'Shops',
      meta: {
        roles: ['admin'],
        title: 'Shops && Sklad', noCache: false }
    },
    {
      path: 'drivers',
      component: () => import('@/views/information/drivers/index'),
      name: 'Drivers',
      meta: {
        roles: ['admin', 'seller', 'zav. sklad'],
        title: 'Drivers ', noCache: false }
    },
    {
      path: 'customers',
      component: () => import('@/views/information/customers/index'),
      name: 'Customers',
      meta: {
        roles: ['admin', 'seller', 'zav. sklad'],
        title: 'Customers ', noCache: false }
    }
  ]
}
export default informationRouter
