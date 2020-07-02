<template>
  <div class="power">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input4" class=" searchBox">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="info" plain>按钮</el-button>
    </div>
    <!-- 展示区域 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="province" label="省份" width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="300"></el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
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
      input4: '',
      //   表格数据源
      tableData: [
        {
          date: '2020-06-06',
          name: '邹耀腾',
          province: '佛山',
          city: '顺德区',
          address: '佛山市顺德区北滘镇怡和中心',
          zip: 666666
        },
        {
          date: '2020-06-06',
          name: '邹耀腾',
          province: '佛山',
          city: '顺德区',
          address: '佛山市顺德区北滘镇怡和中心',
          zip: 666666
        },
        {
          date: '2020-06-06',
          name: '邹耀腾',
          province: '佛山',
          city: '顺德区',
          address: '佛山市顺德区北滘镇怡和中心',
          zip: 666666
        },
        {
          date: '2020-06-06',
          name: '游佳明',
          province: '佛山',
          city: '顺德区',
          address: '佛山市顺德区北滘镇怡和中心',
          zip: 666666
        },
        {
          date: '2020-06-06',
          name: '游佳明',
          province: '佛山',
          city: '顺德区',
          address: '佛山市顺德区北滘镇怡和中心',
          zip: 666666
        },
        {
          date: '2020-06-06',
          name: '游佳明',
          province: '佛山',
          city: '顺德区',
          address: '佛山市顺德区北滘镇怡和中心',
          zip: 666666
        },
        {
          date: '2020-06-06',
          name: '龙勇生',
          province: '佛山',
          city: '顺德区',
          address: '佛山市顺德区北滘镇怡和中心',
          zip: 666666
        }
      ]
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
