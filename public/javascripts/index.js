$(document).ready(function () {
                  var timeData = [],
                  temperatureData = [],
                  repData = [];
                  var data = {
                  labels: timeData,
                  datasets: [
                             {
                             fill: false,
                             label: 'Intensity',
                             yAxisID: 'Peaks',
                             borderColor: "rgba(255, 204, 0, 1)",
                             pointBoarderColor: "rgba(255, 204, 0, 1)",
                             backgroundColor: "rgba(255, 204, 0, 0.4)",
                             pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
                             pointHoverBorderColor: "rgba(255, 204, 0, 1)",
                             data: temperatureData
                             }
                             ]
                  }
                  
                  var data2 = {
                  labels: timeData,
                  datasets: [
                             {
                             fill: false,
                             label: 'Rep',
                             yAxisID: 'Rep',
                             borderColor: "rgba(255, 204, 0, 1)",
                             pointBoarderColor: "rgba(255, 204, 0, 1)",
                             backgroundColor: "rgba(255, 204, 0, 0.4)",
                             pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
                             pointHoverBorderColor: "rgba(255, 204, 0, 1)",
                             data: repData
                             }
                             ]
                  }
                  
                  var basicOption2 = {
                  title: {
                  display: true,
                  text: 'Rep Real-time Data',
                  fontSize: 36
                  },
                  scales: {
                  yAxes: [{
                          id: 'Rep',
                          type: 'linear',
                          scaleLabel: {
                          labelString: 'Rep',
                          display: true
                          },
                          position: 'left',
                          }]
                  }
                  }
                  
                  var basicOption = {
                  title: {
                  display: true,
                  text: 'Intensity Real-time Data',
                  fontSize: 36
                  },
                  scales: {
                  yAxes: [{
                          id: 'Peaks',
                          type: 'linear',
                          scaleLabel: {
                          labelString: 'Intensity',
                          display: true
                          },
                          position: 'left',
                          }]
                  }
                  }
                  
                  //Get the context of the canvas element we want to select
                  var ctx = document.getElementById("myChart").getContext("2d");
                  var ctx2 = document.getElementById("myChart2").getContext("2d");
                  var optionsNoAnimation = { animation: false }
                  var myLineChart = new Chart(ctx, {
                                              type: 'line',
                                              data: data,
                                              options: basicOption
                                              });
                  
                  var myLineChart2 = new Chart(ctx2, {
                                              type: 'line',
                                              data: data2,
                                              options: basicOption2
                                              });
                  
                  var ws = new WebSocket('wss://' + location.host);
                  ws.onopen = function () {
                  console.log('Successfully connect WebSocket');
                  }
                  ws.onmessage = function (message) {
                  console.log('receive message' + message.data);
                  try {
                  var obj = JSON.parse(message.data);
                  
                  /*
                   if(!obj.time || !obj.voltage) {
                   return;
                   }*/
                  
                  
                  timeData.push(obj.time);
                  temperatureData.push(obj.voltage);
                  repData.push(obj.voltage);
                  // only keep no more than 50 points in the line chart
                  const maxLen = 50;
                  var len = timeData.length;
                  if (len > maxLen) {
                  timeData.shift();
                  temperatureData.shift();
                  repData.shift();
                  }
                  
                  myLineChart.update();
                  myLineChart2.update();
                  } catch (err) {
                  console.error(err);
                  }
                  }
});
