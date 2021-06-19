/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const skladRouter = {
  path: '/shop',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Shop',
  meta: {
    title: 'Shop',
    icon: 'el-icon-shopping-cart-full'
  },
  children: [
    {
      path: 'packing-list',
      component: () => import('@/views/Shop/index'),
      name: 'PackingList',
      meta: { title: 'Packing List', noCache: false }
    },
    {
      path: 'my-orders',
      component: () => import('@/views/Shop/index'),
      name: 'MyOrders',
      meta: { title: 'My Orders', noCache: false }
    }
  ]
}
export default skladRouter
