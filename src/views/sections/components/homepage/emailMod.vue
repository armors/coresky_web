<!--
 * @Author: zhaoyan
 * @Date: 2023-02-18 13:35:48
 * @LastEditors: zhaoyan
 * @LastEditTime: 2023-02-18 14:24:07
 * @Description: 首页邮件模块
-->
<template>
  <div class="email-mod">
    <div class="email-content">
      <h5>Never miss a drop</h5>
      <h6>Subscribe for the latest news, drops & collectibles</h6>
      <div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="name">
            <el-input v-model="ruleForm.name" clearable class="input-email">
              <template #append>
                <el-button
                  class="btn-sub"
                  @click="addTopic"
                  style="font-weight: 600"
                  >Subscribe</el-button
                >
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "emailMod",
  data() {
    return {
      ruleForm: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            type: "email",
            message: "Please input Email",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addTopic() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          this.$api("home.addTopic", { email: this.ruleForm.name }).then(
            (res) => {
              if (this.$tools.checkResponse(res)) {
                this.$tools.message("You’ve subscribed!", "success");
              }
            }
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.email-mod {
  width: 1200px;
  height: 350px;
  background: #ebefff;
  border-radius: 12px;
  margin: auto;
  margin-top: 20px;
  padding-top: 80px;
  .email-content {
    width: 744px;
    margin: auto;
    h5 {
      height: 60px;
      line-height: 60px;
      font-family: "Roboto";
      font-weight: bold;
      font-size: 40px;
      line-height: 150%;
      color: #111111;
      text-align: center;
    }
    h6 {
      height: 24px;
      line-height: 24px;
      font-family: "Roboto";
      font-style: normal;
      // font-weight: 300;
      font-size: 16px;
      color: #111111;
      text-align: center;
      margin-top: 10px;
    }
  }
}
.email-mod .demo-ruleForm {
  margin-top: 50px;
  .input-email {
    width: 100%;
    display: flex;
    justify-content: space-between;
    ::v-deep .el-input__wrapper {
      width: 584px;
      height: 48px;
      background: #ffffff;
      border-radius: 12px;
      flex: none;
      order: 0;
      flex-grow: 0;
    }
  }
  .btn-sub {
    width: 140px;
    height: 49px;
    background: #3461ff;
    box-shadow: 0px 3.05455px 8.14545px rgba(128, 156, 255, 0.5);
    border-radius: 10px;
    color:#fff;
    :hover{
      opacity: .8;
    }
  }
}
</style>