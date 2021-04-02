<template>
  <div class="record-bar">
    <div class="record-item">
      <div class="num">1</div>
      <div>我发布的</div>
    </div>
    <div class="record-item">
      <div class="num">2</div>
      <div>我买到的</div>
    </div>
    <div class="record-item">
      <div class="num">3</div>
      <div>我收藏的</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilerecordBar"
}
</script>

<style scoped>
  .record-bar{
    display: flex;
    background-color: #fff;
    padding: 15px 0;
    margin: 5px 5px 0 5px;
    border-radius: 10px;
  }
  .record-item{
    flex: 1;
    text-align: center;
  }
  .record-item .num{
    margin-bottom: 5px;
  }
</style>