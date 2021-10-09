/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const skladRouter = {
  path: '/sklad',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Skald',
  meta: {
    roles: ['admin', 'zav. sklad'],
    title: 'Склад',
    icon: 'el-icon-school'
  },
  children: [
    {
      path: 'newproduct',
      component: () => import('@/views/sklad/newProduct/index'),
      name: 'NewProduct',
      meta: { title: 'Қўшиш/тахрирлаш', noCache: true }
    },
    {
      path: 'edit-new-product/:id',
      component: () => import('@/views/sklad/editNewProduct/index'),
      name: 'EditNewProduct',
      hidden: true,
      meta: { title: 'Янги махсулотни тахрирлаш', noCache: true }
    },
    {
      path: 'storetproduct',
      component: () => import('@/views/sklad/storeProducts/index'),
      name: 'Store',
      meta: { title: 'Складга сақалаш', noCache: true }
    },
    {
      path: 'packing-list',
      component: () => import('@/views/sklad/packingList/index'),
      name: 'PackingList',
      meta: { title: 'Упаковочний лист', noCache: true }
    },
    {
      path: 'orders',
      component: () => import('@/views/sklad/ordersPage/index'),
      name: 'Orders',
      meta: { title: 'Буюртмалар', noCache: true }
    }

  ]
}
export default skladRouter
