<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <template v-for="item in column">
                <el-table-column v-bind="item" v-if="item.value">
                </el-table-column>
                <el-table-column v-bind="item" v-if="!item.type">
                </el-table-column>

                <el-table-column v-bind="item" v-if="item.type && !item.value">
                    <template slot-scope="scope">
                        <slot :name="item.name" :data="scope.row"></slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-pagination v-if="flag===true" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="page" :page-sizes="pageSizes" :page-size="size" :layout="layout" :total="total">
        </el-pagination>
    </div>
</template>
<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => []
        }, column: {
            type: Array,
            default: () => []
        }, total: {
            type: Number,
            default: 0
        }, size: {
            type: Number,
            default: 10
        }, page: {
            type: Number,
            default: 1
        }, pageSizes: {
            type: Array,
            default: () => [10, 20, 30, 40]
        }, layout: {
            type: String,
            default: () => "total, sizes, prev, pager, next, jumper"
        }, flag: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    }, methods: {
        handleSizeChange(size) {
            this.$emit('size', size)
        },
        handleCurrentChange(page) {
            this.$emit('page', page)
        }
    }
}
</script>
