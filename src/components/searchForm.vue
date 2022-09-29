<template>
    <div>
        <el-form :inline="true" :model="value" class="demo-form-inline" ref="form">
            <template v-for="item in queryDate">
                <el-form-item :prop="item.prop" v-if="item.type==='input'">
                    <el-input v-model="value[item.prop]" :placeholder="item.name"></el-input>
                </el-form-item>
                <el-form-item v-if="item.type==='select'" :prop="item.prop">
                    <el-select v-model="value[item.prop]" :placeholder="item.name">
                        <el-option v-for="(ele,index) in arrList.arr" :key="index" :label="ele.name" :value="ele.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="item.type==='date'" :prop="item.prop">
                    <el-date-picker :type="item.type" :placeholder="item.name" v-model="value[item.prop]"
                        value-format="yyyy-mm-dd"></el-date-picker>
                </el-form-item>
                <el-form-item v-if="item.type==='slot'">
                    <slot :name="item.prop"></slot>
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script>
import arr from '../views/member/payment'
export default {
    props: {
        value: {
            type: Object,
            default: () => { }
        },
        queryDate: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            arrList: arr
        }
    }, methods: {
        empty() {
            this.$refs['form'].resetFields();
        }
    }
}
</script>

<style>

</style>
