<template>
  <section class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-[#333] text-center">Testimonials</h2>
      <p class="text-lg text-gray-600 text-center mb-16">
        Here are what our customers have to say about us
      </p>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6"
      >
        <div
          class="bg-white rounded-lg shadow-xl p-6 border border-orange-400 relative"
        >
          <nuxt-img
            src="/pexels/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="gambar wajah user"
            class="w-[80px] h-[80px] rounded-full object-cover border-8 border-orange-400 shadow-lg absolute top-[-20%] left-1/2 -translate-x-1/2"
            :placeholder="[100, 50, 10]"
            loading="lazy"
          />
          <p class="text-gray-700 text-lg mb-4 pt-8">
            <span class="text-orange-400 font-bold font-serif text-lg">"</span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero.
            <span class="text-orange-400 font-bold font-serif text-lg">"</span>
          </p>
          <p class="text-orange-400 font-bold">- John Doe</p>
        </div>

        <div
          class="bg-white rounded-lg shadow-xl p-6 border border-orange-400 relative"
        >
          <nuxt-img
            src="/pexels/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="gambar wajah user"
            class="w-[80px] h-[80px] rounded-full object-cover border-8 border-orange-400 shadow-lg absolute top-[-20%] left-1/2 -translate-x-1/2"
            :placeholder="[100, 50, 10]"
            loading="lazy"
          />
          <p class="text-gray-700 text-lg mb-4 pt-8">
            <span class="text-orange-400 font-bold font-serif text-lg">"</span>
            Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque
            ut, mollis sed, nonummy id.
            <span class="text-orange-400 font-bold font-serif text-lg">"</span>
          </p>
          <p class="text-orange-400 font-bold">- Jane Smith</p>
        </div>

        <div
          class="bg-white rounded-lg shadow-xl p-6 border border-orange-400 relative"
        >
          <nuxt-img
            src="/pexels/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=3"
            alt="gambar wajah user"
            class="w-[80px] h-[80px] rounded-full object-cover border-8 border-orange-400 shadow-lg absolute top-[-20%] left-1/2 -translate-x-1/2"
            :placeholder="[100, 50, 10]"
            loading="lazy"
          />
          <p class="text-gray-700 text-lg mb-4 pt-8">
            <span class="text-orange-400 font-bold font-serif text-lg">"</span>
            Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus.
            <span class="text-orange-400 font-bold font-serif text-lg">"</span>
          </p>
          <p class="text-orange-400 font-bold">- Bob Johnson</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style></style>
