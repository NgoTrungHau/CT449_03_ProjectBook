<script>
import BookService from "@/services/book.service";
export default {
  props: {
    book: { type: Object, required: true },
  },
  data() {
    return {
      bookLocal: this.book,
      message: "",
    };
  },
  methods: {
    async getBook(id) {
      try {
        this.book = await BookService.getDetail(id);
      } catch (error) {
        console.log(error);
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
  }
};
</script>

<template>
    <div class="page row">
        <div class="row justify-content-center">
            <div class=" col-md-6">
                <img
                class="rounded center" 
                :src="bookLocal.imgUrl"
                ref ="image" 
                :style="{
                    width: '336px',
                }"
            />
            </div>
        </div>
        <div class="row justify-content-center">
            <div class=" col-md-6 text-center">
                <strong>{{ bookLocal.name }}</strong>
            </div>
        </div>
        <div class="col-md-10">
            <strong>Tác giả:</strong>
            {{ bookLocal.author }}
        </div>
        <div class="col-md-12">
            <strong>Mô tả:</strong>
            {{ book.description }}
        </div>
        <div class="col-md-10">
            <strong>Sách yêu thích:&nbsp;</strong>
            <i v-if="book.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>
