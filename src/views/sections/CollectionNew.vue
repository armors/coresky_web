<template>
  <div class="collection-page">
  </div>
</template>
<script>
import collectionNFT from './components/collectionNFT'

export default {
  name: "CollectionNew",
  components: {
    collectionNFT,
  },
  mixins: [],
  data () {
    return {
      EXPLORE_URL: process.env.VUE_APP_EXPLORE,
      activeName: 'collected',
      dataInfo: {
        imgUrl: "https://storage.nfte.ai/asset/collection/featured/LSIWBMDTLHJRKSITPNVQWFNCVCOKRIGG.jpg?x-oss-process=image/resize,m_fill,w_4096,h_180",
        address: "",
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sort: '',
        minPrice: '',
        maxPrice: '',
        isNowBuy: true,
      },
      tokenQueryParams: {
        "keyword": "",
        "contract": this.contract,
        "buyNow": true,
        "minPrice": 0,
        "maxPrice": 0,
        "order": 0,
        "filter": {},
        page: 1,
        limit: 20
      },
      attrList: [
        {
          attrNm: 'Background1',
          total: 99,
          isShow: false,
          dataList: [
            {
              name: 'Pearl1',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl2',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl3',
              num: 100,
              isChecked: false,
            }
          ]
        },
        {
          attrNm: 'Background2',
          total: 99,
          isShow: false,
          dataList: [
            {
              name: 'Pearl1',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl2',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl3',
              num: 100,
              isChecked: false,
            }
          ]
        },
        {
          attrNm: 'Background3',
          total: 99,
          isShow: false,
          dataList: [
            {
              name: 'Pearl1',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl2',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl3',
              num: 100,
              isChecked: false,
            }
          ]
        }
      ],
      contract: '',
      collectInfo: {
        bannerImage: '',
        image: ''
      },
      tokenList: [],
      followStatus: false,
    };
  },

  created () {
  },
  mounted () {

  },
  computed: {

  },

  methods: {
  },
};
</script>
<style lang="scss" scoped>
.collection-page {
  flex: 1 1 0%;
  min-height: 0px;
}
</style>
