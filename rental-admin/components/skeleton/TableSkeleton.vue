<template>
  <tbody>
    <tr v-for="i in 3" :key="i">
      <td
        v-for="j in td"
        :key="j"
        class="bg-black/40 border border-orange-400 px-8 py-10 animate-pulse cursor-wait rounded-lg"
      ></td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'TableSkeleton',
  props: {
    td: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style></style>
