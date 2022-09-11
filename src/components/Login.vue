<template>
    <div>
        <!-- Form -->
        <el-button @click="dialogFormVisible = true" type="text">登录</el-button>
        <el-dialog title="收货地址" v-model="dialogFormVisible" width="20%">
            <el-form :model="loginData">
                <el-input autocomplete="off" v-model="loginData.name"></el-input>
                <el-input autocomplete="off" v-model="loginData.password"></el-input>
            </el-form>
            <template v-slot:footer>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button @click="login" type="primary">确 定</el-button>
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
                    name: "17600313722",
                    password: "123456"
                },
                dialogFormVisible: false
            }
        },
        methods: {
            login() {
                let url = {"url": "NullPointer"}
                console.log(window.byted_acrawler.sign(url))
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
