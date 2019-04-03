<!-->
<template>
  <div>
    <table cellspacing="0" cellpadding="0" border="0" class="deep-table-container">
      <thead>
         <tr v-for="t in title" :key="t">
          {{t}}
        </tr> 
        <tr>
          <th>序号</th>
          <th>单号</th>
          <th>标题</th>
          <th>业务名称</th>
          <th>状态</th>
          <th>期望解决时间</th>
          <th>处理人</th>
          <th>是否超时</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, index) in data" :key="index">
          <td>{{index + 1}}</td>
          <td><i @click="open" v-if="d.children" class="el-icon-plus"></i> {{d.object.workListId}} </td>
          <td>{{d.object.title}}</td>
          <td>{{d.object.category}}</td>
          <td>{{d.object.status}}</td>
          <td>{{d.object.dueTime}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'DeepTable',
    props: {
      data: Array,
      title: Array,
    },
    mounted() {
      console.log(this.data);
    },
    updated() {
      debugger
      console.log(this.data);

      const a = []

      const f = (arr) => {
        arr.map(item => {
          if(item.children) {
            debugger
            item.children.forEach(element => {
              debugger
              f(element.children)
            });
            arr(item.children)
          }else {
            a.push(item)
          }
        })
      };

      f(this.data);
    }
  }
</script>

<style scoped lang="scss">
  .deep-table-container {
    width: 100%;
    td {
      text-align: center;
    }
  }
</style>
<-->



<!--
<template>
  <el-table :data="data" style="width: 100%">

    <el-table-column type="expand" >
      <template slot-scope="props">
        <deep-table :show-header="false" :data="props.row.children" v-if="props.row.children" style="width: 100%"></deep-table>
      </template>
    </el-table-column>

    <el-table-column type="index" label="序号" width="50">
    </el-table-column>

    <el-table-column label="单号" width="200">
      <template slot-scope="scope">
        <span type="text" size="small">
          {{scope.row.object.workListId}}
        </span>
      </template>
    </el-table-column>

    <el-table-column prop="address" label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "DeepTable",
  props: {
    data: Array
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style>
</style>

-->

<template>
  <div class="deep-table">
    <div
      v-for="(item, index) in data"
      :key="index"
    >
      <el-row
        class="deep-table-row"
        :class="{'is-same-workListId': item.isSameWorkListId}"
      >
        <!-- <el-col :span="1">
          {{index + 1}}
        </el-col> -->
        <el-col :span="6">
          <div class="work-list-id">
            <span
              v-if="item.children"
              class="seat-has-child"
            ></span>
            <span
              v-if="!item.children"
              class="seat"
            ></span>
            <i
              @click="open()"
              class="icon-toggle"
              v-if="item.children"
              :class="iconClass"
            ></i>
            <span>{{item.object.workListId | fullMsg}}</span>
          </div>

        </el-col>

        <el-col :span="4">
          <p class="title">
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.object.title"
              placement="top"
            >
              <p class="title">{{item.object.title | fullMsg}}</p> 
            </el-tooltip>
          </p>
          <!-- {{item.object.title}} -->
        </el-col>
        <el-col :span="3">
          {{item.object.category | fullMsg}}
        </el-col>
        <el-col :span="2">
          {{item.object.status | statusFilter}}
        </el-col>
        <el-col :span="5">
          {{item.object.dueTime | fullMsg}}
        </el-col>
        <el-col :span="4">
          {{item.user.realName | fullMsg}}
        </el-col>
        <!-- <el-col :span="2">
          {{item.object.startMode}}
        </el-col> -->
      </el-row>

      <div
        v-if="item.children"
        v-for="(childs, index) in item.children"
        :key="index"
      >
        <trs
          v-show="show"
          :data="[childs]"
          class="next-child"
        ></trs>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "trs",
  data() {
    return {
      show: false
    };
  },
  props: {
    data: Array
  },
  computed: {
    iconClass() {
      return this.show ? "el-icon-minus" : "el-icon-plus";
    }
  },
  // updated() {
  //   const data = this.data;
  //   if (data) {
  //     data;
  //   }
  // },
  methods: {
    open() {
      // debugger;
      this.show = !this.show;
    }
  },
  filters: {
    statusFilter(val) {
      if (!val) {
        return "--";
      }
      return val == "1" ? "进行中" : "已完成";
    }
  }
};
</script>

<style scoped lang="scss">
.deep-table {
  .is-same-workListId {
    background: rgb(240, 240, 240);
  }
  .title {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .deep-table-row {
    margin: 16px 0;
    padding: 8px 0;
    & ~ div {
      // background: blue;
      .work-list-id {
        padding-left: 16px;
      }

      & > .deep-table > div > div:first-child {
        // padding-left: 16px;
        & ~ div {
          // background: red;
          .work-list-id {
            .seat {
              padding-left: 30px;
            }
            padding-left: 32px;
            .seat-has-child {
              padding-left: 8px;
            }
          }

          & > .deep-table > div > div:first-child {
            // padding-left: 16px;
            & ~ div {
              // background: red;
              .work-list-id {
                .seat {
                  padding-left: 46px;
                }
                padding-left: 32px;
                .seat-has-child {
                  padding-left: 8px;
                }
              }

              & > .deep-table > div > div:first-child {
                // padding-left: 16px;
                & ~ div {
                  // background: red;
                  .work-list-id {
                    .seat {
                      padding-left: 52px;
                    }
                    padding-left: 32px;
                    .seat-has-child {
                      padding-left: 8px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // .next-child {
  //   // padding-left: 16px;
  //   .work-list-id {
  //     // padding-left: 16px;

  //     .seat-has-child {
  //       // padding-left: 30px;
  //     }
  //   }
  // }
  .icon-toggle {
    cursor: pointer;
    padding-right: 4px;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>