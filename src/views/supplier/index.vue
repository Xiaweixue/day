<template>
    <div>
        <searchForm v-model.sync="query" :queryDate="queryDate">
            <template v-slot:queryData>
                <el-button type="primary" @click="select">查询</el-button>
                <el-button type="primary" @click="Added">新增</el-button>
                <el-button @click="empty">重置</el-button>
            </template>
        </searchForm>
        <tableForm :tableData="list" :column="column" :total="total" :page="page" :size="size" :flag="flag"
            @page="getpage" @size="getsize">
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
import searchForm from '../../components/searchForm.vue'
import tableForm from '../../components/tableForm.vue'
import http from '../../api/supplier'
import ModalForm from '../../components/ModalForm.vue'
export default {
    name: 'index',
    components: {
        tableForm,
        searchForm,
        ModalForm
    },
    data() {
        return {
            rules: {
                name: [
                    { required: true, message: '请输入供应商名称', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12个字符', trigger: 'blur' }
                ],
                linkman: [
                    { required: true, message: '请输入联系人', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            },
            title: '供应商添加',
            showForm: {
                linkman: "",
                mobile: "",
                name: "",
                remark: "",
            },
            ShowDate: [
                {
                    type: 'input',
                    name: 'name',
                    label: '供应商名称',
                },
                {
                    type: 'input',
                    name: 'linkman',
                    label: '联系人',
                },
                {
                    type: 'input',
                    name: 'mobile',
                    label: '联系电话',
                },
                {
                    type: 'textarea',
                    name: 'remark',
                    label: '备注',
                },

            ],
            dialogvisible: false,
            queryDate: [
                {
                    name: '供应商名称',
                    prop: 'name',
                    type: 'input'
                },
                {
                    name: '联系人',
                    prop: 'linkman',
                    type: 'input'
                },
                {
                    name: '联系电话',
                    prop: 'mobile',
                    type: 'input'
                },
                {
                    prop: 'queryData',
                    type: 'slot'
                },
            ],
            query: {
                name: '',
                linkman: '',
                mobile: ''
            },
            flag: true,
            total: 0,
            page: 1,
            size: 10,
            list: [],
            column: [{
                type: 'index',
                label: '序号',
                width: 60,
                value: 'type'
            }, {
                label: '供应商名称',
                prop: 'name',
            }, {
                label: '联系人',
                prop: 'linkman',
            }, {
                label: '联系电话',
                prop: 'mobile',
            }, {
                label: '备注',
                prop: 'remark',
            }, {
                label: '插槽',
                type: 'slot',
                name: 'getData'
            }]
        }
    }, methods: {

        async getList() {
            try {
                const response = await http.memberList(this.page, this.size, this.query)
                this.list = response.data.rows
                this.total = response.total
            } catch (e) {
                console.log(e.message);
            }
        },
        getpage(page) {
            this.page = page
            this.getList()
        },
        getsize(size) {
            this.size = size
            this.getList()
        },
        select() {
            this.size = 1
            this.getList()
        },
        empty() {
            this.$refs.vacumup.empty();
        },
        async confirm() {

            this.title === '供应商添加' ? await this.successfullyadded() : this.title === '供应商编辑' ? await this.Editsuccess() : ''
            this.$refs.AddedForm.empty()
        }, Added() {
            this.title = '供应商添加'
            this.dialogvisible = true
        }, async redact(row) {
            this.title = '供应商编辑',
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
                this.dialogvisible = false
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
        }
    }, created() {
        this.getList()
    }
}
</script>

<style>

</style>
