<template>
   	 <div style="width:48%;">
	  	<span class="sp">
	  		<span>{{obj.info}}</span>
	  	</span>
	  	<div :id="obj.type" :style="{width: '100%', height: '380px'}"></div>
	</div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  export default {
    name: "overview-echars",
	props: [ 'obj','tmpDatas','taskDatas','agentDatas','discoverDatas'],
	data () {
      return {
      }
	},
	mounted () {
	  if(this.tmpDatas){
	  	  this.initChart(1)
	  }else if(this.taskDatas){
	  	  this.initChart(2)
	  }else if(this.agentDatas){
	  	  this.initChart(3)
	  }else if(this.discoverDatas) {
	  	  this.initChart(4)
	  }
	},
	methods: {
		  initChart(type) {
		  	       if(type == 2){
		  	       	 var data = [  
                        {value:this.taskDatas[0],name:'执行失败',itemStyle:{normal:{color:'#F57A7A'}}},  
                        {value:this.taskDatas[1],name:'待执行',itemStyle:{normal:{color:'#FFEA9C'}}},  
                        {value:this.taskDatas[2],name:'执行中',itemStyle:{normal:{color:'#91C4FD'}}}, 
                        {value:this.taskDatas[3],name:'执行暂停',itemStyle:{normal:{color:'#FEF7F7'}}},
                        {value:this.taskDatas[4],name:'执行成功',itemStyle:{normal:{color:'#A0DCC1'}}},
                    ];
                    var datas = {
						    seriesData:[],
						    legendData:[],
						    color:[]
						};
						for(var i=0;i<data.length;i++){
						    datas.seriesData.push({
						        value:data[i].value, name:data[i].name+':'+data[i].value
						    });
						    datas.legendData.push(data[i].name+':'+data[i].value);
						    datas.color.push(data[i].itemStyle.normal.color);
						}
					let myChart2 = echarts.init(document.getElementById('myChart1'))
					      myChart2.setOption({
			                color:datas.color,
						    tooltip: {
						        trigger: 'item',
						        formatter: "{b} ({d}%)"
						    },
						    legend: {
						    	color:['#F57A7A','#FFEA9C','#91C4FD','#FEF7F7','#A0DCC1'],
						        orient: 'vertical',
						        x: 'right',
						        top:30,
						        right:10,
						        data: datas.legendData
						    },
						    series: [
						        {
						            type:'pie',
						            radius: ['0', '55%'],
						            label: {
						                normal: {
						                    formatter: '{d}%  ',
						                }
						            },
						            data:datas.seriesData
						        }
						    ]
			            });
		  	       }else if( type ==3 )
		  	       {
		  	       	 var data1 = [  
                        {value:this.agentDatas[0],name:'已安装数量',itemStyle:{normal:{color:'#91C4FD'}}},  
                        {value:this.agentDatas[1],name:'未安装数量',itemStyle:{normal:{color:'#FFEA9C'}}},  
                        {value:this.agentDatas[2],name:'运行正常',itemStyle:{normal:{color:'#A0DCC1'}}}, 
                        {value:this.agentDatas[3],name:'运行异常',itemStyle:{normal:{color:'#F57A7A'}}}
                    ];
					var datas1 = {
					    seriesData:[],
					    legendData:[],
					    color:[]
					};
					var data_or = []
					for(var i=0;i<data1.length;i++){
					    if ( i==0 || i==1 ) {
					    	datas1.seriesData.push({
					        value:data1[i].value, name:data1[i].name+':'+data1[i].value
					        });
					    }
					    datas1.legendData.push(data1[i].name+':'+data1[i].value);
					    datas1.color.push(data1[i].itemStyle.normal.color);
					    if ( i==2 || i==3 ) {
					    	data_or.push({
					    	value:data1[i].value, name:data1[i].name+':'+data1[i].value
					      })
					    }
					}
					/*var data_or = [datas1.seriesData[2],datas1.seriesData[3]]*/
					let myChart3 = echarts.init(document.getElementById('myChart2'))
					myChart3.setOption({
		              color:datas1.color,
		              tooltip: {
							        trigger: 'item',
							        formatter: "{a} <br/>{b}: {c} ({d}%)"
							    },
							    legend: {
							    	color:['#91C4FD','#FFEA9C','#A0DCC1','#F57A7A'],
							        orient: 'vertical',
							        x: 'right',
							        top:40,
							        data:datas1.legendData
							    },
							    series: [
							        {
							            name:'',
							            type:'pie',
							            selectedMode: 'single',
							            radius: ['0%','40%'],

							            label: {
							                normal: {
							                    position: 'inner'
							                }
							            },
							            labelLine: {
							                normal: {
							                    show: false
							                }
							            },
							            data:data_or
							        },
							        {
							            name:'',
							            type:'pie',
							            radius: ['40%', '55%'],
							            label: {
							                normal: {
							                      formatter: '{d}%  ',
							                }
							            },
							            data:datas1.seriesData
							        }
							    ]
		            })
		  	       } else if( type == 4 ) {
		  	       	  let dataname = []
		  	       	  let datacount = []
		  	       	  if( this.discoverDatas ) {
		  	       	  	  for( let i=0;i<this.discoverDatas.length;i++ ) {
		  	       	  	  	  dataname.push( this.discoverDatas[i].resourceName )
                              datacount.push( this.discoverDatas[i].count )
		  	       	  	  }
		  	       	  }
                      let myChart4 = echarts.init(document.getElementById('myChart3'))
			            myChart4.setOption({
			              color: ['#42B983'],
							    tooltip : {
							        trigger: 'axis',
							        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							        }
							    },
							    grid: {
							    	top: '15%',
							        left: '10%',
							        right: '10%',
							        bottom: '5%',
							        containLabel: true
							    },
							    xAxis : [
							        {
							            type : 'category',
							            data : dataname,
							            axisTick: {
							                alignWithLabel: false
							            }
							        }
							    ],
							    yAxis : [
							        {
							            type: 'value',
							            scale: true,
							            name: '数量',
							            max: 400,
							            min: 0,
							            interval: 100
							        }
							    ],
							    series : [
							        {
							            name:'',
							            type:'bar',
							            barWidth: '20%',
							            data:datacount
							        }
							    ] 	
			            })
		  	       }
	        // 模板的echarts实例
	        if(type == 1)
	        {
	        let myChart1 = echarts.init(document.getElementById('myChart0'))
	        	 // 绘制图表
			        myChart1.setOption({
						    color: ['#42B983'],
						    tooltip : {
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						        }
						    },
						    grid: {
						    	top: '15%',
						        left: '10%',
						        right: '10%',
						        bottom: '5%',
						        containLabel: true
						    },
						    legend: {
						        data:['模板','指标']
						    },
						    xAxis : [
						        {
						            type : 'category',
						            data : ['平台资源', '日志', '数据库', '中间件', '自定义'],
						            axisTick: {
						                alignWithLabel: true
						            }
						        }
						    ],
						    yAxis : [
						        {
						            type: 'value',
						            scale: true,
						            name: '模板数量',
						            max: 100,
						            min: 0,
						            interval: 20
						        },
						        {
						            type: 'value',
						            scale: true,
						            name: '指标数量',
						            max: 100,
						            min: 0,
						            interval: 20
						        }
						    ],
						    series : [
						        {
						            name:'模板',
						            type:'bar',
						            barWidth: '20%',
						            data: this.tmpDatas.tmp
						        },
						        {
						            name:'指标',
						            type:'line',
						            color:'red',
						            stack: '总量',
						            data: this.tmpDatas.kpi
						        },
						    ]
			        });
			}
	      }
	    }
	}
</script>

<style lang="scss" scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .sp {
    display: inline-block;
    font-family: PingFangSC-Semibold;
	font-size: 15px;
	color: #56A97D;
	letter-spacing: 0;
    font-weight: bold;
    margin-top: 10px;
    padding-left: 20px;
    span {
      padding-left: 10px;
      border-left: 3px solid #42B983;
    }

    i {
      padding-left: 10px;
    }
  }
</style>