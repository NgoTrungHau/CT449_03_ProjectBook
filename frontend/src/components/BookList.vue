<template>
  <table class="table table-fixed table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th class="text-center" scope="col" style="width: 150px">Tên sách</th>
        <th class="text-center" scope="col" style="width: 150px">Tác giả</th>
        <th class="text-center" scope="col">Mô tả</th>
        <th class="text-center" scope="col">Ảnh</th>
        <th class="text-center" scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(book, index) in books"
        :key="book._id"
        :class="{ active: index === activeIndex }"
        @click="updateActiveIndex(index)"
      >
        <th scope="row">{{ index + 1 }}</th>
        <th class="text-center">
          <router-link
            :to="{
              name: 'book.detail',
              params: { id: book._id },
            }"
          >
            {{ book.name }}
          </router-link>
        </th>
        <td class="text-center">{{ book.author }}</td>

        <td>
          <span class="d-inline-block text-truncate" style="width: 440px">
            {{ book.description }}
          </span>
        </td>
        <td class="text-center">
          <img
            class="rounded"
            :src="book.imgUrl"
            ref="image"
            :style="{
              height: '100px',
            }"
          />
        </td>
        <td>
          <div class="column">
            <div class="row justify-content-center">
              <span 
                class="mt-2 badge"
                type="button"
                @click="favoriteBook(book)">
                <i v-if="book.favorite" class="fas fa-heart fa-xl text-danger"></i>
                <i v-else class="fa-regular fa-heart fa-xl text-danger"></i>
              </span>
            </div>
            <div class="row">
              <router-link
                :to="{
                  name: 'book.edit',
                  params: { id: book._id },
                }"
              >
                <span class="mt-2 badge btn-edit text-dark">
                  <i class="fas fa-edit"></i
                ></span>
              </router-link>
            </div>
            <div class="row justify-content-center">
              <span
                class="mt-2 badge btn-remove text-light"
                type="button"
                style="width: 30px"
                @click="removeSingleBook(book._id)"
              >
                <i class="fas fa-trash"></i>
              </span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import BookService from "@/services/book.service";

export default {
  props: {
    books: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },

    async favoriteBook(data) {
      this.books.forEach(async book => {
        if(book._id == data._id) {
          console.log('tim thay');
          book.favorite = !book.favorite;
          await BookService.update(book._id, book);
          console.log('yêu thích');
        }
      })
      this.$parent.refreshList();
    },

    async removeSingleBook(id) {
      if (confirm("Bạn muốn xóa Sách này?")) {
        try {
          await BookService.delete(id);
          this.$parent.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
