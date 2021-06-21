/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const informationRouter = {
  path: '/information',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Information',
  meta: {
    title: 'Information',
    icon: 'el-icon-document'
  },
  children: [
    {
      path: 'users',
      component: () => import('@/views/information/users/index'),
      name: 'UsersList',
      meta: { title: 'Users ', noCache: false }
    },
    {
      path: 'stuff',
      component: () => import('@/views/information/stuffs/index'),
      name: 'StuffList',
      meta: { title: 'Stuff ', noCache: false }
    },
    {
      path: 'shops',
      component: () => import('@/views/information/shops/index'),
      name: 'ShopsList',
      meta: { title: 'Shops ', noCache: false }
    },
    {
      path: 'drivers',
      component: () => import('@/views/information/drivers/index'),
      name: 'DriversList',
      meta: { title: 'Drivers ', noCache: false }
    },
    {
      path: 'customers',
      component: () => import('@/views/information/customers/index'),
      name: 'CustomersList',
      meta: { title: 'Customers ', noCache: false }
    }
  ]
}
export default informationRouter
