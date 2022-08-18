<template>
    <transition name="animate__animated animate__bounce" appear>
        <div class="ar-item animate__backInLeft" >
            <slot></slot>
        </div>
    </transition>
</template>
<script lang="js">
import { defineComponent } from 'vue';
export default defineComponent({
    name:"ar-item",
    setup() {

        return {

        };
    },
});
</script>

<style>
    .ar-item{
        width: 100%;
        height: 50px;
        border-radius: 15px;
        margin-top: 2px;
        background: #e0e0e0;
        box-shadow: inset 22px 22px 79px #d3d3d3,
        inset -22px -22px 79px #ededed;

    }

    .item-enter{
        animation: animate__backInLeft;
    }

</style>