<template>
  <div>
    <h1>Welcome!</h1>
    <h1>{{$store.state.likes}}</h1>
    <MyButton @click="$store.commit('LikePlus')">+</MyButton>
    <div class="ss" >
      <PageWrapper current-page="2" pages="3"></PageWrapper>
    </div>
  </div>
</template>

<script>

export default {

}

</script>

<style  scoped>

</style>