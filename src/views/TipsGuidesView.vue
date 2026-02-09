<template>
   <Navebar/> 
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-2">Tips & Guides</h1>
    <p class="text-gray-600 mb-8">
      Helpful tips for renting and driving safely
    </p>

    <div class="space-y-6">
      <div
        v-for="tip in tips"
        :key="tip.title"
        class="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold mb-2">
          {{ tip.title }}
        </h3>
        <p class="text-gray-600 mb-3">
          {{ tip.desc }}
        </p>
        <span class="text-sm text-yellow-500 font-medium">
          Read More →
        </span>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script setup lang="ts">
import Footer from '@/layouts/Footer.vue';
import Navebar from '@/layouts/Navebar.vue';

const tips = [
  {
    title: 'How to Choose the Right Rental Car',
    desc: 'Learn how to select the best car based on your travel needs.'
  },
  {
    title: 'Tips for Long Distance Driving',
    desc: 'Safety and comfort tips for long road trips.'
  },
  {
    title: 'Save Money on Car Rentals',
    desc: 'Simple tricks to reduce your rental costs.'
  }
]
</script>
