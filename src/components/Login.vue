<template>
  <div>
    <!-- Form -->
    <el-button type="text" @click="dialogFormVisible = true">登录</el-button>
    <el-dialog title="收货地址" width="20%" v-model="dialogFormVisible">
      <el-form :model="loginData">
        <el-input v-model="loginData.name" autocomplete="off"></el-input>
        <el-input v-model="loginData.password" autocomplete="off"></el-input>
      </el-form>
      <template v-slot:footer>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginData: {
        name: "张友谅",
        password: "123"
      },
      dialogFormVisible: false
    }
  },
  methods: {
    login() {
      this.$api
          .post("/login", this.loginData)
          .then((response) => {
            if (response.data.ok) {
              this.dialogFormVisible = false
              this.$api
                  .post("/icon/list", {})
                  .then((response) => {
                    this.$emit('buttonEvent', response.data.data)
                    // this.iconList = response.data.data
                  })
                  .catch(function (error) {
                    console.log(error)
                  });
            }
          })
          .catch(function (error) {
            console.log(error)
          });
    }
  }
}
</script>

<style scoped>

</style>
