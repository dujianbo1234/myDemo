<template>
  <section class="createPage app-container">
    <div class="contentArea">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane
          v-for="(item,index) in moduleList"
          :key="index"
          :label="item.procDefCategory"
          :name="index+''"
        >
          <ul class="detailsList">
            <li
              v-for="(itemChild,index) in item.list"
              :key="index"
              class="listItem"
              @click="toCreatePage(itemChild)"
            >
              <div class="iconBg">
                <span v-if="itemChild.name == '问题管理流程'" class="iconfont flowIcon">&#xe646;</span>
                <span v-if="itemChild.name == '事件管理流程'" class="iconfont flowIcon">&#xe644;</span>
                <span v-if="itemChild.name == '变更管理流程'" class="iconfont flowIcon">&#xe63a;</span>

                <svg-icon v-if="itemChild.name == '任务管理流程TA'" icon-class="icon1" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '作业计划管理'" icon-class="icon2" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '值班管理ZB'" icon-class="icon3" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '公告管理'" icon-class="icon4" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '省-地两级协作管理'" icon-class="icon5" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '集团-省两级协作管理'" icon-class="icon6" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '协调单XT'" icon-class="icon7" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '需求管理流程'" icon-class="icon8" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '业务处理流程'" icon-class="icon9" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '能力申请'" icon-class="icon10" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '能力开发'" icon-class="icon11" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '网络策略管理'" icon-class="icon14" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '机房出入管理'" icon-class="icon15" class="svgFont"/>

                <svg-icon v-if="itemChild.name == '发布管理流程'" icon-class="icon17" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '非功能需求管理流程'" icon-class="icon18" class="svgFont"/>
                <svg-icon v-if="itemChild.name == '开发测试流程'" icon-class="icon19" class="svgFont"/>

                <svg-icon v-if="itemChild.name == '资源申请流程'" icon-class="icon23" class="svgFont"/>
              </div>
              <p class="flowName">
                <span>{{ itemChild.name }}</span>
              </p>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>
<script>
import * as service from "@/modules/oms/api/oms/myDesk/createPage";
import * as eventFormService from "@/modules/oms/api/oms/eventForm";

export default {
  data() {
    return {
      activeName: "0",
      moduleList: [],
      userId: ""
    };
  },
  mounted() {
    this.userId = this.$store.getters.userId;
    this.queryData();
  },
  methods: {
    queryData() {
      service.queryData().then(async res => {
        var getData = res.result
          .reduce(
            (arr, { procDefCategory }) =>
              void (
                !arr.includes(procDefCategory) && arr.push(procDefCategory)
              ) || arr,
            []
          )
          .map(procDefCategory => ({
            procDefCategory,
            list: res.result.filter(v => v.procDefCategory === procDefCategory)
          }));

        this.moduleList = getData;
      });
    },
    toCreatePage(itemChild) { // 点击创建工单
      const params = {
        procDefId: itemChild.procDefId,
        isStart: true
      };
      service.jumpPage(params).then(res => {
        let path = res.result[0].url;
        let procDefId = res.result[0].procDefId;

        const params = {
          procDefId: procDefId,
          startUserId: this.userId,
          status: 1,
          variable: [
            {
              key: "startUserId",
              value: this.userId
            },
            {
              key: "type",
              value: "1"
            }
          ]
        };

        eventFormService.createProcessInstance(params).then(res => { // 创建流程实例
          let procInstId = res.procInstId;
          let taskId = res.taskId;
          let id = res.workListId;
          let createTime = res.createTime;
          this.removeTag();
          this.$router.push({
            path: `${path}/${procDefId}/${procInstId}/${taskId}`,
            query: { previousPath: "/myDesk/createPage", tabActive: "form", id: id, createTime: createTime }
          });
        });
      });
    },
  }
};
</script>
<style lang="scss">
.createPage {
  .el-tabs--border-card > .el-tabs__content {
    padding: 0 15px;
  }
  .contentArea {
    margin: 0 auto;
    padding-top: 10px;
  }
  .titleList {
    .listItem {
      float: left;
      width: 200px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background: #399ccf;
    }
  }
  .detailsList {
    width: 100%;
    margin: 0 auto;
    height: 600px;
    .listItem {
      margin: 20px 0 0 50px;
      float: left;
      width: 189px;
      height: 170px;
      border-radius: 4px;
      background: #f2f2f2;
      text-align: center;
      cursor: pointer;
    }
    // .listItem:hover {
    //   background: #409eff;
    //   color: #fff;
    // }
    .svgFont {
      margin-top: 35px;
      margin-bottom: 10px;
      font-size: 50px;
    }
    .iconBg {
      margin: 30px auto 0;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: #42b983;
    }
    .flowIcon {
      display: inline-block;
      margin: 15px 0 0 3px;
      color: #fff;
      font-size: 30px;
    }
    .flowName {
      margin-top: 10px;
    }
  }
}
</style>

