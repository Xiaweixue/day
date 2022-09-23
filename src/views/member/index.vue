<template>
    <div>
        <el-form :inline="true" :model="query" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="query.cardNum" placeholder="会员卡号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.name" placeholder="会员名字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query.payType" placeholder="请选择">
                    <el-option v-for="(item,index) in arr" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button type="primary">新增</el-button>
                <el-button >重置</el-button>
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
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
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
                birthday: ""
            },
            total: 0,
            arr: payment.arr


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
            const response = await http.memberList(this.page, this.size, this.query)
            this.list = response.data.rows
            this.total = response.total
        }, inquire() {
            this.getList()
        }
    }, created() {
        this.getList()
    }
}
</script>

<style>

</style>
