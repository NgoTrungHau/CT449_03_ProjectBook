<template>
  <div v-if="book" class="page row justify-content-center">
    <div class="col-md-8">
      <h4>Thêm Sách</h4>
    </div>
    <div class="col-md-8">
      <BookForm :book="book" @submit:book="addBook" />
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";

export default {
  components: {
    BookForm,
  },
  data() {
    return {
      book: {},
      message: "",
    };
  },
  methods: {
    async addBook(data) {
      try {
        await BookService.create(data);
        this.message = "Sách được thêm thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.message = "";
  },
};
</script>
