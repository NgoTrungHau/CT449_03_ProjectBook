<template>
  <div class="page row justify-content-center">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-5">
      <h4>
        Tác giả
        <i class="fas fa-address-book"></i>
      </h4>
      <AuthorList
        v-if="filteredAuthorsCount > 0"
        :authors="filteredAuthors"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có tác giả nào.</p>
    </div>
    <div class="mt-3 col-md-5">
      <div v-if="activeAuthor">
        <h4>
          Chi tiết Tác giả
          <i class="fas fa-address-card"></i>
        </h4>
        <AuthorCard :author="activeAuthor" />
        <router-link
          :to="{
            name: 'author.edit',
            params: { id: activeAuthor._id },
          }"
        >
          <span class="mt-2 badge btn-edit text-dark">
            <i class="fas fa-edit"></i> Chỉnh sửa</span
          >
        </router-link>
      </div>
    </div>
    <div class="mt-3 col-md-8">
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
          @click="goToAddAuthor"
        >
          <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button
          class="btn btn-sm btn-remove rounded-pill col-md-2"
          style="width: 100px"
          @click="removeAllAuthors"
        >
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorCard from "@/components/AuthorCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import AuthorList from "@/components/AuthorList.vue";
import AuthorService from "@/services/author.service";

export default {
  components: {
    AuthorCard,
    InputSearch,
    AuthorList,
  },
  data() {
    return {
      authors: [],
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
    // Chuyển các đối tượng author thành chuỗi để tiện cho tìm kiếm.
    authorStrings() {
      return this.authors.map((author) => {
        const { name, address, imgUrl } = author;
        return [name, address, imgUrl].join("");
      });
    },
    // Trả về các author có chứa thông tin cần tìm kiếm.
    filteredAuthors() {
      if (!this.searchText) return this.authors;
      return this.authors.filter((_author, index) =>
        this.authorStrings[index].includes(this.searchText)
      );
    },
    activeAuthor() {
      if (this.activeIndex < 0) return null;
      return this.filteredAuthors[this.activeIndex];
    },
    filteredAuthorsCount() {
      return this.filteredAuthors.length;
    },
  },
  methods: {
    async retrieveAuthors() {
      try {
        this.authors = await AuthorService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveAuthors();
      this.activeIndex = -1;
    },

    async removeAllAuthors() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await AuthorService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddAuthor() {
      this.$router.push({ name: "author.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
