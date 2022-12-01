<template>
  <div v-if="author" class="page row justify-content-center">
    <div class="col-md-8">
      <h4>Chỉnh sửa thông tin Tác giả</h4>
    </div>
    <div class="col-md-8">
      <AuthorForm
        :author="author"
        @submit:author="updateAuthor"
        @delete:author="deleteAuthor"
      />
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script>
import AuthorForm from "@/components/AuthorForm.vue";
import AuthorService from "@/services/author.service";
export default {
  components: {
    AuthorForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      author: null,
      message: "",
    };
  },
  methods: {
    async getAuthor(id) {
      try {
        this.author = await AuthorService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateAuthor(data) {
      try {
        await AuthorService.update(this.author._id, data);
        this.message = "Tác giả được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAuthor() {
      if (confirm("Bạn muốn xóa Tác giả này?")) {
        try {
          await AuthorService.delete(this.author._id);
          this.$router.push({ name: "authors" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getAuthor(this.id);
    this.message = "";
  },
};
</script>
