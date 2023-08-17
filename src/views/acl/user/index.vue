<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item>
        <el-input placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">搜索</el-button>
        <el-button type="primary" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px;">
    <el-button @click="addUser" type="primary" size="default">添加用户</el-button>
    <el-button type="primary" size="default">批量删除</el-button>
    <el-table :data="userArr" style="margin: 10px 0px;" border>
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
          <el-button type="primary" size="small" icon="User">分类角色</el-button>
          <el-button @click="updateUser(row)" type="primary" size="small" icon="Edit">编辑</el-button>
          <el-button type="primary" size="small" icon="Delete">删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="getHasUser" @size-change="sizeChange" :current-page="pageNo"
      v-model:page-size="pageSize" :total="total" :page-sizes="[5, 7, 9]" :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes"></el-pagination>
  </el-card>
  <el-drawer v-model="drawShow">
    <!-- 头部标题 -->
    <template #header>
      <h4>添加用户</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input placeholder="请您输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input placeholder="请您输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input placeholder="请您输入用户密码"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="drawShow = false">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { reqUserInfo } from '@/api/acl/user/index'
import type { UserReponseData, Records, User } from '@/api/acl/user/types'

const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(400)
const userArr = ref<Records>([])
const drawShow = ref<boolean>(false)

onMounted(() => {
  getHasUser()
})

// 获取已有用户信息
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  const result = await reqUserInfo(pageNo.value, pageSize.value)
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
}

// 编辑用户
const updateUser = (row: User) => {
  drawShow.value = true
}

</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>