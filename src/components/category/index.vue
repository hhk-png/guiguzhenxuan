<template>
  <el-card>
    <el-form :inline="true">
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select @change="c1Select" :disabled="scene === 1" v-model="categoryStore.c1Id">
          <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-form-item label="二级分类">
        <el-select @change="c2Select" :disabled="scene === 1" v-model="categoryStore.c2Id">
          <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="scene === 1">
          <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useCategoryStore from '@/store/stores/category.ts'
const categoryStore = useCategoryStore()

defineProps<{
  scene: number
}>()

onMounted(() => {
  getC1()
})

const getC1 = () => {
  categoryStore.getC1()
}
// 一级分类菜单选中
const c1Select = () => {
  categoryStore.c2Id = ''
  categoryStore.c2Arr = []
  categoryStore.c3Id = ''
  categoryStore.getC2()
}

// 三级分类被选中
const c2Select = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}


</script>

<style scoped></style>