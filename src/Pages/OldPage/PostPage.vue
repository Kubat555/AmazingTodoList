<template >
  <div >
    <PostForm
        @create = "createPost"
    />
    <!-- @create это вызов того созданного нами события который предназначен для получения данных поста из Postform и использовние его в методе createPost в APP.vue-->
    <input style="margin-top: 20px; width: 100%; height: 30px; padding: 10px;"
           placeholder="Поиск.."
           v-model="searchQuery"
           type="text">

    <PostList
        :posts="searchPost"
        @remove = "removePost"
    />

    <PageWrapper
        :pages = totalPage
        :currentPage = page
        @changePage="ChangePage"
    />
  </div>

</template>

<script>
import PostForm from "@/Components/OldComponents/PostForm.vue";
import PostList from "@/Components/OldComponents/PostList.vue";
import axios from "axios";

export default {
  components:{
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 1,
    }
  },
  methods: {
    createPost(post) {
      //получаем пост из дочернего элемента PostForm
      this.posts.push(post);

    },
    removePost(post){
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    async fetchPosts(){
      try{
        console.log("startFetch")
        // используем библиотеку axois для запроса на сервер, чтобы получить данные постов
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params:{
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPage = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.posts = response.data;
      }
      catch(e){
        alert("Error!!!")
      }
    },
    ChangePage(pageNumber){
      this.page = pageNumber;
    },
  },
  mounted() { // этот метод импользуется при жизненном цикле программы, вызывается после рендеринга компонентов, называется хуком
    this.fetchPosts();
  },
  computed:{ // это особое вычислительное свойство vue, можно использовать для люых операций, здесь использую для поиска, возвращаю новый массив
    searchPost(){
      return this.posts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  watch:{ // функция наблюдатель, смотрит изменения свойств, в нашем случае это page, создаем функцию с похожим именем и при изменении page будет срабатывать эта функция
    page(){
      this.fetchPosts();
    }
  }

}
</script>

<style>


</style>
