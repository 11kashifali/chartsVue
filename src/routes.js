import Overview from './pages/Overview.vue'
import Explore from './pages/Explore.vue'
import RealUser from './pages/Realuser.vue'
import ReturingUser from './pages/Returninguser.vue'
import Bots from './pages/Bots.vue'
export  const routes = [
    { path: '/', component: Overview },
    { path: '/explore', component:Explore},
    { path: '/realuser',component:RealUser},
    { path: '/returninguser',component:ReturingUser},
    { path: '/bots',component:Bots}
  ]