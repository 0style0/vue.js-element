import axios from 'axios'
export default {
    /**
     * 服务端取数据
     * @param 页码 page 
     * @param 回调函数 callback 
     */
    getData(page,callback){
        axios.get(`${global.ApiUrl}/food_type?page=${page}`)
            .then(res=>{
                callback(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },
    /**
     * 根据id获取单条记录
     * @param {any} id 
     * @param {any} callback 
     */
    getDataById(id,callback){
        axios.get(`${global.ApiUrl}/food_type/${id}`)
            .then(res=>{
                delete res.data.data.__v//删除无用的服务器端属性
                delete res.data.data._id
                console.log(res.data)
                callback(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },
    /**
     * 保存数据到服务器
     * @param 需要保存的数据 data 
     * @param 请求成功的回调函数 callback 
     */
    save(data,callback){
        axios.post(`${global.ApiUrl}/food_type/create`,data)
            .then(res=>{
                console.log(data)
                callback(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },
    /**
     * 删除记录数据
     * @param 需要删除的id id 
     * @param 回调函数 callback 
     */
    delete(id,callback){
        axios.post(`${global.ApiUrl}/food_type/delete/${id}`)
            .then(res=>{
                callback(res.data)
            })
            .then(err=>{
                console.log(err)
            })
    },
    /**
     * 根据id修改指定的记录数据
     * @param 需要修改的记录id id 
     * @param 需要修改的数据 data 
     * @param 回调函数 callback 
     */
    update(id,data,callback){
        axios.post(`${global.ApiUrl}/food_type/update/${id}`,data)
            .then(res=>{
                callback(res.data)
            })
            .then(err=>{
                console.log(err)
            })
    },

    /**
     * 获取所有的分类信息
     * function  callback  回调函数     
     */
    getAllData(callback){
        axios.get(`${global.ApiUrl}/food_type/all_type`)
             .then(res=>{
                 callback(res.data)
             })
             .catch(err=>{
                 console.log(err)
             })
    }
}