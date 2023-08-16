<template>
  <el-card>
    <el-table border style="margin: 10px 0;">
      <el-table-column type="index" label="序号" align="center" widht="80px"></el-table-column>
      <el-table-column label="名称" show-overflow-tooltip widht="150px"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip widht="150px"></el-table-column>
      <el-table-column label="图片" widht="150px"></el-table-column>
      <el-table-column label="重量" widht="150px"></el-table-column>
      <el-table-column label="价格" widht="150px"></el-table-column>
      <el-table-column label="价格操作" widht="250px" fixed="right"></el-table-column>
    </el-table>
    <el-pagination 
      v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :total="400" :background="true" layout="prev, pager, next, jumper, ->, sizes, total"
      >
    </el-pagination>
  </el-card>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)

</script>

<style scoped>

</style>