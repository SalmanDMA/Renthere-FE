<template>
  <nav class="flex flex-col gap-4">
    <section class="w-full h-20 border-b flex px-4 items-center">
      <p class="font-bold text-3xl mx-auto">
        Rent<span class="text-orange-400">Here</span>
      </p>
    </section>
    <section class="px-4">
      <p class="pl-4 text-sm font-semibold mb-1">MAIN</p>
      <nuxt-link
        class="w-full flex items-center text-orange-400 h-10 pl-4 hover:bg-gray-100 rounded-lg cursor-pointer"
        to="/"
      >
        <div
          class="border border-orange-400 rounded-full flex items-center justify-center mr-2 w-8 h-8"
        >
          <fa :icon="['fas', 'house']" class="fill-current" />
        </div>
        <span class="text-gray-700">Dashboard</span>
      </nuxt-link>
      <nuxt-link
        class="w-full flex items-center text-orange-400 h-10 pl-4 hover:bg-gray-100 rounded-lg cursor-pointer"
        to="/users"
      >
        <div
          class="border border-orange-400 rounded-full flex items-center justify-center mr-2 w-8 h-8"
        >
          <fa :icon="['fas', 'user']" class="fill-current" />
        </div>
        <span class="text-gray-700">Users</span>
      </nuxt-link>
    </section>

    <section class="px-4">
      <p class="pl-4 text-sm font-semibold mb-1">Products</p>
      <nuxt-link
        class="w-full flex items-center text-orange-400 h-10 pl-4 hover:bg-gray-100 rounded-lg cursor-pointer"
        to="/cars"
      >
        <div
          class="border border-orange-400 rounded-full flex items-center justify-center mr-2 w-8 h-8"
        >
          <fa :icon="['fas', 'car']" class="fill-current" />
        </div>
        <span class="text-gray-700">Cars</span>
      </nuxt-link>
      <nuxt-link
        class="w-full flex items-center text-orange-400 h-10 pl-4 hover:bg-gray-100 rounded-lg cursor-pointer"
        to="/bikes"
      >
        <div
          class="border border-orange-400 rounded-full flex items-center justify-center mr-2 w-8 h-8"
        >
          <fa :icon="['fas', 'motorcycle']" class="fill-current" />
        </div>
        <span class="text-gray-700">Bikes</span>
      </nuxt-link>
    </section>
    <section class="px-4">
      <p class="pl-4 text-sm font-semibold mb-1">Process Management</p>
      <nuxt-link
        class="w-full flex items-center text-orange-400 h-10 pl-4 hover:bg-gray-100 rounded-lg cursor-pointer"
        to="/transactions"
      >
        <div
          class="border border-orange-400 rounded-full flex items-center justify-center mr-2 w-8 h-8"
        >
          <fa :icon="['fas', 'clipboard']" class="fill-current" />
        </div>
        <span class="text-gray-700">Transactions</span>
      </nuxt-link>
      <nuxt-link
        class="w-full flex items-center text-orange-400 h-10 pl-4 hover:bg-gray-100 rounded-lg cursor-pointer"
        to="/testimonials"
      >
        <div
          class="border border-orange-400 rounded-full flex items-center justify-center mr-2 w-8 h-8"
        >
          <fa :icon="['fas', 'comment']" class="fill-current" />
        </div>
        <span class="text-gray-700">Testimonials</span>
      </nuxt-link>
    </section>
  </nav>
</template>

<script>
export default {
  name: 'NavbarLayout',
}
</script>

<style></style>
