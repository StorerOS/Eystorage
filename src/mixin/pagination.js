/**
 * pagination
 */

export default {
  data() {
    return {
      paginationMixin: {
        currentPage: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0
      },
      paginationSearchNameMixin: 'searchData'
    }
  },
  methods: {
    $_paginationMixin_search(params) {
      this.paginationMixin.currentPage = 1
      this[this.paginationSearchNameMixin](params)
    },
    $_paginationMixin_handleSizeChange(val) {
      this.paginationMixin.pageSize = val
      this[this.paginationSearchNameMixin]()
    },
    $_paginationMixin_handleCurrentChange(val) {
      this.paginationMixin.currentPage = val
      this[this.paginationSearchNameMixin]()
    }
  }
}
