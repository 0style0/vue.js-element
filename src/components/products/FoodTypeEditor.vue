<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name:'FoodType'}">商品分类管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row justify="center" type="flex">
            <el-col :span="16">
                <!--
                el-form属性
                    model 指定表单数据对象
                    rules 指定验证规则
                el-form-item
                    label   标签文本
                    prop    表单域 model 字段
            -->
                <el-form :model="type" :rules="rules" ref="mainForm" label-width="100px">
                    <el-form-item label="分类名称" prop="name">
                        <el-autocomplete placeholder="请输入分类名称" :fetch-suggestions="filterTypeData" v-model="type.name" icon="menu"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <!--
                        设置autosize可以实现自适应输入框的大小(根据输入内容改变)
                            设置参数{ minRows: 2, maxRows: 4},可以控制大小改变范围
                    -->
                        <el-input placeholder="请输入描述信息" type="textarea" autosize v-model="type.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="subHandle">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import api from '../../services/api_food_type' //引入api接口文件
    export default {
        data() {
            return {
                id: '', //当前的id,如果为空表示新增否则为修改
                type: {
                    name: '',
                    description: ''
                },
                rules: { //添加表单的验证规则
                    name: [
                        { required: true, message: '分类名称不能为空', trigger: 'blur' },
                        { min: 2, message: '分类文字的最小长度为2' }
                    ],
                    description: {
                        required: true,
                        message: '分类描述不能为空'
                    }
                },
                types: [
                    { "value": "简餐" },
                    { "value": "商务套餐" },
                    { "value": "沙县精选" },
                    { "value": "龙岩必点" },
                    { "value": "瓦罐系列" },
                    { "value": "川菜" }
                ]
            }
        },
        methods: {
            //auto-complete 自动完成的筛选方法
            // 此处的筛选数据源比较特殊 需要是一个包含value属性的对象数组
            filterTypeData: function (clause, callback) {
                if (clause) {//如果查询条件存在 那么尽兴筛选
                    var result = this.types.filter(function (item) {
                        return item.value.toLowerCase().indexOf(clause) > -1
                    })
                    callback(result)
                }
                else {//默认返回所有数据
                    callback(this.types)
                }
            },
            subHandle: function () {//点击保存的时候
                // console.log(this.$refs['mainForm'])
                this.$refs['mainForm'].validate(valid => {
                    if (valid) {
                        // alert('验证通过')
                        if (this.id) {//修改
                            api.update(this.id,this.type,function(res){
                                if (res.status == 'y') {
                                    this.$message.success(res.msg)
                                    //执行页面跳转
                                    this.$router.push({ name: 'FoodType' })
                                }
                                else {
                                    this.$message.error(res.msg)
                                }
                            }.bind(this))
                        }
                        else {//新增
                            api.save(this.type, function (res) {
                                if (res.status == 'y') {
                                    this.$message.success(res.msg)
                                    //执行页面跳转
                                    this.$router.push({ name: 'FoodType' })
                                }
                                else {
                                    this.$message.error(res.msg)
                                }
                            }.bind(this))
                        }
                    }
                    else {
                        console.log('vaildate error!')
                    }
                })
                console.dir(this.type)
            }
        },
        created: function () {
            // console.log(this.$route.params.id)
            if (this.$route.params.id) {
                this.id = this.$route.params.id //赋值当前的id
                api.getDataById(this.id, function (res) {
                    this.type = res.data
                }.bind(this))
            }
        }
    }

</script>
<style>

</style>