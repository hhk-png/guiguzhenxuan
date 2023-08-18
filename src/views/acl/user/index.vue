<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item>
        <el-input v-model="keyword" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" :disabled="!keyword.length" type="primary" size="default">搜索</el-button>
        <el-button @click="reset" type="primary" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px;">
    <el-button @click="addUser" type="primary" size="default">添加用户</el-button>
    <el-button @click="deleteSelectUser" :disabled="!selectIdArr.length" type="primary" size="default">批量删除</el-button>
    <!-- table 展示用户信息 -->
    <el-table @selection-change="selectChange" :data="userArr" style="margin: 10px 0px;" border>
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="用户名字" prop="username" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户名称" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户角色" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row, index }">
          <el-button @click="setRole(row)" type="primary" size="small" icon="User">分配角色</el-button>
          <el-button @click="updateUser(row)" type="primary" size="small" icon="Edit">编辑</el-button>
          <el-popconfirm @confirm="deleteUser(row.id)" width="260px" title="确定删除?">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" size="small" icon="Delete">删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="getHasUser" @size-change="sizeChange" :current-page="pageNo"
      v-model:page-size="pageSize" :total="total" :page-sizes="[5, 7, 9]" :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes"></el-pagination>
  </el-card>
  <!-- 角色信息标记 -->
  <el-drawer v-model="drawShow">
    <!-- 头部标题 -->
    <template #header>
      <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="userParams.username" placeholder="请您输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="userParams.name" placeholder="请您输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
          <el-input v-model="userParams.password" placeholder="请您输入用户密码"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="drawShow = false">取消</el-button>
      <el-button @click="save" type="primary">确定</el-button>
    </template>
  </el-drawer>
  <!-- 职位分配 -->
  <el-drawer v-model="drawerForAllocate">
    <template #header>
      <h4>分配角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox @change="checkAllChange" v-model="checkAll" :isIndeterminate="isIndeterminate">
            全选
          </el-checkbox>
          <!-- 显示职位 -->
          <el-checkbox-group v-model="userRole" @change="handleCheckedUsersChange">
            <el-checkbox v-for="(role, index) in allRoles" :key="index" :label="role">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="drawerForAllocate = false">取消</el-button>
      <el-button @click="confirmClick" type="primary">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue'
import { reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole, reqDeleteUser, reqDeleteSelectUser } from '@/api/acl/user/index'
import type { UserReponseData, Records, User, AllRole, SetRoleData } from '@/api/acl/user/types'
import { ElMessage } from 'element-plus';
import useLayoutSettingStore from '@/store/stores/setting'
const layoutSettingStore = useLayoutSettingStore()

const keyword = ref<string>('')
// 搜索按钮
const search = async () => {
  await getHasUser()
  keyword.value = ''
}
// 重置按钮
const reset = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(400)
const userArr = ref<Records>([])
const drawShow = ref<boolean>(false)
// 存储批量删除用户的id
const selectIdArr = ref<User[]>([])
// 收集用户信息
const userParams = reactive<User>({
  username: '',
  name: '',
  password: ''
})
// form组件实例
const formRef = ref<any>(null)
// 分配角色抽屉组件
const drawerForAllocate = ref<boolean>(false)
onMounted(() => {
  getHasUser()
})

// 获取已有用户信息
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  const result = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
// 分页发生变化
const sizeChange = () => {
  getHasUser()
}

// 添加用户
const addUser = () => {
  drawShow.value = true
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: ''
  })
  nextTick(() => {
    // 清楚验证信息
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
// 删除用户
const deleteUser = async (userId: number) => {
  const result = await reqDeleteUser(userId)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
// table 勾选复选框
const selectChange = (value: User[]) => {
  selectIdArr.value = value
}
// 批量删除按钮
const deleteSelectUser = async () => {
  const idList: number[] = selectIdArr.value.map(item => item.id!)
  const result = await reqDeleteSelectUser(idList)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

// 编辑用户
const updateUser = (row: User) => {
  drawShow.value = true
  Object.assign(userParams, {
    id: row.id,
    username: row.username,
    name: row.name,
    password: row.password
  })
  nextTick(() => {
    // 清楚验证信息
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
// 添加用户保存按钮
const save = async () => {
  await formRef.value.validate()
  const result = await reqAddOrUpdateUser(userParams)
  drawShow.value = false
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '添加成功' })
    getHasUser(userParams.id ? pageNo.value : 1)
    // window.location.reload()
  } else {
    ElMessage({ type: 'error', message: '添加失败' })
  }
}

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度必须大于5位'))
  }
}
const validateName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称长度必须大于5位'))
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用户昵称长度必须大于6位'))
  }
}
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  name: [{ required: true, trigger: 'blur', validator: validateName }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
}

// 分配角色
const setRole = async (row: User) => {
  Object.assign(userParams, row)
  const result = await reqAllRole(userParams.id!)
  if (result.code === 200) {
    // 存储全部的职位
    allRoles.value = result.data.allRolesList
    // 存储当前用户已有的职位
    userRole.value = result.data.assignRoles
    drawerForAllocate.value = true
  }
}
// 全选
const checkAll = ref<boolean>(false)
// 设置不确定状态
const isIndeterminate = ref<boolean>(true)
const allRoles = ref<AllRole>([])
const userRole = ref<AllRole>([])
// 全选复选框发生变化
const checkAllChange = (val: boolean) => {
  userRole.value = val ? allRoles.value : []
  isIndeterminate.value = false
}
// 角色复选框发生变化
const handleCheckedUsersChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRoles.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRoles.value.length
}
// 分配角色确定按钮
const confirmClick = async () => {
  // 手机参数
  const data: SetRoleData = {
    userId: userParams.id!,
    roleIdList: userRole.value.map(item => item.id!)
  }
  // 分配用户的职位
  const result = await reqSetUserRole(data)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '分配成功' })
    drawerForAllocate.value = false
    getHasUser(pageNo.value)
  }
}

</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
