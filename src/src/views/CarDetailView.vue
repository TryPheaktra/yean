<template>
  <section class="max-w-7xl mx-auto px-6 py-16">
    <!-- Hero -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Left Content -->
      <div>
        <h1 class="text-4xl lg:text-5xl font-extrabold leading-tight text-white">
          {{ t('homepage.prem.p') }} <br />
          {{ t('homepage.prem.r') }}
        </h1>

        <p class="mt-6 text-yellow-100 max-w-md">
          {{ t('homepage.title') }}
        </p>

        <!-- <button
          class="mt-8 inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          See all our Cars
        </button> -->
      </div>

      <!-- Right Image -->
      <div class="relative">
        <img
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
          alt="Premium Car"
          class="w-full h-[420px] object-cover rounded-xl"
        />

        <!-- Decorative star -->
        <div
          class="absolute top-1/3 -left-6 text-yellow-400 text-3xl rotate-12"
        >
          ✳
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div
      ref="statsRef"
      class="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
    >
      <div>
        <h2 class="text-3xl font-bold text-white">
          {{ formatNumber(capital) }}M+
        </h2>
        <p class="text-yellow-100 mt-2">{{ t('stats.total') }}</p>
      </div>

      <div>
        <h2 class="text-3xl font-bold text-white">
          {{ formatNumber(customers) }}M+
        </h2>
        <p class="text-yellow-100 mt-2">{{ t('stats.happy') }}</p>
      </div>

      <div>
        <h2 class="text-3xl font-bold text-white">
          {{ feedback }}
        </h2>
        <p class="text-yellow-100 mt-2">{{ t('stats.feed') }}</p>
      </div>
    </div>


    <!-- Title -->
    <h2 class="text-3xl md:text-4xl font-extrabold text-white text-center mb-12">
      {{ t('stats.title.w') }} <br class="hidden md:block" />
      {{ t('stats.title.v') }}
    </h2>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div
        v-for="item in categories"
        :key="item.label"
        class="relative group rounded-2xl overflow-hidden cursor-pointer"
        @click="openDialog(item)"
      >
        <!-- Image -->
        <img
          :src="item.image"
          :alt="item.label"
          class="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
        />

        <!-- Dark Overlay -->
        <div
          class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"
        ></div>

        <!-- Content -->
        <div class="absolute top-6 left-6 text-white">
          <h3 class="text-xl font-bold tracking-wide">
            {{ item.label }}
          </h3>

          <Button
            icon="pi pi-arrow-circle-right"
            icon-class="text-white"
            rounded
            text
            class="mt-3 text-white  hover:bg-white/20!"
          />
        </div>
      </div>
    </div>
    
    

    <!-- Dialog -->
    <Dialog
      v-model:visible="visible"
      modal
      :header="t('cardetail.header')"
      :style="{ width: '450px' }"
      class="rounded-xl"
    >
      <div v-if="selectedCategory" class="space-y-4">
        <img
          :src="selectedCategory.image"
          class="w-full h-48 object-cover rounded-lg"
        />

        <h3 class="text-2xl font-bold">
          {{ selectedCategory.label }}
        </h3>

        <p class="text-gray-600">
          {{ selectedCategory.description }}
        </p>

        <ul class="list-disc list-inside text-gray-500 text-sm">
          <li v-for="(f, i) in selectedCategory.features" :key="i">
            {{ f }}
          </li>
        </ul>

        <!-- <Button
          label="View Cars"
          icon="pi pi-car"
          class="w-full mt-4"
        /> -->
      </div>
    </Dialog>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import bus25 from '../assets/bus25.webp'
import suv from '../assets/suv.jpg'
import starex from '../assets/starex.jpg'

interface Category {
  label: string
  image: string
  description: string
  features: string[]
}

const statsRef = ref<HTMLElement | null>(null)

// values
const capital = ref(0)
const customers = ref(0)
const feedback = ref(0)

const animated = ref(false)

// helper
const formatNumber = (num: number) => num.toFixed(0)

const visible = ref(false)
const selectedCategory = ref<Category | null>(null)
const { t ,locale} = useI18n({ useScope: 'global' })


const categories = computed<Category[]>(() => [
  {
    label: t('cardetail.label.hotel.label'),
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/641151494.jpg?k=74ea667970853565b0503bd675936738d08f067267387672c2f6bd32d1a5f0e7&o=',
    description: t('cardetail.label.hotel.description'),
    features: [
      t('cardetail.label.hotel.features.a'),
      t('cardetail.label.hotel.features.b'),
      t('cardetail.label.hotel.features.c'),
      t('cardetail.label.hotel.features.d'),
      t('cardetail.label.hotel.features.e'),
      t('cardetail.label.hotel.features.f'),
      t('cardetail.label.hotel.features.g'),
      t('cardetail.label.hotel.features.h'),
    ]
  },
  {
    label: t('cardetail.label.suvs.label'),
    image: suv,
    description: t('cardetail.label.suvs.description'),
    features: [
      t('cardetail.label.suvs.features.a'),
      t('cardetail.label.suvs.features.b'),
      t('cardetail.label.suvs.features.c'),
      t('cardetail.label.suvs.features.d'),
      t('cardetail.label.suvs.features.e'),
      t('cardetail.label.suvs.features.f'),
      t('cardetail.label.suvs.features.g'),
      t('cardetail.label.suvs.features.h'),
    ]
  },
  {
    label: t('cardetail.label.vans.label'),
    image: bus25,
    description: t('cardetail.label.vans.description'),
    features: [
      t('cardetail.label.vans.features.a'),
      t('cardetail.label.vans.features.b'),
      t('cardetail.label.vans.features.c'),
      t('cardetail.label.vans.features.d'),
      t('cardetail.label.vans.features.e'),
      t('cardetail.label.vans.features.f'),
      t('cardetail.label.vans.features.g'),
      t('cardetail.label.vans.features.h'),
    ]
  },
  {
    label: t('cardetail.label.electric.label'),
    image: starex,
    description: t('cardetail.label.electric.description'),
    features: [
      t('cardetail.label.electric.features.a'),
      t('cardetail.label.electric.features.b'),
      t('cardetail.label.electric.features.c'),
      t('cardetail.label.electric.features.d'),
      t('cardetail.label.electric.features.e'),
      t('cardetail.label.electric.features.f'),
      t('cardetail.label.electric.features.g'),
      t('cardetail.label.electric.features.h'),
    ]
  },

])

// counter function
function animateValue(
  target: number,
  refValue: { value: number },
  duration = 1500
) {
  const start = 0
  const startTime = performance.now()

  function update(currentTime: number) {
    const progress = Math.min((currentTime - startTime) / duration, 1)
    refValue.value = Math.floor(progress * (target - start) + start)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return   // ✅ guard

      if (entry.isIntersecting && !animated.value) {
        animated.value = true

        animateValue(45, capital)
        animateValue(5, customers)
        animateValue(3000, feedback)
      }
    },
    { threshold: 0.4 }
  )

  if (statsRef.value) {
    observer.observe(statsRef.value)
  }
})


watch(locale, (val) => {
  console.log('Language changed to:', val)
})


const openDialog = (item: Category) => {
  selectedCategory.value = item
  visible.value = true
}
</script>