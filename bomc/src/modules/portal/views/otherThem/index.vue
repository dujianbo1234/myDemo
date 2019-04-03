<template>
  <div class="container">
      <HeaderTop></HeaderTop>
      <aside id="left-panel">
        <nav id="nav">
          <ul>
            <li class="active">
              <a class="active" href="javascript:;">
                 <i class="iconfont_tenant_r13 icon-chanpinfuwu"></i>
                <i class="icon-manage_fill iconfont"></i>
                <span class="menu-item-parent">应用列表</span>
              </a>
            </li>
            <li>
              <a class="" href="javascript:;">
                <i class="iconfont icon-yijianfankui"></i>
                <span class="menu-item-parent">工单服务</span>
              </a>
            </li>
            <li>
              <a class="" href="javascript:;">
                <i class="iconfont icon-xiaoxizhongxin"></i>
                <span class="menu-item-parent">消息中心</span>
              </a>
            </li>
            <li>
              <a class="" href="javascript:;">
                <i class="iconfont icon-team"></i>
                <span class="menu-item-parent">团队成员</span>
              </a>
            </li>
            <li>
              <a class="" href="javascript:;">
                <i class="iconfont icon-yijianfankui"></i>
                <span class="menu-item-parent">用户信息</span>
              </a>
            </li>
            <li>
              <a class="" href="javascript:;">
                <i class="iconfont icon-manager"></i>
                <span class="menu-item-parent">修改密码</span>
              </a>
            </li>
            <li>
              <a class="" href="javascript:;">
                <i class="iconfont icon-piechart-circle-fil"></i>
                <span class="menu-item-parent">组织管理</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <section>
        <Section></Section>
      </section>
  </div>
</template>

<script>
import { Section, HeaderTop } from './components'
export default {
  name: 'otherThem',
  components: { Section, HeaderTop }
}
</script>


<style rel="stylesheet/css" scoped>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
  .container{
        background: radial-gradient(closest-side at 50% 50%,#2065ac,#1c385e);
        width: 100%;
        height: 100%;
  }
ul{
  list-style: none;
}
#left-panel {
    width: 160px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 904;
    padding-top: 49px;
    color: #fff;
    display: block;
    min-height: 100%;
    -webkit-transform: translate(0) translateZ(0);
    transform: translate(0) translateZ(0);
    background: #142f4e;
    transition: .25s cubic-bezier(.1,.57,.1,1);
}
#left-panel nav {
    height: 100%;
}
#left-panel nav ul {
    width: 100%;
    padding-top: 45px;
    margin: 0;
    font-size: 13px;
    line-height: .5em;
    list-style: none;
}
#left-panel nav ul li {
    line-height: 34px;
    margin-bottom: 20px;
    padding: 0;
    position: relative;
    height: 36px;
}
aside nav ul li.active {
    color: #fff;
}
aside nav ul li.active, aside nav ul li:hover {
    background: rgba(108,164,205,.15);
}
#left-panel nav ul li a {
    line-height: 34px;
    height: 34px;
    font-size: 14px;
    padding: 0 25px;
    color: #6ca4cd;
    display: block;
    font-weight: 400;
    text-decoration: none!important;
    position: relative;
    overflow: hidden;
}
#left-panel nav ul li a>i {
    font-size: 22px!important;
    line-height: 37px;
}
#left-panel nav ul li a .menu-item-parent {
    position: absolute;
    left: 55px;
    line-height: 34px;
}
aside nav ul li a .menu-item-parent {
    min-width: 45px;
    overflow: hidden;
}
aside nav ul .active>a {
    color: #fff!important;
    position: relative;
}
aside nav ul li.active:before {
    content: "";
    width: 5px;
    height: 100%;
    background: #1eb9ee;
    position: absolute;
    left: 0;
    top: 0;
}

</style>
