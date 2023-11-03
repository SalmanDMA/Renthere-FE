<template>
  <div
    class="p-5 grid place-items-center grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-3 content-container w-full"
  >
    <div
      class="grid place-items-center bg-white p-4 rounded-lg shadow-md w-full sm:w-[312px] md:max-w-sm xl:max-w-lg xl:w-[512px] min-h-[612px] text-center"
    >
      <div class="flex justify-center mb-4">
        <!-- Skeleton loading untuk gambar profil -->
        <div
          class="w-36 h-36 rounded-full bg-black/40 animate-pulse cursor-wait"
        ></div>
      </div>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Name</label>
        <!-- Skeleton loading untuk nama -->
        <div
          class="bg-black/40 animate-pulse cursor-wait h-8 rounded-lg w-20"
        ></div>
      </div>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Email</label>
        <!-- Skeleton loading untuk email -->
        <div
          class="bg-black/40 animate-pulse cursor-wait h-8 rounded-lg w-20"
        ></div>
      </div>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Role</label>
        <!-- Skeleton loading untuk peran -->
        <div
          class="bg-black/40 animate-pulse cursor-wait h-8 rounded-lg w-20"
        ></div>
      </div>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Address</label>
        <!-- Skeleton loading untuk alamat -->
        <div
          class="bg-black/40 animate-pulse cursor-wait h-8 rounded-lg w-20"
        ></div>
      </div>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Phone Number</label>
        <!-- Skeleton loading untuk nomor telepon -->
        <div
          class="bg-black/40 animate-pulse cursor-wait h-8 rounded-lg w-30"
        ></div>
      </div>
    </div>

    <div
      class="bg-white p-4 rounded-lg shadow-md w-full sm:w-[312px] md:max-w-sm xl:max-w-lg xl:w-[512px] min-h-[612px]"
    >
      <h2 class="text-center text-2xl font-semibold text-[#333] mb-4">
        Input User Profile
      </h2>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Name</label>
        <!-- Skeleton loading untuk input nama -->
        <div
          class="w-full px-3 py-4 border rounded-lg bg-black/40 animate-pulse cursor-wait"
        ></div>
      </div>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Email</label>
        <!-- Skeleton loading untuk input email -->
        <div
          class="w-full px-3 py-4 border rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed bg-black/40 animate-pulse cursor-wait"
          disabled
        ></div>
      </div>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Role</label>
        <!-- Skeleton loading untuk input peran -->
        <div
          class="w-full px-3 py-4 border rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed bg-black/40 animate-pulse cursor-wait"
          disabled
        ></div>
      </div>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Address</label>
        <!-- Skeleton loading untuk input alamat -->
        <div
          class="w-full px-3 py-4 border rounded-lg bg-black/40 animate-pulse cursor-wait"
        ></div>
      </div>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Phone</label>
        <!-- Skeleton loading untuk input nomor telepon -->
        <div
          class="w-full px-3 py-4 border rounded-lg bg-black/40 animate-pulse cursor-wait"
        ></div>
      </div>

      <div class="mb-4">
        <label class="text-sm text-gray-600"
          >Picture ( Only Url & Format Picture )</label
        >
        <!-- Skeleton loading untuk input gambar profil -->
        <div
          class="w-full px-3 py-4 border rounded-lg bg-black/40 animate-pulse cursor-wait"
        ></div>
      </div>

      <div class="flex justify-center">
        <button
          class="bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-600 cursor-pointer"
        >
          Save Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileSkeleton',
}
</script>

<style></style>
