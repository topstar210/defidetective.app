import React from 'react'

import Page404 from './views/pages/page404/Page404'
import Dapps from './views/dapps/Dapps'
import Tokens from './views/tokens/Tokens'
import Influencers from './views/influencer/Influencer'
// import Influencers from './views/partner/Partners'


const routes = [
  { path: '/', exact: true, name: 'dapps' },
  { path: '*', name: 'page404', element: Page404 },
  { path: '/dapps', name: 'Dapps', element: Dapps },
  { path: '/tokens', role: 1, element: Tokens },
  { path: '/admin/dapps', role: 1, element: Dapps },
  { path: '/admin/ads_ROI', role: 1, element: Dapps },
  { path: '/admin/ads_token', role: 1, element: Dapps },
  { path: '/influencers', role: 1, element: Influencers },
  // { path: '/partners', role: 1, element: Partners },
]

export default routes
