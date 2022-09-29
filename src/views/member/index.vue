<template>
    <div>
        <searchForm v-model.sync="query" :queryDate="queryDate" ref="vacumup">
            <template v-slot:queryData>
                <el-button type="primary" @click="select">查询</el-button>
                <el-button type="primary" @click="Added">新增</el-button>
                <el-button @click="empty">重置</el-button>
            </template>
        </searchForm>


        <tableForm :tableData="list" :column="column" :total="total" :page="page" :size="size" @page="getpage"
            @size="getsize" :falg="flag">
            <template v-slot:getData="data">
                <el-button size="mini" @click="redact(data.data)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(data.data)">删除</el-button>
            </template>
        </tableForm>

        <ModalForm :dialogvisible.sync="dialogvisible" v-model.sync="showForm" :ShowDate="ShowDate" :title="title"
            :rules="rules" ref="AddedForm" @confirm="confirm">
        </ModalForm>
    </div>
</template>

<script>
import tableForm from '../../components/tableForm.vue'
import searchForm from '../../components/searchForm.vue'
import ModalForm from '../../components/ModalForm.vue'
import http from '../../api/member'

export default {
    name: 'member',
    components: {
        tableForm,
        searchForm,
        ModalForm
    },
    data() {
        return {
            rules: {
                cardNum: [
                    { required: true, message: '请输入会员卡号', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入会员姓名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ], payType: [
                    { required: true, message: '请选择支付类型', trigger: 'change' }
                ],
            },
            title: '会员添加',
            showForm: {
                cardNum: "",
                name: "",
                birthday: "",
                phone: "",
                money: "",
                integral: "",
                payType: "",
                address: "",
            },
            ShowDate: [
                {
                    type: 'input',
                    name: 'cardNum',
                    label: '会员卡号',
                },
                {
                    type: 'input',
                    name: 'name',
                    label: '会员姓名',
                },
                {
                    type: 'date',
                    name: 'birthday',
                    label: '会员生日',
                },
                {
                    type: 'input',
                    name: 'phone',
                    label: '手机号码',
                },
                {
                    type: 'input',
                    name: 'money',
                    label: '开卡金额',
                },
                {
                    type: 'input',
                    name: 'integral',
                    label: '可用积分',
                },
                {
                    type: 'select',
                    name: 'payType',
                    label: '支付类型',
                },
                {
                    type: 'textarea',
                    name: 'address',
                    label: '会员地址',
                },
            ],
            flag: true,
            dialogvisible: false,
            queryDate: [
                {
                    type: 'input',
                    prop: 'cardNum',
                    name: '会员卡号'
                }, {
                    type: 'input',
                    prop: 'name',
                    name: '会员名字',
                }, {
                    type: 'select',
                    prop: 'payType',
                    name: '支付类型'
                }, {
                    type: 'date',
                    prop: 'address',
                    name: '出生日期'
                }, {
                    type: 'slot',
                    prop: 'queryData'
                }
            ],
            list: [],
            total: 0,
            page: 1,
            size: 10,
            query: {
                cardNum: '',
                name: '',
                payType: '',
                address: '',

            }, column: [
                {
                    type: 'index',
                    label: '序号',
                    width: 60,
                    value: 'type'
                },
                {
                    prop: 'cardNum',
                    label: '会员卡号',

                }, {
                    prop: 'name',
                    label: '会员姓名',

                }, {
                    prop: 'birthday',
                    label: '会员生日',

                }, {
                    prop: 'phone',
                    label: '手机号码',

                }, {
                    prop: 'integral',
                    label: '可用积分',

                }, {
                    prop: 'money',
                    label: '开卡金额',

                }, {
                    prop: 'payType',
                    label: '支付类型',

                    formatter: (row, column, cellValue, index) => {
                        return row.payType === 1 ? '现金' : row.payType === 2 ? '微信' : row.payType === 3 ? '支付宝' : row.payType === 4 ? '银行卡' : ''
                    },
                }, {
                    prop: 'address',
                    label: '会员地址',

                }, {
                    label: '插槽',
                    type: 'slot',
                    name: 'getData'
                }
            ],
            id: ''
        }
    }, methods: {
        async getList() {
            try {
                const response = await http.memberList(this.page, this.size, this.query)
                // console.log(response);
                this.list = response.data.rows
                this.total = response.total
            } catch (e) {
                console.log(e.massage);
            }
        }, del(row) {
            this.$confirm('确认删除这条记录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const response = await http.memberDelete(row.id)
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
        }, getpage(page) {
            this.page = page
            this.getList()
        }, getsize(size) {
            this.size = size
            this.getList()
        }, select() {
            this.size = 1
            this.getList()
        }, empty() {
            this.$refs.vacumup.empty();
        }, async confirm() {

            this.title === '会员添加' ? await this.successfullyadded() : this.title === '会员编辑' ? await this.Editsuccess() : ''
            this.$refs.AddedForm.empty()
        }, Added() {
            this.title = '会员添加'
            this.dialogvisible = true
        }, async redact(row) {
            this.title = '会员编辑',
                this.id = row.id
            this.dialogvisible = true
            try {
                const response = await http.editinginterface(this.id)
                this.showForm = response.data
            } catch (e) {
                console.log(e.message);
            }
        }, async successfullyadded() {
            try {
                const response = await http.addinginterfaces(this.showForm)
                this.dialogvisible=false
                this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                this.getList()
            } catch (e) {
                console.log(e.message);
            }
        },
        async Editsuccess() {
            try {
                const response = await http.Editsuccess(this.id, this.showForm)
                this.dialogvisible = false
                this.$message({
                    type: 'success',
                    message: '更新成功!'
                });
                this.getList()
            } catch (e) {
                console.log(e.message);
            }
        },
    }, created() {
        this.getList()
    },
}
</script>

<style>

</style>
