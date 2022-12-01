<template>
  <div class="page row justify-content-center">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-10">
      <h4>
        Sách
        <i class="fas fa-book"></i>
      </h4>
      <BookList
        v-if="filteredBooksCount > 0"
        :books="filteredBooks"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có sách nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button
          class="btn btn-sm btn-refresh rounded-pill col-md-2"
          style="width: 100px"
          @click="refreshList()"
        >
          <i class="fas fa-redo"></i> Làm mới
        </button>

        <button
          class="btn btn-sm btn-add rounded-pill col-md-2"
          style="width: 100px"
          @click="goToAddBook"
        >
          <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button
          class="btn btn-sm btn-remove rounded-pill col-md-2"
          style="width: 100px"
          @click="removeAllBooks"
        >
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";
export default {
  components: {
    InputSearch,
    BookList,
  },
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng Book thành chuỗi để tiện cho tìm kiếm.
    bookStrings() {
      return this.books.map((book) => {
        const { name, author, description, imgUrl } = book;
        return [name, author, description, imgUrl].join("");
      });
    },
    // Trả về các Book có chứa thông tin cần tìm kiếm.
    filteredBooks() {
      if (!this.searchText) return this.books;
      return this.books.filter((_book, index) =>
        this.bookStrings[index].includes(this.searchText)
      );
    },
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveBooks();
      this.activeIndex = -1;
    },

    async removeAllBooks() {
      if (confirm("Bạn muốn xóa tất cả Sách?")) {
        try {
          await BookService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddBook() {
      this.$router.push({ name: "book.add" });
    },

  },
  mounted() {
    this.refreshList();
  },
};
</script>
