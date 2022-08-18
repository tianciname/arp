<template>
    <div class="ar-login">
        <div class="ar-login-message">
            <form name="login">
                <label>
                    <input class="username" required type="text" v-model="user" placeholder="Please enter your user name!"/>
                </label>
                <label>
                    <input class="password" required type="password"  placeholder="Please enter your password!"/>
                </label>
                <label>
                    <button class="submit" @click="login">提交</button>
                </label>
            </form>
        </div>
    </div>
</template>

<script lang="js">
import {defineComponent, ref} from "vue";
export default defineComponent({
    name: "ar-login",
    setup(){
        let user = ref("");


        const users = [
            "wuguozhang",
            "wainqi",
            "yaomeng",
            "yesiqi",
            "liushiyao",
        ];

        function login() {

            for (let ur of users){
                if (ur === user.value){
                    alert("登录成功");

                    this.$router.push({
                        name:"ar-table",
                    })
                }
            }

        }

        return{
            users,
            user,
            login,
        }
    }

})
</script>

<style scoped>
/**{*/
/*    margin: 0 ;*/
/*    padding: 0 ;*/
/*}*/


.ar-login{
    width: 600px;
    height: 600px;
    margin: 100px auto;


    border-radius: 8% 92% 20% 80% / 34% 27% 73% 66%;
    background: linear-gradient(315deg, #e3e3e3, #ffffff);
    box-shadow:  -35px -35px 70px #d6d6d6,
    35px 35px 70px #ffffff;

    display: flex;
}

.ar-login-message{
    width: 400px;
    height: 200px;

    margin-top: 150px;
    margin-left: 100px;

}

.username{
    border-radius: 15px;
    width: 400px;
    height: 40px;

    font-size: 15px;

}
.password{
    border-radius: 15px;
    width: 400px;
    height: 40px;
    margin-top: 30px;
}


.submit {

    margin-top: 20px;
    margin-left: 20px;

    box-shadow:inset 0 1px 0 0 #ffffff;
    background: #ffffff linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
    border-radius:6px;
    border:1px solid #dcdcdc;
    display:inline-block;
    cursor:pointer;
    color:#666666;
    font-family:Arial,serif;
    font-size:15px;
    font-weight:bold;
    padding:6px 24px;
    text-decoration:none;
    text-shadow:0 1px 0 #ffffff;
}
.submit:hover {
    background: #f6f6f6 linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
}
.submit:active {
    position:relative;
    top:1px;
}


</style>