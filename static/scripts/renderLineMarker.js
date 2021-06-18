/*
 * @Description:
 * @Author: Kotori Y
 * @Date: 2021-06-18 14:29:29
 * @LastEditors: Kotori Y
 * @LastEditTime: 2021-06-18 16:14:01
 * @FilePath: \line-marker\static\scripts\renderLineMarker.js
 * @AuthorMail: kotori@cbdd.me
 */

const genLineData = (data) => {
  const xAxis = [
    "CYP1A2-inh",
    "CYP1A2-sub",
    "CYP2C19-inh",
    "CYP2C19-sub",
    "CYP2C9-inh",
    "CYP2C9-sub",
    "CYP2D6-inh",
    "CYP2D6-sub",
    "CYP3A4-inh",
    "CYP3A4-sub",
  ];

  const lineData = [];
  let drugs = Object.keys(data);
  drugs = drugs.filter((drug) => !jQuery.isEmptyObject(data[drug]));
  if (drugs.length === 0) {
    return false;
  }

  for (let drug of drugs) {
    const temp = {
      name: drug,
      type: "line",
      data: [],
      markPoint: { data: [] },
    };

    for (let i = 0; i < xAxis.length; i++) {
      let value = data[drug][xAxis[i]];
      value = Math.round(value * 1000) / 1000;
      temp.data.push(value);
      if (value >= 0.7) {
        temp.markPoint.data.push({ coord: [i, value], value: value });
      }
    }
    lineData.push(temp);
  }

  return [drugs, xAxis, lineData];
};

const renderLineMarker = (data) => {
  const res = genLineData(data);

  if (!res) {
    return;
  }

  const [drugs, xAxis, lineData] = res;
  var chartDom = document.getElementById("lineMarker");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: "TITLE",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: drugs,
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: true },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxis,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
      },
    },
    series: lineData,
  };

  option && myChart.setOption(option);
};
