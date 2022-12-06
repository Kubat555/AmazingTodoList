<template>
    <div>
        <form @submit.prevent>
            <h4>Create Post</h4>
            <!-- двойная обратная привязка через v-model  -->
            <input 
                v-model.trim = "post.title" 
                class="input" 
                type="text" 
                placeholder="Title"
            >

            <input 
                v-model.trim = "post.body"
                class="input" 
                type="text" 
                placeholder="Body"
            >
            <MyButton 
            @click="createPost"
            style="margin-top: 15px;"
            >Create</MyButton>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                post:{
                    title:'',
                    body:'',
                }
            }
        },
        methods:{
            createPost(){
                if(this.post.title == '' && this.post.body == ''){
                    return;
                }
                this.post.id = Date.now();
                this.$emit('create', this.post) //создание события для доступа к данным post у родителя
                this.post = {
                    title:'',
                    body:'',
                }
            }
        }
    }
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 10px;
}


</style>