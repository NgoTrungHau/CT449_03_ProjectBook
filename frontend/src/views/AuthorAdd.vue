<template>
  <div v-if="author" class="page row justify-content-center">
    <div class="col-md-8">
      <h4>Thêm Tác giả</h4>
    </div>
    <div class="col-md-8">
      <AuthorForm :author="author" @submit:author="addAuthor" />
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
  data() {
    return {
      author: {},
      message: "",
    };
  },
  methods: {
    async addAuthor(data) {
      try {
        await AuthorService.create(data);
        this.message = "Tác giả được thêm thành công.";
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
