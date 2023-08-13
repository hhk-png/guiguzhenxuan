<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input v-model="spuParams.spuName" placeholder="请输入SPU的名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option v-for="(item, index) in allTrademark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input v-model="spuParams.description" type="textarea" placeholder="请输入SPU的描述"></el-input>
    </el-form-item>
    <!-- 照片墙 -->
    <el-form-item label="SPU照片">
      <!-- 上传图片的接口 -->
      <el-upload :on-remove="handleRemove" :on-preview="handlePictureCardPreview" v-model:file-list="imageList"
        action="/api/admin/product/fileUpload" list-type="picture-card">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img :src="dialogImageUrl" alt="" style="height: 100%; width: 100%;">
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 添加SPU 销售属性 -->
      <el-select v-model="saleAttrIdAndValueName"
        :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : ''">
        <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key="item.id"
          :label="item.name"></el-option>
      </el-select>
      <el-button @click="addSaleAttr" :disabled="!saleAttrIdAndValueName" type="primary" size="default" icon="Plus"
        style="margin-left: 10px;"> 添加属性值</el-button>
      <!-- 展示销售属性与属性值的地方 -->
      <el-table :data="saleAttr" border style="margin: 10px 0;">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column prop="saleAttrName" label="销售属性名字" width="120px"></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, index }">
            <el-tag @close="row.spuSaleAttrValueList.splice(index, 1)" v-for="(item, index) in row.spuSaleAttrValueList"
              :key="row.id" style="margin: 0 5px;" closable class="mx-1">
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input @blur="toLook(row)" v-if="row.flag" v-model="row.saleAttrValue" placeholder="属性值" size="small"
              style="width: 100px;"></el-input>
            <el-button v-else @click="toEdit(row)" type="primary" size="small" icon="Plus"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, index }">
            <el-button @click="saleAttr.splice(index, 1)" type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="saleAttr.length <= 0" @click="save" type="primary" size="default">保存</el-button>
      <el-button @click="cancel" type="primary" size="default">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import {
  SaleAttr, HasSaleAttr, SaleAttrValue, SpuImage, SpuData,
  AllTrademark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData,
  Trademark
} from '@/api/product/spu/types'
import { reqAllTrademark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu/index'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['changeScene'])

onMounted(() => {

})

const cancel = () => {
  emits('changeScene', 0)
}



// 控制查看图片对话框的显示与隐藏按钮
const dialogVisible = ref<boolean>(false)
// 展示图片
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
// 预览图片的地址
const dialogImageUrl = ref<string>('')
// 照片墙删除图片
const handleRemove = (file: any) => {
  if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
    return true
  }
  return false
}


const allTrademark = ref<Trademark[]>([])
const imageList = ref<SpuImage[]>([])
const saleAttr = ref<SaleAttr[]>([])
const allSaleAttr = ref<HasSaleAttr[]>([])
const spuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})

const initHasSpuData = async (spu: SpuData) => {
  spuParams.value = spu
  // 获取全部品牌的数据
  const result: AllTrademark = await reqAllTrademark()
  const result1: SpuHasImg = await reqSpuImageList(spu.id!)
  const result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id!)
  const result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTrademark.value = result.data
  imageList.value = result1.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  saleAttr.value = result2.data
  allSaleAttr.value = result3.data
}

// 当前SPU 还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  return allSaleAttr.value.filter(item => {
    return saleAttr.value.every(item1 => {
      return item.name !== item1.saleAttrName
    })
  })
})
// 将来收集还未选择的销售属性的id 与属性
const saleAttrIdAndValueName = ref<string>()
// 添加销售属性
const addSaleAttr = () => {
  const [attrId, attrName] = saleAttrIdAndValueName.value?.split(':')!
  const newSaleAttr: SaleAttr = {
    baseSaleAttrId: parseInt(attrId),
    saleAttrName: attrName,
    spuSaleAttrValueList: [],
    saleAttrValue: ''
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}
// 属性值添加按钮
const toEdit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
  // row.spuSaleAttrValueList[row.spuSaleAttrValueList.length - 1]?.focus()
}

const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  row.flag = false

  if (!saleAttrValue.trim().length) {
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return
  }
  const repeat = row.spuSaleAttrValueList?.find(item => {
    return item.saleAttrValueName === saleAttrValue
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复'
    })
    return
  }

  const newSaleAttrValue = {
    baseSaleAttrId: baseSaleAttrId!,
    saleAttrValueName: saleAttrValue
  }
  row?.spuSaleAttrValueList?.push(newSaleAttrValue)
  row.saleAttrValue = ''
}

const save = async () => {
  // 整理参数
  // 照片墙
  spuParams.value.spuImageList = imageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url
    }
  })
  // 整理销售属性
  spuParams.value.spuSaleAttrList = saleAttr.value

  const result = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功'
    })
    emits('changeScene', {flag: 0, params: 'update'})
  } else {
    ElMessage({
      type: 'error',
      message: spuParams.value.id ? '更新失败' : '添加失败'
    })
  }
}

const initAddSpu = async (c3Id: number | string) => {
  // 清空数据
  Object.assign(spuParams, {
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  // 清空照片墙
  imageList.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''

  spuParams.value.category3Id = c3Id
  const result: AllTrademark = await reqAllTrademark()
  const result1: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTrademark.value = result.data
  allSaleAttr.value = result1.data

}
// 必须暴漏出去，才能被父组件通过element 拿到
defineExpose({
  initHasSpuData,
  initAddSpu
})
</script>

<style scoped></style>
