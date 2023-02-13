<template>
  <div class="main-wrapper">
    <div class="profile-wrapper display-flex box-column">
      <div class="top">
        <div class="top-Row1">{{$t('profile.editProfile')}}</div>
      </div>
      <div class="box-flex1 display-flex">
        <div class="main-profile">
          <!--					:rules="rules"-->
          <el-form ref="userFromRef" :rules="rules" :model="userFrom" label-width="120px" label-position="top"
            status-icon>
            <el-form-item :label="$t('profile.Username')" prop="nickname">
              <el-input v-model="userFrom.nickname" :placeholder="$t('profile.placeholderName')" />
            </el-form-item>
            <el-form-item :label="$t('profile.UploadCover')">
              <el-upload class="upload-background" drag :show-file-list="false" :action="OSS_URL" :data="OSS_PARAM"
                :before-upload="oss_beforeUpload" :on-success="oss_uploadSuccess" :style="{
									backgroundImage: 'url('+ backgroundImage +')'
								}">
                <el-button type="primary" class="sub-btn upload">{{$t('profile.chooseFile')}}</el-button>
              </el-upload>
              <div class="tip-txt">{{$t('profile.tip1')}} </div>
            </el-form-item>
            <el-form-item :label="$t('profile.bio')">
              <el-input v-model="userFrom.bio" :placeholder="$t('profile.placeholderBio')" type="textarea" />
            </el-form-item>

            <el-form-item :label="$t('profile.myPlatform')" class="platform-info">
              <el-input v-model="userFrom.website" placeholder="https://www.iconfont.cn/">
                <template #prefix>
                  <div class="prefix-icon"><img src="../../assets/images/icons/profile/icon_website.svg" alt=""></div>
                </template>
              </el-input>
              <el-input v-model="userFrom.twitter" placeholder="https://www.iconfont.cn/">
                <template #prefix>
                  <div class="prefix-icon"><img src="../../assets/images/icons/profile/icon_twitter.svg" alt=""></div>
                </template>
              </el-input>
              <el-input v-model="userFrom.ins" placeholder="https://www.iconfont.cn/">
                <template #prefix>
                  <div class="prefix-icon"><img src="../../assets/images/icons/profile/icon_ins.svg" alt=""></div>
                </template>
              </el-input>
              <el-input v-model="userFrom.discord" placeholder="https://www.iconfont.cn/">
                <template #prefix>
                  <div class="prefix-icon"><img src="../../assets/images/icons/profile/icon_discord.svg" alt=""></div>
                </template>
              </el-input>
              <el-input v-model="userFrom.telegram" placeholder="https://www.iconfont.cn/">
                <template #prefix>
                  <div class="prefix-icon"><img src="../../assets/images/icons/profile/icon_telegram.svg" alt=""></div>
                </template>
              </el-input>
              <el-input v-model="userFrom.medium" placeholder="https://www.iconfont.cn/">
                <template #prefix>
                  <div class="prefix-icon"><img src="../../assets/images/icons/profile/icon_medium.svg" alt=""></div>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="sub-btn" :loading="submitBtnLoading" @click="submitForm">
                {{ $t('common.Submit') }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="avatar-box box-flex1">
          <div class="display-flex box-center-X">
            <div>{{$t('profile.UploadAvatar')}}</div>
            <el-tooltip placement="top">
              <div class="tip-icon"><img src="../../assets/images/icons/icon_tips.svg" alt=""></div>
              <template #content>
                {{$t('profile.tip2')}}
              </template>
            </el-tooltip>
          </div>

          <div class="avatar-img">
            <img :src="imgSrc" alt="">
            <el-upload class="upload-avatar display-flex box-center" :action="OSS_URL" :data="OSS_PARAM"
              :before-upload="oss_beforeUpload" :on-success="handleAvatarSuccess" :show-file-list="false">
              <div class="edit-icon"><img src="../../assets/images/icons/icon_edit_profile.svg" alt=""></div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getLocalStorage } from "../../util/local-storage";
import store from "@/store";

export default {
  name: "Profile",
  data: function () {
    return {
      imageFile: "",
      imgSrc: "",
      id: "",
      address: "",
      displayName: "",
      bio: "",
      customUrl: "",
      pic_data: "",
      coinbase: "",
      networkId: "",
      defaultImgSrc: "",
      personalUrl: "",
      submitBtnLoading: false,
      headers: {
        token: ''
      },
      backgroundImage: '',
      // uploadUrl: process.env.VUE_APP_API_URL,
      uploadUrl: '/api/file/upload',
      userFrom: {
        nickname: '',
        photo: '',
        background: '',
        bio: '',
        website: '',
        telegram: '',
        twitter: '',
        medium: '',
        discord: '',
        ins: ''
      },
      rules: {
        nickname: [
          { required: true, message: this.$t('profile.placeholderName'), trigger: 'blur' },
          { min: 4, max: 60, message: '4-60字符，支持English、中文', trigger: 'blur' },
        ],
      },
      OSS_URL: '',
      OSS_DIR: '',
      OSS_IMAGE_URL: '',
      OSS_PARAM: {
        OSSAccessKeyId: '',
        key: '',
        policy: '',
        success_action_status: '200',
        signature: ''
      },
      fullscreenLoading: undefined
    };
  },
  created () {
    this.userFrom.photo = this.$filters.fullImageUrl(this.user.avatar)
    this.getUserInfo()
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
  },
  methods: {
    oss_beforeUpload (file) {
      this.OSS_IMAGE_URL = ''
      this.fullscreenLoading = this.$loading({
        lock: true,
        text: "loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      return new Promise((resolve, reject) => {
        this.$api('oss').then(res => {
          this.OSS_PARAM.OSSAccessKeyId = res.accessid
          this.OSS_PARAM.signature = res.signature
          this.OSS_PARAM.policy = res.policy
          this.OSS_PARAM.key = ''
          this.OSS_DIR = res.dir
          this.OSS_URL = res.host
          this.oss_setKey(file.name)
          resolve()
        }).catch(err => {
          reject()
        })
      })
    },
    oss_uploadSuccess () {
      if (this.fullscreenLoading) {
        this.fullscreenLoading.close();
      }
      // console.log()
      this.backgroundImage = this.OSS_URL + '/' + this.OSS_PARAM.key;
    },
    oss_setKey (filename) {
      let suffix = this.oss_fileSuffix(filename)
      this.OSS_PARAM.key = this.OSS_DIR + this.oss_random_string(10) + suffix
    },
    oss_fileSuffix (filename) {
      let pos = filename.lastIndexOf('.')
      let suffix = ''
      if (pos != -1) {
        suffix = filename.substring(pos)
      }
      return suffix;
    },
    oss_random_string (length) {
      let len = length || 10;
      let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      let maxPos = chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    getToken () {
      this.headers = {
        token: `${window.localStorage.getItem(
          `Coresky${this.user.coinbase}Authorization`
        ) || ''}`
      }
    },
    beforeAvatarUpload (rawFile) {
      if (rawFile.size / 1024 / 1024 > 2) {
        this.$tools.message('Avatar picture size can not exceed 8MB!');
        return false
      }
      this.getToken()
      return true
    },
    handleAvatarSuccess (response) {
      if (this.fullscreenLoading) {
        this.fullscreenLoading.close();
      }
      // console.log()
      this.imgSrc = this.OSS_URL + '/' + this.OSS_PARAM.key;
      // this.imgSrc = response.debug
    },
    beforeBackgroundUpload (rawFile) {
      if (rawFile.size / 1024 / 1024 > 8) {
        this.$tools.message('Background picture size can not exceed 8MB!');
        return false
      }
      this.getToken()
      return true
    },
    handleBackgroundSuccess (response) {
      this.backgroundImage = response.debug
    },
    getUserInfo () {
      this.$api("user.info", {
        address: this.user.coinbase
      }).then((res) => {
        if (this.$tools.checkResponse(res)) {
          this.userFrom.nickname = res.debug.nickname || ''
          this.userFrom.background = res.debug.background || ''
          this.backgroundImage = this.userFrom.background
          this.userFrom.photo = res.debug.photo || this.$filters.fullImageUrl(this.user.avatar);
          this.imgSrc = this.userFrom.photo
          this.userFrom.id = res.debug.id;
          this.userFrom.bio = res.debug.intro || ''
          this.userFrom.website = res.debug.blog || '';
          this.userFrom.ins = res.debug.ins || '';
          this.userFrom.discord = res.debug.discord || '';
          this.userFrom.telegram = res.debug.telegram || '';
          this.userFrom.twitter = res.debug.twitter || '';
          this.userFrom.medium = res.debug.other || '';
        } else {
          this.$tools.message(res.errmsg);
        }
      });
    },
    submitForm () {
      this.$api("user.update", {
        "photo": this.imgSrc,
        "nickname": this.userFrom.nickname,
        "background": this.backgroundImage,
        "telegram": this.userFrom.telegram,
        "twitter": this.userFrom.twitter,
        "blog": this.userFrom.website,
        "discord": this.userFrom.discord,
        "ins": this.userFrom.ins,
        "other": this.userFrom.medium,
        "intro": this.userFrom.bio
      }).then((res) => {
        this.$tools.message('修改成功', 'success');
        this.getUserInfo()
        this.$store.dispatch("authinfo")
      });
    },
    imageChange (e) {
      let file = new FileReader();
      this.imageFile = e.target.files[0];
      file.readAsDataURL(e.target.files[0]);
      file.onload = () => {
        this.imgSrc = file.result;
      };
    },
    async updateImage () {
      if (!this.imageFile) {
        this.UpdateProfile();
      } else {
        const formData = new FormData();
        formData.append("file", this.imageFile);
        this.$api("storage.upload", formData).then((res) => {
          if (this.$tools.checkResponse(res)) {
            this.imgSrc = res.data.url;

            this.UpdateProfile();
          } else {
            this.$tools.message(res.errmsg);
          }
        });
      }
    },
    UpdateProfile () {
      let temporary = {
        address: this.address,
        id: this.id,
        avatar: this.imgSrc,
        nickname: this.displayName,
        brief: this.bio,
        shortUrl: this.customUrl,
      };
      this.$api("user.setprofile", temporary).then((res) => {
        if (this.$tools.checkResponse(res)) {
          this.$tools.message("修改成功", "success");
          this.$store.dispatch("authinfo");
          this.goBack();
        } else {
          this.$tools.message(res.errmsg);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
}

.top {
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid $borderBg;
}

.go-back {
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  line-height: 48px;
}

.top-Row1 {
  font-size: 32px;
  font-weight: bold;
  line-height: 66px;
}

.avatar-box {
  padding-top: 108px;
}

.bottom {
  display: flex;
  margin-bottom: 32px;
}

.unit {
  margin-bottom: 24px;
}

.font1 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 400;
}

.lastButton {
  margin-top: 39px;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 54px;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font2 {
  color: rgba(4, 4, 5, 0.5);
  font-size: 14px;
  font-weight: 900;
}

.font3 {
  color: rgb(0, 102, 255);
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
}

.chooseFile-Title {
  margin-top: 24px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.chooseFile-Text {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 400;
  color: #999;
}

.chooseFile-Content {
  margin-bottom: 17px;
  display: flex;
  justify-content: space-between;
}

.Verification {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.Verification-Content {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}

.Verification-Text {
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  opacity: 0.5;
  margin-right: 33px;
}

.Verification-Button {
  padding: 0 20px;
  width: fit-content;
  height: 33px;
  line-height: 33px;
  font-size: 8px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  min-height: auto;
}

.file-box {
  margin-top: 10px;
  background: $primaryColor;
  border-radius: 8px;
  padding: 9px 20px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  cursor: pointer;
  position: relative;

  .file-btn {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    cursor: pointer;
  }
}

.chooseFile-Content-RightSection {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<style lang="scss">
.main-profile {
  width: 480px;
  .el-form.el-form--default {
    .el-form-item {
      margin-top: 50px;
      margin-bottom: 0 !important;
      .upload-background {
        width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .el-upload-dragger {
          border-radius: 12px;
          background-color: transparent;
        }
      }
      .el-form-item__label {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        color: $primaryColor;
        margin-bottom: 0 !important;
      }
      .el-form-item__content {
        margin-top: 20px;
      }
      .el-input__wrapper {
        height: 48px;
        border: 1px solid $borderBg2;
        border-radius: 12px;
        padding: 0 16px;
        box-shadow: none !important;
        .el-input__inner {
          height: 48px;
          line-height: 48px;
        }
      }
      .el-input__prefix {
        width: 48px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .prefix-icon {
          margin-right: 0;
        }
        border-right: 1px solid $borderBg2;
        & + .el-input__inner {
          padding-left: 20px;
        }
      }
      .el-input + .el-input {
        margin-top: 10px;
      }
      &.platform-info {
        .el-input__wrapper {
          padding-left: 0;
        }
      }
    }
  }
  .sub-btn {
    margin-top: 20px;
    width: 100%;
    height: 48px;
    padding: 10px 0;
    border-radius: 12px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    color: $color-white;
    background: $mainLiner;
    &.upload {
      width: 222px;
      margin-top: 0;
      border-radius: 24px;
    }
  }
  .tip-txt {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    /* identical to box height, or 21px */
    color: $color-black2;
  }
}
.avatar-box {
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  .tip-icon {
    cursor: pointer;
    margin-left: 10px;
    width: 20px;
    height: 20px;
  }
  .avatar-img {
    width: 160px;
    height: 160px;
    position: relative;
    border-radius: 50%;
    margin: 30px auto 0;

    .edit-icon {
      width: 32px;
      height: 32px;
    }
    .upload-avatar {
      position: absolute;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      left: 0;
      top: 0;
      background-color: $color-bg5;
    }
  }
}
input.el-input__inner::placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}
</style>
