<template>
  <div>
    <div class="left-space">
      <h3>实时分析</h3>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card
            shadow="hover"
            :body-style="{ padding: '10px' }"
            style="
              background: linear-gradient(
                177deg,
                rgb(253, 253, 253),
                rgb(233, 244, 253)
              );
              height: 140px;
            ">
            <div class="msg-title">今日新增报名</div>
            <div class="msg-num">
              {{ increase_num }}
            </div>
            <span
              style="display: inline-block; font-size: 12px; margin-top: 10px">
              <strong style="margin-left: 20px"> 较昨 </strong>
            </span>
            <span
              style="
                position: relative;
                margin-left: 10px;
                top: 5px;
                font-size: 18px;
              ">
              <span>
                <el-icon v-if="up" color="red"><Top /></el-icon>
              </span>
              <span>
                <el-icon v-if="down" color="green"><Bottom /></el-icon>
              </span>
            </span>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            shadow="hover"
            style="
              height: 140px;
              background: linear-gradient(
                177deg,
                rgb(259, 259, 252),
                rgb(235, 253, 239)
              );
            "
            :body-style="{ padding: '10px' }">
            <div class="msg-title">累计报名总量</div>
            <div class="msg-num">
              {{ cumulation_num }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            shadow="hover"
            :body-style="{ padding: '10px' }"
            style="
              height: 140px;
              background: linear-gradient(
                177deg,
                rgb(248, 249, 253),
                rgb(238, 229, 252)
              );
            ">
            <div class="msg-title">当前正在进行流程</div>
            <div class="msg-num">
              {{ current_step }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            shadow="hover"
            :body-style="{ padding: '10px' }"
            style="
              height: 140px;
              background: linear-gradient(
                167deg,
                rgb(252, 252, 248),
                rgb(249, 237, 216)
              );
            ">
            <div class="msg-title">当前流程人数</div>
            <div class="msg-num">
              {{ current_num }}
            </div>
          </el-card>
        </el-col>
      </el-row>
      <span
        style="
          display: inline-block;
          height: 50px;
          font-weight: 600;
          margin-top: 20px;
        "
        >报名增长趋势</span
      >

      <el-date-picker
        v-model="month"
        type="month"
        style="
          display: flex;
          float: right;
          top: 20px;
          right: 50px;
          width: 120px;
          z-index: 2;
          font-size: 12px;
        "
        @change="changeMonth" />

      <v-chart class="charts" :option="option" autoresize />
      <div class="person">
        <span class="title"> 人员管理 </span>
        <div>
          <el-table
            :data="Person_tableData"
            class="table"
            max-height="160"
            :header-cell-style="{ background: '#5793df', color: '#fff' }"
            border
            @row-click="test_click">
            <el-table-column
              prop="name"
              label="姓名"
              width="100"
              align="center" />
            <el-table-column prop="no" label="学号" width="" align="center" />
            <el-table-column
              prop="step"
              label="当前考核流程"
              align="center"
              width="" />
          </el-table>
        </div>
      </div>
    </div>
    <div class="right-space">
      <div style="display: inline-block; width: 90%; height: 100%">
        <div class="announce">
          <span class="title"> 公告设置 </span>
          <div>
            <el-table
              :data="Announce_tableData"
              class="table"
              max-height="180"
              :header-cell-style="{ background: '#5793df', color: '#fff' }"
              border
              @row-click="announce_click">
              <el-table-column
                prop="title"
                label="标题"
                width=""
                align="center" />
              <el-table-column
                prop="date"
                label="发布时间"
                width=""
                align="center" />
            </el-table>
          </div>
        </div>
        <div class="test">
          <span class="title"> 考核管理 </span>
          <div>
            <el-table
              :data="Test_tableData"
              class="table"
              max-height="180"
              :header-cell-style="{ background: '#5793df', color: '#fff' }"
              border
              @row-click="test_click">
              <el-table-column
                prop="title"
                label="考核名称"
                width=""
                align="center" />
              <el-table-column
                prop="date"
                label="发布时间"
                width=""
                align="center" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { UniversalTransition } from "echarts/features";
import { GaugeChart } from "echarts/charts";
import VChart from "vue-echarts"; //按需引入
use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  TooltipComponent,
  UniversalTransition,
  GaugeChart,
]);
const option = ref({
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    boundaryGap: false, //x轴文本置中
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value}",
    },
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
      name: "Tempature",
    },
  ],
});
const Announce_tableData = [
  {
    date: "2016-05-03",
    title: "Tom",
  },
  {
    date: "2016-05-02",
    title: "Tom",
  },
  {
    date: "2016-05-04",
    title: "Tom",
  },
  {
    date: "2016-05-01",
    title: "Tom",
  },
];
const Test_tableData = [
  {
    date: "2016-05-03",
    title: "Tom",
  },
  {
    date: "2016-05-02",
    title: "Tom",
  },
  {
    date: "2016-05-04",
    title: "Tom",
  },
  {
    date: "2016-05-01",
    title: "Tom",
  },
];
const Person_tableData = [
  {
    no: "3123004419",
    name: "Tom",
    step: "一面",
  },
  {
    no: "3123004419",
    name: "Tom",
    step: "一面",
  },
  {
    no: "3123004419",
    name: "Tom",
    step: "一面",
  },
  {
    no: "3123004419",
    name: "Tom",
    step: "一面",
  },
];
const increase_num = ref(1111);
const cumulation_num = ref(1212);
const current_step = ref("一面");
const current_num = ref(1212);
const month = ref("2024-09");
const up = ref(true); //较昨日新增人数 上涨
const down = ref(false); //较昨日新增人数 下调
const announce_click = (row, column, event) => {
  console.log(row, column, event);
};
</script>

<style scoped>
.left-space {
  display: inline-block;
  width: 60%;
  height: 100%;
  border-right: 1px solid gainsboro;
  padding: 10px;
}

.right-space {
  display: flex;
  float: right;
  width: 35%;
  height: 100%;
}

.msg-title {
  text-align: center;
  margin-top: 12px;
  font-size: 16px;
  font-weight: 700;
}

.msg-num {
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  margin-left: 10px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.announce {
  display: inline-block;
  width: 100%;
  height: 220px;
  margin-top: 25px;
  margin-left: 20px;
  border: 1px solid gainsboro;
  box-shadow: 0 0 5px 3px gainsboro;
}
.table {
  width: 95%;
  display: inline-block;
  position: relative;
  left: 50%;
  margin-top: 10px;
  transform: translateX(-50%);
}
.test {
  display: inline-block;
  width: 100%;
  height: 220px;
  margin-top: 50px;
  margin-left: 20px;
  border: 1px solid gainsboro;
  box-shadow: 0 0 5px 3px gainsboro;
}
.increase {
  width: 100%;
  height: 130px;
  background-color: #e9f4fd;
}
.cumulation {
  width: 100%;
  height: 130px;
  background-color: #ebfdef;
}
.now {
  width: 100%;
  height: 130px;
  background-color: #eee5fc;
}
.num {
  width: 90%;
  height: 130px;
  background-color: #f9ecd8;
}
.person {
  width: 95%;
  height: 200px;
  border: 1px solid gainsboro;
  box-shadow: 0 0 5px 3px gainsboro;
}
.title {
  display: inline-block;
  margin-top: 10px;
  margin-left: 20px;
}
.pick-month {
  display: flex;
  position: relative;
  float: right;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 30px;
}
.charts {
  height: 300px;
  margin-top: -50px;
}
/*  如果容器是隐藏的，ECharts 可能会获取不到 DIV 的高宽导致初始化失败，
这时候可以明确指定 DIV 的style.width和style.height，
或者在div显示后手动调用 resize 调整尺寸。 */
</style>
