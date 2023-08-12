<template>
  <Category :scene="scene"></Category>
  <el-card style="margin: 10px 0;">
    <!-- card content-->
    <div v-show="scene === 0">
      <el-button @click="addAttr" :disabled="!categoryStore.c3Id" type="primary" size="default"
        icon="Plus">添加平台属性</el-button>
      <!-- 展示平台属性 -->
      <el-table :data="attrArr" border style="margin:10px 0;">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column prop="attrName" label="属性名称"></el-table-column>
        <!-- 展示属性值 -->
        <el-table-column label="属性值名称">
          <template #="{ row, index }">
            <el-tag style="margin:5px;" v-for="(item, index) in row.attrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, index }">
            <el-button @click="updateAttr(row)" type="primary" size="small" icon="Edit">编辑</el-button>
            <el-popconfirm @confirm="deleteAttr(row.id)" title="确定删除" width="200px">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 另一个card，编辑平台属性 -->
    <div v-show="scene === 1">
      <el-form>
        <el-form-item label="属性名称">
          <el-input v-model="attrParams.attrName" placeholder="请输入属性名称"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="addAttrValue" :disabled="!attrParams.attrName" type="primary" size="default"
        icon="Plus">添加属性值</el-button>
      <el-button @click="cancel" type="primary" size="default">取消</el-button>
      <el-table :data="attrParams.attrValueList" border style="margin: 10px 0;">
        <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, index }">
            <el-input :ref="(vc: any) => { inputArr[index] = vc }" v-if="row.flag" @blur="toLook(row, index)"
              v-model="row.valueName" placeholder="属性值名称" size="small"></el-input>
            <div @click="toEdit(row, index)" v-else>{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, index }">
            <el-button @click="attrParams.attrValueList.splice(index, 1)" type="primary" size="default"
              icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button :disabled="attrParams.attrValueList.length === 0" @click="save" type="primary"
        size="default">保存</el-button>
      <el-button @click="cancel" type="primary" size="default">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import type { Attr, AttrValue } from '@/api/product/attr/types'
import useCategoryStore from '@/store/stores/category.ts'
import { ElMessage } from 'element-plus';
const categoryStore = useCategoryStore()

onBeforeUnmount(() => {
  // 卸载之前清空所有数据
  categoryStore.$reset()
})

// 属性值名称查看
const toLook = (row: AttrValue, index: number) => {
  // 值不能为空
  if (row.valueName.trim() === '') {
    // 删掉已经添加的数据
    attrParams.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return
  }
  // 避免重复值
  const repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return
  }

  row.flag = false
}
// 属性值名称编辑
const toEdit = (row: AttrValue, index: number) => {
  row.flag = true
  nextTick(() => {
    // 转换成编辑模式后自动聚焦
    inputArr.value[index].focus()
  })
}
// 添加平台属性
const inputArr = ref<any>([])
// 分类属性数组，
const attrArr = ref<Attr[]>([])
// 获取分类属性
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const result = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}
// 添加平台属性
const addAttr = () => {
  // 每一次点击的时候，先清空一下数据再收集数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })
  scene.value = 1
  // 收集三级分类id
  attrParams.categoryId = categoryStore.c3Id
}
// 更新平台属性
const updateAttr = (row: Attr) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
// 删除平台属性
const deleteAttr = async (id: number) => {
  const result = await reqRemoveAttr(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

// 监听三级分类变化
watch(() => categoryStore.c3Id, () => {
  if (!categoryStore.c3Id) return
  getAttr()
})
// 属性编辑页面
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

// 添加属性值
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  })
  // 获取最后el-input 组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1]?.focus()
  })
}

// 保存属性编辑结果按钮
const save = async () => {
  const result = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功'
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改成功' : '添加成功'
    })
  }
}

// 展示属性展示页面还是属性编辑页面
const scene = ref<number>(0)
// 取消
const cancel = () => {
  scene.value = 0
}

</script>

<style scoped></style>