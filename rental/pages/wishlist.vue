<template>
  <main class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-5 sm:px-10">
    <h1 class="text-3xl font-semibold text-[#333] mb-12 text-center">
      My Wishlist
      <span class="text-orange-400 text-sm">
        ({{ lengthWishlist }} items)
      </span>
    </h1>
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <article v-for="item in wishlists" :key="item.id">
        <product-card-wishlist
          :item="item"
          @remove="removeWishList"
          @add="addWishList"
        />
      </article>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCardWishlist from '~/components/Wishlist/ProductCardWishlist.vue'
export default {
  name: 'Wishlist',
  components: { ProductCardWishlist },
  head() {
    return {
      title: 'Wishlist - RentHere',
    }
  },
  computed: {
    ...mapGetters({
      lengthWishlist: 'wishlist/getLengthWishlist',
      wishlists: 'wishlist/getWishlists',
    }),
  },
  methods: {
    async removeWishList(id) {
      try {
        const response = await this.$axios.delete(`/wishlists/${id}`, {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        if (response.data.status === 'success') {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-green-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
          this.$store.dispatch('wishlist/fetchWishlists')
        } else {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 300)
        }
      } catch (error) {
        this.$store.commit('toast/setToast', {
          message: error.message,
          show: true,
          backgroundColor: 'bg-red-500',
        })
        setTimeout(() => {
          this.$store.commit('toast/closeToast')
        }, 300)
      }
    },
    async addWishList(dataTransaction) {
      await console.log(dataTransaction)
      try {
        const response = await this.$axios.post(
          '/transactions',
          dataTransaction,
          {
            headers: {
              Authorization: this.$auth.getToken('local'),
            },
          }
        )
        if (response.data.status === 'success') {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-green-500',
          })
          this.$router.push('/cart')
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
          this.$store.dispatch('transactions/fetchTransactionLength')
        }
      } catch (error) {
        console.error(error)
        this.$store.commit('toast/setToast', {
          message: error,
          show: true,
          backgroundColor: 'bg-red-500',
        })
        setTimeout(() => {
          this.$store.commit('toast/closeToast')
        }, 3000)
      }
    },
  },
}
</script>

<style></style>
