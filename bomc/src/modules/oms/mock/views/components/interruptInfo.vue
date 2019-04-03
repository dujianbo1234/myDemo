<template>
  <div class>
    <el-form
      class="demo-ruleForm"
      label-width="140px"
      :model="form"
      :rules="rules"
      ref="interruptForm"
    >
      <el-row class="clearfix titleBar">
        <div class="basicInfo left">中断信息</div>
      </el-row>
      <div class="dealStepsArea">
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="融合计费中断时长"
              :prop=" valid?'convergentBillingInterruption':''"
              class="duration"
            >
              <span class="unit">min</span>
              <el-input v-model="form.convergentBillingInterruption" class="oms-input" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="综合帐务中断时长" :prop="valid?'interruption':''" class="duration">
              <span class="unit">min</span>
              <el-input v-model="form.interruption" class="oms-input" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="客户服务中断时长"
              :prop="valid?'customerServiceInterruption':''"
              class="duration"
            >
              <span class="unit">min</span>
              <el-input v-model="form.customerServiceInterruption" class="oms-input" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "interruptInfo",
  data() {
    return {
      form: {
        convergentBillingInterruption: this.convergentBillingInterruption,
        interruption: this.interruption,
        customerServiceInterruption: this.customerServiceInterruption
      },
      rules: {
        convergentBillingInterruption: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "融合计费中断时长不能为空",
            trigger: "blur"
          }
        ],
        interruption: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "综合帐务中断时长不能为空",
            trigger: "blur"
          }
        ],
        customerServiceInterruption: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "客户服务中断时长不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    valid: { // 用于表单是否需要进行校验
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    convergentBillingInterruption: {
      required: true
    },
    interruption: {
      required: true
    },
    customerServiceInterruption: {
      required: true
    }
  },
  watch: {
    "form.convergentBillingInterruption": function(newValue, oldValue) {
      this.$emit("update:convergentBillingInterruption", newValue);
    },
    "form.interruption": function(newValue, oldValue) {
      this.$emit("update:interruption", newValue);
    },
    "form.customerServiceInterruption": function(newValue, oldValue) {
      this.$emit("update:customerServiceInterruption", newValue);
    }
  },
  mounted() {},
  methods: {
    validatePass(rule, value, callback) {
      let reg = /^[1-9][0-9]{0,5}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error(" "));
        const h = this.$createElement;
        this.$notify({
          title: "提示",
          message: "时长输入格式必须为数字且不超过6位！",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style >
</style>