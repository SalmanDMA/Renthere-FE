<template>
  <div class="p-10">
    <label class="block mb-2 font-bold"
      >Total Cars, Bikes, Users, Transactions, Testimonials</label
    >
    <client-only>
      <bar-chart :data="chartData" />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'ChartVue',
  props: {
    cars: {
      type: Array,
      required: true,
    },
    bikes: {
      type: Array,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
    transactions: {
      type: Array,
      required: true,
    },
    testimonials: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chartData() {
      return {
        labels: ['Cars', 'Bikes', 'Users', 'Transactions', 'Testimonials'],
        datasets: [
          {
            label: '',
            data: [
              this.cars.length,
              this.bikes.length,
              this.users.length,
              this.transactions.length,
              this.testimonials.length,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 4,
          },
        ],
      }
    },
  },
}
</script>
