<template>
  <div>
    <div class="wc-title">
      <div><svg-icon icon-class="ic_tit_sucai" /> <span>{{ $t('Files.FilesList') }}</span></div>
      <el-upload
        action=""
        :show-file-list="false"
        :http-request="handleUpload"
      >
        <el-button
          :loading="loadingMixin.upload"
          type="primary"
          size="default"
          @click="handleOparteConfig('ADD')"
        >{{ $t('Files.UploadFile') }}</el-button>
      </el-upload>
    </div>

    <div class="wc-card center">
      <no-empty v-if="filesList.length == 0" />
      <template v-else>
        <el-table v-loading="loadingMixin.search" :data="filesList">
          <el-table-column :label="$t('FileTB.Name')" align="center">
            <template v-slot="{ row }">
              <div>{{ row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('FileTB.CID')" align="center">
            <template v-slot="{ row }">
              <el-tooltip class="item" effect="dark" :content="row.cid" placement="top-start">
                <div>{{ row.cid | hiddenMiddleText }}</div>
              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column :label="$t('FileTB.Size')" align="center">
            <template v-slot="{ row }">
              <div>{{ row.size | byte2Anys({autoUnit:true,hasUnit:true}) }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('FileTB.Time')" align="center">
            <template v-slot="{ row }">
              <div>{{ row.created_time | parseTime }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('FileTB.Operate')" align="center">
            <template slot-scope="scope">
              <el-button v-loading="loadingMixin.download" type="text" size="default" @click="handleDownloadFile(`https://${scope.row.cid}.ipfs.dweb.link/${scope.row.name}`,scope.row.name)">{{ $t('FileTB.Download') }}</el-button>
              <el-button v-loading="loadingMixin.delete" type="text" size="default" @click="handleDelFile(scope.row.id)">{{ $t('FileTB.Delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button v-if="hasMore" type="primary" plain class="btn" @click="nextPage">Load More</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import NoEmpty from '@/components/NoEmpty'
import { paginationMixin, loadingMixin } from '@/mixin'
import { fileList, uploadFile, downloadFile, delFile } from '@/api/user'
import axios from 'axios'
export default {
  components: {
    NoEmpty
  },
  mixins: [paginationMixin, loadingMixin],
  data() {
    return {
      filesList: [],
      hasMore: false,
      page_no: 0,
      page_size: 5
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async handleUpload(fileStream) {
      const { file } = fileStream
      const formData = new FormData()
      formData.append('file', file)
      this.$_loadingMixin_start(async() => {
        await uploadFile(formData)
        this.resetData()
        this.$message.success(this.$t('AlertMsg.Successfuloperation'))
      }, 'upload')
    },
    async  handleDownloadFile(url, fileName) {
      await axios({
        url: url, // your url
        method: 'GET',
        responseType: 'blob' // important
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data)

        // create "a" HTLM element with href to file & click
        const link = document.createElement('a')
        link.href = href
        link.setAttribute('download', fileName) // or any other extension
        document.body.appendChild(link)
        link.click()
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
      this.$message.success(this.$t('AlertMsg.Successfuloperation'))
    },
    handleDelFile(id) {
      const { filesList } = this
      this.$_loadingMixin_start(async() => {
        await delFile({ id })
        this.filesList = filesList.filter(i => i.id !== id)
        this.$message.success(this.$t('AlertMsg.Successfuloperation'))
      }, 'delete')
    },
    resetData() {
      this.page_no = 0
      this.filesList = []
      this.initData()
    },
    nextPage() {
      const { page_no } = this
      this.page_no = page_no + 1
      this.initData()
    },
    async initData() {
      const { page_no, page_size, filesList } = this
      this.$_loadingMixin_start(async() => {
        const { header, data: { list }} = await fileList({ page_no, page_size })
        this.filesList = filesList.concat(list)
        if (this.filesList.length < header.total) {
          this.hasMore = true
        }
      }, 'search')
    }
  }
}
</script>
<style lang="scss" scoped>
.op{
    position:relative;
    padding-left: 10px;
    &::before{
        content:'';
        width: 20px;
        height:20px;
        background-color: $colorPrimary;
        border-radius: 50%;
        left: 30%;
        position:absolute;
    }
}
.btn{
    margin:20px 0;
}
.center{
    text-align: center;
}
</style>
