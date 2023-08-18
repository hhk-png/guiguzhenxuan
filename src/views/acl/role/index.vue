<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input v-model="keyword" placeholder="请输入搜索职位关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" :disabled="!keyword.length" type="primary" size="default">搜索</el-button>
        <el-button @click="reset" type="primary" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0;">
    <el-button @click="addRole" type="primary" size="default" icon="Plus">添加职位</el-button>
    <el-table :data="allRole" border style="margin: 10px 0;">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column prop="id" align="center" label="ID"></el-table-column>
      <el-table-column prop="roleName" align="center" label="职位名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="updateTime" align="center" label="更新时间" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作" width="260px">
        <template #="{ row, index }">
          <el-button type="primary" size="small" icon="User">分配权限</el-button>
          <el-button @click="updateRole(row)" type="primary" size="small" icon="Edit">编辑</el-button>
          <el-button type="primary" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="getHasRole" @size-change="() => getHasRole()" v-model:current-page="pageNo"
      v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" :total="total" :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes"></el-pagination>
  </el-card>
  <!-- 添加职位与更新已有职位的对话框 -->
  <el-dialog v-model="dialogVisible" :title="roleParams.id ? '更新职位' : '添加职位'">
    <el-form ref="roleForm" :model="roleParams" :rules="rules">
      <el-form-item prop="roleName" label="职位名称">
        <el-input v-model="roleParams.roleName" placeholder="请你输入职位名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false" type="default" size="default">取消</el-button>
      <el-button @click="save" type="primary" size="default">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue'
import { reqAllRoleList, reqAddOrUpdateRole } from '@/api/acl/role/index'
import type { RoleResponseData, Records, RoleData } from '@/api/acl/role/types'
import useLayoutSettingStore from '@/store/stores/setting';
import { ElMessage } from 'element-plus';

const layoutSettingStore = useLayoutSettingStore()
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(400)
const keyword = ref<string>('')
// 全部的职位
const allRole = ref<Records>([])
// 控制对话框的显示
const dialogVisible = ref<boolean>(false)
// 收集新增岗位数据
const roleParams = reactive<RoleData>({
  roleName: '',
  id: '',
  createTime: '',
  updateTime: '',
  remark: ''
})


// 搜索按钮
const search = () => {
  getHasRole()
  keyword.value = ''
}
// 重置按钮
const reset = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

onMounted(() => {
  getHasRole()
})
// 获取全部用户信息
const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  const result = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    allRole.value = result.data.records
    total.value = result.data.total

  }
}
// 每页显示条数改变
const sizeChange = () => {
  getHasRole()
}
// 添加角色
const addRole = () => {
  dialogVisible.value = true
  Object.assign(roleParams, {
    roleName: '',
    id: 0
  })
  nextTick(() => {
    roleForm.value.clearValidate('roleName')
  })
}
// 更新已有角色
const updateRole = (row: RoleData) => {
  dialogVisible.value = true
  Object.assign(roleParams, row)
  nextTick(() => {
    roleForm.value.clearValidate('roleName')
  })
}


// 添加角色form 实例
const roleForm = ref<any>(null)
// 验证角色名称
const validateRoleName = (rule: any, value: string, callback: any) => {
  if (value.trim().length <= 2) {
    return callback(new Error('职位名称不能小于2'))
  }
  callback()
}
// 添加role 的验证规则
const rules = {
  roleName: [
    { required: true, trigger: 'blur', validator: validateRoleName },
  ]
}
// 确定按钮
const save = async () => {
  await roleForm.value.validate()
  const result = await reqAddOrUpdateRole(roleParams)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: roleParams.id ? '更新成功' : '添加成功' })
    dialogVisible.value = false
    getHasRole(roleParams.id ? pageNo.value : 1)
  }
}

</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
</style>