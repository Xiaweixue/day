<template>
    <div>
        <el-form ref="query" :inline="true" :model="query" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="query.name" placeholder="供应商名称"></el-input>
            </el-form-item>
            <el-form-item prop="linkman">
                <el-input v-model="query.linkman" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
                <el-input v-model="query.mobile" placeholder="联系电话"></el-input>
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
            <el-table-column prop="name" label="供应商名称">
            </el-table-column>
            <el-table-column prop="linkman" label="联系人">
            </el-table-column>
            <el-table-column prop="mobile" label="联系电话">
            </el-table-column>
            <el-table-column prop="remark" label="备注">
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
                <el-form-item label="供应商名称" prop="name">
                    <el-input v-model="AddedForm.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman">
                    <el-input v-model="AddedForm.linkman"></el-input>
                </el-form-item>

                <el-form-item label="联系电话" prop="mobile">
                    <el-input v-model="AddedForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="AddedForm.remark"></el-input>
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
import http from '../../api/supplier'
export default {
    name: 'index',
    data() {
        return {
            list: [],
            page: 1,
            size: 10,
            query: {
                name: "",
                linkman: '',
                mobile: "",

            },
            total: 0,
            dialogFormVisible: false,
            title: '供应商添加',
            AddedForm: {
                name: "",
                linkman: '',
                mobile: "",
                remark: ''
            }, rules: {
                name: [
                    { required: true, message: '请输入会员卡号', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ], linkman: [
                    { required: true, message: '请输入会员名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
            console.log(this.query.birthday);
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
            this.title = '供应商添加'
            // this.reset('AddedForm')
            this.dialogFormVisible = true

        }, async compile(id) {
            this.title = '供应商编辑',
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
                if (this.title == '供应商添加') {
                    this.successfullyadded()
                } else if (this.title == '供应商编辑') {
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
                this.title = '供应商添加'
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
