<template>
  <div class="login">
    <div class="container">
      <el-form :model="LoginForm" :rules="rules" ref="LoginForm" class="demo-ruleForm">
        <img src="../assets/timg.jpg" alt class="avatar" />
        <el-form-item label prop="username">
          <el-input v-model="LoginForm.username" prefix-icon="myicon myicon-user"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input v-model="LoginForm.password" prefix-icon="myicon myicon-key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="loginSubmit('LoginForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 对象的解构
import {} from "@/api/users_index.js";
export default {
  data() {
    return {
      LoginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          // required:是否必须  message：如果不合法的提示信息  trigger：什么时候触发
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    loginSubmit() {
      this.$router.push({ name: "Home" });
    },
    query_common_credit() {
      var loginMode = "msdk"; //游戏内默认msdk(wx|qq|msdk)
      var url = "http://localhost:8080/api/mock";
      this.$axios
        .get(url)
        .then(response => {console.log(response)})
        .catch(error => {});
    }
  },
  mounted() {
    console.log("login mounted");
    this.query_common_credit()
  }
};
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
