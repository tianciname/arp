<template>
    <div class="main">
        <div class="ar-i">

            <div class="ar-image animate__pulse" >
                <input type="file" :value="imageFile" class="ar-image-" v-bind:style="image">
            </div>

            <div class="music animate__pulse" >
                <input  type="file" :value="musicFile" class="music-" >
                <audio controls="controls"  class="object">
                    <source src="`{{music}}`" type="audio/mp3"/>
                </audio>
            </div>

        </div>

        <div class="ar-info">
            <div class="text" v-if="activated" @dblclick="updateInfo">
                {{environmental}}
            </div>
            <div class="text" v-if="! activated" ref="message" >
        <textarea v-if="! activated" class="ar-text" @dblclick="updateInfo" placeholder="请输入环保信息......" >
        </textarea>
            </div>
        </div>


    </div>

</template>

<script lang="js">
import {computed, onMounted, reactive, ref, watch,} from "vue";
export default {
    name: "ar-main",
    props: ["annualRing","getData"],
    setup(props){
        let activated = ref(true);
        let img;
        let environmental;
        let music;
        let id;
        let getD = ref(props.getData);
        let imageFile = ref();
        let musicFile = ref();
        let environmentMessage;

        try {
            id = reactive(this.annualRing.id);
            img = reactive(this.annualRing.annualRingImage);
            environmental = reactive(this.annualRing.annualRingEnvironmental);
            music = reactive(this.annualRing.music);
        }catch (e){
            console.log(e);
        }

        let image;

        onMounted(()=>{
            image = {backgroundImage: img};
        });

        watch(environmental,()=>{
            environmentMessage = ref(this.$refs.message.innerText);
        });

        function updateInfo(){
            activated.value = ! activated.value;
        }
        const data = computed(()=>{
            return{
                annualRingImage: imageFile,
                annualRingEnvironmental: musicFile,
                music: musicFile,
            }
        })

        watch(data, () => {
                getD(id.value,data);
            });

        let isShowMusic = ref(true);

        function showChange(){
            isShowMusic.value = ! isShowMusic.value;
        }
        return{
            img,
            environmental,
            music,
            activated,
            updateInfo,
            image,
            imageFile,
            musicFile,
            environmentMessage,
            isShowMusic,
            showChange
        }
    }
}
</script>

<style scoped >

    .main{
        display: flex;
    }
    .ar-i{
        display: flex;
    }
    .object{
        width: 220px;
        height: 50px;
        border-radius: 200px;
        background-color: lightgray;
        margin-left: -10px;

    }
    .ar-image{
        width: 400px;
        height: 400px;
        background-color: #f6f6f6;
        border-radius: 200px;
        margin-top: 20px;
        margin-left: 20px;

    }
    .ar-image-{
        width: 400px;
        height: 400px;
        background-color: #f6f6f6;
        border-radius: 200px;
        margin-top: 20px;
        margin-left: 20px;
        opacity: 0;
    }
    .ar-info{

        border-radius: 100px;
        margin-right: 3%;
        margin-top: 30px;

    }
    .music{
        width: 200px;
        height: 200px;
        border-radius: 200px;
        background-color: lightgray;
        margin-left: -50px;
        margin-top: 250px;
    }
    .music-{
        width: 200px;
        height: 200px;
        border-radius: 200px;
        background-color: red;
        opacity: 0;
    }
    .text{
        width: 800px;
        height: 400px;
        background-color: #f6f6f6;
        border-radius: 100px;
    }
    .ar-text{
        width: 700px;
        height: 300px;
        background-color: #f6f6f6;
        margin-top: 50px;
        margin-left: 50px;
        border: 0;
        font-size: 18px;
    }

</style>