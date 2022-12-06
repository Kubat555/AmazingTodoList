<template>
    <div class="page__wrapper">
        <div class="page"
        v-for="pageNumber in pages"
        :key="pageNumber"
        :class = "{
            'current-page': pageNumber === currentPage
        }"
        @click="$emit('changePage', pageNumber)"
        >{{pageNumber}}</div>
    </div>
</template>

<script>
    export default {
        name:"PageWrapper",
        props:{
            pages:{
                type: Number,
                required: true
            },
            currentPage:{
                type: Number,
                required: true
            }
        }
    }
</script>

<style  scoped>
.page__wrapper{
    display: flex;
    justify-content: center;
    margin: 30px 0;
}
.page{
    padding: 10px;
    border: 1px solid gray;
}
.current-page{
    border: 2px solid rgb(14, 128, 118);
    background-color:rgb(163, 230, 224);
}
</style>