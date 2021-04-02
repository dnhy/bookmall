<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">个人中心</div>
      <div slot="right">设置</div>
    </nav-bar>
    <profile-base-info/>
    <profile-record-bar/>
    <ProfileIndent/>
    <ProfileServer/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import ProfileBaseInfo from "@/views/profile/profileCompos/ProfileBaseInfo";
  import ProfileRecordBar from "@/views/profile/profileCompos/ProfileRecordBar";
  import ProfileIndent from "@/views/profile/profileCompos/ProfileIndent"
  import ProfileServer from "@/views/profile/profileCompos/ProfileServer";

  export default {
    name: "Profile",
    components:{
      NavBar,
      ProfileBaseInfo,
      ProfileRecordBar,
      ProfileIndent,
      ProfileServer
    }
  }
</script>

<style scoped>
  #profile{
    background-color: #efefef;
    height: calc(100vh  - 49px);
  }
  .nav-bar{
    background-color: #fff;
  }
</style>