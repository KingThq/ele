<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="container">
        <h3>饿了么后台管理系统</h3>
        <el-form-item prop="adminName">
            <el-input v-model="ruleForm.adminName" placeholder="请输入管理员帐号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入管理员密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style="width: 100%" :loading="$store.state.isLoading" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                ruleForm: {
                    adminName: '',
                    password: ''
                },
                rules: {
                    adminName: [
                        { required: true, message: '请输入管理员账号', trigger: 'blur' },
                        { min: 3, max: 5, message: '账号长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入管理员密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    // console.log(valid);
                    if(valid) {
                        //true,验证通过
                        this.$store.dispatch("login", this);
                    }
                    
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .container{
        width: 375px;
        margin: 177px auto;
        padding: 10px 30px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 30px #D8E4EF;
        h3{
            padding: 20px;
            text-align: center;
        }
    }
</style>