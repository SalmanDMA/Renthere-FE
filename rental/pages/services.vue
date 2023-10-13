<template>
  <section class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10">
    <h1 class="text-3xl font-semibold text-[#333] mb-12 text-center">
      Our Services
    </h1>

    <!-- Service Section 1 -->
    <div class="flex flex-col md:flex-row mb-8 items-center gap-8">
      <div class="md:w-1/2 order-2 md:order-1 flex flex-col gap-4 text-center">
        <h2 class="text-2xl font-semibold text-[#333]">Family Car Rental</h2>
        <p class="text-gray-700">
          Enjoy quality time with your family through our family car rental
          service. We provide a range of comfortable and safe vehicles for your
          family travels. With a wide selection of vehicles, you can plan your
          trips freely, explore new places, and create beautiful memories with
          your loved ones.
        </p>
      </div>
      <div class="md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
        <nuxt-img
          src="/images/services/family.jpg"
          alt="Service 1"
          class="w-full h-auto max-h-[500px] rounded-lg shadow-xl object-cover object-center"
          :placeholder="[100, 50, 10]"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Service Section 2 -->
    <div class="flex flex-col md:flex-row mb-8 items-center gap-8">
      <div class="md:w-1/2">
        <nuxt-img
          src="/images/services/motorbikes.jpg"
          alt="Service 2"
          class="w-full h-auto max-h-[500px] rounded-lg shadow-xl object-cover object-center"
          :placeholder="[100, 50, 10]"
          loading="lazy"
        />
      </div>
      <div class="md:w-1/2 ml-auto flex flex-col gap-4 text-center">
        <h2 class="text-2xl font-semibold text-[#333] mb-4">
          Daily Motorcycle Rental
        </h2>
        <p class="text-gray-700 mb-4">
          Save time and experience freedom in your journeys with our daily
          motorcycle rental service. Our motorcycles are always in top condition
          and ready to use. It's the ideal solution for short trips, city
          visits, or your daily transportation needs. With our motorcycles, you
          can plan your trips more efficiently and save time.
        </p>
      </div>
    </div>

    <!-- Service Section 3 -->
    <div class="flex flex-col md:flex-row mb-8 items-center gap-8">
      <div class="md:w-1/2 order-2 md:order-1 flex flex-col gap-4 text-center">
        <h2 class="text-2xl font-semibold text-[#333]">Luxury Car Rental</h2>
        <p class="text-gray-700">
          Elevate every journey with our luxury car rental service. We offer a
          variety of the latest luxury cars to meet all your needs. From
          tempting sports cars to elegant luxury sedans, we have vehicles to
          match your preferences. Planning your trip with a luxury car is all
          about reaching your destination with style, comfort, and luxury.
        </p>
      </div>
      <div class="md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
        <nuxt-img
          src="/images/services/luxury.jpeg"
          alt="Service 3"
          class="w-full h-auto max-h-[500px] rounded-lg shadow-xl object-cover object-center"
          :placeholder="[100, 50, 10]"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Service Section 4 -->
    <div class="flex flex-col md:flex-row mb-8 items-center gap-8">
      <div class="md:w-1/2">
        <nuxt-img
          src="/images/services/airport.jpg"
          alt="Service 4"
          class="w-full h-auto max-h-[500px] rounded-lg shadow-xl object-cover object-center"
          :placeholder="[100, 50, 10]"
          loading="lazy"
        />
      </div>
      <div class="md:w-1/2 ml-auto flex flex-col gap-4 text-center">
        <h2 class="text-2xl font-semibold text-[#333]">Airport Shuttle</h2>
        <p class="text-gray-700">
          Simplify your travels with our convenient and reliable airport shuttle
          service. We prioritize punctuality and customer comfort. When you book
          this service, you can be confident that we'll pick you up on time and
          safely transport you to or from the airport. With us, you can focus on
          your journey without worrying about transportation details.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style></style>
