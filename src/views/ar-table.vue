<template>
    <div class="ar-table">
        <div class="ar-aside">
            <img class="logo" src="../../public/logo/logo.png" alt=""/>
            <div class="id-list">
                <div class="id-item" @dblclick="getAnnualRingMusicListById(id)"
                        v-for="(id, index) in idListResponseData"
                        :key="index">
                    {{id}}
                </div >
            </div>
        </div>
        <div class="ar-expected-aside">
            <div class="ar-header">
                <ar-header></ar-header>
            </div>

            <div class="ar-main">
                <ar-main :annualRing="annualRing" :getAnnualRingData="getAnnualRingData"></ar-main>
            </div>

            <div class="ar-footer">
                <transition name="animate__animated animate__bounce" >
                    <div class="submit" :class="dongxiaos" @click="addAnnualRing(changedAnnualRingData) ;donghuas();changes()" >
                        <span>submit</span>
                    </div>
                </transition>

                <transition name="animate__animated animate__bounce">
                    <div class="delete" :class="dongxiaod" @click="deleteAnnualRing(annualRing.id);donghuad();changed()">
                        <span>delete</span>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import arHeader from "@/components/ar-header.vue";
import arMain from "@/components/ar-main.vue";
import {reactive, ref} from "vue";
import axiosAPI from "@/axioshtt/axiosApi";

export default {
    name: "ar-table",
    components:{
        arHeader,
        arMain,
    },
    setup(){
        let idListResponseData = reactive([]);

        const annualRing = reactive({
            id:"",
            musicList:[],
        });
        const changedAnnualRingData = reactive({
            annualRingImage:"",
            annualRingEnvironmental:"",
            musicList:[],
        });

        axiosAPI.get("/ar/allid").then(
            (response) =>{
                idListResponseData.push(...response.data.data.idList);
            },
            () =>{
                console.log("err");
            }
        )

        //根据id获取该年轮图片对应的音乐id列表
        function getAnnualRingMusicListById(id){
            axiosAPI.get("/ar/" + id,{
            }).then(
                (response) =>{
                    annualRing.id = id;
                    annualRing.musicList.push(...response.data.data.musicList);
                },
                () =>{
                    console.log("err");
                }
            )
        }
        //从ar-main中获取data修改后的年轮数据
        function getAnnualRingData(annualRingData){
            changedAnnualRingData.annualRingImage = annualRingData.annualRingImage;
            changedAnnualRingData.annualRingEnvironmental = annualRingData.annualRingEnvironmental;
            changedAnnualRingData.musicList = annualRingData.musicList;
        }

        //动画方法
        let dongxiaos = ref(" ");
        let dongxiaod = ref(" ");
        function donghuas(){
            dongxiaos.value = "animate__bounceIn";
        }
        function donghuad(){
            dongxiaod.value = "animate__bounceIn";
        }
        function changes(){
            setTimeout(()=>{
                dongxiaos.value = " ";
            },500)
        }
        function changed(){
            setTimeout(()=>{
                dongxiaod.value = " ";
            },500)
        }

        //按照id添加一组年轮数据
        function addAnnualRing(annualRingData) {
            const annualRingFormData = new FormData();

            for (let musicFile of annualRingData.musicList){
                annualRingFormData.append("musicData",musicFile);
            }
            annualRingFormData.append("annualRingImage",annualRingData.annualRingImage);
            annualRingFormData.append("annualRingEnvironmental",annualRingData.annualRingEnvironmental);

            axiosAPI.post("/ar",
                annualRingFormData,{
                    headers: {
                        'Content-Type': "multipart/form-data" +
                            " charset=UTF-8"
                    },
                }).then(
                () =>{
                    console.log("yes");
                },
                () =>{
                    console.log("err");
                }
            )
        }
        //按照id删除一组年轮数据
        function deleteAnnualRing(id) {
            axiosAPI.delete("/ar/"+ id).then(
                () =>{
                    console.log("yes")
                },
                () =>{
                    console.log("err")
                }
            )
        }
        return{
            //数据实体
            idListResponseData,
            annualRing,
            changedAnnualRingData,

            //事件方法
            getAnnualRingMusicListById,
            getAnnualRingData,
            addAnnualRing,
            deleteAnnualRing,

            //动画方法
            dongxiaos,
            dongxiaod,
            donghuas,
            changes,
            donghuad,
            changed,
        }
    },
}
</script>
<style scoped>
.ar-table{
    display: flex;
}
.ar-aside{

    height: 850px;
    flex: 2;
    background-color: honeydew;
}
.ar-expected-aside{
    flex: 8;
    display: flex;
    flex-direction: column;
    border-left: 1px solid;
}
.ar-header{
    /*height: 30%;*/
    background-color: honeydew;
    flex: 2;
    border-bottom: 1px solid;

}
.ar-main{
    /*height: 50%;*/
    background-color: honeydew;
    flex: 6;

}
.ar-footer{
    /*height: 20%;*/
    background-color: honeydew;
    flex: 2;
    border-top: 1px solid;
}
.logo{
    width: 150px;
    height: 150px;
    border-radius: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.id-list{
    width: 100%;
    height: 679px;
    background-color: honeydew;
    margin-right: 0;

    /*滚动条*/
    overflow: auto;
}
.id-item{
    width: 100%;
    height: 50px;
    border-radius: 15px;
    margin-top: 2px;
    background: #e0e0e0;
    box-shadow: inset 22px 22px 79px #d3d3d3,
    inset -22px -22px 79px #ededed;
    text-align: center;
    line-height: 50px;
}
.submit{
    margin-top: 30px;
    width: 500px;
    height: 100px;
    background-color: cadetblue;
    display: inline-block;
    margin-left: 100px;
    border-radius: 25px;
}
.delete{
    margin-left: 100px;
    width: 500px;
    height: 100px;
    background-color: darkslategrey;
    display: inline-block;
    border-radius: 25px;
}
span{
    display: inline-block;
    font-size: 40px;
    margin-left: 170px;
    margin-top: 20px;
}
</style>