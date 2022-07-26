<template>
  <div class="container">
    <el-card class="box-card">
      <div class="text">
        <div class="input">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" @click="getAllBookData">搜索</el-button>
        <el-button type="success" icon="el-icon-plus" @click="bookDialog('add')">添加</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="书名" width="180">
        </el-table-column>
        <el-table-column prop="author" label="作者">
        </el-table-column>
        <el-table-column prop="publisher" label="出版社">
        </el-table-column>
        <el-table-column prop="id" label="功能" width="300">
          <template slot-scope="scope">
            <!-- <el-button type="success">借书</el-button> -->
            <el-button type="primary" @click="bookDialog('update', scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteBookData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
          :page-sizes="[10, 20, 30, 50]" :background=true :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="80">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog :title="bookTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="form.bookName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="form.publisher" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateBook(bookTitle)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { bookAllData, addBook, deleteBook, updateBook } from '../api/book'
export default {
  components: {},
  data() {
    return {
      tableData: [],
      input: '',
      bookTitle: '',
      page: 1,
      pageSize: 10,
      updateId: 0,
      dialogFormVisible: false,
      form: {
        bookName: '',
        author: '',
        publisher: ''
      },
      formLabelWidth: '120px',
    }
  },
  computed: {},
  created() { },
  mounted() {
    this.getAllBookData()
  },
  methods: {
    // 展示所有图书
    async getAllBookData() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        name: this.input,
        author: this.input,
        publisher: this.input
      }
      const data = await bookAllData(params)
      // console.log(data);
      if (data.code == 200) {
        console.log(data);
        this.tableData = data.data
        // console.log(this.tableData);
      }
    },
    // 添加图书
    async addOrUpdateBook(bookTitle) {
      if (bookTitle == "增加图书") {
        let params = {
          name: this.form.bookName,
          author: this.form.author,
          publisher: this.form.publisher
        }
        if (params.name == '') {
          this.dialogFormVisible = false
        } else {
          await addBook(params)
        }
        this.dialogFormVisible = false
        // this.form.bookName = ''
        this.getAllBookData()
      } else if (bookTitle == "修改图书" && this.updateId !== 0) {
        let params = {
          id: this.updateId,
          name: this.form.bookName,
          author: this.form.author,
          publisher: this.form.publisher
        }
        await updateBook(params)
        this.dialogFormVisible = false
        // this.form.bookName = ''
        this.getAllBookData()
      }

    },
    // 修改图书
    bookDialog(state, bookData) {
      if (state == 'add') {
        this.bookTitle = '增加图书'
        this.form.bookName = ''
        this.form.author = ''
        this.form.publisher = ''
        this.dialogFormVisible = true
      } else if (state == "update") {
        this.bookTitle = '修改图书'
        this.form.bookName = bookData.name
        this.form.author = bookData.author
        this.form.publisher = bookData.publisher
        this.updateId = bookData.id
        this.dialogFormVisible = true
      }
    },
    // 删除图书
    deleteBookData(row) {
      const params = {
        id: row.id
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteBook(params)
        this.getAllBookData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // // 查询图书
    // async searchBook(){
    //   const params = {
    //     name: this.input,
    //     // author: this.input
    //   }
    //   const data = await bookAllData(params)
    //   console.log(data);
    // },
    // 分页功能的实现
    handleSizeChange(val) {
      this.pageSize = val
      this.getAllBookData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getAllBookData()
    }
  }
}
</script>

<style lang="scss" scoped>


.box-card {
  margin-bottom: 20px;
}

.text {
  display: flex;
}
.input{
  margin-right: 5px;
}
// ::v-deep .el-table .cell{
//   text-align: center;
// }
// ::v-deep .el-input {
//   width: 10%;
//   margin: 0 25px 0 15px;
// }

// ::v-deep .el-input__inner {
//   width: auto;
// }
.block{
  width: 100%;
  height:80px;
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>
