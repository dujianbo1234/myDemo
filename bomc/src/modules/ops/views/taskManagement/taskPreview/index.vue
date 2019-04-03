<template>
	<div class="taskPreview">
		<el-row class="rowData" v-if="tableData.length>0">
			<div class="moduleData" v-for='(item,index) in tableData' :key="index" :style="{'background-image': 'url(static/img/' + index + '.png)'}">
				<div class="title">{{item.name}}</div>
				<div class="data">{{item.value}}</div>
			</div>
		</el-row>

		<!-- <img src="src/modules/ops/views/taskManagement/taskPreview/img/dengdaizhixing.png" alt=""> -->

		<!--//统计图表-->
		<!-- <div class="painter" v-show="true"> -->
			<!--上周任务总数-->
			<!-- <div id="lastWeekTask" style="width: 50%;height:400px;"></div> -->
			<!--上周任务完成比重-->
			<!-- <div id="lastWeekTaskThan" style="width: 50%;height:400px;"></div> -->
			<!--上周任务类型比重-->
			<!-- <div id="lastWeekTypeRadar" style="width: 50%;height:400px;"></div> -->
			<!--上周任务使用次数Top5-->
			<!-- <div id="lastWeekTop5" style="width: 50%;height:400px;"></div> -->
		<!-- </div> -->
		<el-row>
			<el-col :span="12" class="padCol">
				<el-card class="box-card">
					<div id="lastWeekTask" style="height:400px;"></div>
				</el-card>
			</el-col>
			<el-col :span="12" class="padCol">
				<el-card class="box-card">
					<div id="lastWeekTaskThan" style="height:400px;"></div>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12" class="padCol">
				<el-card class="box-card">
					<div id="lastWeekTypeRadar" style="height:400px;"></div>
				</el-card>
			</el-col>
			<el-col :span="12" class="padCol">
				<el-card class="box-card">
					<div id="lastWeekTop5" style="height:400px;"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import * as service from '@/modules/ops/api/ops/taskManagement/taskManagement.js'

	export default {

		//返回参数
		data() {
			return {
				tableData: [],
				pieData:[],
				myChartPiechart1:null,
				myChartPiechart2:null,
				myChartPiechart3:null,
				myChartPiechart4:null,
			}

		},
		created(){
			
		},
		//方法调用
		mounted() {

			this.selectPie();
			this.lastWeekTOP();
			this.selectDayTask();
			this.selectTop5();
			this.selectTypes();
			this.queryData();
			this.init();
		},

		//请求
		methods: {
			init(){
				const self = this;
				setTimeout(() => {

			        window.addEventListener('resize', function() {
						self.myChartPiechart1.resize();
						self.myChartPiechart2.resize();
						self.myChartPiechart3.resize();
						self.myChartPiechart4.resize();
			        })

			      },10)
			},
			
			//表单查询
			queryData() {
				service.cuntSum().then(res => {
					if(res.code == 200) {
						
					}
					var data = [];
					for(var key in res.result) {
						var obj = {
							name: res.result[key].name,
							value: res.result[key].value
						}
						data.push(obj)
					}
					this.tableData=data
				})
			},
			
			
			
			//查询日任务量
			selectDayTask() {

				service.lastWeekFracture().then(res => {
					console.log(res)
					var xData = []
					var yData = []
					for(var key in res.result) {
						xData.push(res.result[key].x)
						yData.push(res.result[key].data)
					}
					this.lastWeekSum(res.result)
				})

			},

			//上周任务总数折线图
			lastWeekSum(datas) {
				var legends = []
				for(var i = 1 ; i < datas.length; i++) {
					legends.push(datas[i].name)
				}
				var seriesK = []
				for(var i=1;i<datas.length;i++) {
					var obj = {}; 
					obj.name = datas[i].name;
					obj.data = datas[i].data;
					obj.type = 'line';
					obj.stack = '总量';
					seriesK.push(obj);
				}
				this.myChartPiechart1 = echarts.init(document.getElementById('lastWeekTask'));

				var optionLastWeek = {
					title: {
						text: '上周任务总数'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: legends
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: true,
						data: datas[0].x,
						axisLabel: {
							interval: 0,
							rotate: 40
						}
					},
					yAxis: {
						type: 'value'
					},
					series: seriesK
				}
				this.myChartPiechart1.setOption(optionLastWeek);
				
			},
			
			
			//查询比重饼图
			selectPie() {

				service.lastWeekPie().then(res => {
					var xData = []
					var yData = []
					res.result.forEach((item, index) => {
						xData.push(item.name)
						yData.push(Number(item.value))
					})
					this.lastWeekThan(xData, yData);
				})

			},
			
			//上周任务完成比重饼图
			lastWeekThan(xData, yData) {
				var datas = [];
				
				for(var i=0;i<xData.length;i++) {
					var obj = {}; 
					obj.name = xData[i];
					obj.value = yData[i];
					datas.push(obj);
				}
				this.myChartPiechart2 = echarts.init(document.getElementById('lastWeekTaskThan'));
				var lastWekThan = {
					    title : {
					        text: '上周任务完成比重',
					        x:'center'
					    },
					    tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
					    legend: {
					        orient: 'vertical',
					        left: 'left',
					        data: xData
					    },
					    series : [
					        {
					            name: '完成比重',
					            type: 'pie',
					            radius : '55%',
					            center: ['50%', '60%'],
					            data:datas,
					            itemStyle: {
					                emphasis: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            }
					        }
					    ]
				}
				this.myChartPiechart2.setOption(lastWekThan);
				
			},
			
			//查询任务类型比重
			selectTypes() {
				service.lastWeekRadar().then(res => {
					var xData = []
					var yData = []
					res.result.forEach((item, index) => {
						xData.push(item.name)
						yData.push(Number(item.count))
					})
					this.lastWeekTypes(xData, yData);
				})

			},
			
			//上周任务类型比重
			lastWeekTypes(xData, yData) {
				this.myChartPiechart3 = echarts.init(document.getElementById('lastWeekTypeRadar'));
				var lastWeekType = {
					title: {
						text: '上周任务类型比重'
					},
					tooltip: {},
					radar: {
						// shape: 'circle',
						name: {
							textStyle: {
								color: '#fff',
								backgroundColor: '#999',
								borderRadius: 3,
								padding: [3, 5]
							}
						},
						indicator: [{
								name: xData[0]
							},
							{
								name: xData[1]
							},
							{
								name: xData[2]
							},
							{
								name: xData[3]
							},
							{
								name: xData[4]
							},
							{
								name: xData[5]
							}
						]
					},
					series: [{

						name: '上周任务类型比重',
						type: 'radar',
						// areaStyle: {normal: {}},
						label: {
							normal: {
								show: true,
								//position : 'outside',
								//  position : 'insideRight',
							}

						},
						data: [{
							value: yData,
							name: '上周任务类型比重'
						}]
					}]
				}
				this.myChartPiechart3.setOption(lastWeekType);
				
				
			},
			
			//查询命令执行次数TOP5
			selectTop5() {
				service.lastWeekTOP5().then(res => {
					var xData = []
					var yData = []
					res.result.forEach((item, index) => {
						xData.push(item.name)
						yData.push(Number(item.count))
					})
					this.lastWeekTOP(xData, yData);
				})

			},
			
			//上周任务使用次数TOP5
			lastWeekTOP(xData, yData) {
				this.myChartPiechart4 = echarts.init(document.getElementById('lastWeekTop5'));
				var lastWeekTops = {
						title: {
							text: '上周任务使用次数TOP5'
						},
						color: ['#3398DB'],
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							data: xData,
							axisTick: {
								alignWithLabel: true
							}
						}],
						yAxis: [{
							type: 'value'
						}],
						series: [{
							name: '直接访问',
							type: 'bar',
							barWidth: '60%',
							data: yData,
							label: {
								show: true,
								position: 'top',
							}
						}]
					}
					this.myChartPiechart4.setOption(lastWeekTops);
					
			},

		}
	}
</script>

<style lang="scss" scoped>
	.taskPreview {
		padding: 20px;
		font-size: 14px;
		.painter {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			align-content: center;
		}
		.tabBtn {
			float: right;
			margin-right: 15px;
		}
		.tabBtnSpan {
			margin-left: 15px;
			cursor: pointer;
		}
		.inputStyle {
			width: 200px;
			height: 36px;
		}
		.el-col>div {
			margin-right: 15px;
		}
		.tableArea {
			margin-top: 20px;
		}
		.table-head-th {
			color: #fff;
			text-align: center;
			background: #409eff;
		}
		.pagination {
			float: right;
			margin-top: 20px;
		}
		
		
		
		.rowData{
			margin-left: 20px;
			margin-bottom: 15px;
			width: 100%;
			clear: both;
			display: block;
			content: '';
			zoom: 1;
			
		}
		.moduleData{
			margin-right: 15px;
			float: left;
			width: 200px;
			height: 78px;
			background: #ddd;
			text-align: center;
			color: white;
			.title{
				text-align: right;
				margin: 5px 5px 0 0;
				font-size: 16px;
			}
			.data{
				font-size: 40px;
			}
		}
	}
	.padCol{
		padding: 20px;
	}
</style>