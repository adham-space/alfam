/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const skladRouter = {
  path: '/sklad',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Skald',
  meta: {
    title: 'Sklad',
    icon: 'el-icon-school'
  },
  children: [
    {
      path: 'newproduct',
      component: () => import('@/views/sklad/newProduct/index'),
      name: 'NewProduct',
      meta: { title: 'New product', noCache: false }
    },
    {
      path: 'storetproduct',
      component: () => import('@/views/sklad/storeProducts/index'),
      name: 'Store',
      meta: { title: 'Store to sklad', noCache: false }
    },
    {
      path: 'packing-list',
      component: () => import('@/views/sklad/packingList/index'),
      name: 'PackingList',
      meta: { title: 'Packing List', noCache: false }
    },
    {
      path: 'orders',
      component: () => import('@/views/sklad/ordersPage/index'),
      name: 'Orders',
      meta: { title: 'Orders', noCache: false }
    }

  ]
}
export default skladRouter
