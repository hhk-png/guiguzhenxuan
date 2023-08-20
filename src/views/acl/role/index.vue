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
      <el-table-column align="center" label="操作" width="300px">
        <template #="{ row, index }">
          <el-button @click="assignPermission(row)" type="primary" size="small" icon="User">分配权限</el-button>
          <el-button @click="updateRole(row)" type="primary" size="small" icon="Edit">编辑</el-button>
          <el-popconfirm title="确认删除?" @confirm="deleteTole(row)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
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
  <!-- 抽屉组件，分配职位的菜单权限与按钮的权限 -->
  <el-drawer v-model="assignPermissionShow">
    <template #header>
      <h4>分配菜单与按钮的权限</h4>
    </template>
    <template #default>
      <!-- 树形控件 -->
      <el-tree ref="tree" :data="menuArr" :props="defaultProps" :default-checked-keys="selectArr" show-checkbox
        node-key="id" default-expand-all></el-tree>
    </template>
    <template #footer>
      <el-button @click="assignPermissionShow = false">取消</el-button>
      <el-button @click="savePermission" type="primary">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue'
import { reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqSetPermission, reqDeleteRole } from '@/api/acl/role/index'
import type { RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from '@/api/acl/role/types'
import useLayoutSettingStore from '@/store/stores/setting';
import { ElMessage } from 'element-plus';

// 树型控件的数据
const defaultProps = {
  children: 'children',
  label: 'name'
}
// 分配权限
const assignPermissionShow = ref<boolean>(false)
// 存储用户权限
const menuArr = ref<MenuList>([])
const tree = ref<any>(null)
// 过滤选中的菜单节点
const filterMenu = (menu: MenuList) => {
  const initArr: number[] = []
  menu.forEach(item => {
    if (item.select && item.level === 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      initArr.push(...filterMenu(item.children))
    }
  })
  return initArr
}
// 选中的菜单节点
const selectArr = ref<number[]>([])
// 分配权限按钮
const assignPermission = async (row: RoleData) => {
  assignPermissionShow.value = true
  Object.assign(roleParams, row)
  const result = await reqAllMenuList(row.id)
  if (result.code === 200) {
    menuArr.value = result.data
    selectArr.value = filterMenu(menuArr.value)
  }
}
// 分配权限确定按钮
const savePermission = async () => {
  const roleId = roleParams.id as number
  // 选中节点的id
  const arr = tree.value.getCheckedKeys()
  // 半选中节点的id
  const arr1 = tree.value.getHalfCheckedKeys()
  const ids = arr.concat(arr1)
  const result = await reqSetPermission(roleId, ids)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '分配权限成功' })
    assignPermissionShow.value = false
    window.location.reload()
  }
}


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
const deleteTole = async (row: RoleData) => {
  const result = await reqDeleteRole(row.id) 
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasRole(allRole.value.length === 1 ? pageNo.value - 1 : pageNo.value)
  }
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