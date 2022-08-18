<template>
    <transition name="animate__animated animate__bounce" >
        <div class="submit" :class="dongxiaos" @click="addar(id);donghuas();changes()" >
            <span>submit</span>
        </div>
    </transition>

    <transition name="animate__animated animate__bounce">
        <div class="delete" :class="dongxiaod" @click="deletear(id);donghuad();changed()">
            <span>delete</span>
        </div>
    </transition>

</template>
<script lang="js">
import {reactive, ref} from "vue";
import axiosInterface from "@/axioshtt/axiosInterface";
export default {
    name: "ar-footer",
    props: ["annualRing","data"],
    setup(props) {

        let axiosInterf = new axiosInterface();
        let id;
        let arData =reactive(props.data);

        try {
            id = reactive(this.annualRing.id);
        }catch (e){
            console.log(e);
        }

        function addar(id,data) {
            axiosInterf.updateAnnualRing(id,data);
        }

        function deletear(id) {
            axiosInterf.deleteAnnualRing(id);
        }

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
        return {
            addar,
            deletear,
            id,
            arData,
            dongxiaos,
            dongxiaod,
            donghuas,
            changes,
            donghuad,
            changed,
        }
    }
}
</script>

<style scoped>
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