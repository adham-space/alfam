<template>
    <el-row style="height: calc(100vh - 86px); " >
        <el-col :span="19" style="height: calc(100vh - 96px);">
            <Table />
        </el-col>
        <el-col :span="5" style="height: calc(100vh - 86px); ">
            <Tools />
        </el-col>
    </el-row>
</template>

<script>
import Table from './components/Table'
import Tools from './components/Tools'
export default {
    name: 'Shop',
    components: {
        Table, 
        Tools
    }
}
</script>

<style>

</style>