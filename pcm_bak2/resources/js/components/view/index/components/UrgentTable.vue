<template>
  <div class="urgentTable">
    <el-table
      :stripe='true'
      size="mini"
      :data="tableData"
      style="width: 100%"
      ><!-- :row-class-name="tableRowClassName" -->
      <el-table-column
        prop="id"
        label="#"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="工单名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="serial"
        label="序列号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="工单状态"
        width="180">
        <template slot-scope="scope">
          <p style="color: red; font-weight: bolder;">{{ scope.row.status }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="processing"
        label="处理环节"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="派单时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="limit"
        label="处理时限"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remain"
        label="剩余时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '0',
          name: '测试-工单名称',
          serial: 'testxxx',
          status: '待处理',
          processing: '故障处理',
          date: '2016-05-02',
          limit: '10天',
          remain: '7天'
        }, {
          id: '1',
          name: '测试-工单名称',
          serial: 'testxxx',
          status: '待处理',
          processing: '故障处理',
          date: '2016-05-04',
          limit: '10天',
          remain: '7天'
        }, {
          id: '2',
          name: '测试-工单名称',
          serial: 'testxxx',
          status: '待处理',
          processing: '故障处理',
          date: '2016-05-01',
          limit: '10天',
          remain: '7天'
        }, {
          id: '3',
          name: '测试-工单名称',
          serial: 'testxxx',
          status: '待处理',
          processing: '故障处理',
          date: '2016-05-03',
          limit: '10天',
          remain: '7天'
        }],
        currentPage3: 1,
        pageSize: 4,
        total: 4
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // tableRowClassName({row, rowIndex}) {
      //   // if (rowIndex === 1) {
      //   //   return 'warning-row';
      //   // } else if (rowIndex === 3) {
      //   //   return 'success-row';
      //   // }
      //   if ( rowIndex % 2 === 1 ) {
      //     return 'grey-row';
      //   }
      //   return '';
      // }
    },
  }
</script>

<style>
  .urgentTable {
    background-color: white;
    text-align: -webkit-center;
  }

  .urgentTable .el-table .warning-row {
    background: oldlace;
  }

  .urgentTable .el-table .success-row {
    background: #f0f9eb;
  }

  .urgentTable .el-table .grey-row {
    background: #f6f6f6;
  }

</style>