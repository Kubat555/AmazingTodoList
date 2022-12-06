<template>
     <div class="post">
            <div><strong>{{ post.title }}:</strong> {{ post.body}}</div>
            <MyButton
            @click="$emit('remove', post)"
            >Удалить</MyButton>
    </div>
</template>

<script>
    export default {
        props:{
            post:{
                type: Object,
                required: true,
            }
        }
    }
</script>

<style >
    .post {
        padding: 15px;
        margin-top: 15px;
        border: 2px solid teal;
        background-color: rgb(184, 220, 221);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>