<template>
    <div class="navbar">

      <ul>
        <li><a @click="$router.push('/')" ><img src="./Icons/home.png" alt=""></a></li>
        <li><a @click="$router.push('/posts')"><img src="./Icons/List.png" alt=""></a></li>
        <li><a @click="$router.push('/weather')"><img src="./Icons/clouds.png" alt=""></a></li>
      </ul>
    </div>
</template>

<script>
import router from '@/Router/router';

    export default {
        
    }
</script>

<style scoped>

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 5%;
  background-color: #416e85;
  position: fixed;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  box-shadow: 5px 0px 30px rgba(0, 0, 0, 0.3);
}

li a {
  display: block;
  color: #000;
  padding: 15px 16px;
  text-decoration: none;
}

li img{
  height: 40px;
  width: 40px;
}

li a.active {
  background-color: #4CAF50;
  color: white;
}

li a:hover:not(.active) {
  background-color: #555;
  color: white;
}

</style>