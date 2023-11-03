import Vue from 'vue'
import { Bar } from 'vue-chartjs'

Vue.component('BarChart', {
  extends: Bar,
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "#7895CB",
          titleFontColor: "#ffffff",
          bodyFontColor: "#ffffff",
          position: "nearest",
          mode: "nearest",
          intersect: false,
          bodySpacing: 4,
          xPadding: 20,
        },
      }),
    },
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    },
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
})
