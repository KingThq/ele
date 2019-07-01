<template>
    <div>
        
        <router-view></router-view>
        <eleFooter v-if="$route.meta.isFooter"></eleFooter>
    </div>
</template>

<style lang="less">

</style>
