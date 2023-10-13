<!-- components/Particle.vue -->
<template>
  <particles-bg
    type="cobweb"
    color="#ffffff"
    num="100"
    :bg="true"
    :canvas="{ backgroundColor: '#1D243D', zIndex: 1 }"
  />
</template>

<script>
export default {
  name: 'ParticleJS',
}
</script>

<style scoped></style>
