<template>
  <Form @submit="submitAuthor" :validation-schema="authorFormSchema">
    <div class="form-group">
      <label for="name"><strong>Tên</strong></label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="authorLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address"><Strong>Địa chỉ</Strong></label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="authorLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="imgUrl"><Strong>Hình ảnh</Strong></label>
      <Field
        name="imgUrl"
        type="text"
        class="form-control"
        v-model="authorLocal.imgUrl"
      />
      <ErrorMessage name="imgUrl" class="error-feedback" />
    </div>
    <div class="p-1">
      <img
        :src="authorLocal.imgUrl"
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
        v-model="authorLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Tác giả yêu thích</strong>
      </label>
    </div>
    <div class="form-group row">
      <div class="col-md-2">
        <button class="btn btn-refresh rounded-pill">
          <i class="fas fa-save"></i> Lưu
        </button>
      </div>
      <div class="col-md-2">
        <button
          v-if="authorLocal._id"
          type="button"
          class="ml-2 btn btn-remove rounded-pill"
          @click="deleteAuthor"
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
  emits: ["submit:author", "delete:author"],
  props: {
    author: { type: Object, required: true },
  },
  data() {
    const authorFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      address: yup
        .string()
        .required("Địa chỉ phải có giá trị.")
        .min(2, "Địa chỉ phải ít nhất 2 ký tự.")
        .max(100, "Địa chỉ tối đa 100 ký tự."),
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
              value.endsWith(".jpg") ||
              value.endsWith(".jpeg")
            );
          }
        ),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // authorLocal để liên kết với các input trên form
      authorLocal: this.author,
      authorFormSchema,
    };
  },
  methods: {
    submitAuthor() {
      this.$emit("submit:author", this.authorLocal);
    },
    deleteAuthor() {
      this.$emit("delete:author", this.authorLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
