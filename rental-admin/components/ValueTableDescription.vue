<template>
  <div class="vehicle-description">
    <div v-if="!vehicle.expanded" class="vehicle-description-content">
      {{ shortDescription }}
    </div>
    <div v-else class="vehicle-description-content">
      {{ vehicle.description }}
    </div>
    <span
      class="read-more"
      @click="
        type === 'bike'
          ? toggleBikeDescription(vehicle.id)
          : toggleCarDescription(vehicle.id)
      "
    >
      {{ vehicle.expanded ? 'Read less' : 'Read more' }}
    </span>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ValueTableDescription',
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      shortDescription: '',
    }
  },
  watch: {
    expanded() {
      this.updateShortDescription()
    },
  },
  created() {
    this.updateShortDescription()
  },
  methods: {
    ...mapActions({
      toggleBikeDescription: 'vehicles/toggleBikeDescription',
      toggleCarDescription: 'vehicles/toggleCarDescription',
    }),
    updateShortDescription() {
      if (this.vehicle.description.length > 100 && !this.vehicle.expanded) {
        this.shortDescription = this.vehicle.description.slice(0, 100) + '...'
      } else {
        this.shortDescription = this.vehicle.description
      }
    },
  },
}
</script>

<style scoped>
.read-more {
  cursor: pointer;
  color: blue;
}
</style>
