<template>
   <Navebar/> 
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-2">Promotions</h1>
    <p class="text-gray-600 mb-8">
      Special deals & limited-time offers
    </p>

    <div class="grid md:grid-cols-2 gap-6">
      <div
        v-for="promo in promotions"
        :key="promo.title"
        class="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
      >
        <h3 class="text-xl font-semibold mb-2">
          {{ promo.title }}
        </h3>
        <p class="text-gray-700 mb-4">
          {{ promo.desc }}
        </p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">
            Valid until {{ promo.expire }}
          </span>
          <span class="font-bold text-yellow-600">
            {{ promo.discount }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script setup lang="ts">
import Footer from '@/layouts/Footer.vue';
import Navebar from '@/layouts/Navebar.vue';

const promotions = [
  {
    title: 'Weekend Special',
    desc: 'Get discount for weekend rentals.',
    discount: '20% OFF',
    expire: 'Feb 1, 2026'
  },
  {
    title: 'Long Term Rental',
    desc: 'Save more when renting over 7 days.',
    discount: '30% OFF',
    expire: 'Mar 1, 2026'
  }
]
</script>
