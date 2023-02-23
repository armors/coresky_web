<!--
 * @Author: zhaoyan
 * @Date: 2023-02-18 13:35:48
 * @LastEditors: zhaoyan
 * @LastEditTime: 2023-02-23 18:14:57
 * @Description: 首页邮件模块
-->
<template>
  <div class="email-mod">
    <div class="email-content">
      <h5>Never miss a drop</h5>
      <h6>Subscribe for the latest news, drops & collectibles</h6>
      <div>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
          <el-form-item label="" prop="name">
            <el-input v-model="ruleForm.name" clearable class="input-email">
              <template #append>
                <el-button class="btn-sub" @click="addTopic" style="font-weight: 600">Subscribe</el-button>
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
@media screen and (max-width: 1500px) {
  .email-mod {
    zoom: 0.9;
  }
}

@media screen and (max-width: 1340px) {
  .email-mod {
    zoom: 0.8;
  }
}

@media screen and (max-width: 1220px) {
  .email-mod {
    zoom: 0.7;
  }
}

.email-mod {
  height: 350px;
  background-image: url("../../../../assets/images/bg-email.png");
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 12px;
  margin: auto 40px;
  margin-top: 20px;
  margin-bottom: 50px;
  padding-top: 64px;

  .email-content {
    width: 500px;
    margin: auto;

    h5 {
      height: 65px;
      line-height: 65px;
      font-weight: bold;
      font-size: 50px;
      color: #111111;
      text-align: center;
    }

    h6 {
      font-size: 16px;
      color: #717A83;
      text-align: center;
    }
  }
}

.email-mod .demo-ruleForm {
  margin-top: 14px;


  .input-email {
    width: 100%;
    display: block;

    ::v-deep .el-input__wrapper {
      width: 449px;
      height: 48px;
      background: #ffffff;
      border-radius: 12px;
      margin: auto;
      display: block;
    }

    ::v-deep .el-input-group__append {
      display: block;
      background: transparent;
      border: 0;
      box-shadow: 0 0 0 0;
      margin: auto;
    }
  }

  .btn-sub {
    display: block;
    width: 140px;
    height: 50px;
    background: #3461ff;
    box-shadow: 0px 3.05455px 8.14545px rgba(128, 156, 255, 0.5);
    border-radius: 10px;
    color: #fff;
    margin: auto;
    margin-top: 22px;
    font-size: 14px;
  }

  .btn-sub:hover {
    box-shadow: 0 15px 30px rgba(97, 138, 228, 0.3),
      0 0 20px rgba(96, 153, 218, 0.1) inset;
    transform: translate3d(0, -2px, 0);
  }
}
</style>