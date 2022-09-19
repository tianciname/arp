<template>
    <div class="main">
<!--            图片-->
        <div class=" animate__pulse"  >
            <label>
                <img :src="`http://localhost:8888/resources/`+ annualRingPath.id + `/image/image.jpg`"
                     alt="" class="ar-image"/>
                <input  type="file" accept="image/*" @change="uploadingImageFile" class="ar-image-input"/>
            </label>
        </div>
<!--            音乐-->
        <div class="ar-music-group">
            <div class="ar-music animate__pulse">
                <audio controls="controls"
                       class="music-item-music-object"
                       v-for="(musicItem, index) in annualRingPath.musicList" :key="index">
                    <source :src="`http://localhost:8888/resources/`+
                                annualRingPath.id + `/music/` + musicItem + `/music.mp3`"
                            type="audio/mp3"/>
                </audio>
            </div>
            <div class="ar-music-input">
                <label>
                    <span>uploading</span>
                    <input type="file" @change="uploadingMusicFiles" class="music-item-input" multiple>
                </label>
            </div>
        </div>

<!--         环保知识-->
        <div class="ar-environmental-info">
            <div class="text" v-if="activated" @dblclick="updateInfo()">
                <div class="ar-text-textarea">
                    {{message}}
                </div>
            </div>

            <div class="text" v-if="!activated" ref="message" >
                <textarea v-if="! activated" class="ar-text-textarea"
                          @change="uploadingEnvironmental"
                          @dblclick="updateInfo()"
                          placeholder="请输入环保信息......">
                </textarea>
            </div>
        </div>
    </div>

</template>

<script lang="js">
import { reactive, ref, toRef, watch,} from "vue";
import axiosAPI from "@/axioshtt/axiosApi";
export default {
    name: "ar-main",
    props: ["annualRing","getAnnualRingData"],
    setup(props){
        //后台获取的年轮信息对象
        const annualRingPath = reactive({
            id: toRef(props.annualRing,"id"),
            musicList: toRef(props.annualRing,"musicList"),
        })


        //用户输入的年轮数据
        const annualRingData  = reactive({
            annualRingImage:"",
            annualRingEnvironmental:"",
            musicList:"",
        })
        //ref定义的数据（变量，数组，对象）重新赋值不会丢失响应性
        //reactive定义的对象重新赋值会丢失响应性（原因是地址改变）

        watch(annualRingData,() => {
            props.getAnnualRingData(annualRingData);
        });


        //点击上传事件
        function uploadingImageFile(e) {
            annualRingData.annualRingImage = e.target.files[0];
        }
        function uploadingMusicFiles(e){
            annualRingData.musicList = e.target.files;
        }
        function uploadingEnvironmental(e){
            annualRingData.annualRingEnvironmental = e.target.value;
        }

        //工具函数
        let activated = ref(true);
        function updateInfo(){
            activated.value = ! activated.value;
        }

        //获取环保知识
        let message = ref("");
        watch(annualRingPath,()=>{
            axiosAPI.get("resources/"
                + annualRingPath.id +
                "/environmental/message.text",{
            }).then(
                    (response)=>{
                        message.value = response.data;
                    }
                )
        })


        return{
            //数据对象
            annualRingPath,
            annualRingData,

            //工具函数
            activated,
            updateInfo,

            //点击事件
            uploadingImageFile,
            uploadingMusicFiles,
            uploadingEnvironmental,

            //请求实体
            axiosAPI,

            //数据
            message,


        }
    }
}
</script>

<style scoped >

    .main{
        display: flex;
    }

    /*图片*/
    .ar-image{
        width: 400px;
        height: 400px;
        background-color: #f6f6f6;
        border-radius: 200px;
        margin-top: 20px;
        margin-left: 20px;
    }
    .ar-image-input{
        width: 400px;
        height: 400px;
        background-color: #f6f6f6;
        border-radius: 200px;
        margin-top: 20px;
        margin-left: 20px;
        display: none;
    }

    /*音乐*/
    .ar-music{
        width: 300px;
        height: 350px;
        border-radius: 25px 25px 0 0;
        background-color: lightgray;
        margin-top: 30px;
        overflow: auto;
    }
    .music-item-music-object{
        height: 50px;
        border-radius: 5px;
        background-color: lightgray;

    }
    .ar-music-input{
        width: 300px;
        height: 50px;
        border-radius: 0 0 10px 10px;
        background-color: lightgray;

    }
    .music-item-input{
        width: 300px;
        height: 50px;
        border-radius: 10px;
        display: none;
    }
    span{
        width: 300px;
        height: 50px;
        border-radius: 10px;
        display: inline-block;
        text-align: center;
        font-size: 20px;
    }

    /*环保知识*/
    .text{
        width: 600px;
        height: 400px;
        background-color: #f6f6f6;
        border-radius: 25px;
        overflow: hidden;
    }
    .ar-text-textarea{
        width: 500px;
        height: 300px;
        background-color: #f6f6f6;
        margin-top: 50px;
        margin-left: 50px;
        border: 0;
        font-size: 18px;
    }
    .ar-environmental-info{
        margin-top: 30px;
    }

</style>