<template>
    <a-popconfirm content="确定要退出登录吗?" @ok="logout">
        <a-button>退出登录</a-button>
    </a-popconfirm>
</template>  
<script setup lang="ts">
import axios from 'axios';
const token = localStorage.getItem('token');
const logout = async () => {
    try {
        const response = await axios.post('http://58.87.105.56:8080/user/logout', null, {
            headers: {
                token: token,
            },
        });
        alert("退出登录成功！");
        window.location.href = '/login';
        console.log(response.data); // 处理响应数据  
    } catch (error) {
        console.error(error);
    }
};
</script>