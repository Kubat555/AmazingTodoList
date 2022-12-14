<template>
    <Navbar></Navbar>
    <div class="app">
        <RouterView></RouterView>
    </div>
</template>

<script>
import Navbar from '@/Components/UI/Navbar.vue';

export default {
    components: { Navbar }
}
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,400;1,300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,400;0,500;1,300&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
  background-color: #ebf3fa;
}

.app {
    margin-left:4%;
    font-family: 'Montserrat Alternates', sans-serif;
}
/*Обнуление*/
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap");
* {
  padding: 0;
  margin: 0;
  border: 0;
}

*, *:before, *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

:focus, :active {
  outline: none;
}

a:focus, a:active {
  outline: none;
}

nav, footer, header, aside {
  display: block;
}

html, body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  font-size: 14px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

input, button, textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}

button {
  cursor: pointer;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

a, a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

.btn{
  transition: 0.5s ease-in-out;
  background-color: #ffa47d;
  border-radius: 5px;
  color: white;
}
.btn:hover {
  transition: 0.5s ease-in-out;
  background: #ff844b;
}
</style>