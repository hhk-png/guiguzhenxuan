
<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU描述" type="textarea"></el-input>
    </el-form-item>
    <!-- 平台属性 -->
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName">
          <el-select>
            <el-option v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!-- 销售属性 -->
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item v-for="(item, index) in saleArr" :key="item.id" :label="item.saleAttrName">
          <el-select>
            <el-option v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!-- 图片名称 -->
    <el-form-item label="图片名称">
      <el-table :data="imgArr" border>
        <el-table-column type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片">
          <template #="{row, index}">
            <img :src="row.imgUrl" alt="图片" style="width: 100px;">
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称"></el-table-column>
        <el-table-column label="操作">
          <template #="{row, index}">
            <el-button type="primary" size="small">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <!-- 操作 -->
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button @click="cancel" type="primary" size="default">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/types'
import { reqAttr } from '@/api/product/attr/index'
import { reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu/index'

const emits = defineEmits(['changeScene'])

// 平台属性
const attrArr = ref<any>([])
// 销售属性
const saleArr = ref<any>([])
// 照片墙的数据
const imgArr = ref<any>([])

const cancel = () => {
  emits('changeScene', 0)
}
// 点击添加SKU 按钮时，获取数据
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuData) => {
  // 获取平台属性
  const result = await reqAttr(c1Id, c2Id, spu.category3Id)
  // 获取对应的销售属性
  const result1 = await reqSpuHasSaleAttr(spu.id!)
  // 照片墙的数据
  const result2 = await reqSpuImageList(spu.id!)
  attrArr.value = result.data
  saleArr.value = result1.data
  imgArr.value = result2.data
}

defineExpose({
  initSkuData
})

</script>

<style scoped></style>