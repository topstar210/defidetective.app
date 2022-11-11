import React from 'react'

import Page404 from './views/pages/page404/Page404'
import Dapps from './views/dapps/Dapps'


const routes = [
  { path: '/', exact: true, name: 'dapps' },
  
  { path: '*', name: 'page404', element: Page404 },
  { path: '/dapps', name: 'Dapps', element: Dapps },
  { path: '/admin/dapps', role: 1, element: Dapps },
  { path: '/admin/ads_ROI', role: 1, element: Dapps },
  { path: '/admin/ads_token', role: 1, element: Dapps },
  { path: '/admin/influencer', role: 1, element: Dapps },
  { path: '/admin/partner', role: 1, element: Dapps },
]

export default routes
