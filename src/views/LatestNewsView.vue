<template>
    <Navebar/>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-2">Latest News</h1>
    <p class="text-gray-600 mb-8">
      Updates & announcements from our car rental company
    </p>

    <div class="grid md:grid-cols-3 gap-6">
      <div
        v-for="news in newsList"
        :key="news.title"
        class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
      >
        <img :src="news.image" class="h-40 w-full object-cover" />

        <div class="p-5">
          <h3 class="font-semibold text-lg mb-2">
            {{ news.title }}
          </h3>
          <p class="text-sm text-gray-600 mb-3">
            {{ news.excerpt }}
          </p>
          <span class="text-xs text-gray-400">
            {{ news.date }}
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

const newsList = [
  {
    title: 'New SUV Models Added',
    excerpt: 'We have added new SUVs to our fleet for better comfort.',
    date: 'Jan 15, 2026',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1f'
  },
  {
    title: 'Airport Pickup Service Expanded',
    excerpt: 'Now available at more international airports.',
    date: 'Jan 10, 2026',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70'
  },
  {
    title: 'Holiday Rental Discount',
    excerpt: 'Enjoy special discounts during holiday seasons.',
    date: 'Jan 5, 2026',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753'
  }
]
</script>
