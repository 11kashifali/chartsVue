import Overview from './pages/Overview.vue'
import Explore from './pages/Explore.vue'
import RealUser from './pages/Realuser.vue'
import ReturingUser from './pages/Returninguser.vue'
import Bots from './pages/Bots.vue'
import ActiveUser from './pages/Activeuser'
export  const routes = [
    { path: '/', component: Overview },
    { path: '/activeuser',component:ActiveUser},
    { path: '/explore', component:Explore},
    { path: '/realuser',component:RealUser},
    { path: '/returninguser',component:ReturingUser},
    { path: '/bots',component:Bots}
  ]