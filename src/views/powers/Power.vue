<template>
  <div class="power">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input5" class="searchBox">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="info" plain>按钮</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 用户搜索关键字
      input5: '',
      //   表格数据源
      tableData: [
        {
          date: '2020-06-06',
          name: '游佳明',
          address: '佛山市顺德区北滘镇怡和中心'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2020-06-06',
          name: '游佳明',
          address: '佛山市顺德区北滘镇怡和中心'
        },
        {
          date: '2020-06-06',
          name: '游佳明',
          address: '佛山市顺德区北滘镇怡和中心'
        },
        {
          date: '2020-06-06',
          name: '邹耀腾',
          address: '佛山市顺德区北滘镇怡和中心'
        },
        {
          date: '2020-06-06',
          name: '邹耀腾',
          address: '佛山市顺德区北滘镇怡和中心'
        },
        {
          date: '2020-06-06',
          name: '邹耀腾',
          address: '佛山市顺德区北滘镇怡和中心'
        },
        {
          date: '2020-06-06',
          name: '邹耀腾',
          address: '佛山市顺德区北滘镇怡和中心'
        }
      ]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style lang="less" scoped>
.searchBox {
  width: 300px;
  margin-right: 10px;
}
</style>
