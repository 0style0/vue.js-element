# vue-elemeui-app

> 使用eleme的ui实现一个简单外卖订餐的应用

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


###通过插件实现页面导航,使用局部路由实现局部刷新

```bash
//路由信息配置'./src/main.js'
//通过设置Childern节点实现
const routes = [
    {path:'/home',component:Home},
    {path:'/list',component:List},
    //设置子路由 在页面内部渲染
    {path:'/movie',component:Movie,
        children:[
            {name:'castDetail',path:'/cast_detail/:id',component:CastDetail}
        ]
    },
    {path:'*',component:Home}
]
```