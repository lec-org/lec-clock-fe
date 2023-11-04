<template>
    <div class="ranking-list">
        <div class="nav-bar">
            <a-list
            :data="grades"
            >
            <template #item="{item,index}">
                <div
                class="nav-item"
                :class="{active:currentGrade === item.value}"
                @click="currentGrade = item.value">
                {{ item.label }}
                </div>
            </template>
            </a-list>
        </div>
            <div class="table-header">
            <div class="table2-cell">排名</div>
            <div class="table-cell">ID</div>
            <div class="table2-cell">当前时长</div>
            <div class="table-cell">目标时长</div>
            <div class="table-cell">完成度</div>
            <div class="table3-cell">状态</div>
        </div>
        <a-list
        :data="users"
        >
            <template #item="{item,index}">
                <div
                    v-if="item.grade === currentGrade"
                    class="rank-item"
                    :key="index"
                >
                <div class="table-cell" style="position: relative; left: 3em">
                    {{ index + 1 }}
                </div>
                <img :src="item.avatar" :alt="item.nickname" class="avatar" />
                <div class="table-cell">{{ item.nickname }}</div>
                <div class="table-cell">{{ item.totalDuration }}小时</div>
                <div class="table-cell">{{ item.targetDuration }}小时</div>
                <div class="table-cell">
                    {{ ((item.totalDuration / item.targetDuration) * 100).toFixed(0) }}%
                </div>
                <div class="table-cell">
                    <a-status-dot
                    :status="{ 0: 'error', 1: 'success' }[item.status]"
                    ></a-status-dot>
                </div>
                </div>
            </template>
    </a-list>
    </div>
</template>

<script setup>
const grades = [
    {label:"大一",value:1},
    {label:"大二",value:2},
    {label:"其他年级",value:3},
    ]
</script>