<template>


<!-- 组别成员页面 -->
<div class="bigBox">
  
  <!-- 侧边导航栏 组别成员无账号管理选项 -->
<div class="nav">
    <el-col >
      <div class="header"> <span class="circle">
         <el-icon ><Monitor /></el-icon>
      </span>     
      <h5 class="nav-header">运营组</h5></div>
     
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >  <el-menu-item >
        
           <span><el-icon color="blue"><HomeFilled /></el-icon>首页</span>
        </el-menu-item>
        <el-sub-menu >
          <template #title>
           
            <span><el-icon><User /></el-icon>考核管理
            </span>
          </template>
          <el-menu-item class="menu-item">人员管理</el-menu-item>
            <el-menu-item class="menu-item">考核管理</el-menu-item>        
            <el-menu-item class="menu-item">预约管理</el-menu-item>
            <el-menu-item class="menu-item">公告设置</el-menu-item>
          
        </el-sub-menu>
        <el-sub-menu >
          <template #title>
           
            <span > <el-icon><Message /></el-icon>信息管理</span>
          </template>
        <el-menu-item class="menu-item">团队介绍</el-menu-item>
            <el-menu-item class="menu-item">组别介绍</el-menu-item>      
            <el-menu-item class="menu-item">项目介绍</el-menu-item>
            <el-menu-item class="menu-item">精选推文</el-menu-item>
        </el-sub-menu>
   
       
      </el-menu>
    </el-col>
</div>


<!-- 右上不变的全局 -->
<div class="content">

  <div class="blue"></div>

  <!-- 右边横向tab栏 -->
  <div class="sub-nav">
    <div class="nav-left"></div>
    <span><el-icon><ArrowLeftBold /></el-icon></span>
    <span>首页</span>
    <span>团队介绍</span>
    <div class="nav-right">
      <span><el-icon><ArrowRightBold /></el-icon></span>
      <span class="update-box"><el-icon class="update"><Refresh /></el-icon>  刷新</span>
    </div>
  </div>
</div></div>
</template>


<script >



</script>



<style lang="css" scoped>

.sub-nav span{
  cursor: pointer;
}


.bigBox{
  display: flex;
  
}

.circle{
  height: 30px;
  width: 30px;
  border-radius: 50cqb;
  background-color: #006eff;
  justify-content: center;
  display: flex;
  align-items: center;
  color: white;
}

.header{
  margin-left: 20px;
  width: 100px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content:space-between;
  
}

.nav-header{
  font-size: 22px;
  color:#006eff;
}

span{
  width: 300px;
   font-size: 15px;
  color: #778187;
}
span:hover {
 color:#006eff;
}

.menu-item:hover{
 color:#006eff;

}

.menu-item{
  font-size: 15px;
  color: #778187;
  background-color: #f7f7f7
}
.nav{
  width: 20%;
}

.content{
width: 80%;
height: 500px;
background-color: #fff;
}

.blue{
  width: 100%;
  height: 60px;
  background-color: #006eff;
}

.sub-nav{
   margin-top: 2px;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
}

.nav-left{
  float: left;
}

.nav-right{
  float:right
}

.sub-nav span{

  font-size: 17px;
  padding:15px;
  height: 50px;
  width: 50px;
  line-height: 50px;
 /* display: inline-block; */
  border-left: 0;
  border-right:1px solid #e4e4e4;
}


.update{
padding-right: 10px;
font-size: 17px;

}

</style>