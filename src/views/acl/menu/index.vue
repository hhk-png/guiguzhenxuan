<template>
  <el-table :data="permissionArr" style="width: 100%; margin-bottom: 20px;" row-key="id" border>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{ row, index }">
        <el-button @click="addPermission(row)" :disabled="row.level === 4" type="primary" size="small">{{ row.level === 3 ?
          '添加功能' : '添加菜单' }}</el-button>
        <el-button @click="updatePermission(row)" :disabled="row.level === 1" type="primary" size="small">编辑</el-button>
        <el-popconfirm title="确定删除?" @confirm="deleteMenu(row)">
          <template #reference>
            <el-button :disabled="row.level === 1" type="primary" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加或者更新已有的菜单数据 -->
  <el-dialog v-model="dialogShow" :title="menuData.id ? '更新菜单' : '添加菜单'">
    <!-- 用于收集新增与已有的菜单的数据 -->
    <el-form>
      <el-form-item label="名称">
        <el-input v-model="menuData.name" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input v-model="menuData.code" placeholder="请输入权限数值"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogShow = false">取消</el-button>
      <el-button @click="save" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { MenuParams, PermissionResponseData, PermissionList, Permission } from '@/api/acl/menu/types.ts'
import { reqDeleteMenu, reqAddOrUpdateMenu, reqAllPermission } from '@/api/acl/menu/index'
import { ElMessage } from 'element-plus';

onMounted(() => {
  getHasPermission()
})
// 存储菜单数据
const permissionArr = ref<PermissionList>([])
// 获取菜单数据
const getHasPermission = async () => {
  const result: PermissionResponseData = await reqAllPermission()
  if (result.code === 200) {
    permissionArr.value = result.data
  }
}


// 添加菜单按钮
const addPermission = (row: Permission) => {
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0
  })
  dialogShow.value = true
  menuData.level = row.level + 1
  menuData.pid = row.id!
}
// 编辑已有的菜单
const updatePermission = (row: Permission) => {
  dialogShow.value = true
  Object.assign(menuData, row)
}
// 删除菜单
const deleteMenu = async (row: Permission) => {
  const result = await reqDeleteMenu(row.id!)
  if (result.code === 200) {
    getHasPermission()
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  }
}

// 确定按钮
const save = async () => {
  const result = await reqAddOrUpdateMenu(menuData)
  if (result.code === 200) {
    getHasPermission()
    ElMessage({
      type: 'success',
      message: '操作成功'
    })
    dialogShow.value = false
  }
}
// 对话框的显示
const dialogShow = ref<boolean>(false)
// 更新菜单携带的参数
const menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0
})


</script>

<style scoped></style>