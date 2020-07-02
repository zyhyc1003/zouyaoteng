<template>
  <div class="user">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        @keyup.enter.native="serachUser"
        v-model="userKey"
        class="searchBox"
      >
        <el-button slot="append" icon="el-icon-search" @click="serachUser"></el-button>
      </el-input>
      <el-button type="success" plain @click="showAddDialog">添加用户</el-button>
    </div>
    <!-- 数据展示区 -->
    <el-table :data="tableData" border style="width: 100%">
      <!-- 索引列 -->
      <el-table-column type="index" width="50"></el-table-column>
      <!-- 数据展示区 -->
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- 操作列-修改状态 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <!-- slot-scope: 数据插槽,就是将来可以通过这个插槽获取到这一行所展示数据对象 
          这个数据对象可以在模板任意位置使用-->
          <el-switch
            v-model="value2[scope.$index]"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatu($event,scope.row.id)"
          ></el-switch>
        </template>
      </el-table-column>
      <!-- 操作列-编辑删除 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="warning" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色 " placement="top-start">
            <el-button
              type="success"
              icon="el-icon-share"
              @click="showGrantRoleDialog(scope.row.id,scope.row.role_name)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addtDialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" :label-width="'120px'">
      <el-form-item label="id">
        <el-input v-model="addForm.id"></el-input>
      </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addtDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addtSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="editForm.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" >
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible">
      <el-form :model="roleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="roleForm.username" auto-complete="off" style="width:222px"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="roleForm.rid" placeholder="请选择" @change="selectRole">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户对话框 -->
  </div>
</template>
<script>
import { getUserList, editUser, delUserById } from "@/api/users_index.js";
import { getAllRoleList, addUser } from "@/api/role_index.js";
export default {
  data() {
    return {
      value2: [true, false, true, true, false],
      // 添加用户对应的数据
      addtDialogFormVisible: false,
      addForm: {
        username: "",
        password: "",
        mobile: "",
        emaile: ""
      },

      roleList: [],
      // 分配角色对话框可见标记
      roleDialogFormVisible: false,
      roleForm: {
        id: "",
        username: "",
        rid: "40"
      },
      // 编辑操作验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],

      },
      // 设置编辑对话框是否显示,默认隐藏
      editDialogFormVisible: false,
      // 设置表单元素对应的lable的宽度
      formLabelWidth: "120px",
      // 编辑操作所对应的双向绑定数据对象
      editForm: {
        id: "",
        username: "",
        mobile: "",
        email: ""
      },
      // 用户状态
      userstatu: "true",
      // 用户搜索关键字
      userKey: "",
      //  表格数据源
      tableData: [
        {
          id: 1,
          username: "邹耀腾",
          email: "172772@chinasie.com",
          mobile: "18272627272"
        },
        {
          id: 2,
          username: "游佳明",
          email: "172772@chinasie.com",
          mobile: "18272627272"
        },
        {
          id: 3,
          username: "龙勇生",
          email: "172622@chinasie.com",
          mobile: "1805757272"
        },
        {
          id: 4,
          username: "邹镇澎",
          email: "1723572@chinasie.com",
          mobile: "18272627272"
        },
        {
          id: 5,
          username: "邹耀腾",
          email: "172772@chinasie.com",
          mobile: "1827235627272"
        }
      ]
    };
  },
  methods: {
    // 实现用户得搜索功能
    serachUser() {
      this.init();
    },
    // 显示添加用户对话框
    showAddDialog() {
      this.addtDialogFormVisible = true;
    },
    // 新增用户提交
    addtSubmit() {
      console.log(this.addForm)
      this.tableData.push(this.addForm)
      this.addtDialogFormVisible=false
    },
    // 显示分配角色对话框
    showGrantRoleDialog(uid, rolename) {
      this.roleDialogFormVisible = true;
      this.roleForm.id = uid;
      // 让下拉列表有默认选项
      // this.roleForm.rid = rolename
    },
    // 选择用户角色
    selectRole(obj) {
      console.log(obj);
    },
    // 修改用户状态
    changeStatu(type, id) {
      console.log(type, id);
      updateUserStatuById(id, type).then(result => {
        if (result.meta.status === 200) {
          this.$message({
            type: "success",
            message: result.meta.msg
          });
        }
      });
    },
    // 根据id删除用户
    del(id) {
      console.log(id);
      let index
      for(let i = 0;i<this.tableData.length;i++){
        if(this.tableData[i].id==id){
          index = i
        }
      }
    
      console.log(index);
      this.$confirm(`此操作将永久删除id号为${id}的用户, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        // 如果点击确定就会触发then中的回调
      }).then(() => {
        this.tableData.splice(index, 1);
      });
    },
    editSubmit() {
      // 实现数据的再次验证
      // validate:可以实现指定表单的数据验证
      // 这个方法验证完毕之后,会调用回调函数,这个回调有一个参数valid,它就是是否通过验证的标识
      // 如果通过验证，就返回true，否则返回Fales
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 实现编辑提交请求
          editUser(this.editForm).then(result => {
            //  将这一行数据的数据源对象重置，就可以更新这一行数据的展示
            // 这种有一个好处就是没有必要将当前页的数据重新加载，避免反复的向后台发送请求
            // 隐藏编辑对话框
            this.editDialogFormVisible = false;
          });
        } else {
          this.$message({
            message: "用户输入不合法",
            type: "warning"
          });
        }
      });

      // 数据可以用过this.editForm来获取,所以不用传递参数
    },
    // 显示编辑对话框,并且要展示默认数据
    showEditDialog(data) {
      // 让对话框显示
      this.editDialogFormVisible = true;
      // 为表单元素的双向数据绑定赋值
      this.editForm.id = data.id;
      this.editForm.username = data.username;
      this.editForm.email = data.email;
      this.editForm.mobile = data.mobile;
    },
    // 初始化数据加载方法
    init() {
      getUserList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(result => {
        console.log(result);
        this.userList = result.data.users;
      });
    }
  },
  mounted() {
    // 用户列表数据
    this.init();
    // 角色列表数据
    getAllRoleList().then(result => {
      console.log(result);
      this.roleList = result.data;
    });
  }
};
</script>
<style lang="less" scoped>
.searchBox {
  width: 300px;
  margin-right: 10px;
}
</style>
