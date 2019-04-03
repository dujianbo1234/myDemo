<template>
      <header id="header" class="header">
          <div id="logo-group" class="click">
            <span id="logo">
              <a class="" href="javascript:;"><img src="@/assets/images/u4.png"></a>
            </span>
          </div>
          <div>
            <div style="float: right;">
              <a class="user-group ant-dropdown-trigger" id="user" href="javascript:;" style="min-width: 125px;"> 
                <!-- <img src="/tenant/userimages/default.jpg?1535080101473" class="profile_img"> -->               
                <el-dropdown>
                      <span class="el-dropdown-link">
                        <i class="icon-user iconfont"></i>
                        <span class="user-name">cnmobile<i class="el-icon-arrow-down el-icon--right"></i></span>
                      </span>
                      <el-dropdown-menu slot="dropdown" width="115">
                        <el-dropdown-item>退出</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
    
                </a>
              </div>
              <ul>
                <li>
                  <a class="menu-list ant-dropdown-trigger" href="#/dashboard">
                    <span class="ant-badge" title="0"><i class="icon-home iconfont"></i><!-- react-empty: 502 --></span>
                  </a>
                </li>
                <li>
                  <a class="menu-list ant-dropdown-trigger" href="javascript:;">
                    <i class="icon-fund iconfont"></i>
                  </a>
                </li>
                <li>
                  <a class="menu-list ant-dropdown-trigger" href="javascript:;">
                    <i class="icon-xiaoxizhongxin iconfont"></i>
                  </a>
                </li>
                <li>
                  <a class="menu-list ant-dropdown-trigger" href="#/dashboard">
                    <i class="icon-piechart-circle-fil iconfont"></i>
                  </a>
                </li>
                <li>
                  <a class="menu-list ant-dropdown-trigger">
                    <i class="icon-computer iconfont"></i>
                  </a>
                </li>
              </ul>
            </div>
      </header>
</template>

<script>

export default {
  name: 'HeaderTop',
}
</script>


<style rel="stylesheet/css" scoped>
*{
  margin:0;
  padding:0;
}
  #header{
    background: #1f528c;
    box-shadow: 0 3px 25px #1c385e;
    height: 55px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 905;
  }
  #header #logo-group {
    float: left;
    width: 160px;
    height: 55px;
    position: relative;
    z-index: 99;
}
#header #logo-group #logo {
    margin: 10px 0 0 20px;
    display: block;
    height: 32px;
    width: 98px;
    float: left;
}
img {
    border: 0;
    vertical-align: middle;
    max-width: 100%;
}
ul{
  list-style: none;
}
#header .user-group {
    float: right;
    margin-right: 20px;
    padding: 0 15px;
    color: #2db7f5;
    position: relative;
    line-height: 53px;
}
#header .menu-list {
    float: right;
    color: #2db7f5;
    padding: 15.5px 12px;
    margin-right: 8px;
    line-height: 1;
}
.ant-badge {
    position: relative;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
}
.iconfont {
    font-size: 24px;
}
#header .menu-list:hover {
    background: #5dbbff;
    color: #fff;
}
.username{
  /*vertical-align: middle;*/
}
.el-dropdown{
   color: #2db7f5;
   padding: 0 15px;
}
.el-dropdown-link>.iconfont{
  font-size: 18px;
}
#header .el-dropdown:hover {
    background: #5dbfff;
    color: #fff;
}
.el-dropdown-menu.el-popper{
  width:115px;
  text-align:center;
}

</style>
