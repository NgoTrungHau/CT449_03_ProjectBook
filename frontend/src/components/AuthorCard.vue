<script>
export default {
    props: {
        author: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <img
                class="rounded-circle" 
                :src="author.imgUrl"
                ref ="image" 
                :style="{
                    width: '200px',
                    height: '200px',
                }"
            />
        </div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ author.name }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ author.address }}
        </div>
        <div class="p-1">
            <strong>Tác giả yêu thích:&nbsp;</strong>
            <i v-if="author.favorite" class="fas fa-heart text-danger"></i>
            <i v-else class="fa-regular fa-heart text-danger"></i>
        </div>
    </div>
</template>