<template>
    <div>
        <el-form ref="query" :inline="true" :model="query" class="demo-form-inline">
            <el-form-item prop="cardNum">
                <el-input v-model="query.cardNum" placeholder="会员卡号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="query.name" placeholder="会员名字"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select v-model="query.payType" placeholder="支付类型">
                    <el-option v-for="(item,index) in arr" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="query.birthday">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
                <el-button type="primary" @click="Added">新增</el-button>
                <el-button @click="reset('query')">重置</el-button>
            </el-form-item>
        </el-form>


        <el-table :data="list" style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="cardNum" label="会员卡号">
            </el-table-column>
            <el-table-column prop="name" label="会员姓名">
            </el-table-column>
            <el-table-column prop="birthday" label="会员生日">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码">
            </el-table-column>
            <el-table-column prop="integral" label="可用积分">
            </el-table-column>
            <el-table-column prop="money" label="开卡金额">
            </el-table-column>
            <el-table-column prop="payType" label="支付类型">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.payType===1?'现金':scope.row.payType===2?'微信':scope.row.payType===3?'支付宝':scope.row.payType===4?'银行卡':''}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="会员地址">
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

        <!-- Form -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" label-width="80px">
            <el-form :model="AddedForm" label-width="100px" ref="AddedForm" :rules="rules">
                <el-form-item label="会员卡号" prop="cardNum">
                    <el-input v-model="AddedForm.cardNum"></el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="name">
                    <el-input v-model="AddedForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="birthday">
                    <el-date-picker type="date" placeholder="会员生日" value-format="yyyy-MM-dd"
                        v-model="AddedForm.birthday">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="AddedForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="开卡金额" prop="money">
                    <el-input v-model="AddedForm.money"></el-input>
                </el-form-item>
                <el-form-item label="可用积分" prop="integral">
                    <el-input v-model="AddedForm.integral"></el-input>
                </el-form-item>
                <el-form-item prop="payType">
                    <el-select v-model="AddedForm.payType" placeholder="支付类型">
                        <el-option v-for="(item,index) in arr" :key="index" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会员地址" prop="address">
                    <el-input type="textarea" v-model="AddedForm.address"></el-input>
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
import http from '../../api/member'
import payment from './payment'
export default {
    name: 'index',
    data() {
        return {
            list: [],
            page: 1,
            size: 10,
            query: {
                cardNum: "",
                name: '',
                payType: '',
                birthday: "",

            },
            total: 0,
            arr: payment.arr,
            dialogFormVisible: false,
            title: '会员添加',
            AddedForm: {
                cardNum: "",
                name: "",
                birthday: "",
                phone: "",
                money: "",
                integral: "",
                payType: '',
                address: ''
            }, rules: {
                cardNum: [
                    { required: true, message: '请输入会员卡号', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ], name: [
                    { required: true, message: '请输入会员名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ], payType: [
                    { required: true, message: '请选择支付类型', trigger: 'change' }
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
            this.title = '会员添加'
            // this.reset('AddedForm')
            this.dialogFormVisible = true

        }, async compile(id) {
            this.title = '会员编辑',
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
                if (this.title == '会员添加') {
                    this.successfullyadded()
                } else if (this.title == '会员编辑') {
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
                this.title = '会员添加'
                this.reset('AddedForm')
                this.getList()
            } catch (e) {
                console.log(e.message);
            }
        }, async Editsuccess() {
            try {
                const response = await http.Editsuccess(this.id, this.AddedForm)

                this.AddedForm = {
                    cardNum: "",
                    name: "",
                    birthday: "",
                    phone: "",
                    money: "",
                    integral: "",
                    payType: '',
                    address: ''
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
