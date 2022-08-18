import axios from "axios";
class HttpAxios {
    get dataMsg(){
        return this._dataMsg;
    }

    set dataMsg(value) {
        this._dataMsg = value;
    }

    _baseUrl = " http://localhost:8080/";

    _dataMsg = {
        code: "",
        data: {
            id: "",
            idList: [""],
            annualRingImage: "",
            annualRingEnvironmental: "",
            musicName: "",
            music: "",
        },
        msg: ""

    };

    constructor() {
        axios.defaults.baseURL = this._baseUrl;
    }

    // 获取idlist
    async getIdList(){

        await axios.get("/ar/allid",{

        }).then(
            (response) =>{
                this._dataMsg = response.data;
            },
            () =>{
                this._dataMsg = null;
            }
        )

        return this;
    }

    // 根据id获取年轮信息
    async getAnnualRing(id){
        await axios.get("/ar/",{
            params:{
                id : id,
            }
        }).then(
            (response )=>{
                this._dataMsg = response.data;
            },
            ( )=>{
                this._dataMsg = null;

            }
        )
        return this;
    }

    //按照id修改年轮信息
    async updateAnnualRing( id ,data_req){
        await axios.post("/ar",{
            params:{
                id : id,
            },
            headers:{
                "Content-Type": "multipart/form-data",
            },
            data:{
                data_req,
            }
        }).then(
            (response)=>{
                this._dataMsg = response.data;
            },
            () =>{
                this._dataMsg = null;
            }
        )
        return this;
    }

    //按照id删除年轮信息
    async deleteAnnualRing(id){
        await axios.delete("/ar/{id}",{
            params:{
                id : id,
            },
        }).then(
            (response)=>{
                this._dataMsg = response.data;
            },
            () =>{
                this._dataMsg = null;
            },
        )

        return this;
    }

}

export default HttpAxios;