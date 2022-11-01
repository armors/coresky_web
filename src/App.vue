<template>
  <div class="scroll">
    <router-view v-slot="{ Component }">
<!--      <keep-alive>-->
<!--        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path"/>-->
<!--      </keep-alive>-->
      <component :is="Component"/>
    </router-view>
  </div>
</template>

<script>
  import { computed, onMounted, onBeforeUnmount, getCurrentInstance, reactive, toRefs, watch } from "vue";
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  // import {formatAddress, formatAjaxDatas, formatDataList} from '@/util/main'
  // import Config from '@/util/config'
  export default {
    name: 'App',
    components: {
    },
    setup () {
      // let theInterval = null
      const { proxy } = getCurrentInstance()
      const _root = proxy.$root
      const store = useStore()
      const route = useRoute()
      const doMounted = async () => {
        // console.log(_root.$rpc.initial)
        if (!_root.$rpc.initial) {
          await checkChain()
          await doConnect()
          _root.$rpc.addAccountUsableListener(act => {
            console.log('switch to account ' + act + ' re init account')
          })
        } else {
          await checkChain()
        }
      }
      const checkChain = async () => {
        // 判断公链链接是否正确
        try {
          await _root.$rpc.switchChain()
        } catch (e) {
          // 切换
          if (e.code === 4902) {
            try {
              _root.$rpc.addChain()
            } catch (ee) {
              console.log(ee)
            }
          }
        }
      }
      const doConnect = async (cb) => {
        // await _root.$rpc.contractObjInit()
        // console.log('rpc inited')
        console.log( _root.$rpc)
        _root.$rpc.initConnection({
          onConnect: (account, errmsg) => {
            // console.log(account)
            if (errmsg) {
              console.log('加载回调的msg ' + errmsg)
              let emsg = _root.$t('pageerror.connectfail')
              // _root.$message({text: emsg, type: 'warning'})
            } else {
              _root.$rpc.initial = true;
              store.dispatch('system/setAccount', account)
              cb && cb()
            }
          },
          onSpender: async () => {
            // console.log('spender attached == ' + spender)
            // _root.checkAllowance()
            // 获取交易挖矿合约并缓存
            // let res = await _root.$rpc.mainReq.getMiningAddress()
            // // console.log(res)
            // // 初始化交易挖矿合约
            // await _root.$rpc.miningReq.miningContractInit(res)
          }
        })
      }
      const data = reactive({
      })
      // eslint-disable-next-line no-unused-vars
      watch(() => route.path, (newval) => {
      }, { immediate: false })
      watch(route, () => {
        // console.log('df')
        _root.$i18n.locale = localStorage.getItem('locale')
      })
      onMounted(() => {
        doMounted()
      })
      onBeforeUnmount(() => {
      })
      const account = computed(() => store.state.system.account)
      console.log(account)
      return {
        ...toRefs(data),
        doConnect
        // androidCheckEthereum
      }
    }
  }
</script>

<style lang="less">
  .scroll{
    div{
      color: #fff;
    }
  }
</style>
