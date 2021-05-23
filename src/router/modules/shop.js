/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const skladRouter = {
  path: '/shop',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Shop',
  meta: {
    title: 'Shop',
    icon: 'chart'
  },
  children: [
    {
      path: 'packing-list',
      component: () => import('@/views/Shop/index'),
      name: 'PackingList',
      meta: { title: 'Packing List', noCache: false }
    }
  ]
}
export default skladRouter
