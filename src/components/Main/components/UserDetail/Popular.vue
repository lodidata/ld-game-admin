<template>
  <div id="Popular">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div>
      <!-- <p class="title">{{i18n_lang.components151}}</p>
      <div class="content">
        <Row>
          <Col v-for="(item, i) in rake_back" :key="i" span="8">
            <div class="item">
              <p>{{ item.key_desc }}{{i18n_lang.components152}}</p>
              <span>
                <Input v-model="item.value" style="width: 70px"/>
              </span>
              <span class="detail">{{ item.desc }}</span>
            </div>
          </Col>
        </Row>
        <Button type="primary" size="large" @click="handleSave(1)">{{i18n_lang.components153}}</Button>
      </div>

      <p class="title">{{i18n_lang.components154}}</p>
      <div class="content">
        <Row>
          <Col v-for="(item, i) in junior_rake_back" :key="i" span="8">
            <div class="item">
              <p>{{ item.key_desc }}{{i18n_lang.components152}}</p>
              <span>
                <Input v-model="item.value" style="width: 70px"/>
              </span>
              <span class="detail">{{ item.desc }}</span>
            </div>
          </Col>
        </Row>
        <Button type="primary" size="large" @click="handleSave(2)">{{i18n_lang.components153}}</Button>
      </div> -->

      <p class="title">{{i18n_lang.components155}}</p>
      <div class="content">
        <Row>
          <Col span="7">
            <Card>
              <p slot="title">{{i18n_lang.components156}}</p>
              <div class="item">
                <a v-for="(it,i) in marker_link.pc_url" :key="i" :href="it" target="_blank">{{ it }}</a>
              </div>
            </Card>
          </Col>
          <Col span="7" offset="1">
            <Card>
              <p slot="title">{{i18n_lang.components157}}</p>
              <div class="item">
                <a v-for="(it,i) in marker_link.h5_url" :key="i" :href="it" target="_blank">{{ it }}</a>
              </div>
              <div class="item">
                <a v-for="(it,i) in marker_link.h5_url_2" :key="i" :href="it" target="_blank">{{ it }}</a>
              </div>
            </Card>
            <!-- <Button type="primary" icon="md-add" class="mb30" @click="addPopularize()">{{i18n_lang.components262}}</Button> -->
            <!-- <Button size="large" @click="item.compile ? save(item, index) : compile(item, index)">{{item.compile ? i18n_lang.components265 : i18n_lang.components266}}</Button> -->
            <!-- <Card v-for="(item, index) in h5_url_list" :key="index" class="h5_url_list">
              <p slot="title" style="height: 32px;">
                <Input v-if="item.compile" v-model="item.name" :maxlength="10" style="width: 120px;"></Input>
                <span v-else>{{item.name}}</span>
                <span style="float: right;color: #0000FF;">
                  <Checkbox v-model="item.is_proxy" @on-change="compileList($event, item)"></Checkbox>
                  {{i18n_lang.components263}}
                </span>
              </p>
              <div class="item">
                <Input v-if="item.compile" type="textarea" :rows="2" v-model="item.link"></Input>
                <a v-else :href="item.link" target="_blank">{{ item.link }}</a>
              </div>
              <div class="h5_url_btn">
                <div>
                  <Poptip confirm :title="i18n_lang.components268" @on-ok="deleteList(item, index)">
                    <Button size="large">{{i18n_lang.components264}}</Button>
                  </Poptip>
                </div>
              </div>
            </Card> -->
          </Col>
          <Col span="7" offset="1">
            <Card v-if="marker_link.weChat_url">
              <p slot="title">{{i18n_lang.components158}}</p>
              <div class="item">
                <a :href="marker_link.weChat_url" target="_blank">{{ marker_link.weChat_url }}</a>
              </div>
            </Card>
          </Col>
        </Row>
        <Row style="margin-top:20px;">
          <Col span="7">
            <Card>
              <p slot="title">{{i18n_lang.components159}}</p>
              <div class="item">
                <a
                  v-for="(it,i) in marker_link.spread_url"
                  :key="i"
                  :href="it"
                  target="_blank"
                >{{ it }}</a>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import { splitArr } from './columns/popular.js'
export default {
  props: ['id'],
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      junior_rake_back: [],
      rake_back: [],
      marker_link: [],
      compile_index: -1,
      // h5_url_list: []
    }
  },
  created() {
    this.init()
  },
  computed: {
    h5_url_list(){
      return this.marker_link.h5_url_list
    }
  },
  methods: {
    addPopularize(){
      this.marker_link.h5_url_list.push({
        name: `${this.i18n_lang.components267}${this.marker_link.h5_url_list.length + 1}`,
        link: '',
        state: true,
        desc: '',
        compile: true,
        isAdd: true
      })
    },
    compile(item, index){
      let list = splitArr(this.marker_link.h5_url_list, index)
      this.marker_link.h5_url_list = []
      this.marker_link.h5_url_list = list
    },
    save(item, index){
      item.isAdd ? this.addList(item) : this.compileList(item)
    },
    async addList(item){
      this.loading.page = true
      const req = { ...item }
      req.state = req.state ? 1 : -1
      delete req.compile
      delete req.isAdd
      const res = await this.$axios.request({
        url: `/system/promotionh5`,
        method: 'POST',
        data: req
      })
      this.$msg({
        type: res.status !== 200 || res.state != 0 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200 || res.state != 0) return this.loading.page = false
      this.init()
    },
    async compileList(event, item){
      this.loading.page = true
      const req = { ...item }
      req.uid = this.id
      req.is_proxy = req.is_proxy ? 1 : 0
      delete req.compile
      const res = await this.$axios.request({
        url: `/system/promotionh5`,
        method: 'PUT',
        data: req
      })
      this.$msg({
        type: res.status !== 200 || res.state != 0 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200 || res.state != 0) return this.loading.page = false
      this.init()
    },
    async deleteList(item, index){
      if(item.isAdd) return this.marker_link.h5_url_list.splice(index, 1)
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/system/promotionh5?uid=${this.id}&link=${item.link}&key=${item.key}`,
        method: 'delete'
      })
      this.$msg({
        type: res.status !== 200 || res.state != 0 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200 || res.state != 0) return this.loading.page = false
      this.init()
    },
    init() {
      this.getData()
    },
    // 下级返佣
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/user/info/agent/${this.id}`,
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      const { marker_link, rake_back, junior_rake_back } = res.data
      this.marker_link = marker_link
      this.rake_back = rake_back
      this.junior_rake_back = junior_rake_back
      if(this.marker_link.h5_url_list && this.marker_link.h5_url_list.length){
        this.marker_link.h5_url_list.forEach((item, index) => {
          item.is_proxy = item.is_proxy ? true :false
          item.compile = false
        })
      }
    },
    // 保存返佣信息 1 自身， 2 下级
    async handleSave(type) {
      this.loading.page = true
      const data = JSON.parse(JSON.stringify(type === 1 ? this.rake_back : this.junior_rake_back))
      const temp = {
        // type: Number(type)
      }
      data.forEach(o => {
        temp[o.key] = Number(o.value)
      })
      const req = {}
      if (type === 1) {
        req.rake_back = temp
      } else {
        req.junior_rake_back = temp
      }
      const res = await this.$axios.request({
        url: `/user/info/agent/${this.id}`,
        method: 'PUT',
        data: req
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 || res.state === 11050 || res.state === 11051 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) return
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#Popular {
  position: relative;
  padding-bottom: 30px;
  min-height: 300px;
  .title {
    font-size: 16px;
    margin: 20px 0;
    padding-left: 10px;
    border-left: 3px solid #3080fe;
    color: #666;
  }
  .item {
    margin-bottom: 18px;
    p,
    span {
      font-size: 14px;
      display: inline-block;
      line-height: 28px;
      color: rgb(153, 153, 153);
      min-width: 70px;
      margin-right: 5px;
    }
    span {
      color: rgb(51, 51, 51);
      &.detail {
        color: #f33;
      }
    }
  }
  .h5_url_list{
    margin-top: 10px;
    &:first-child{
      margin-top: 0;
    }
  }
  .h5_url_btn{
    overflow: hidden;
    &>div{
      display: inline-block;
      float: right;
    }
  }
}
</style>
