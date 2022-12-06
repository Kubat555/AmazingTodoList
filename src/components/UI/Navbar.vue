<template>
    <div class="navbar">
        <div class="navbar__btns">
            <MyButton @click="$router.push('/')" style="margin-right: 15px;">Главная</MyButton>
            <MyButton @click="$router.push('/Posts')">Посты</MyButton>
        </div>
    </div>
</template>

<script>
import router from '@/Router/router';

    export default {
        
    }
</script>

<style scoped>
.navbar{
    height: 50px;
    background-color: teal;
    box-shadow: 2px 2px 4px grey;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: center;
}
.navbar__btns{

}
</style>