<template>
  <el-card>
    <el-table :data="skuArr" border style="margin: 10px 0;">
      <el-table-column type="index" label="序号" align="center" widht="80px"></el-table-column>
      <el-table-column prop="skuName" label="名称" show-overflow-tooltip widht="150px"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" show-overflow-tooltip widht="150px"></el-table-column>
      <el-table-column label="图片" widht="150px">
        <template #="{ row, index }">
          <img :src="row.skuDefaultImg" alt="skuDefaultImg" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" widht="150px"></el-table-column>
      <el-table-column prop="price" label="价格" widht="150px"></el-table-column>
      <el-table-column label="价格操作" widht="250px" fixed="right">
        <template #="{ row, index }">
          <el-button @click="updateSale(row)" type="primary" size="small"
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"></el-button>
          <el-button @click="updateSku" type="primary" size="small" icon="Edit"></el-button>
          <el-button @click="findSku(row)" type="primary" size="small" icon="InfoFilled"></el-button>
          <el-popconfirm @confirm="removeSku(row.id)" title="确定删除?" width="200px">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
          <el-button  type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :total="total" @current-change="getHasSku" @size-change="sizeChange" :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total">
    </el-pagination>
    <!-- 抽屉组件 -->
    <el-drawer v-model="drawerShow">
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.attrId" style="margin: 10px 0px;">
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in skuInfo.skuSaleAttrValueList" :key="item.saleAttrId" style="margin: 10px 0px;">
              {{ item.saleAttrName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="2000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="图片" style="width: 100%;">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { reqSkuList, reqSaleSku, reqCancelSale, reqSkuInfo, reqDeleteSku } from '@/api/product/sku'
import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/types'
import { ElMessage } from 'element-plus';

onMounted(() => {
  getHasSku()
})


// 当前页码
const pageNo = ref<number>(1)
// 每页展示几条数据
const pageSize = ref<number>(10)
// 数据总数
const total = ref<number>(0)
// sku数据
const skuArr = ref<SkuData[]>([])
// 抽屉组件的显示与隐藏
const drawerShow = ref<boolean>(false)

const skuInfo = ref<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuDefaultImg: '',
  skuImageList: [],
})

// 获取已有SKU
const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  const result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code === 200) {
    skuArr.value = result.data.records
    total.value = result.data.total
  }
}
// 每页展示数据改变
const sizeChange = () => {
  getHasSku()
}
// 更新上架状态
const updateSale = async (row: SkuData) => {
  // 处于上架状态
  if (row.isSale === 1) {
    const result = await reqCancelSale(row.id!)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '下架成功'
      })
      await getHasSku()
    }
  } else {
    // 处于下架状态
    const result = await reqSaleSku(row.id!)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '上架成功'
      })
      await getHasSku()
    }
  }
}
// 更新sku 数据
const updateSku = () => {
  console.log('row')
}
// 展示sku信息
const findSku = async (row: SkuData) => {
  drawerShow.value = true
  const result: SkuInfoData = await reqSkuInfo(row.id!)
  if (result.code === 200) {
    skuInfo.value = result.data
  }
}
const removeSku = async (id: number) => {
  const result = await reqDeleteSku(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // 当前展示的条数大于1，获取当前页码的数据
    //  当前展示的条数小于等于1，获取前一页的数据
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>