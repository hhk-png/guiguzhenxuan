<template>
  <div>
    <Category :scene="scene"></Category>
    <!-- 卡片 -->
    <el-card style="margin: 10px 0;">
      <div v-show="scene === 0">
        <el-button @click="addSpu" :disabled="!categoryStore.c3Id" type="primary" size="default" icon="Plus">添加SPU</el-button>
        <!-- table -->
        <el-table :data="records" style="margin: 10px 0;" border>
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row, index }">
              <el-button type="primary" size="small" icon="Plus" title="添加SPU">添加</el-button>
              <el-button @click="updateSpu(row)" type="primary" size="small" icon="Edit" title="修改SPU">修改</el-button>
              <el-button type="primary" size="small" icon="View" title="查看SPU列表">查看</el-button>
              <el-button type="primary" size="small" icon="Delete" title="删除SPU">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination @current-change="getHasSpu" @size-change="changeSize" v-model:current-page="pageNo"
          v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total" :total="total">
        </el-pagination>
      </div>
      <!-- 添加修改spu -->
      <SpuForm ref="spu" @changeScene="changeScene" v-show="scene === 1"></SpuForm>
      <!-- 添加sku -->
      <SkuForm v-show="scene === 2"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue'
import useCategoryStore from '@/store/stores/category.ts'
import { ElMessage } from 'element-plus';
import { reqHasSpu } from '@/api/product/spu/index'
import { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/types'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'

// categoryStore
const categoryStore = useCategoryStore()
// 分类选择是否禁用
// 0：显示已有SPU
//  1：添加或修改已有SPU
//  2：添加SKU
const scene = ref<number>(0)
// 分类器默认页码
const pageNo = ref<number>(1)
// 每一页展示几条数据
const pageSize = ref<number>(3)
// 数据总数
const total = ref<number>(400)
// 已有的SPU
const records = ref<Records>([])
// SpuForm 实例
const spu = ref<any>()

// 监听三级分类id 变化
watch(() => categoryStore.c3Id, async () => {
  if (!categoryStore.c3Id) {
    return
  }
  getHasSpu()
})

// 获取一个三级分类下的全部已有SPU
//  再切换页码的时候会自动注入pager
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  const result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  if (result.code === 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
// 页面大小发生变化的时候
const changeSize = () => {
  getHasSpu()
}

const addSpu = () => {
  spu.value.initAddSpu(categoryStore.c3Id)
  scene.value = 1
}
const updateSpu = (row: SpuData) => {
  scene.value = 1
  spu.value.initHasSpuData(row)
}
// 
const changeScene = (num: number | {flag: number, params: string}) => {
  if (typeof num === 'number') {
  // 再次获取全部的已有SPU
    scene.value = num
    getHasSpu(pageNo.value)
  } else if (num.params === 'update') {
    scene.value = num.flag
    getHasSpu()
  } 
}





</script>

<style scoped></style>