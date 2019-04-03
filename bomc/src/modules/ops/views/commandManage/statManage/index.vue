<template>
	<div class="statManage">
		<!--<div class="tabBtn">
			<span class="tabBtnSpan">
				<i class="el-icon-news"></i>
				<span>显示图表</span>
			</span>
			<span class="tabBtnSpan">
				<i class="el-icon-tickets"></i>
				<span>显示列表</span>
			</span>
		</div>-->
		<el-tabs v-model="activeName" @tab-click="handleClick" >
			<el-tab-pane label="显示图表" name="first">
				<el-row>
					<el-col :span="12" class="padCol">
						<el-card class="box-card">
							<span class="title"><b>|</b>&nbsp;&nbsp;&nbsp;前7天任务执行量</span>
							<div>
								<div id="mainDay" style="height:400px;"></div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="padCol">
						<el-card class="box-card">
							<span class="title"><b>|</b>&nbsp;&nbsp;&nbsp;当日执行量</span>
							<div>
								<div id="main" style="height:400px;"></div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12" class="padCol">
						<el-card class="box-card">
							<span class="title"><b>|</b>&nbsp;&nbsp;&nbsp;执行成功率</span>
							<div>
								<div id="mainPiechart" style="height:400px;"></div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="padCol">
						<el-card class="box-card">
							<span class="title"><b>|</b>&nbsp;&nbsp;&nbsp;命令执行次数</span>
							<div>
								<div id="mainovertime" style="height:400px;"></div>
							</div>
						</el-card>
					</el-col>
				</el-row>

				<!-- <div class="painter" v-show="true">
					<div id="mainDay" style="width: 600px;height:400px;"></div>
					<div id="main" style="width: 600px;height:400px;"></div>
					<div id="mainPiechart" style="width: 600px;height:400px;"></div>
					<div id="mainovertime" style="width: 600px;height:400px;"></div>
				</div> -->
			</el-tab-pane>

			<el-tab-pane label="显示列表" name="second">
				<allJournal v-bind:types="types" v-bind:typeBol="typeBol" ref="allJournal"></allJournal>
			</el-tab-pane>

		</el-tabs>

	</div>
</template>

<script>
	import echarts from 'echarts'
	import * as service from '@/modules/ops/api/ops/commandManage/admilManage.js'
	// 日志表格组件
	import allJournal from '@/modules/ops/components/table/log/allJournal'
	export default {
		components: {
			allJournal,
		},
		data() {
			return {
				// ----------------------------------
				types:'',
				typeBol:"10",
				// 表格加载状态bol
				tableLoading: true,
				// ----------------------------------
				selectValue: '',
				orderNmae: '',
				chart: null,
				activeName: 'first',
				pageSize: 10, // 每页多少条
				currentPage: 1, // 当前页
				totalCount: 1, // 总条数
				TopTen: '',
				queryStartTime: '',
				queryEndTime: '',
				name: '',
				times: [],
				dealObj: [{
						label: "操作对象"
					},
					{
						label: "主机操作"
					},
					{
						label: "数据库操作"
					},
					{
						label: "网络"
					},
					{
						label: "中间件"
					}

				],
				tableData: [],
				myChartPiechart1:null,
				myChartPiechart2:null,
				myChartPiechart3:null,
				myChartPiechart4:null,
			}
		},

		mounted() {
			this.queryData();
			this.selectDayTask();
			this.selectDayTaskList();
			this.selectTopTen();
			this.ExecutionSuccRate();
			this.init();
		},

		methods: {
			// --------------------------------------------------------
			// 窗口事件
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
			// --------------------------------------------------------

			handleClick(tab, event) {
				console.log(tab, event);
			},
			queryData() {
				this.paintGraphPiechart()
			},

			//前七天任务执行量
			
			paintGraphBroken(xData, yData) {
				function dataNow(AddDayCount) {
					var dd = new Date();
					dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
					//  var y = dd.getFullYear();
					var m = dd.getMonth()+1;//获取当前月份的日期
					var d = dd.getDate();
					return m+"-"+d;
				}
				var maxs = ''
				var chenfa = 1
				maxs = Math.max(...yData)
				for(var i = 0 ; i <String(maxs).length-1;i++){
					chenfa = chenfa * 10
				}
				maxs = Math.ceil(maxs/chenfa) * chenfa
				var Time1=dataNow(0);
				var Time2=dataNow(-1);
				var Time3=dataNow(-2);
				var Time4=dataNow(-3);
				var Time5=dataNow(-4);
				var Time6=dataNow(-5);
				var Time7=dataNow(-6);
				var _self = this
				this.myChartPiechart1 = echarts.init(document.getElementById('mainDay'));

				var option1 = {
					title: {
						text: ''
					},
					xAxis: {
						type: 'category',
						data: [Time1,Time2,Time3,Time4,Time5,Time6,Time7]
					},
					yAxis: {
						name: "次数/次",
						type: 'value',
						min: 0,
						max: maxs,
					},
					series: [{
						data: yData,
						type: 'line',
						smooth: true , //true 为平滑曲线，false为直线
						itemStyle : {  
							normal : {  
								lineStyle:{  
									color:'#42B983'  ,
									width:5
								}  
							}  
						}, 
					}]
				};
				this.myChartPiechart1.setOption(option1);
				this.myChartPiechart1.on('click', function (params) {
				    _self.times.push(params.name)
				    _self.times.push(params.name)
				    // _self.queryCommand()
				    _self.activeName = 'second'
				    _self.times = []
				    
				});
			},
  			
  			

			//查询日任务量
			selectDayTask() {

				service.queryDailytask().then(res => {
					var xData = []
					var yData = []
//					for(var key in res.result) {
//						xData.push(key)
//						yData.push(res.result[key])
//					}
					for(var i = 0;i<res.result.length;i++){
						xData.push(res.result[i].time)
						yData.push(res.result[i].count)
					}
					this.paintGraphBroken(xData, yData)
				})

			},
			
		   
			
			
			
			//命令执行次数TOP10
			paintGraphOvertime(xData, yData) {
				var dataY = []
				var dataX = []
				yData.forEach(function(item){
					console.log("forEach循环"+item);
				});
				for(let val in yData){
					console.log("for in循环"+val)
				}
				for(let val of yData){
					console.log("for of循环"+val)
				}
				for(let val of yData){
					dataY.push(val)
				}
				for(let val of xData){
					dataX.push(val)
				}
				var maxs = ''
				var chenfa = 1
				maxs = Math.max(...dataY)
				for(var i = 0 ; i <String(maxs).length-1;i++){
					chenfa = chenfa * 10
				}
				maxs = Math.ceil(maxs/chenfa) * chenfa
				// 基于准备好的dom，初始化echarts实例
				this.myChartPiechart4 = echarts.init(document.getElementById('mainovertime'));
				// 指定图表的配置项和数据
				var option3 = {
					tooltip: {
					trigger: "axis"
					},
					legend: {
					data: ["次数"]
					},
					xAxis: [
					{
						type: "category",
						name: "T/月-日",
						data: dataX,
						axisLine: {
						symbol: ["none", "arrow"],
						symbolSize: [5, 7],
						lineStyle: {
							color: "#979797"
						}
						}
					}
					],
					yAxis: [
					{
						type: "value",
						name: "次数/次",
						data: dataY,
						min: 0,
						max: maxs,
						axisLine: {
						symbol: ["none", "arrow"],
						symbolSize: [5, 7],
						lineStyle: {
							color: "#979797"
						}
						}
					},
					],
					series: [
					{
						name: "次数",
						type: "bar",
						barWidth: 15,
						itemStyle: {
						normal: {
							color: "#42B983",
							barBorderRadius: [18, 18, 18, 18]
						}
						},
						data: dataY
					},
					]
				}

				this.myChartPiechart4.setOption(option3);
			},

			//查询命令执行次数TOP10
			selectTopTen() {
				let params = {
					number: 10
				}

				service.queryTopTen(params).then(res => {
					console.log(res)
					var xData = []
					var yData = []
					res.result.forEach((item, index) => {
						xData.push(item.name)
						yData.push(Number(item.useCount))
					})
					this.paintGraphOvertime(xData, yData);
				})

			},

			//当日执行量
			paintGraph(xData, yData) {
				// 基于准备好的dom，初始化echarts实例
				this.myChartPiechart2 = echarts.init(document.getElementById('main'));
				// 指定图表的配置项和数据
				var maxs = ''
				var chenfa = 1
				maxs = Math.max(...yData)
				for(var i = 0 ; i <String(maxs).length-1;i++){
					chenfa = chenfa * 10
				}
				maxs = Math.ceil(maxs/chenfa) * chenfa
				var option = {
					title: {
						text: ''
					},
					xAxis: {
						type: 'category',
						data: xData,
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							interval: 0,
							rotate: 40
						}
					},
					yAxis: {
						name: "次数/次",
						type: 'value',
						min: 0,
						max: maxs,
					},
					series: [{
						data: yData,
						type: 'line',
						smooth: true , //true 为平滑曲线，false为直线
						itemStyle : {  
							normal : {  
								lineStyle:{  
									color:'#42B983'  ,
									width:5
								}  
							}  
						}, 
					}]
				}
				this.myChartPiechart2.setOption(option);
			},

			//查询当日执行量
			selectDayTaskList() {
				service.queryDaytask().then(res => {
					var xData = []
					var yData = []
					for(var key in res.result) {
						xData.push(key)
						yData.push(res.result[key])
					}
					this.paintGraph(xData, yData)
				})
			},

			//执行成功率
			ExecutionSuccRate() {
				service.ExecutionSuccRate().then(res => {
					//					var dataName = []
					//					var dataKey = []

					//					for(var key in res.result) {
					//						dataName.push(key)
					//						dataKey.push(res.result[key])
					//					}
					this.paintGraphPiechart(res.result);
				})

			},

			//饼图执行成功率
			paintGraphPiechart(result) {
				var dataName = []
				var dataKey = []

				for(var key in result) {
					dataName.push(key)
					dataKey.push(result[key])
				}
				console.log(dataKey.length)
				this.myChartPiechart3 = echarts.init(document.getElementById('mainPiechart'));
				var radius = [65, 75];
				var seriesPie = [];
				var colorArr = ['#4690FE','#FF9300','#FF3000','#46BC15']
				for(var i = 0;i<dataKey.length;i++){
					var colors = ''
					var centers = []
					// if(dataKey[i]!=null){
					// 	if(dataKey[i]<25){
					// 		colors = '#FF3000'
					// 	}else if(dataKey[i]<50){
					// 		colors = '#FF9300'
					// 	}else if(dataKey[i]<75){
					// 		colors = '#4690FE'
					// 	}else if(dataKey[i]>75){
					// 		colors = '#46BC15'
					// 	}
					// }else {
					// 	dataKey[i] = '100'
					// 	colors = '#46BC15'
					// }
					if(dataKey[i]==null){
						dataKey[i] = '100'
					 	// colors = colorArr[3]
					}

					console.log(dataKey[i])
					if(i == 0){
						centers = ['30%','30%']
					}else if (i == 1){
						centers = ['70%','30%']
					}else if (i == 2){
						centers = ['30%','75%']
					}else if (i == 3){
						centers = ['70%','75%']
					}
					var centerOne = Number(10 + i*20 ) + "%"
					var centerTwo = '50%'
					var datas = {
						type: 'pie',
						center:centers,
						radius: radius,
						x: '0%', // for funnel
						data: [{
							name: dataName[i],
							value: dataKey[i],
							label: {
								position: 'center',
								formatter: '{d}' + '%\n' + '{b}'
							},
							labelLine: {
								show: false,
								emphasis: {
									show: false
								}
							},
							itemStyle: {
								width:2,
								color:colorArr[i]
							}
						}, {
							name: 'other',
							value: 100 - dataKey[i],
							label: {
								show: false
							},
							labelLine: {
								show: false,
								emphasis: {
									show: false
								}
							},
							itemStyle: {
								color: '#ddd'
							}
						}]
					}
					seriesPie.push(datas)
				}
				var optionPiechart = {
					title: {
						text: ''
					},
					series: seriesPie
				}

				this.myChartPiechart3.setOption(optionPiechart);
			},

		},

	}
</script>

<style lang="scss" scoped>
	.el-range-editor--medium .el-range-separator{
		width: 30px;
	}
	.statManage {
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
	}
	
	.butStyle {
		float: right;
	}
	.padCol {
		padding: 20px;
	}
	.title {
		font-size: 16px;
		padding-top: 1.5%;
		margin-left: 3.7%;
		color: #42b983;
	}
</style>