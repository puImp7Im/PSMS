import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Suspects from '@/components/Suspects'
import Register from '@/components/Register'
import Inquiry from '@/components/Inquiry'
import InquiryDone from '@/components/InquiryDone'
import ReleaseOrTransport from '@/components/ReleaseOrTransport'
import TakeOut from '@/components/TakeOut'
import TakeBack from '@/components/TakeBack'
import Map from '@/components/Map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/register',
      name: 'Register',
      components: {
        default: Register
      }
    },
    {
      path: '/inquiry',
      name: 'Inquiry',
      component: Inquiry
    },
    {
      path: '/inquiryDone',
      name: 'InquiryDone',
      component: InquiryDone
    },
    {
      path: '/releaseOrTransport',
      name: 'ReleaseOrTransport',
      component: ReleaseOrTransport
    },
    {
      path: '/suspects',
      name: 'Suspects',
      component: Suspects
    },
    {
      path: '/takeOut',
      name: 'Take Out',
      component: TakeOut
    },
    {
      path: '/takeBack',
      name: 'Take Back',
      component: TakeBack
    }
  ]
})
