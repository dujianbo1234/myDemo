<template>
  <div class="date">
      <!-- 年份 月份 -->
      <div class="month">

       <!--  <p style="font-size: 18px;"><span @click="weekPre">上周</span> {{ currentYear }}年{{ currentMonth }}月 <span @click="weekNext">下周</span></p> -->
         <p style="font-size: 16px;"><i class="el-icon-arrow-left" @click="weekPre"></i> {{ currentYear }}年{{ currentMonth }}月 <i class="el-icon-arrow-right" @click="weekNext"></i> </p>

      </div>
      <!-- 星期 -->
      <!-- <div class="dateBox"> -->
      <!-- <div class="dateBoxIn"> -->
      <ul class="weekdays">
        <li>周日</li>
        <li>周一</li>
        <li>周二</li>
        <li>周三</li>
        <li>周四</li>
        <li>周五</li>
        <li>周六</li>
      </ul>
      <!-- 日期 -->
      <ul class="days">
        <li @click="pick(day)" v-for="(day, index) in days" :key="index">
          <!--本月-->
          <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
          <span v-else>
          <!--今天-->
          <span v-if="day.getFullYear() == currentYear && day.getMonth()+1 == currentMonth && day.getDate() == currentDay" class="active">{{ day.getDate() }}</span>
          <span v-else>{{ day.getDate() }}</span>
          </span>
        </li>
      </ul>
      <!-- </div> -->
      <!-- </div> -->
      <div class="dataInfo">
        <ul>
          <li class="wraper" v-for="(item ,index) in groud">
            <i class="iconfont" :class="[index == 0 ? 'icon-taiyang' : 'icon-yueliang']" :style=" [{color: index == 0 ? '#ff8200' : '#3bb983'} ]"></i>
            <span>
              <ul class="info">
                <li>{{item.time}}</li>
                <li class="infoName">{{item.name}}</li>
              </ul>
            </span>
          </li>
         <!--  <li class="wraper">
            <i class="iconfont icon-lingdang" style="color:#ff8200;"></i>
            <span>
              <ul class="info">
                <li>14:51 - 13:45</li>
                <li class="infoName">人名 人名 人名</li>
              </ul>
            </span>
          </li>
          <li class="wraper">
            <i class="iconfont icon-yichuligaojing" style="color:#3bb983"></i>
            <span>
              <ul class="info">
                <li>14:51 - 13:45</li>
                <li class="infoName">人名 人名 人名</li>
              </ul>
            </span>
          </li> -->
      </ul>
      </div>
  </div>
</template>

<script>
import request from '../util/request'

  export default {
    name: 'date',
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: Number,
        // default: '300px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      sourceApi: {
        type: String,
        default: '/projectGradientLine'
      }
    },
    data () {
      return {
        currentYear: 1970,   // 年份
        currentMonth: 1,  // 月份
        currentDay: 1,    // 日期
        currentWeek: 1,    // 星期
        days: [],
        groud:[{'time':'00:00 - 12:00','name':'无'},{'time':'12:00 - 24:00','name':'无'}],
        daysArray: []
      }
    },

    mounted () {
        this.dataDeal()
    },

    created () {
      this.initData(null)
    },

    methods: {
      dataDeal(){
        const _this = this;
        var api = this.sourceApi==''?'/AAA':this.sourceApi;
        console.log(api);
      //   request({
      //   url: 'https://easy-mock.com/mock/5bd7b650a0fa6d218201b6d0/charts/calendar'
      // }).then(function(res){
        var res = {
          "data": [{
            "date": new Date,
            "groud": [{
              "time": '9:00-11:00',
              "name": "小红 小明 小贝"
            }, {
              "time": '14:00-17:00',
              "name": "小四 小五 小六"
            }, ],
          }, {
            "date": new Date('2019-1-24'),
            "groud": [{
              "time": '9:00-11:00',
              "name": "小红红 小明明 小贝背"
            }, {
              "time": '14:00-17:00',
              "name": "小四四 小五无 小六六"
            }, ],
          }]
        };
        var time = res.data.date;
        _this.daysArray = res.data;
        _this.matchCurrentDay();
       //  console.log(res.data.date);
       // if(time.getFullYear() == _this.currentYear && time.getMonth() == _this.currentMonth && time.getDate() == _this.currentDay){
       //  // res.data.groud

       //  console.log('aaaa',res.data);
       // }
      // })
      },
      matchCurrentDay(){
        for(var i =0 ; i<= this.daysArray.length-1 ; i++){
          var time = new Date(this.daysArray[i].date)
          console.log(this.daysArray[i].date,time);
         if(time.getFullYear() == this.currentYear && time.getMonth() +1 == this.currentMonth && time.getDate() == this.currentDay){
            this.groud = this.daysArray[i].groud;
            console.log('ve',this.groud);
            continue
          }
        }
      },
      formatDate (year, month, day) {
        const y = year
        let m = month
        if (m < 10) m = `0${m}`
        let d = day
        if (d < 10) d = `0${d}`
        return `${y}-${m}-${d}`
      },

      initData (cur) {
        let date = ''
        if (cur) {
          date = new Date(cur)
        } else {
          date = new Date()
        }
        this.currentDay = date.getDate()          // 今日日期 几号
        this.currentYear = date.getFullYear()       // 当前年份
        this.currentMonth = date.getMonth() + 1    // 当前月份
        this.currentWeek = date.getDay() + 1 // 1...6,0   // 星期几
        // if (this.currentWeek === 1) {
        //   this.currentWeek = 2
        // }
        // if (this.currentWeek === 0) {
        //   this.currentWeek = 1
        // }
        // if (this.currentWeek === 6) {
        //   this.currentWeek = 7
        // }
        const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)// 今日日期 年-月-日
        this.days.length = 0
        // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
        /* eslint-disabled */
        // console.log('thisWeek:',this.currentWeek);
        for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
        // for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
          const d = new Date(str)
          d.setDate(d.getDate() - i)
            // console.log("y:" + d)
          this.days.push(d)
        }
        for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
        // for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
          const d = new Date(str)
          d.setDate(d.getDate() + i)
          // console.log('showD:',d);
          this.days.push(d)
        }
        // console.log('array',this.days);
        this.matchCurrentDay()
      },

      //  上个星期
      weekPre () {
        const d = this.days[0]    // 如果当期日期是7号或者小于7号
        d.setDate(d.getDate() - 5)
        console.log('currentDays:',d);
        this.initData(d)
      },

      //  下个星期
      weekNext () {
        const d = this.days[6]    // 如果当期日期是7号或者小于7号
        d.setDate(d.getDate() + 5)
        this.initData(d)
      },

      // 上一個月   传入当前年份和月份
      pickPre (year, month) {
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(0)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },


      // 下一個月   传入当前年份和月份
      pickNext (year, month) {
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(35)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },

      // 当前选择日期
      pick (date) {
        console.log('pickDate',date);
        this.groud = [{'time':'00:00 - 12:00','name':'无'},{'time':'12:00 - 24:00','name':'无'}];
        //alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
        this.initData(date)
      },
    },
  }
</script>
<style lang="scss">
  .dateBox{
    overflow: hidden;
    padding-top: 5px;
      box-shadow:0px 2px 6px #ababab;
      .dateBoxIn{
        box-shadow:0px -2px 6px #ababab;
      }
    }
  .dataInfo {
     padding-left: 3%;
     padding-right: 3%;
    .wraper{
      border: 1px solid #d2d2d2;
      border-radius: 4px;
      padding: 5px;
      margin-top: 10px;
    }
    .iconfont{
      font-size: 60px;
    }
    .info{
      display:inline-block;
      margin-left:20px;
      .infoName{
        color:#a3a3a3;
      }
    }
  }
  .date {
    //height: 180px;
    height: 100%;
    color: #333;

    .month {
      font-size: 24px;
      text-align: center;
    }

    .weekdays {
      display: flex;
      font-size: 16px;
      //margin-top: 20px;

      li {
        flex: 1;
        text-align: center;
      }
    }

    .days {
      display: flex;

      li {
        flex: 1;
        font-size: 20px;
        text-align: center;
        line-height:  35px;

        .active {
          display: inline-block;
          width: 35px;
          height: 35px;
          color: #fff;
          border-radius: 50%;
          background-color: #3bb983;
        }

        .other-month {
          color: #e4393c;
        }
      }
    }
  }
</style>
