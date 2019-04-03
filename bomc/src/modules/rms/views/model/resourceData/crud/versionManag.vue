<template>
  <div class="app-container">
    <h3 class="title_head">模型变更操作</h3>
    <el-card class="box-card version_name test test-1">
      <!-- <el-table :data="modelName" @row-click="handleModelQuery">
        <el-table-column label="模型名称" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.alias}}</span>
          </template>
        </el-table-column>
      </el-table>-->
      <div class="head">资源模型树</div>
      <el-input placeholder="请输入资源模型名称" style="width: 90%;display: block;margin: 0 auto;" v-model="filterText" size="mini"></el-input>
      <el-tree
        class="filter-tree"
        :data="nav_treeData"
        :props="defaultProps"
        :expand-on-click-node="false"
        node-key="id"
        :default-expanded-keys="treekeys"
        :filter-node-method="filterNode"
        ref="tree2"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-card>
    <el-card class="box-card version_list test test-1">
      <el-table :data="versionData" class :empty-text="emptyModel" @row-click="handleTab">
        <el-table-column prop="version" label="所有版本" width="140"></el-table-column>
        <el-table-column label="创建时间" width="150">
          <template slot-scope="scope">{{scope.row.create_time|formatTime('YMDHMS')}}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.$index ==0?'primary':'danger'"
              @click.stop="modifyAttribute(scope.$index, scope.row)"
              :disabled="scope.$index ==0?true:false"
            >{{scope.$index ==0?'当前版本':'还原该版本'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card version_tab test test-1">
      <el-tabs v-model="activeName" @tab-click="handleClick" class>
        <el-tab-pane label="专有属性" name="first">
          <template>
            <el-table
              :data="Proprietary_attributes"
              border
              style="width: 100%"
              :empty-text="emptyVersion"
            >
              <el-table-column prop="name" label="属性名称" min-width="30%"></el-table-column>
              <el-table-column prop="description" label="说明" min-width="65%"></el-table-column>
              <el-table-column prop="auto_get" label="自动采集" min-width="20%">
                <template slot-scope="scope">{{scope.row.auto_get?'是':'否'}}</template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane :label="classification_tab" name="second">
          <template>
            <el-table :data="classification" border :empty-text="emptyVersion" style="width: 100%">
              <el-table-column prop="name" label="属性名称" min-width="30%"></el-table-column>
              <el-table-column prop="description" label="说明" min-width="70%"></el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="根类通用属性" name="third">
          <template>
            <el-table :data="ResObject_Data" border :empty-text="emptyVersion" style="width: 100%">
              <el-table-column prop="name" label="属性名称" min-width="28%"></el-table-column>
              <el-table-column prop="description" label="说明" min-width="70%"></el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import * as service from "@/modules/rms/api/model/resourceData/versionManag.js";
export default {
  watch: {
    filterText(val) {
      debugger;
      this.$refs.tree2.filter(val);
    }
  },
  created() {
    debugger;
    if (!this.$store.state.resourceManagement.on_treeData) {
      this.$store.dispatch("treeData");
    }
  },
  computed: {
    nav_treeData() {
      return this.$store.state.resourceManagement.nav_treeData;
    }
  },
  data() {
    return {
      modelName: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      filterText: "",
      treekeys: [0, 1, 2, 3, 4],
      Proprietary_attributes: [],
      versionData: [],
      emptyModel: "请选择具体模型",
      emptyVersion: "请选择历史版本",
      page: {
        pageSize: 14, //每页条数,  默认8条
        totalRecords: 0, //总条数
        pageSizes: [8, 12, 16, 20], // 分几页
        pageNum: 0, //页数从0开始
        level: "",
        type: "",
        alias: "",
        name: "",
        search: false,
        searchByAny: false
      },
      versionData: [],
      //分类
      classification: [],
      //分类标签
      classification_tab: "分类通用属性",
      activeName: "first",
      //物理类数据
      Physical: [
        {
          name: "level",
          description: "描述该资源所处层级；具体描述为IaaS"
        },
        {
          name: "asset_number",
          description: "该资源的资产编号"
        },
        {
          name: "serial_number",
          description: "该资源的序列号"
        },
        {
          name: "name",
          description: "资源所属的系统名称，参见“资源所属系统” 定义（自动填写）"
        },
        {
          name: "module",
          description:
            "资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
        },
        {
          name: "sub_module",
          description:
            "资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
        },
        {
          name: "influence_area",
          description:
            "描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市"
        },
        {
          name: "influence_customer",
          description:
            "描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等"
        },
        {
          name: "influence_system",
          description:
            "描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等"
        },
        {
          name: "department",
          description: "使用该资源部门（手工填写）"
        },
        {
          name: "service_start",
          description: "资源支持服务的服务合同开始日期YYYY-MM-DD（手工填写）"
        },
        {
          name: "service_end",
          description: "资源支持服务的服务合同结束日期YYYY-MM-DD（手工填写）"
        },
        {
          name: "manufacturer",
          description: "该资源的原始厂商 ，“参见资源管理建设方案附录5.1”"
        },
        {
          name: "service_level",
          description:
            "资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（自动填写）"
        },
        {
          name: "service_provider",
          description:
            "为该资源管理建设方案提供服务的厂商名称，“参见附录5.3”（自动填写）"
        },
        {
          name: "service_tel",
          description:
            "资源支持服务厂商提供的支持服务的联系方式，能提供联络信息，如电话、邮件等（手工填写）"
        }
      ],
      //逻辑类数据
      Logic: [
        {
          name: "level",
          description: "描述该资源所处层级；具体描述为：IaaS、PaaS"
        },
        {
          name: "name",
          description: "资源所属的系统名称，参见“资源所属系统” 定义（自动填写）"
        },
        {
          name: "module",
          description:
            "资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
        },
        {
          name: "sub_module",
          description:
            "资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
        },
        {
          name: "influence_area",
          description:
            "描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市"
        },
        {
          name: "influence_customer",
          description:
            "描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等"
        },
        {
          name: "influence_system",
          description:
            "描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等"
        },
        {
          name: "department",
          description: "使用该资源部门（手工填写）"
        },
        {
          name: "service_level",
          description:
            "资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（手工填写）"
        },
        {
          name: "integrator",
          description: "该资源管理建设方案的集成商“参见附录5.2”（自动填写）"
        },
        {
          name: "service_provider",
          description:
            "为该资源管理建设方案提供服务的厂商名称，“参见附录5.3”（自动填写）"
        }
      ],
      //应用类数据
      Application: [
        {
          name: "level",
          description: "描述该资源所处层级；具体描述为SaaS"
        },
        {
          name: "name",
          description: "资源所属的系统名称，参见“资源所属系统” 定义（自动填写）"
        },
        {
          name: "module",
          description:
            "资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义（自动填写）"
        },
        {
          name: "sub_module",
          description:
            "资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义（自动填写）"
        },
        {
          name: "influence_area",
          description:
            "描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市"
        },
        {
          name: "influence_customer",
          description:
            "描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等"
        },
        {
          name: "influence_system",
          description:
            "描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等"
        },
        {
          name: "department",
          description: "使用该资源部门（手工填写）"
        },
        {
          name: "service_level",
          description:
            "资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（手工填写）"
        },
        {
          name: "integrator",
          description: "该资源管理建设方案的集成商“参见附录5.2”（自动填写）"
        },
        {
          name: "service_provider",
          description:
            "为该资源管理建设方案提供服务的厂商名称，“参见附录5.3”（手工填写）"
        }
      ],
      //业务类数据
      Business: [
        {
          name: "level",
          description: "描述该资源所处层级；具体描述为SaaS"
        },
        {
          name: "name",
          description: "资源所属的系统名称，参见“资源所属系统” 定义（自动填写）"
        },
        {
          name: "module",
          description:
            "资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
        },
        {
          name: "sub_module",
          description:
            "资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
        },
        {
          name: "influence_area",
          description:
            "描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市"
        },
        {
          name: "influence_customer",
          description:
            "描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等"
        },
        {
          name: "influence_system",
          description:
            "描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等"
        },
        {
          name: "department",
          description: "使用该资源部门（手工填写）"
        },
        {
          name: "service_level",
          description:
            "资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（手工填写）"
        },
        {
          name: "integrator",
          description: "该资源管理建设方案的集成商“参见附录5.2”（自动填写）"
        }
      ],
      //其它类数据
      Others: [
        {
          name: "location",
          description: "该资源的物理位置"
        }
      ],
      //根类数据
      ResObject: [
        {
          name: "ciid",
          description: "资源的唯一识别码"
        },
        {
          name: "name",
          description: "资源的名称"
        },
        {
          name: "state",
          description:
            "该资源的状态，分为：已接收、已部署（替换已安装）、测试中、使用中、维护中、已下线、报废"
        },
        {
          name: "check",
          description:
            "配置审核活动中，资源的审核状态，分为：已审核，未审核，不匹配，丢失"
        },
        {
          name: "last_check_time",
          description:
            "最近一次审核该资源的时间，即审核状态从”未审核”变为”已审核”/”不匹配”/”丢失”任一状态的时间；参见“配置审核”"
        },
        {
          name: "create_time",
          description: "该资源被创建的时间YYYY-MM-DD hh:mm（系统自动产生）"
        },
        {
          name: "isdelete",
          description: "该资源是否被删除；分为：正常/已删除"
        },
        {
          name: "delete_time",
          description:
            "该资源被删除的时间，既删除状态从”正常”变为”已删除”的时间YYYY-MM-DD hh:mm（系统自动产生）"
        },
        {
          name: "last_update_staff:",
          description: "最后更新该资源的人员（系统自动产生）"
        },
        {
          name: "last_update_time",
          description:
            "最后更新该资源的时间，既最后一次更新资源任一属性的时间；YYYY-MM-DD hh:mm（系统自动产生）"
        },
        {
          name: "description",
          description: "该资源的其他描述信息（手工填写）"
        }
      ],
      ResObject_Data: []
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 树状点击查询
    handleNodeClick(data, node) {
      debugger;
      // this.page.pageSize = 5; //每页条数,  默认5条
      // this.page.pageNum = 0;
      // this.page.checked = false;
      // this.page.ciname = "";
      // this.page.ciid = "";
      // this.page.state = "";
      if (data.uri) {
        debugger;
        this.classification_tab = "分类通用属性";
        this.activeName = "first";
        this.Proprietary_attributes = [];
        this.ResObject_Data = [];
        this.classification = [];
        this.page.model = data.value;
        this.page.value = data.value;
        service
          .queryResourcesVersion(data.value)
          .then(res => {
            debugger;
            if (res) {
              this.versionData = res.datas;
            }
          })
          .catch(err => {});
        return;
      } else {
        return;
      }
      // this.init();
    },
    // 还原版本
    modifyAttribute(index, item) {
      this.$confirm(
        "是否确认还原该版本?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          service
            .modifyAttribute(item)
            .then(res => {
              debugger;
              if (res.type == 0) {
                this.$alert("版本还原成功", "消息提示", {
                  confirmButtonText: "确定",
                  callback: action => {
                    service
                      .queryResourcesVersion(item.name)
                      .then(res => {
                        debugger;
                        if (res) {
                          this.versionData = res.datas;
                        }
                      })
                      .catch(err => {});
                  }
                });
              }
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    // 选择模型查询
    handleModelQuery(data) {
      debugger;
    },
    handleTab(row, event, column) {
      debugger;

      this.Proprietary_attributes = row.attributes;
      this.ResObject_Data = this.ResObject;
      this.activeName = "first";
      if (row.type == "逻辑类") {
        this.classification = this.Logic;
        this.classification_tab = "逻辑类通用属性";
      }
      if (row.type == "应用类") {
        this.classification = this.Application;
        this.classification_tab = "应用类通用属性";
      }
      if (row.type == "业务类") {
        this.classification = this.Business;
        this.classification_tab = "业务类通用属性";
      }
      if (row.type == "物理类") {
        this.classification = this.Physical;
        this.classification_tab = "物理类通用属性";
      }
      if (row.type == "其他类") {
        this.classification = this.Others;
        this.classification_tab = "其他类通用属性";
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.title_head {
  padding-bottom: 10px;
}
.version_name {
  width: 17%;
  display: inline-block;
  height: 465px;
}
.version_list {
  width: 40%;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  height: 465px;
}
.version_tab {
  width: 40%;
  display: inline-block;
  vertical-align: top;
  height: 465px;
}
.head {
  height: 50px;
  line-height: 50px;
  text-align: left;
  text-indent: 18px;
  font-size: 14px;
  font-weight: 700;
}
</style>

