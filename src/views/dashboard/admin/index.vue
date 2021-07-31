<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <vue-apex-charts
          class="char-body"
          width="100%"
          height="300"
          :options="chartOptions"
          :series="series"
        >
        </vue-apex-charts>
      </el-col>
      <el-col :span="12">
        <vue-apex-charts
          class="char-body"
          width="100%"
          height="300"
          :options="chartOptions"
          :series="series"
        >
        </vue-apex-charts>
      </el-col>
      <el-col :span="12">
        <vue-apex-charts
          class="char-body"
          width="100%"
          height="300"
          :options="chartOptionsRadial"
          :series="seriesRadial"
        >
        </vue-apex-charts>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "DashboardAdmin",
  components: {
    VueApexCharts,
  },
  data() {
    return {
      seriesRadial: [44, 55],
      chartOptionsRadial: {
        chart: {
          height: 350,
          type: "radialBar",
          offsetX: 0,
          foreColor: "#fff",
        },
        colors: ["#FCCF31", "#17ead9", "#f02fc2"],
        plotOptions: {
          radialBar: {
            inverseOrder: false,
            hollow: {
              margin: 5,
              size: "48%",
              background: "transparent",
            },
            track: {
              show: true,
              background: "#40475D",
              strokeWidth: "10%",
              opacity: 1,
              margin: 3, // margin is in pixels
            },
            dataLabels: {
              name: {
                fontSize: "22px",
              },
              value: {
                fontSize: "16px",
              },
              total: {
                show: true,
                label: "Total",
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249;
                },
              },
            },
          },
        },
        labels: ["Apples", "Oranges"],
        legend: {
          show: true,
          position: "left",
          offsetX: -30,
          offsetY: -10,
          formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
            gradientToColors: ["#F55555", "#6078ea", "#6094ea"],
          },
        },
      },
      series: [
        {
          name: "Desktops",
          data: [120, 41, 335, 501, 409, 612, 629, 391, 148],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 15,
            left: 3,
            blur: 3,
            color: "#000",
            opacity: 0.35,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Product Trends by Month",
          align: "left",
          style: {
            color: "white",
          },
        },
        // colors: ["#db2e03", "#6bdb03"],
        grid: {
          show: false,
        },
        stroke: {
          curve: "smooth",
        },
        colors: ["#FCCF31", "#17ead9", "#f02fc2"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
            gradientToColors: ["#F55555", "#6078ea", "#6094ea"],
          },
        },
        tooltip: {
          theme: "dark",
        },
        legend: {
          labels: {
            useSeriesColors: true,
          },
        },
        // title: {
        //   text: '',
        //   style: {
        //     color: 'white'
        //   }
        // },
        yaxis: {
          labels: {
            style: {
              colors: "white",
            },
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
          labels: {
            style: {
              colors: "white",
            },
          },
        },
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: #181e36;
  height: calc(100vh - 50px);
  overflow-x: auto;
}

.char-body {
  background-color: #1f2644;
  padding: 1em;
  border-radius: 10px;
  margin: 1rem 0;
}
</style>


