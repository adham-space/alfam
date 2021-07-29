/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const shopRouter = {
  path: '/shop',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Shop',
  meta: {
    roles: ['admin', 'seller'],
    title: 'Shop',
    icon: 'el-icon-shopping-cart-full'
  },
  children: [
    {
      path: 'shop-packing-list',
      component: () => import('@/views/Shop/index'),
      name: 'ShopPackingList',
      meta: { title: 'Packing List', noCache: false }
    },
    {
      path: 'my-orders',
      component: () => import('@/views/Shop/ordersList/index'),
      name: 'MyOrders',
      meta: { title: 'My Orders', noCache: false }
    },
    {
      path: 'edit-order/:order_id',
      component: () => import('@/views/Shop/editOrder/index'),
      name: 'EditOrder',
      hidden: true,
      meta: { title: 'Edit Order', noCache: true }
    }
  ]
}
export default shopRouter
