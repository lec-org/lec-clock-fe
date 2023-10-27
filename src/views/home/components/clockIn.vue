<template>
    <div class="go" @click="startClockIn">
        <input type="submit" value="上/下卡">
        <div class="L_">
            <div class="l_"></div>
            <div class="l_"></div>
            <div class="l_"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false);
// 检查 token 是否存在
const checkToken = () => {
    const token = localStorage.getItem('token');
    isLoggedIn.value = !!token;
}

const token = localStorage.getItem('token');

// console.log(token);
// 页面加载时检查 token
onMounted(checkToken);

const startClockIn = async () => {

    try {
        const response = await axios.post('http://58.87.105.56:8080/clock/clock', null, {
            headers: {
                token: token,
            },
        });
        alert("操作成功");
        console.log(response.data); // 处理响应数据
    } catch (error) {
        alert("错误");
        console.error(error);
    }
};

</script>
<style>
.go {
    width: 18em;
    height: 18em;
    margin: 5em auto;
    position: relative;
    display: flex;
    text-align: center;
}

.go input {
    width: 7em;
    height: 7em;
    margin: 0 auto;
    font-size: 36px;
    border: none;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
    color: #4A42AE;
    font-weight: bolder;
    text-shadow: 0 0 100px #7c93df, 0 0 100px #6b94df, 0 0 20px currentColor, 0 0 200px currentColor;
}

.L_ {
    position: absolute;
    width: 18em;
    height: 18em;
    border-radius: 50%;
    top: 0px;
}

.l_ {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;

}

.l_:nth-of-type(1) {
    border-bottom: 6px solid #EBA4D2;
    transform: rotatex(35deg) rotatey(-45deg);
    animation: one 1.5s linear infinite;

}

.l_:nth-of-type(2) {
    border-right: 6px solid #6AAFF2;
    transform: rotatex(50deg) rotatey(10deg);
    animation: two 1.5s linear infinite;
}

.l_:nth-of-type(3) {
    border-top: 6px solid #CC54D0;
    transform: rotatex(35deg) rotatey(55deg);
    animation: three 1.5s linear infinite;
}

@keyframes one {
    to {
        transform: rotatex(35deg) rotatey(-45deg) rotatez(360deg);
    }
}

@keyframes two {
    to {
        transform: rotatex(50deg) rotatey(10deg) rotatez(360deg);
    }
}

@keyframes three {
    to {
        transform: rotatex(35deg) rotatey(55deg) rotatez(360deg);
    }
}

.go:hover .l_ {
    transform: none;
}

.go:hover input {
    text-shadow: 0 0 10px #6f8ee8, 0 0 2px #6190e7, 0 0 5px currentColor, 0 0 10px currentColor;
}</style>