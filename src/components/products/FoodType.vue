<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类管理</el-breadcrumb-item>
        </el-breadcrumb>
        <router-link :to="{name:'FoodTypeEditor'}" class="el-button el-button--danger">新增</router-link>
        <el-table :data="data" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="名字" width="180">
            </el-table-column>
            <el-table-column prop="description" label="备注">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">         
               <!--
                   page-count 总页数
                   current-change   页码改变事件
               -->
            <el-pagination layout="prev, pager, next" :page-count="pageCount" @current-change="pageChanged">
            </el-pagination>
        </div>
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <span>{{dialogMsg}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;delItem={}">取 消</el-button>
                <el-button type="primary" @click="doDel">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import api from '../../services/api_food_type'
    export default {
        data() {
            return {
                data: [],
                dialogVisible: false,
                dialogMsg: '',
                delItem: {}, //点击删除后临时保存数据
                pageCount:1, //总页数
                pageIndex:1 //当前页码
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push({name:'FoodTypeEditor',params:{id:row._id}})
            },
            handleDelete(index, row) {//删除按钮点击
                this.dialogVisible = true
                this.dialogMsg = `确认删除:${row.name}`
                // console.log(index, row);
                this.delItem = row
            },
            doDel: function () {//确认删除
                this.dialogVisible = false
                // console.log(this.delItem)
                // this.$router.push({name:'FoodType'})
                api.delete(this.delItem._id, function (res) {
                    if (res.status == 'y') {
                        this.$message.success('删除成功')
                        // console.dir(this.$router)
                        //为了实现删除之后刷新页面的效果 我们为此路由添加一个无用的随机数做为参数
                        this.$router.push({ name: 'FoodType', query: { random: Math.random() } })
                    }
                    else {
                        this.$message.error(res.msg)
                    }
                }.bind(this))
            },
            getData() {//取数据的方法
                api.getData(this.pageIndex, function (res) {
                    // console.log('获取数据')
                    // console.log(res)
                    this.pageCount = res.data.pageCount
                    this.data = res.data.res
                }.bind(this))
            },
            pageChanged(page){//页码改变的时候 参数为当前页码
                // console.log(page)
                this.pageIndex = page
                this.getData()
            }
        },
        created: function () {//控件初始化的时候调用
            this.getData()
        },
        watch: {
            $route: function () {//路由地址变化的时候 调用取数据方法
                console.log('获取分类列表数据')
                this.getData()
            }
        }
    }

</script>
<style>

</style>