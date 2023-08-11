<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id">
          <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select>
          <el-option label="sdsad"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select>
          <el-option label="sdsad"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import useCategoryStore from '@/store/stores/category.ts'
import { reqC1 } from '@/api/product/attr/index.ts'
const categoryStore = useCategoryStore()

onMounted(() => {
  getC1()
})

const getC1 = async () => {
  categoryStore.getC1()
}


</script>

<style scoped>

</style>