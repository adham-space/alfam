/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const skladRouter = {
  path: '/sklad',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Skald',
  meta: {
    title: 'Sklad',
    icon: 'chart'
  },
  children: [
    {
      path: 'newproduct',
      component: () => import('@/views/sklad/newProduct'),
      name: 'NewProduct',
      meta: { title: 'New product', noCache: true }
    },
    {
      path: 'allproducts',
      component: () => import('@/views/sklad/allProducts'),
      name: 'AllProducts',
      meta: { title: 'All products', noCache: true }
    }
    // {
    //   path: 'mix-chart',
    //   component: () => import('@/views/charts/mix-chart'),
    //   name: 'MixChart',
    //   meta: { title: 'Mix Chart', noCache: true }
    // }
  ]
}

export default skladRouter
