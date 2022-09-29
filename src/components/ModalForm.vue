<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible">
            <el-form :model="value" label-width="100px" :rules="rules" ref="AddedForm">
                <template v-for="item in ShowDate">
                    <el-form-item :label="item.label" :prop="item.name" v-if="item.type==='input'">
                        <el-input v-model="value[item.name]"></el-input>
                    </el-form-item>
                    <el-form-item :label="item.label" :prop="item.name" v-if="item.type==='date'">
                        <el-date-picker :type="item.type" v-model="value[item.name]" value-format="yyyy-mm-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item :label="item.label" :prop="item.name" v-if="item.type==='select'">
                        <el-select v-model="value[item.name]">
                            <el-option v-for="(ele,index) in arrList.arr" :key="index" :label="ele.name"
                                :value="ele.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="item.label" :prop="item.name" v-if="item.type==='textarea'">
                        <el-input :type="item.type" v-model="value[item.name]"></el-input>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="vsible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import arr from '../views/member/payment'
export default {
    props: {
        dialogvisible: {
            type: Boolean,
            default: false
        }, value: {
            type: Object,
            default: () => { }
        }, ShowDate: {
            type: Array,
            default: () => []
        }, title: {
            type: String,
            default: ''
        }, rules: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            arrList: arr
        }
    },
    methods: {
        confirm() {
            this.$refs['AddedForm'].validate((valid) => {
                if (!valid) return
                this.$emit('confirm')
            });

        }, empty() {
            this.$refs['AddedForm'].resetFields();
        }
    }, computed: {
        visible: {
            get() {
                return this.dialogvisible
            }, set(val) {
                this.$emit('update:dialogvisible', val)
            }
        }
    }
}
</script>

<style>

</style>
