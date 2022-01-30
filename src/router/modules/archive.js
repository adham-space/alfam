/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const storeRouter = {
  path: '/store',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Store archive',
  meta: {
    roles: ['admin', 'zavsklad'],
    title: 'База',
    icon: 'el-icon-pie-chart'
  },
  children: [
    {
      path: 'archive',
      component: () => import('@/views/store/archive/index'),
      name: 'Archive',
      meta: { title: 'Архив', noCache: false }
    },
    {
      path: 'inventars',
      component: () => import('@/views/store/inventars/index'),
      name: 'Inventars',
      meta: { title: 'Инвентаризация', noCache: false }
    },
    {
      path: 'all-orders',
      component: () => import('@/views/store/ordersList/index'),
      name: 'Commertias',
      meta: { title: 'Коммерциялар', noCache: false }
    }
  ]
}
export default storeRouter
