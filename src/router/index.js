import Vue from 'vue'
import Router from 'vue-router'
import Main from 'components/Main'
import FoodType from '../components/products/FoodType'
import FoodTypeEditor from '../components/products/FoodTypeEditor'

import Foods from '../components/products/Foods'
import FoodsEditor from '../components/products/FoodsEditor.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/food_type',
      name: 'FoodType',
      component: FoodType
    },
    {
      path: '/food_type_editor/:id?', //id作为可选参数
      name: 'FoodTypeEditor',
      component: FoodTypeEditor
    },
    {
      path: '/foods',
      name: 'Foods',
      component: Foods
    },
    {
      path: '/foods_editor/:id?',
      name: 'FoodsEditor',
      component: FoodsEditor
    }
  ]
})
