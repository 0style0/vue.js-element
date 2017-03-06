<template>
  <div id="app">
    <el-row class="header">
      <el-col :span="24" class="logo-container">
        <img src="./assets/1.jpg" alt="点餐系统管理后台" class="logo">
        <h3>点餐信息管理后台</h3>
      </el-col>
    </el-row>
    <el-row class="main">
      <el-col :span="4" class="m-nav">
        <!--
          如果要实现el-menu的路由功能 
          1. 在el-menu节点中设置 route的值为true
          2. 在el-menu-item节点 设置跳转的路由位置 route属性

          在el-menu中可以使用theme设置皮肤
        -->
        <el-menu :router="true" class="m-nav-menu">
          <el-menu-item :route="{name:'Main'}" index="1"><i class="el-icon-information"></i>首页</el-menu-item>
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>菜品管理</template>
                <!--组名-->
                <el-menu-item index="2" :route="{name:'FoodType'}">菜品分类管理</el-menu-item>
                <el-menu-item index="3" :route="{name:'Foods'}">菜品信息管理</el-menu-item>
              </el-submenu>

            <el-menu-item index="4"><i class="el-icon-setting"></i>订单管理</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view class="main-form"></router-view>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
html,body{
  height: 100%;
  margin: 0;
  padding: 0
}
  .header{
    background-color: rgb(32, 160, 255);
    color: #fff;
    box-shadow: 50px
  }
  #app{
    height: 100%;
  }
  .main,.m-nav,.m-nav-menu{
    height: 100%;
  }
  .main-form {
        margin: 10px;
}
.el-breadcrumb{
  margin-bottom: 15px;
}
.logo-container{
  display: flex;
  align-items: center;
}

.logo{
  height: 40px;
  padding: 5px;
}
</style>