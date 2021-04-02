<template>
  <div id="empty">
    <img class="empty-img" src="~assets/img/common/empty.svg" alt="">
    <div class="empty-text">这里什么都没有</div>
  </div>
</template>

<script>
export default {
  name: "Empty"
}
</script>

<style scoped>
  #empty{
    width: 100%;
    height: 100vh;
    text-align: center;

  }
  .empty-img{
    margin-top: 100px;
  }
  .empty-text{
    color: var(--color-hint-text);
  }
</style>