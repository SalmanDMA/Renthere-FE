<template>
  <section class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10 relative">
    <div
      class="animated text-center bg-[#212942] rounded-[9px] border-t-[10px] border-t-[#79a6fe] border-b-[10px] border-b-[#79a6fe] w-[280px] sm:w-[450px] shadow-md shadow-white z-10 py-5 px-10 flex flex-col gap-5 justify-between items-center absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <auth-title
        v-if="showRegister"
        description="Sign in to your
      account."
      />
      <auth-title v-else description="Sign up for create your account." />
      <login-input
        v-if="showRegister"
        @register="register"
        @submit="submitForm"
      />
      <register-input v-else @register="register" @submit="submitForm" />
    </div>
    <particle-js />
  </section>
</template>

<script>
import LoginInput from '~/components/Auth/LoginInput.vue'
import RegisterInput from '~/components/Auth/RegisterInput.vue'
export default {
  name: 'Auth',
  components: { LoginInput, RegisterInput },
  layout: 'empty',
  data() {
    return {
      showRegister: true,
    }
  },
  head() {
    return {
      title: this.showRegister ? 'Login - RentHere' : 'Register - RentHere',
    }
  },
  methods: {
    register() {
      this.showRegister = !this.showRegister
    },
    submitForm(data) {
      if (this.showRegister) {
        this.login(data)
      } else {
        this.handleRegister(data)
      }
    },
    async login(dataUser) {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            email: dataUser.email,
            password: dataUser.password,
          },
        })

        if (response.data.status === 'success') {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-green-500',
          })
          this.$router.push('/')
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        } else {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
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
    async handleRegister(dataUser) {
      try {
        const response = await this.$axios.post('/auth/signup', {
          name: dataUser.name,
          email: dataUser.email,
          password: dataUser.password,
        })

        if (response.data.status === 'success') {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-green-500',
          })
          this.showRegister = true
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        } else {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
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

<style scoped>
.animated {
  animation: bounce 1s ease-in-out forwards;
}
@keyframes bounce {
  from {
    top: -10%;
    opacity: 0;
  }
  to {
    top: 50%;
    opacity: 1;
  }
}
</style>
