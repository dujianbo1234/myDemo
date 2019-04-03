<template>
  <div class="monitor-container">
    <div class="RightRow1">
      <el-card>
        <el-form :inline="true" label-position="right" label-width="100px">
          <!-- <el-form-item label="任务名称">
           <el-input  v-model.trim="formData.task_name" placeholder="请输入任务名称"></el-input>
          </el-form-item> -->
           <span class="search_div">
             <label>任务名称</label>
             <el-input id="input-test" type="text" v-model.trim="formData.task_name"  @keyup.enter.native="queryTask" placeholder="请输入任务名称"></el-input>
           </span>
          <el-button class="btn_query" type="success"@click="queryTask" >
             <span>查询</span>
          </el-button>
          <el-button class="btn_reset"  @click="formData.task_name=''">
             <span>重置</span>
          </el-button>
          <!-- <button class="btn_handle" @click="queryTask">查询</button>
          <button class="btn_reset" @click="formData.task_name=''">重置</button>  v-if="formData.length>3"-->
             <span class="btn_set" v-if="formData.length>3">
                <i class="el-icon-d-arrow-right btn_rote" style="color: #42B983;"></i>
             </span>
             <span class="btn_set">
                <i class="el-icon-setting" style="color: #42B983;"></i>
             </span>
            <!--  <div class="tag-top">  
                 css3气泡框  
             </div> -->
        </el-form>
      </el-card>
    </div>
    <div class="RightRow1">
      <el-card>
        <el-row class="btnInfo">
          <el-col :span='18'>
            <button class="btn_add" @click="aeTask('add')">
              <span>新增任务</span>
            </button>
            <button class="btn_other" @click="optTask('start',multipleSelection)">
                <span>批量开始</span>
            </button>
            <button class="btn_other" @click="optTask('stop',multipleSelection)">
                 <span>批量停止</span>
            </button>
            <button class="btn_other" @click="deleteTask(multipleSelection)">
                 <span>批量删除</span>
            </button>
          </el-col>
        </el-row>
        <el-table ref="multipleTable1" :data="dataList" tooltip-effect="dark" :header-cell-style="cellClass" @selection-change="handleSelectionChange" :row-style="rowClasss" :cell-style="rowClasss" @row-click="see">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="task_name" label="任务名称">
          </el-table-column>
          <el-table-column prop="create_user_id" label="创建者">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
            <template slot-scope="scope">{{scope.row.create_time | dateFilter}}</template>
          </el-table-column>
          <el-table-column label="状态" >
            <template slot-scope="scope">
              <div v-if="scope.row.task_status==true">
                <img :src="runImg" alt="启动">
              </div>
              <div v-if="scope.row.task_status==false">
                 <img :src="stopImg" alt="停止">
              </div>
            </template>
          </el-table-column>
          <el-table-column label="任务操作">
            <template slot-scope="scope">
             <el-button type="text" class="handle_text" size="small" @click.stop="aeTask('edit',scope.row)">修改</el-button>
              <el-button type="text" class="handle_text" size="small" @click.stop="deleteTask(scope.row.task_id)">删除</el-button>
              <el-button v-if="!scope.row.task_status" el-button type="text" size="small" @click.stop="optTask('start',scope.row.task_id)" class="handle_text">
                  <!-- <img :src="runImg" alt="启动"> -->
                  <!-- <el-tooltip content="启动" placement="top" effect="light" class="item">
                    <span class="iconfont" style="color: rgba(95,195,150,1);">&#xe603;</span>
                  </el-tooltip> -->
                  启动
              </el-button>
              <el-button v-if="scope.row.task_status" el-button type="text" size="small" @click.stop="optTask('stop',scope.row.task_id)" class="handle_text">
                  <!-- <img :src="stopImg" alt="停止"> -->
                  停止
                  <!-- <el-tooltip class="item" effect="light" content="停止" placement="top">
                    <span class="iconfont" style="color: rgba(95,195,150,1);">&#xe60a;</span>
                  </el-tooltip> -->
              </el-button>
              <el-button el-button type="text" size="small" @click.stop="jump(scope.row.task_id)"class="handle_text">
                  <!-- <img :src="followImg" alt="跟踪"> -->
                 <!--  <el-tooltip class="item" effect="light" content="跟踪" placement="top">
                 <span class="iconfont" style="color: rgba(95,195,150,1);">&#xe60b;</span>
                                 </el-tooltip> -->
                      跟踪
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pageLi" align="right" @size-change="taskSizeChange" @current-change="taskCurrentChange" :page-sizes="[10,20,40,100]"   :page-size="taskPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="taskPage.totalItems" :pager-count="5">
        </el-pagination>
      </el-card>
    </div>
    <!-- 新增任务 -->
    <el-dialog  :visible.sync="addDialog" width='79%' id="dialog" :close-on-click-modal="false" @close="closeDialog('addForm');tmpType='8'" @open="addOpen">
      <div class="monitor-obj" style="padding:10px 20px">
        <el-tabs v-model="activeName" @tab-click="getCollector(0)">
          <el-tab-pane name="first">
            <span slot="label" :class="{ label_pane:activeName==='first' }">选择模板</span>
            <el-form :inline="true" :rules="rules" style="text-align:left;" :model="addParams" class="demo-form-inline" label-position="left" label-width="70px" size="medium" ref="addForm">
              <el-form-item prop="task_name" class="add_commpont inputTask">
                <i style="color:red">*</i>
               <label>任务名称:</label>
               <el-input v-model="addParams.task_name"  placeholder="请输入任务名称"></el-input>
               <!-- <input type="text" v-model="addParams.task_name" placeholder="请输入任务名称"> -->
              </el-form-item>
              <el-form-item prop="task_name" class="add_commpont" style="padding-left: 10px;">
               <label>查看模板:</label>
               <input type="text" v-model="formData.template_name" placeholder="请输入模板名称"@keyup.enter.native="getTmps">
               <el-select  style="width: 224px;margin-right: 10px;" v-model="formData.template_type" placeholder="请选择">
                  <el-option v-for="item in templates" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
               </el-select>
               <input type="text" v-model.trim="formData.group"placeholder="请输入分组信息" @keyup.enter.native="getTmps">
               <button  @click.prevent="getTmps" class="mrl"><span>搜索</span></button>
              </el-form-item>
                <el-row style="width:100%">
                  <el-col :span="10" style="height: 380px;overflow-y: auto;">
                    <div class="grid-content bg-purple add_table">
                      <el-table ref="multipleTable2" :data="tmpData" tooltip-effect="dark"  :header-cell-style="rowClass" style="margin-bottom: 10px;" :cell-style="rowClasss">
                        <el-table-column label="" width="55">
                          <template slot-scope="scope">
                            <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index,scope.row)">
                              <span style="padding: 0px;margin: -5px"></span>
                            </el-radio>
                          </template>
                        </el-table-column>
                        <el-table-column prop="template_name" label="模板名称">
                        </el-table-column>
                        <el-table-column label="模板类型">
                          <template slot-scope="scope">
                            {{scope.row.template_type | moduleTypeFilter}}
                          </template>
                        </el-table-column>
                        <el-table-column label="分组">
                          <template slot-scope="scope">
                            {{scope.row.group | moduleTypeFilter}}
                          </template>
                        </el-table-column>
                       <!--  <el-table-column label="查看详情">
                         <template slot-scope="scope">
                           <el-button type="text" size="small" @click.stop="seeTmp(scope.row)">查看</el-button>
                         </template>
                       </el-table-column> -->
                       </el-table>
                       <el-pagination align="right" @size-change="tmpSizeChange" @current-change="tmpCurrentChange"   :current-page="tmpPage.currentPage"  :page-size="tmpPage.pageSize"   layout="total, prev, pager, next, jumper" :total="tmpPage.totalItems" :pager-count="5">
                        </el-pagination>
                    </div>
                  </el-col>
                  <el-col :span="13" style="height: 380px;overflow-x: hidden;overflow-y: auto;">
                    <div class="grid-content bg-purple">
                      <Clog  :type.sync="tmpType" :quotaData="list" :selectData="tmpDetails" ref="clog"></Clog>
                    </div>
                  </el-col>
                </el-row>
            </el-form>
          </el-tab-pane>
          <!--推送配置 -->
           <el-tab-pane name="transit" v-if="transit" :disabled="addParams.task_name.length===0 || curRadio.length===0">
              <span slot="label"  :class="{ label_pane:activeName==='transit' }">推送配置</span>
              <el-form :inline="true" style="text-align:left;" class="demo-form-inline" label-position="left" label-width="70px" size="medium">
              <el-form-item  class="add_commpont">
               <label>推送选项:</label>
               <el-select  style="width: 224px;margin-right: 10px;" v-model="push_position" placeholder="请选择">
                  <el-option v-for="item in push_positions" :key="item.push_position" :label="item.text" :value="item.push_position">
                  </el-option>
               </el-select>
              </el-form-item>
              <el-form-item class="add_commpont" v-if="push_position!=0">
                  <label>推送地址:</label>
                   <span :class="{ kafka_style: index>0 }" v-for="(item,index) in kafka_arr">
                      <input type="text" v-model="item.flume_ips" placeholder="中继的flume的IP和端口">
                      <input type="text" v-model="item.kafka_ips" placeholder="目标kafka集群的IP和端口">
                      <input type="text" v-model="item.topic" placeholder="kafka集群的topic">
                      <el-tooltip v-if="push_position!=0&&index == kafka_arr.length-1" class="item" effect="light" content="添加" placement="top">
                        <span class="iconfont"  @click.stop="addkafka" style="color: rgba(95,195,150,1);cursor:pointer">&#xe64d;</span>
                      </el-tooltip>
                      <el-tooltip class="item" effect="light" content="删除" placement="top">
                        <span class="iconfont"@click.stop="remo(index)" style="color: rgba(95,195,150,1);cursor:pointer">&#xe64b;</span>
                      </el-tooltip>
                   </span>
             </el-form-item>
            </el-form>
           </el-tab-pane>
          <el-tab-pane  name="second" v-if="curRadio.length!==0"" :disabled="addParams.task_name.length===0 || curRadio.length===0">
            <span slot="label"  :class="{ label_pane:activeName==='second' }">采集对象</span>
            <el-form :inline="true" style="text-align:left;" class="demo-form-inline" label-position="left" label-width="80px" size="medium">
              <div class="search_input" style="padding: 14px 0;position: relative;">
               <span style="margin-left: 1rem;">
                 <label>对象名称:</label>
                   <input style="width:260px;height:34px;border-radius:4px;border:1px solid rgba(220,223,230,1);outline: none;padding: 0 6px;" placeholder="请输入指标名称" v-model="search">
                 </span>
                 <span style="position: absolute;right: 0;top: 1.3rem;">
                  已勾选<span style="width:10px;height:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(66,185,131,1);line-height:20px;padding: 0 10px;">{{objSelection.length}}</span>个
                  </span>
              </div>
            <!--   <el-form-item label="对象名称">
              <el-input v-model="search" placeholder="请输入对象名称"></el-input>
            </el-form-item> -->
            <!--   <el-button type="primary" class="mrl"  @click="getTmps()">搜索</el-button> -->
            <el-table ref="multipleTable2" :data="filterTabledataend" tooltip-effect="dark" border :header-cell-style="rowClass" @selection-change="quotaSelection" style="margin-bottom: 10px;" :row-key="getRowKeys" :cell-style="cellsClass">
              <el-table-column type="selection" width="55" :reserve-selection="true">
              </el-table-column>
              <el-table-column prop="resource_id" label="资源对象ID">
              </el-table-column>
              <el-table-column prop="resource_name" label="资源对象名称">
              </el-table-column>
              <el-table-column prop="engine_room" label="所在机房">
              </el-table-column>
              <el-table-column prop="ip_address" label="IP地址">
              </el-table-column>
            </el-table>
              </el-form>
            <el-pagination align="right" @size-change="localSizeChange" @current-change="localCurrentChange" :current-page="localPage.currentPage" :page-sizes="[ 2,5]" :page-size="localPage.pageSize" layout=" prev, pager,next,total, sizes, jumper" :total="localPage.totalItems" :pager-count="5">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer" align='center' style="position: relative;text-align: right;">
        <div v-if="activeName==='first' || activeName==='transit'" v-for="item of currentData 
        "class="search_input" style="padding: 14px 0">
          <span style="position: absolute;left:16px;bottom: 11px;"v-if="activeName==='first'">
            <label style="margin-left: 1rem;font-size: 15px;">
               已选择模板:
            </label>
           <input style="width:260px;height:34px;border-radius:4px;border:1px solid rgba(220,223,230,1);outline: none;padding: 0 6px;" type="text" v-model="item.template_name" :disabled="true">
          </span>
           <span style="position: absolute;right: 4.6rem;bottom: 11px;">
              <el-button @click="addDialog=false;activeName='first';transit = false;tmpType='8'">取消 </el-button>
                 <el-button type="primary":disabled="addParams.task_name.length===0 || curRadio.length===0" @click.stop="getCollector(1)"style="background: #42b983">下一步</el-button>
           </span>
        </div>
         <el-button style="margin-right: 1rem;background: #42b983;" type="primary" v-if="activeName==='second'" @click="increase('addForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 任务详情-->
    <el-dialog title="" :visible.sync="detailsDialog" width='62%' id="dialog" :close-on-click-modal="false" @close="detailsDialog=false;queryTask();activeName_detail='three';tmpData=[]">
      <div class="monitor-obj" style="padding:10px 20px">
         <el-tabs v-model="activeName_detail" @tab-click="handleClick_detail">
            <el-tab-pane  name="three">
              <span class="sp"><span>任务详情</span></span>
               <div class="logAdd-obj">
                <div class="log_div">
                  <span style="margin-left: 1rem;">
                    <label>任务名称:</label>
                       <input :disabled="true" v-model="detailsData.task_name">
                  </span>
                </div>
              </div>
               <span slot="label"  :class="{ label_pane:activeName_detail==='three' }">查看模板</span>
               <Clog  :type.sync="tmpType" :quotaData="tmpData[0]" :selectData="tmpData[0]" ref="clog1"></Clog>
            </el-tab-pane>
          <!--配置详情 -->
             <el-tab-pane name="transit_detail" v-if="tmpType=='log'">
              <span slot="label"  :class="{ label_pane:activeName==='transit_detail' }">推送配置</span>
              <el-form :inline="true" style="text-align:left;" class="demo-form-inline" label-position="left" label-width="70px" size="medium">
              <el-form-item  class="add_commpont" v-if="detailsData.push_position!=null">
               <label>推送选项:</label>
               {{detailsData.push_position | pushFilter}}
              </el-form-item>
              <el-form-item class="add_commpont" v-if="detailsData.push_position!=0&&detailsData.push_position!=null">
                  <label>推送地址:</label>
                   <div v-for="(item,index) in detailsData.kafka_config">
                      <input type="text" :title="item.flume_ips" v-model="item.flume_ips" :disabled="true">
                      <input type="text" :title="item.kafka_ips" v-model="item.kafka_ips" :disabled="true">
                      <input type="text" :title="item.topic" v-model="item.topic" :disabled="true">
                   </div>
             </el-form-item>
            </el-form>
           </el-tab-pane>
            <el-tab-pane  name="four">
              <span slot="label"  :class="{ label_pane:activeName_detail==='four' }">采集对象</span>
                   <el-form :inline="true" style="text-align:left;" class="demo-form-inline" label-position="left" label-width="80px" size="medium">
                  <div class="search_input" style="padding: 14px 0;">
                   <span>
                     <label>对象名称:</label>
                       <input style="width:260px;height:34px;border-radius:4px;border:1px solid rgba(220,223,230,1);outline: none;padding: 0 6px;" placeholder="请输入指标名称" v-model="search">
                     </span>
                  </div>
                <!--   <el-form-item label="对象名称">
                  <el-input v-model="search" placeholder="请输入对象名称"></el-input>
                </el-form-item> -->
                <!--   <el-button type="primary" class="mrl"  @click="getTmps()">搜索</el-button> -->
                <el-table ref="multipleTable2" :data="collector_obj" tooltip-effect="dark" border :header-cell-style="rowClass" @selection-change="quotaSelection" style="margin-bottom: 10px;" :row-key="getRowKeys" :cell-style="cellsClass">
                  <el-table-column type="selection" width="55" :reserve-selection="true">
                  </el-table-column>
                  <el-table-column prop="ciid" label="资源对象ID">
                  </el-table-column>
                  <el-table-column prop="ciname" label="资源对象名称">
                  </el-table-column>
                  <el-table-column prop="location" label="所在机房">
                  </el-table-column>
                  <el-table-column prop="ip" label="IP地址">
                  </el-table-column>
                </el-table>
                  </el-form>
                <el-pagination align="right" @size-change="localSizeChange" @current-change="localCurrentChange" :current-page="localPage.currentPage" :page-sizes="[ 2,5]" :page-size="localPage.pageSize" layout=" prev, pager,next,total, sizes, jumper" :total="collector_obj.length" :pager-count="5">
                </el-pagination>
            </el-tab-pane>
          </el-tabs>
       <!--  <el-form :inline="true" style="text-align:left;" :model="detailsData" class="demo-form-inline" label-position="right" label-width="100px" size="medium" ref="detailForm">
         <el-form-item label="任务名称" prop="task_name">
           <el-input v-model="detailsData.task_name" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="资源类型" prop="resource_type">
          <el-input v-model="detailsData.resource_type" :disabled="true"></el-input>
        </el-form-item>
         <h3 style="text-align:left;margin: 10px 0">选择模板</h3>
         <hr style="margin-bottom: 10px;" />
         <el-table ref="multipleTable2" :data="tmpData" tooltip-effect="dark" border :header-cell-style="rowClass" style="margin-bottom: 10px;" :cell-style="rowClass">
           <el-table-column label="" width="55">
             <template slot-scope="scope">
               <el-radio :label="scope.$index" v-model="radio" :disabled="true">
                 <span style="padding: 0px;margin: -5px"></span>
               </el-radio>
             </template>
           </el-table-column>
           <el-table-column prop="template_name" label="模板名称">
           </el-table-column>
           <el-table-column label="模板类型">
             <template slot-scope="scope">
               {{scope.row.template_type | moduleTypeFilter}}
             </template>
           </el-table-column>
           <el-table-column label="查看详情">
             <template slot-scope="scope">
               <el-button type="text" size="small" @click.stop="seeTmp(scope.row)">查看</el-button>
             </template>
           </el-table-column>
         </el-table>
         <h3 style="text-align:left;margin: 10px 0">采集对象</h3>
         <hr style="margin-bottom: 10px;" />
         <el-table ref="multipleTable3" :data="collector_obj" tooltip-effect="dark" border :header-cell-style="rowClass" style="margin-bottom: 10px;" :cell-style="rowClass">
           <el-table-column type="selection" width="55" :selectable="selectable">
           </el-table-column>
           <el-table-column prop="ciid" label="资源对象ID">
           </el-table-column>
           <el-table-column prop="ciname" label="资源对象名称">
           </el-table-column>
           <el-table-column prop="location" label="所在机房">
           </el-table-column>
           <el-table-column prop="ip" label="IP地址">
           </el-table-column>
         </el-table>
         <el-pagination align="right" @size-change="localSizeChange" @current-change="localCurrentChange"   :current-page="localPage.currentPage" :page-sizes="[2,5]" :page-size="localPage.pageSize"   layout="total, sizes, prev, pager, next, jumper" :total="collector_obj.length">
         </el-pagination>
       </el-form> -->
      </div>
      <div slot="footer" class="dialog-footer" align='center'>
        <el-button @click="detailsDialog=false;queryTask();activeName_detail='three';tmpData=[]">关闭 </el-button>
      </div>
    </el-dialog>
  <!--   <Clog v-if="tmpDialog" :type="tmpType" :quotaData="list" :selectData="tmpDetails" ref="clog" @closeClog="closeClog"></Clog> -->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import server from '@/modules/collector/api/taskManage';
import * as tmpServer from '@/modules/collector/api/tmpManage';
import Clog from '../Clog.vue';
import runImg from '@/assets/images/run.png'
import stopImg from '@/assets/images/stop.png'
export default {
  components: {
    Clog
  },
  data() {
    let valid_name = (rule, value, callback) => {
        if (value.length > 64) {
          callback(new Error('长度不能超过64个字符'));
        } else {
          let reg = new RegExp("[`~!@#%$^&*()+=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；;：”“'。，、？\u4E00-\u9FA5 ]",'u');
          if (reg.test(value)) {
            console.log(111);
            callback(new Error('不能含有特殊字符、空格、汉字'));
          } else {
             console.log(value);
            callback();
          }
        }
      };
    return {
      transit: false,
      push_position: 0,
      kafka_arr: [
       {
          flume_ips: "",
          kafka_ips: "",
          topic: ""
       }
      ],
      push_positions: [
         {
           push_position: 0,
           text: "推送到默认位置"
         },
         {
           push_position: 1,
           text: "推送到默认位置和指定位置"
         },
         {
           push_position: 2,
           text: "仅推送到指定位置"
         }
      ],
      activeName_detail: "three",
      runImg: runImg,
      stopImg: stopImg,
      collector_obj: [],
      activeName1: '',
      radio: '',
      curRadio: '',
      activeName: 'first',
      addDialog: false,
      detailsDialog: false,
      multipleSelection: [],
      objSelection: [],
      detailsData: {},
      formData: {
        task_name: '',
        template_name: '',
        template_type: '',
        group: ""
      },
      rules: {
          task_name: [
           { validator: valid_name, trigger: 'blur' }
          ]
      },
      addParams: {
        task_name: '',
        template_id: '',
        collect_obj_ids: []
      },
      templates: [{
          id: "",
          name: "全部"
        },
        {
          id: 0,
          name: "平台资源模板"
        },
        /* {
           id: 1,
           name: "网络设备模板"
         },*/
        {
          id: 2,
          name: "中间件模板"
        },
        {
          id: 3,
          name: "日志模板"
        },
        {
          id: 4,
          name: "数据库模板"
        },
        {
          id: 5,
          name: "自定义模板"
        }
      ],
      dataList: [],
      obj_list: [],
      tableDataEnd: [],
      taskPage: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0
      },
      localPage: {
        pageSize: 5,
        currentPage: 1,
        totalItems: 0
      },
      tmpPage: {
        pageSize: 5,
        currentPage: 1,
        totalItems: 0
      },
      currentData: [],
      dialogTilte: '',
      dialogType: '',
      tmpData: [],
      tmpDetails: {},
      tmpType: '',
      resource: '',
      search: "",
      list: {},
      atooltip: 'tooltipclass',
      saveBtn: false
    }
  },
  filters: {
    fmtStatus: function(b) {
      return b ? '运行' : '停止';
    },
    pushFilter: function(a) {
      let types = ['推送到默认位置', '推送到默认位置和指定位置', '仅推送到指定位置'];
      return a = types[a]
    }
  },
  created() {
    this.activeName1 = this.$route.name;
  },
  mounted() {
    this.queryTask();
  },
  computed: {
    ...mapState({
      userName: state => state.user.name
    }),
    filterTabledataend: function() {
      var that = this;
      return this.tableDataEnd.filter((item) => {
        if (item.resource_name) {
          return item.resource_name.match(that.search)
        }
      });
    },
    classObject: function(){
       return {
          kafka_style: this.kafka_arr.length != 0
       }
    }
  },
  methods: {
    addkafka(){
      this.kafka_arr.push({
         flume_ips: "",
         kafka_ips: "",
         topic: ""
      })
      for(let i=0;i<this.kafka_arr.length;i++){

      }
    },
    remo(index){
      if(this.kafka_arr.length > 1)
      {
          this.kafka_arr.splice(index,1)
      }else{
          this.$message({type:'error',message:"至少添加一组推送地址"})
      }
    },
    handleClick_detail(tab, event){
        console.log(tab, event);  
    },
    jump(id) {
      this.$router.push({ name: 'trackTask', params: { task_id: id } })
    },
    getRowKeys(row) {
      return row.resource_id;
    },
    seeTmp(row) {
      this.list = row;
      if (row.resource_type) {
        tmpServer.query_resource().then(res => {
          for (let i = 0; i < res.length; i++) {
            if (row.resource_type === res[i].uri) {
              this.list.resource_type = res[i].uri_alias
            }
          }
        });
      }
      let types = ['platform', '', 'middleware', 'log', 'database', 'customize'];
      this.tmpDetails = row;
      this.tmpType = types[row.template_type];
      if (row.template_type === 1) {
        this.tmpType = 'platform';
      }
    },
    searchTmp() {
      this.getTmps();
    },
    getCurrentRow(index, row) {
      if( row.template_type == 3 ){
        this.transit = true
      }else{
        this.transit = false
      }
      this.curRadio = 0;
      this.currentData = [];
      this.currentData.push(row);
      if (row.resource_type !== undefined && row.resource_type !== null) {
        let idx = row.resource_type.lastIndexOf(".");
        this.resource = row.resource_type.substring(idx + 1, row.resource_type.length);
      }
      this.addParams.template_id = row.template_id;
      //处理详情
      this.list = row;
      if (row.resource_type) {
        tmpServer.query_resource().then(res => {
          for (let i = 0; i < res.length; i++) {
            if (row.resource_type === res[i].uri) {
              this.list.resource_type = res[i].uri_alias
            }
          }
        });
      }
      let types = ['platform', '', 'middleware', 'log', 'database', 'customize'];
      this.tmpDetails = row;
      this.tmpType = types[row.template_type];
      if (row.template_type === 1) {
        this.tmpType = 'platform';
      }
      this.$refs.clog.getSrcList(this.tmpType);
    },
    addOpen() {
      this.getTmps();
    },
    toggleSelection() {
      this.$nextTick(_ => {
        this.tableDataEnd.map((item, index) => {
          this.addParams.collect_obj_ids.map((key, i) => {
            if (item.resource_id === key) {
              this.$refs.multipleTable2.toggleRowSelection(this.tableDataEnd[index], true);
            }
          });
        });
      });
    },
    getTmps(pageSize, currentPage) {
      let obj = {};
      if (this.formData.template_type !== undefined && this.formData.template_type !== '' && this.formData.template_type !== '全部') {
        obj.template_type = this.formData.template_type;
      }
      if (this.formData.template_name.length > 0) {
        obj.template_name = this.formData.template_name;
      }
      if (this.formData.group !== undefined && this.formData.group !== ''){
        obj.group = this.formData.group;
      }
      if (!pageSize) {
        this.tmpPage.currentPage = 1;
        this.tmpPage.pageSize = 5;
      }
      let start = (this.tmpPage.currentPage - 1) * this.tmpPage.pageSize;
      let limit = this.tmpPage.pageSize;
      server.queryTmp(start, limit, obj).then(res => {
        this.tmpPage.totalItems = res.count;
        this.tmpData = res.data;
        res.data.some((item, index) => {
          if (this.addParams.template_id === item.template_id) {
            this.radio = index;
            return true;
          } else {
            this.radio = '';
            return false;
          }
        });
      });
    },
    aeTask(type, obj) {
      this.addDialog = true;
      this.dialogType = type;
      if (type === 'add') {
        this.dialogTilte = '新增任务';
      } else {
        if( obj.push_position !== null && obj.kafka_config !== null)
        {
           this.push_position = obj.push_position;
           this.kafka_arr = obj.kafka_config;    
        }
        tmpServer.queryById(obj.template_id).then(res => {
          this.$set(this.currentData, 0, res);
          this.tmpDetails = this.currentData[0];
            let resource_type = this.tmpDetails.resource_type;
                      //检测两个点分别出现的位置
                       if(resource_type)
                      {
                          tmpServer.query_resource().then( res => {
                                  for( let i=0;i<res.length;i++ ) {
                                        if( resource_type === res[i].uri ) {
                                              this.tmpDetails.resource_type = res[i].uri_alias
                                        }
                                  }
                          } )
                      }
          this.list = this.currentData[0]
          if(this.currentData[0].template_type == 3){
              this.transit = true;
          }
          let types = ['platform', '', 'middleware', 'log', 'database', 'customize'];
          this.tmpType = types[this.tmpDetails.template_type]
          if (res.resource_type !== undefined && res.resource_type !== null) {
            let idx = res.resource_type.lastIndexOf(".");
            this.resource = res.resource_type.substring(idx + 1, res.resource_type.length);
          }
        });
        this.curRadio = 0;
        this.dialogTilte = '修改任务';
        this.addParams = {
          task_id: obj.task_id,
          task_name: obj.task_name,
          template_id: obj.template_id,
          collect_obj_ids: obj.collect_obj_ids
        };
      }
    },
    optTask(type, value) {
      if (type == "start") {
        this.$confirm('是否启动?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false
        }).then(() => {
          handle(type, value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启动'
          });
        });
      }
      if (type == "stop") {
        this.$confirm('是否停止?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false
        }).then(() => {
          handle(type, value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停止'
          });
        });
      }
      let handle = (type, value) => {
        let taskIds = [];
        if (value.length === 0) {
          this.$message.warning("请勾选需要操作的任务！");
          return;
        }
        if (typeof value === 'string') {
          taskIds.push(value);
        } else {
          taskIds = this.getTaskIds(value);
        }
        server.optTask(taskIds, type).then((res) => {
          this.queryTask();
          this.$message.success("操作成功！");
        });
      }
    },
    deleteTask(value) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        handle(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      let handle = (value) => {
        let taskIds = [];
        if (value.length === 0) {
          this.$message.warning("请勾选需要删除的任务！");
          return;
        }
        if (typeof value === 'string') {
          taskIds = value;
        } else {
          taskIds = this.getTaskIds(value);
        }
        server.deleteTask(taskIds).then(res => {
          this.queryTask();
          this.$message.success("删除成功！");
        });
      }
    },
    selectable(row, index) {
      if (row) {
        return false;
      }
    },
    getTaskIds(arr) {
      return arr.map((item) => {
        return item.task_id;
      });
    },
    queryTask(pageSize, currentPage) {
      if (!pageSize) {
        this.tmpPage.currentPage = 1;
        this.tmpPage.pageSize = 10;
      }
      let reg = new RegExp("[`~!@#%$^&*()=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；;：”“'。，、？\u4E00-\u9FA5]", 'g');
      if (reg.test(this.formData.task_name)) {
        this.$message.warning("模板名称请勿输入特殊字符、汉字！");
        return; 
      }
      if( reg.length > 64 ) {
         this.$message.warning("字符长度不能超过64！");
        return;
      }
      let start = (this.taskPage.currentPage - 1) * this.taskPage.pageSize;
      let limit = this.taskPage.pageSize;
      server.queryTask(start, limit, this.formData.task_name).then((res) => {
        this.dataList = res.data;
        this.taskPage.totalItems = res.count;
      });
    },
    increase(formName) {
      if (this.objSelection.length > 0) {
        this.addParams.collect_obj_ids = [];
        this.objSelection.map((item) => {
          this.addParams.collect_obj_ids.push(item.resource_id);
        });
        this.addParams.create_user_id = this.userName || 'admin';
        if(this.transit){
           this.addParams.push_position = this.push_position;
           this.addParams.kafka_config = this.kafka_arr;
        }
        server.aeTask(this.addParams, this.dialogType).then((res) => {
          this.addDialog = false;
          this.push_position = 0;
          this.kafka_arr = [{
                flume_ips: "",
                kafka_ips: "",
                topic: ""
          }]
          this.transit = false;
          this.queryTask();
          this.$message.success("操作成功！");
        }).catch(err => {  this.transit = true; });
        this.transit = false;
        this.activeName='first';
      } else {
        this.$message.warning("至少选择一个采集对象！");
        return false;
      }
    },
    getCollector(type) {
      if( this.addParams.task_name.length > 64 ) {
          this.$message({
             type: 'error',
             message: '任务名称长度不能超过64字符！'
          })
          return
      }else{
        let reg = new RegExp("[`~!@#%$^&*()+=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；;：”“'。，、？\u4E00-\u9FA5 ]",'u');
          if (reg.test(this.addParams.task_name)) {
                this.$message({
                 type: 'error',
                 message: '不能含有特殊字符、空格、汉字'
              })
                return
          } else {
             console.log(this.addParams.task_name);
          }
      }
      if(type == 1)
      {
         if(this.activeName === 'first' && this.transit === true) {
         this.activeName = 'transit';
        }else if(this.activeName === 'first' && this.transit === false) {
          this.activeName = 'second';
        }else if(this.activeName === 'transit'){
           if(this.push_position != 0){
               for(let i=0;i<this.kafka_arr.length;i++){
                   if( this.kafka_arr[i].flume_ips == "" || this.kafka_arr[i].topic == "" || this.kafka_arr[i].kafka_ips == "")
                   {
                       this.$message({type:"error",message:"填框不能为空！"})
                       return
                   }
               }
           }
           this.activeName = "second";
        } 
      }
      
      if (this.activeName === 'second' && this.resource != '') {
        var data = this.resource;
        var data1 = [];
        var data2 = [];
        this.tableDataEnd = [];
        server.queryCollector(this.resource).then(res => {
          Object.keys(res.datas).forEach(function(key) {
            if (key == data) {
              data1 = res.datas[key];
            }
          });
          for (var i = 0; i < data1.length; i++) {
            data2.push({
              resource_id: data1[i].ciid,
              resource_name: data1[i].ciname,
              engine_room: data1[i].location,
              ip_address: data1[i].ip
            });
          }
          this.obj_list = data2;
          this.localPage.currentPage = 1;
          this.localPage.pageSize = 5;
          this.localPage.totalItems = this.obj_list.length;

          if (this.localPage.totalItems > this.localPage.pageSize) {
            for (let index = 0; index < this.localPage.pageSize; index++) {
              this.tableDataEnd.push(this.obj_list[index]);
            }
          } else {
            this.tableDataEnd = this.obj_list;
          }
          this.toggleSelection();
        });
      }
    },
    rowClass({ row, rowIndex }) {
      return "textAlign:center;background:rgba(244,248,249,1);";
    },
    rowClasss({ row, rowIndex }) {
      return "cursor: pointer;textAlign:center;";
    },
    cellClass({ row, rowIndex }) {
      return "textAlign:center;background:rgba(244,248,249,1);color:rgba(102,102,102,1);font-weight:800;font-size:14px;";
    },
    cellsClass({ row, rowIndex }) {
      return "textAlign:center;";
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    quotaSelection(val) {
      this.objSelection = val;
    },
    see( row,event,column ) {
      this.detailsData = row;
      this.tableDataEnd = [];
      this.tmpData = [];
      tmpServer.queryById(this.detailsData.template_id).then(res => {
        this.tmpData.push(res);
        if (this.tmpData[0].resource_type) {
        tmpServer.query_resource().then(res => {
          for (let i = 0; i < res.length; i++) {
            if (this.tmpData[0].resource_type === res[i].uri) {
              this.tmpData[0].resource_type = res[i].uri_alias
            }
          }
        });
      }
        this.radio = 0;
        this.detailsDialog = true;
        let types = ['platform', '', 'middleware', 'log', 'database', 'customize'];
          let type="";
          type = types[this.tmpData[0].template_type];
          if (this.tmpData[0].template_type === 1) {
            type = 'platform';
          }
          this.tmpType = type;
          this.$nextTick(()=>{
              this.$refs.clog1.getSrcList(type);
          })
      });
      this.obj_list.map((item, index) => {
        row.collect_obj_ids.map((key, i) => {
          if (item.resource_id === key) {
            this.tableDataEnd.push(item);
            this.toggleSelection();
          }
        });
      });
      //获取采集对象
      //拿到ciid存放到临时变量
      var coll_arr = [];
      var that = this;
      row.collect_obj_ids.forEach(function(item) {
        server.queryCollector(that.resource, item).then(res => {
          if (res.datas) {
            Object.getOwnPropertyNames(res.datas).forEach(function(key, index) {
              coll_arr.push(res.datas[key][index]);
            });
          }
        });
      });
      this.collector_obj = coll_arr;
    },
    taskSizeChange(val) {
      this.taskPage.pageSize = val;
      this.taskPage.currentPage = 1;
      this.queryTask(this.taskPage.pageSize, this.taskPage.currentPage);
    },
    taskCurrentChange(val) {
      this.taskPage.currentPage = val;
      this.queryTask(this.taskPage.pageSize, this.taskPage.currentPage);
    },
    localSizeChange(val) {
      this.tableDataEnd = [];
      this.localPage.pageSize = val;
      if (this.localPage.totalItems > this.localPage.pageSize) {
        for (let index = 0; index < this.localPage.pageSize; index++) {
          this.tableDataEnd.push(this.obj_list[index]);
        }
      } else {
        this.tableDataEnd = this.obj_list;
      }
      this.toggleSelection();
    },
    localCurrentChange(val) {
      this.tableDataEnd = [];
      this.localPage.currentPage = val;
      let totalPage = Math.ceil(this.localPage.totalItems / this.localPage.pageSize);
      if (this.localPage.currentPage === totalPage) {
        for (let index = (this.localPage.currentPage - 1) * this.localPage.pageSize; index < this.localPage.totalItems; index++) {
          this.tableDataEnd.push(this.obj_list[index]);
        }
      } else {
        for (let index = (this.localPage.currentPage - 1) * this.localPage.pageSize; index < this.localPage.currentPage * this.localPage.pageSize; index++) {
          this.tableDataEnd.push(this.obj_list[index]);
        }
      }
      this.toggleSelection();
    },
    tmpSizeChange(val) {
      this.radio = '';
      this.tmpPage.pageSize = val;
      this.tmpPage.currentPage = 1;
      this.getTmps(this.tmpPage.pageSize, this.tmpPage.currentPage);
    },
    tmpCurrentChange(val) {
      this.radio = '';
      this.tmpPage.currentPage = val;
      this.getTmps(this.tmpPage.pageSize, this.tmpPage.currentPage);
    },
    closeDialog(f) {
      this.radio = '';
      this.curRadio = '';
      this.currentData = [];
      this.activeName = 'first';
      this.$refs.multipleTable2.clearSelection();
      this.$refs[f].resetFields();
      this.tableDataEnd = [];
      this.addParams = {
        task_name: '',
        template_id: '',
        collect_obj_ids: []
      };
      this.formData = {
        task_name: '',
        template_name: '',
        template_type: ''
      };
      this.activeName='first';
      this.transit = false;
      this.queryTask();
    },
  }
}

</script>
<style lang="scss" scoped>
.monitor-container {
  padding: 10px 20px;
  background-color: #f5f5f5;

  .btnInfo {
    margin-bottom: 12px;
  }

  .set-item-show {
    color: skyblue;
    font-size: 12px;
    vertical-align: bottom;
    cursor: pointer;
  }

  #preForm {
    .el-select {
      width: 185px;
    }

    .el-date-editor {
      width: 185px;
    }
  }

  .RightRow1 {
    height: auto;
    position:relative;
    margin: 20px 0;
    border-radius: 5px;

    /deep/ .el-form {
      text-align: left;
      margin-bottom: 0px;
    }
  }

  .conRight /deep/ {
    .is-active {
      background-color: #fff !important;
    }

    .el-tabs__header {
      margin: 0;
    }
  }

  /deep/ .el-pagination {
    margin-top: 10px;
  }

  #current-alertbtn {
    padding-left: 200px;
  }

  #myChart {
    z-index: 998;
  }
}

/deep/#dialog {
  .el-form-item__label {
    color: #2c92ed;
  }

  #alert-info {
    margin-top: 40px;
  }

  #threshold {
    .threshold-font {
      color: #2c92ed;
      font-size: 16px;
    }
  }
}

.el-table {
  text-align: center;
  border-spacing: 0;
  border-collapse:collapse;
}

.el-form {
  text-align: center;
  margin-bottom: 10px;
}

.el-form-item {
  margin: 0;
  padding-left: 10px;
}

h3 {
  text-align: left;
  margin: 10px 0px;
  padding-left: 5px;
  border-left: 3px solid #409EFF;
}

.mrl {
  margin-left: 10px;
}

.execred {
  color: red
}

.execgreen {
  color: green
}

.execblack {
  color: black
}

.btn_rote {
  transform: rotate(90deg);
}

.btn_set {
  width:40px;
  height:34px;
  background:rgba(66,185,131,0.4);
  border:1px solid rgba(66,185,131,1);
  border-radius:4px;
  display: inline-block;
  padding: 8px 8px 8px 11px;
  cursor: pointer;
}

.btn_query {
  width:64px;
  height:34px;
  background:rgba(66,185,131,1);
  border-radius:4px;  
  padding:8px;
  span {
    width:27px;
    height:14px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:14px;
  }
}
.btn_reset {
  width:64px;
  height:34px;
  background:rgba(244,248,249,1);
  border-radius:4px;
  padding:8px;
  span {
    width:28px;
    height:14px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(0,0,0,1);
    line-height:14px;
    opacity:0.7;
  }
}

.el-form-item label {
  width:auto;
  height:14px;
  font-size:14px;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(0,0,0,1);
  line-height:14px;
  opacity:0.7;
}
.handle_text {
  width:28px;
  height:14px;
  font-size:12px;
  font-family:PingFang-SC-Heavy;
  font-weight:800;
  color:rgba(66,185,131,1);
  line-height:20px;
}

.btn_add {
  width:90px;
  height:33px;
  background:rgba(66,185,131,1);
  border-radius:4px;
  border: none;
  cursor: pointer;
  outline:none;
  span {
    width:56px;
    height:14px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    color:rgba(255,255,255,1);
    line-height:14px;
  }
}

.btn_other {
  width:92px;
  height:34px;
  background:rgba(244,248,249,1);
  border-radius:4px;
  border-color: #f4f8f9;
  border: none;
  cursor: pointer;
  outline:none;
  span {
      width:56px;
      height:14px;
      font-size:14px;
      font-family:PingFang-SC-Bold;
      color:rgba(0,0,0,1);
      line-height:14px;
      opacity:0.7;
  }
}

.search_div {
  margin-right: 15px;
  label {
      width:56px;
      height:14px;
      font-size:14px;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(0,0,0,1);
      line-height:14px;
      opacity:0.7;
  };
  input {
    width:230px;
    height:34px;
    border:1px solid rgba(220,223,230,1);
    border-radius:4px;  
    padding: 0 10px 3px;
    outline:none;
  };
  input::-webkit-input-placeholder{
        color: rgba(0,0,0,1);
        width:98px;
        height:14px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:14px;
        opacity:0.3; 
  };
  input::-moz-placeholder{
        color: rgba(0,0,0,1);
        width:98px;
        height:14px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:14px;
        opacity:0.3;      
      };
  input::-ms-input-placeholder{
        color: rgba(0,0,0,1);
        width:98px;
        height:14px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:14px;
        opacity:0.3;       
      };
}
 .search_input {
    input::-webkit-input-placeholder{
        color: rgba(0,0,0,1);
        width:98px;
        height:14px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:14px;
        opacity:0.3; 
       };
  }

/deep/.el-pagination .el-pager li.active{
    min-width: 28px;
    height: 28px;
    background: rgba(66,185,131,1);
    font-size: 14px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 28px;
    border-radius:3px;
}

/deep/ .el-dialog__body {
   padding: 0px 20px;
}

.label_pane {
  width:64px;
  height:20px;
  font-size:15px;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(66,185,131,1);
  line-height:20px;
}
.add_commpont {
  margin-bottom: 10px;
  label {
    width:62px;
    height:20px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:blod;
    color:rgba(0,0,0,0.7);
    line-height:20px;
    opacity: 1;
  };
  input {
    width:224px;
    height:34px;
    border-radius:4px;
    margin-right: 10px;
    border:1px solid rgba(220,223,230,1);
    padding-left: 10px;
    outline:none;
  };
  input::-webkit-input-placeholder{
        width:100px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(0,0,0,0.3);
        line-height:20px;
      };
  button {
    width:64px;
    height:34px;
    background:rgba(66,185,131,1);
    border-radius: 4px;
    border: none;
    cursor: pointer;
    span {
      width:29px;
      height:14px;
      font-size:14px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:14px;
    }
  }
}

.add_table .el-table {
  width:370px;
  height:auto;
}
    .tooltipclass{
      background: rgba(237,255,247,1) !important;
      border:1px solid rgba(66,185,131,1) !important;
    }
  .sp {
    display: inline-block;
    height: 20px;
    color: #42B983;
    font-weight: bold;
    margin-top: 10px;

    span {
      padding-left: 10px;
      border-left: 3px solid #42B983;
    }

    i {
      padding-left: 10px;
    }
  }
  .logAdd-obj {
    width:auto;
  height:auto;
  background:rgba(244,248,249,1);
  border-radius:4px;
  label {
    width:70px;
    height:20px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.4);
    line-height:20px;
  };
  input {
    width:auto;
    height:20px;
    font-size:14px;
    background: none;
    border: none;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.7);
    line-height:20px;
  };
  .log_div {
    padding: 14px 0;
  };
  }
  /deep/.el-tabs__active-bar {
    background-color: #42b983;
  }
  /deep/.el-input {
        position: relative;
         display: inline-block;
         width: auto;
  }
  .kafka_style {
    margin-top: 10px;
    display: inline-block;
    margin-left: 4rem
  }
 .inputTask /deep/.el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 23%;
    right: -30rem;
    margin-left: 17rem;
  }
</style>
