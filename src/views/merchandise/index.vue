<template>
    <div>
        <!-- 搜索 -->
        <el-form ref="query" :inline="true" :model="query" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="query.name" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="query.code" placeholder="商品编号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="query.supplierName" placeholder="选择供应商" @focus="focus"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
                <el-button type="primary" @click="Added">新增</el-button>
                <el-button @click="reset('query')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格渲染 -->
        <el-table :data="list" style="width: 100%">
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="name" label="商品名称">
            </el-table-column>
            <el-table-column prop="code" label="商品编码">
            </el-table-column>
            <el-table-column prop="spec" label="商品规格">
            </el-table-column>
            <el-table-column prop="retailPrice" label="零售价">
            </el-table-column>
            <el-table-column prop="purchasePrice" label="进货价">
            </el-table-column>
            <el-table-column prop="storageNum" label="库存数量">
            </el-table-column>
            <el-table-column prop="supplierName" label="供应商">
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="compile(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="expurgate(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 添加编辑 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" label-width="80px">
            <el-form :model="AddedForm" label-width="100px" ref="AddedForm" :rules="rules">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="AddedForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code">
                    <el-input v-model="AddedForm.code"></el-input>
                </el-form-item>

                <el-form-item label="商品规格" prop="spec">
                    <el-input v-model="AddedForm.spec"></el-input>
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice">
                    <el-input v-model="AddedForm.retailPrice"></el-input>
                </el-form-item>
                <el-form-item label="进货价" prop="purchasePrice">
                    <el-input v-model="AddedForm.purchasePrice"></el-input>
                </el-form-item>
                <el-form-item label="库存数量" prop="storageNum">
                    <el-input v-model="AddedForm.storageNum"></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="supplierName">
                    <el-input v-model="AddedForm.supplierName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddEditsviewsnakeaddEdit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 供应商模态框 -->
        <div class="tow">
            <el-dialog title="选择供应商" :visible.sync="dialogVisible2" width="55%" slot="footer">
                <span>
                    <el-form :inline="true" :model="query1" ref="MeForm" class="demo-form-inline">
                        <el-form-item prop="name">
                            <el-input v-model="query1.name" placeholder="商品名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmitQuery">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="list1" height="450" border style="width: 100%" @cell-click="a">
                        <el-table-column type="index" label="序号">
                        </el-table-column>
                        <el-table-column prop="name" label="供应商名称">
                        </el-table-column>
                        <el-table-column prop="linkman" label="联系人">
                        </el-table-column>
                    </el-table>
                    <Paginat :total="total" :page="page" :size="size" @PageNum="Laypage" @PageSize="LaySize">
                    </Paginat>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import http from '../../api/merchandise'
export default {
    name: 'index',
    data() {
        return {
            list: [],// 列表渲染数组
            list1: [], //供应商渲染数组
            page: 1, //列表分页
            size: 20,//列表分页
            query: {//列表搜索
                name: "",
                code: '',
                supplierName: ''
            },
            query1: {//供应商搜索
                name: "",
            },
            total: 1,//列表分页
            dialogFormVisible: false,//添加编辑模态框显示隐藏
            dialogVisible2: false,//供应商模态框显示隐藏
            title: '商品添加',//动态模态框名字
            AddedForm: {//添加编辑模态框数据
                name: "",
                code: '',
                spec: '',
                retailPrice: '',
                purchasePrice: "",
                storageNum: '',
                supplierName: '',


            }, rules: { //添加编辑模态框数据校验
                name: [
                    { required: true, message: '请输入会员卡号', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ], code: [
                    { required: true, message: '请输入会员名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ], spec: [
                    { required: true, message: '请输入会员名称', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度在 11 字符', trigger: 'blur' }
                ],
            }, id: '' //点击编辑获取id
        }
    }, methods: {
        //分页事件
        handleSizeChange(size) {

            this.size = size
            this.getList()
        },
        //分页事件
        handleCurrentChange(page) {
            this.page = page
            // console.log(page)
            this.getList()
        },
        //列表宣言
        async getList() {
            try {
                const response = await http.memberList(this.page, this.size, this.query)
                console.log(response);
                this.list = response.rows
                this.total = response.total
            } catch (e) {
                console.log(e.message);
            }
        },
        //搜索
        inquire() {
            this.getList()
        },
        //搜索清空
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        //删除事件
        expurgate(id) {
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
        },
        //添加显示模态框
        Added() {
            this.title = '商品添加'
            // this.reset('AddedForm')
            this.dialogFormVisible = true

        },
        //编辑显示模态框并获取id
        async compile(id) {
            this.title = '商品编辑',
                this.id = id
            try {
                const response = await http.editinginterface(id)
                this.AddedForm = response.data
                this.getList()
            } catch (e) {
                console.log(e.message);
            }
            this.dialogFormVisible = true
        },
        //添加编辑事件
        AddEditsviewsnakeaddEdit() {
            this.$refs['AddedForm'].validate((valid) => {
                if (!valid) return
                if (this.title == '商品添加') {
                    this.successfullyadded()
                } else if (this.title == '商品编辑') {
                    this.Editsuccess()
                }
                this.dialogFormVisible = false
            });

        },
        //获取添加接口
        async successfullyadded() {
            try {
                const response = await http.addinginterfaces(this.AddedForm)

                this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                this.title = '商品添加'
                this.reset('AddedForm')
                this.getList()
            } catch (e) {
                console.log(e.message);
            }
        },
        //获取编辑接口
        async Editsuccess() {
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
        },
        //获取搜索供应商接口
        async focus() {

            try {
                const response = await http.memberLi(this.page, this.size, this.query1)
                console.log(response);
                this.list1 = response.data.rows
                this.total1 = response.total
            } catch (e) {
                console.log(e.message);
            }
            this.dialogVisible2 = true
        },
        //关闭搜索供应商模态框
        a(val) {
            this.dialogVisible2 = false
            this.query.supplierName = val.name

        },
        //搜索供应商分页
        Laypage(page) {
            this.page = page
        },
        //搜索供应商分页
        LaySize(size) {
            this.size = size
        },
        async onSubmitQuery() {
            try {
                const response = await http.memberLi(this.page1, this.size1, this.query1)
                console.log(response);
                this.list1 = response.data.rows
                this.total1 = response.total
            } catch (e) {
                console.log(e.message);
            }
        }
    }, created() {
        //调用列表渲染接口
        this.getList()
    }
}
</script>

<style>

</style>
