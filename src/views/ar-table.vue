<template>
    <div class="ar-table">
        <div class="ar-aside">
            <div class="logo"></div>
            <div class="id-list">
                <ar-item @click="getInfo(id)" v-for="(id,index) in idList" :key="index">
                    {{id}}</ar-item>
            </div>
        </div>
        <div class="ar-expected-aside">
            <div class="ar-header">
                <ar-header></ar-header>
            </div>

            <div class="ar-main" v-bind:="getData">
                <ar-main :data="annualR" v-bind:methods="getData"></ar-main>
            </div>

            <div class="ar-footer">
                <ar-footer :data="annualR" :info="data"></ar-footer>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import arHeader from "@/components/ar-header.vue";
import arMain from "@/components/ar-main.vue";
import arFooter from "@/components/ar-footer.vue";
import arItem from "@/components/ar-item.vue";
import {onBeforeMount, onMounted} from "vue";
import axiosInterface from "../axioshtt/axiosInterface"

export default {
    name: "ar-table",
    components:{
        arHeader,
        arMain,
        arFooter,
        arItem,
    },
    setup(){

        let idList = [];

        let httpAxios = new axiosInterface();

        let annualR;

        let data;

        onBeforeMount(()=>{
            try {
                idList  = httpAxios.getIdList().dataMsg.data.idList;
            }catch (e){
                console.log(e);
            }
        });

        function getInfo(id){
            annualR = httpAxios.getAnnualRing(id).dataMsg;
        }

        function getData(da){
            data = da;
        }

        return{
            onMounted,
            idList,
            annualR,
            getInfo,
            getData,
            data,
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
    background-color: chartreuse;
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
</style>