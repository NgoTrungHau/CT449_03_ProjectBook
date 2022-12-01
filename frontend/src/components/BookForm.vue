<template>
  <Form @submit="submitBook" :validation-schema="bookFormSchema">
    <div class="form-group">
      <label for="name"><strong>Tên Sách</strong></label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="bookLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="author"><strong>Tác giả</strong></label>
      <Field
        name="author"
        type="text"
        class="form-control"
        v-model="bookLocal.author"
      />
      <ErrorMessage name="author" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="description"><strong>Mô tả</strong></label>
      <Field
        as="textarea"
        name="description"
        type="text"
        class="form-control"
        style="height: 150px;"
        v-model="bookLocal.description"
      />
      <ErrorMessage name="description" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="imgUrl"><strong>Hình ảnh</strong></label>
      <Field
        name="imgUrl"
        type="text"
        class="form-control"
        v-model="bookLocal.imgUrl"
      />
      <ErrorMessage name="imgUrl" class="error-feedback" />
    </div>
    <div class="p-1">
      <img
        :src="bookLocal.imgUrl"
        ref="image"
        :style="{
          height: '300px',
        }"
      />
    </div>
    <div class="form-group form-check">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="bookLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Sách yêu thích</strong>
      </label>
    </div>
    <div class="row form-group">
      <div class="col-md-2">
        <button class="btn btn-primary rounded-pill">
          <i class="fas fa-save"></i> Lưu
        </button>
      </div>
      <div class="col-md-2">
        <button
          v-if="bookLocal._id"
          type="button"
          class="ml-2 btn btn-danger rounded-pill"
          @click="deleteBook"
        >
          <i class="fas fa-trash"></i> Xóa
        </button>
      </div>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:book", "delete:book"],
  props: {
    book: { type: Object, required: true },
  },
  data() {
    const bookFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      author: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      description: yup
        .string()
        .required("Mô tả phải có giá trị.")
        .min(10, "Mô tả phải ít nhất 10 ký tự.")
        .max(1000, "Địa chỉ tối đa 1000 ký tự."),
      imgUrl: yup
        .string()
        .required("Hãy nhập url của hình ảnh")
        .url("Nhập sai url")
        .test(
          "type",
          "Nhập sai định dạng ảnh. Hãy thêm đuôi .png hoặc .jpg hoặc .jpeg vào cuối link",
          (value) => {
            return (
              (value && value.endsWith(".png")) ||
              value && value.endsWith(".jpg") ||
              value && value.endsWith(".jpeg")
            );
          }
        ),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // bookLocal để liên kết với các input trên form
      bookLocal: this.book,
      bookFormSchema,
    };
  },
  methods: {
    submitBook() {
      this.$emit("submit:book", this.bookLocal);
    },
    deleteBook() {
      this.$emit("delete:book", this.bookLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
