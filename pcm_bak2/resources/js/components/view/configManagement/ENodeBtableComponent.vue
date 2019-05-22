<template>
  <div class="tableDatas">
    <el-table :data="tableDatas.slice((currentPage-1)*pagesize,currentPage*pagesize)" :action="getdatas" v-loading="loading.TableDatasStatus" border style="width: 100%">
      <el-table-column v-for="item in tableHeads" :label="item.label" :prop="item.prop" :key="item.label">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="size_change" @current-change="current_change" :page-count="pagecount" :current-page="currentPage" :page-size="2" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>
<style>
  
</style>
<script>
  export default {
    props: {
      table: String,
      formQuery: {},
    },
    data() {
      return {
        tableHeads:[],
        tableDatas:[],
        loading: {
          TableDatasStatus: true,
        },
        currentPage: 1,
        pagesize: 2,
        pagecount: 0,
        total: 0,
      }
    },
    computed: {
      getdatas() {
        // if(this.$store.getter.get){}
        if(this.$store.getters.geteNodeBstatus == 1){
          this.loading.TableDatasStatus = true;
        }
        if(this.$store.getters.geteNodeBstatus == 2){
          // console.log(this.table);
          // console.log(this.formQuery);
          this.loading.TableDatasStatus = false;
          this.tableHeads = this.$store.getters.geteNodeBDatas.tableHeads;
          this.tableDatas = this.$store.getters.geteNodeBDatas.tableDatas;
          // 筛选
          if(this.formQuery.city != "") {
            this.tableDatas = this.tableDatas.filter(item => item['省/自治区/直辖市'].includes(this.formQuery.city));
          }
          if(this.formQuery.eNodeBID != "") {
            this.tableDatas = this.tableDatas.filter(item => item.eNBID.toString().includes(this.formQuery.eNodeBID));
          }
          // console.log(this.tableDatas);
          // this.downloadurl = this.$store.getters.geteNodeBDatas.downloadurl;
          // 分页
          this.total = this.tableDatas.length;
          this.pagecount = parseInt(this.total)%parseInt(this.pagesize) ==0?(parseInt(this.total)/parseInt(this.pagesize)):parseInt(parseInt(this.total)/parseInt(this.pagesize))+1;
        }
        // console.log(this.tableDatas);
      }
    },
    methods: {
      current_change: function(currentPage) {
            this.currentPage = currentPage;
      },
      size_change: function(sizeChange) {
            this.pagesize = sizeChange;
      },      
      
    }
  }
</script>