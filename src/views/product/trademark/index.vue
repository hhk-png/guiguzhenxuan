<template>
  <el-card class="box-card">
    <el-button @click="addTradeMark" type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件，用于展示已有的平台数据 -->
    <el-table style="margin: 10px 0" border :data="treademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称">
        <!-- prop默认使用div展示数据，要想展示其他数据，就要自定义tempalte -->
        <template #="{ row, $index }">
          <div>{{ row.tmName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" style="height: 100px; width: 100px;" alt="没有图片">
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <!-- 编辑按钮 -->
          <el-button @click="updateTrademark(row)" type="primary" size="small" icon="Edit">编辑</el-button>
          <!-- 删除按钮 -->
          <el-popconfirm @confirm="deleteTrademark(row.id)" :title="`Are you sure to delete ${row.tmName}?`" width="250px" icon="Delete">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <el-pagination @current-change="changePageNo" @size-change="sizeChange" :page-count="9" v-model:current-page="pageNo"
      v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"></el-pagination>
  </el-card>
  <!-- 添加品牌 -->
  <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
    <el-form :model="trademarkParams" :rules="trademarkRules" ref="formRef">
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input v-model="trademarkParams.tmName" placeholder="请输入品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" prop="logoUrl">
        <!-- upload 组件 -->
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
          :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" alt="" style="height: 200px;">
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel" type="default" size="default">取消</el-button>
      <el-button @click="confirm" type="primary" size="default">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from 'vue'
// 请求品牌数据
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark'
import type { Records, TrademarkResponseData, Trademark } from '@/api/product/trademark/types'
import { ElMessage } from 'element-plus'
import type { UploadProps, UploadRawFile } from 'element-plus'



// 当前页码
const pageNo = ref<number>(1)
// 每一页展示多少条数据
const limit = ref<number>(3)
// 总数据量
const total = ref<number>(0)
// 已有品牌的数据
const treademarkArr = ref<Records>([])
const getHasTrademark = async (pager?: number) => {
  if (pager) {
    pageNo.value = pager
  }
  const result: TrademarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code === 200) {
    total.value = result.data.total
    treademarkArr.value = result.data.records
  }
}
// 改变页数，
const changePageNo = () => {
  // 
  getHasTrademark()
}
// 改变分页数
const sizeChange = () => {
  getHasTrademark()
}

onMounted(() => {
  getHasTrademark()
})



// 添加品牌显示
const dialogFormVisible = ref<boolean>(false)
// 表单实例
const formRef = ref()
// 品牌名称验证
const validateTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('length > 2'))
  }
}
// 图片验证
const validateLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback('请上传logo')
  }
}
// 品牌表单校验
const trademarkRules = {
  tmName: [
    { required: true, trigger: 'blur', validator: validateTmName }
  ],
  logoUrl: [
    { required: true, trigger: 'change', validator: validateLogoUrl }
  ]
}
// 添加
const addTradeMark = () => {
  dialogFormVisible.value = true
  trademarkParams.id = undefined
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''

  // 清除表单验证
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  // nextTick(() => {
  //   formRef.value?.clearValidate('tmName')
  //   formRef.value?.clearValidate('logoUrl')
  // })
}
// 编辑品牌
const updateTrademark = async (row: Trademark) => {
  dialogFormVisible.value = true
  trademarkParams.id = row.id
  trademarkParams.tmName = row.tmName
  trademarkParams.logoUrl = row.logoUrl
}
// 删除品牌
const deleteTrademark = async (id: number) => {
  const result = await reqDeleteTrademark(id)
  console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: result.message
    })
    getHasTrademark(treademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: result.data
    })
  }
}

// 取消
const cancel = () => {
  dialogFormVisible.value = false
}
// 确定按钮
const confirm = async () => {
  // 在发请求之前，对于整个表达进行校验
  await formRef.value.validate()
  const result = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '成功'
    })
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
    dialogFormVisible.value = false
  } else {
    ElMessage({
      type: 'error',
      message: result.data
    })
  }
}
// 定义收集新增品牌数据
const trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: ''
})
// 上传图标之前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: UploadRawFile) => {
  // rawFile：文件信息
  if (!/image\/(png|jpeg|gif|jpg)/.test(rawFile.type)) {
    ElMessage({
      type: 'error',
      message: '格式错误'
    })
    return false
  }
  if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage({
      type: 'error',
      message: '图片应该小于4M'
    })
    return false
  }
  return true
}
// 上传图片成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
  // 图片上传成功，清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl')
}


</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>