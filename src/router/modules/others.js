/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const othersRouter = {
  path: '/others',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Others',
  meta: {
    roles: ['admin'],
    title: 'Others',
    icon: 'el-icon-refresh'
  },
  children: [
    {
      path: 'others-new-product',
      component: () => import('@/views/others/newProduct/index'),
      name: 'OthersNewProduct',
      meta: { title: 'New product', noCache: false }
    },
    {
      path: 'others-store-product',
      component: () => import('@/views/others/storeProducts/index'),
      name: 'OthersStoreProduct',
      meta: { title: 'Store product', noCache: false }
    },
    {
      path: 'others-product',
      component: () => import('@/views/others/othersProduct/index'),
      name: 'OthersProduct',
      meta: { title: 'Others product', noCache: false }
    },
    {
      path: 'others-packing-list',
      component: () => import('@/views/others/packingList/index'),
      name: 'OthersPackingList',
      meta: { title: 'Packing list', noCache: false }
    },
    {
      path: 'others-order-list',
      component: () => import('@/views/others/ordersList/index'),
      name: 'OthersOrderList',
      meta: { title: 'Orders list', noCache: false }
    }
  ]
}
export default othersRouter
