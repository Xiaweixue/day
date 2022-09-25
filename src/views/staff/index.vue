<template>
    <div>
        <el-form ref="query" :inline="true" :model="query" class="demo-form-inline">
            <el-form-item prop="username">
                <el-input v-model="query.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="query.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
                <el-button type="primary" @click="Added">新增</el-button>
                <el-button @click="reset('query')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list" style="width: 100%">
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="username" label="账号">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="age" label="年龄">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column prop="salary" label="薪酬">
            </el-table-column>
            <el-table-column prop="entryDate" label="入职时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="compile(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="expurgate(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" label-width="80px">
            <el-form :model="AddedForm" label-width="100px" ref="AddedForm" :rules="rules">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="AddedForm.username"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="AddedForm.name"></el-input>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                    <el-input v-model="AddedForm.age"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="AddedForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="薪酬" prop="salary">
                    <el-input v-model="AddedForm.salary"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" prop="salary">
                    <el-input v-model="AddedForm.salary"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddEditsviewsnakeaddEdit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import http from '../../api/staff'
export default {
    name: 'index',
    data() {
        return {
            list: [],
            page: 1,
            size: 10,
            query: {
                username: '',
                name: ""
               },
            total: 0,
            dialogFormVisible: false,
            title: '员工添加',
            AddedForm: {
                username: "",
                name: '',
                age: "",
                mobile: '',
                salary: '',
                entryDate: ''
            }, rules: {
                username: [
                    { required: true, message: '请输入会员卡号', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ], name: [
                    { required: true, message: '请输入会员名称', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ], mobile: [
                    { required: true, message: '请输入会员名称', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度在 11 字符', trigger: 'blur' }
                ],
            }, id: ''
        }
    }, methods: {
        handleSizeChange(size) {

            this.size = size
            this.getList()
        },
        handleCurrentChange(page) {
            this.page = page
            // console.log(page)
            this.getList()
        },
        async getList() {
            try {
                const response = await http.memberList(this.page, this.size, this.query)
                this.list = response.data.rows
                this.total = response.total
            } catch (e) {
                console.log(e.message);
            }
        }, inquire() {
            this.getList()
        }, reset(formName) {
            this.$refs[formName].resetFields();
        }, expurgate(id) {
            this.$confirm('确认删除这条记录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const response = await http.memberDelete(id)
                this.getList()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }, Added() {
            this.title = '员工添加'
            // this.reset('AddedForm')
            this.dialogFormVisible = true

        }, async compile(id) {
            this.title = '员工编辑',
                this.id = id
            try {
                const response = await http.editinginterface(id)
                this.AddedForm = response.data
                this.getList()
            } catch (e) {
                console.log(e.message);
            }
            this.dialogFormVisible = true
        }, AddEditsviewsnakeaddEdit() {
            this.$refs['AddedForm'].validate((valid) => {
                if (!valid) return
                if (this.title == '员工添加') {
                    this.successfullyadded()
                } else if (this.title == '员工编辑') {
                    this.Editsuccess()
                }
                this.dialogFormVisible = false
            });

        }, async successfullyadded() {
            try {
                const response = await http.addinginterfaces(this.AddedForm)

                this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                this.title = '员工添加'
                this.reset('AddedForm')
                this.getList()
            } catch (e) {
                console.log(e.message);
            }
        }, async Editsuccess() {
            try {
                const response = await http.Editsuccess(this.id, this.AddedForm)

                this.AddedForm = {
                    name: "",
                    linkman: '',
                    mobile: "",
                    remark: ''
                }

                this.$message({
                    type: 'success',
                    message: '更新成功!'
                });
                this.getList()
            } catch (e) {
                console.log(e.message);
            }
        }
    }, created() {
        this.getList()
    }
}
</script>

<style>

</style>
