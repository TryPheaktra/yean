<template>
   <Navebar/> 
  <div class="w-full">

    <!-- Hero -->
    <section class="relative h-[320px] bg-gray-900 flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1542362567-b07e54358753"
        class="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div class="relative text-center text-white">
        <h1 class="text-4xl font-bold mb-2">Vehicle Models</h1>
        <p class="text-gray-200">
          Choose the perfect car for your journey
        </p>
      </div>
    </section>

    <!-- Filter -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <div class="flex flex-col md:flex-row gap-4 justify-between items-center">
        <h2 class="text-2xl font-bold">
          Our Fleet
        </h2>

        <div class="flex gap-3">
          <Dropdown
            v-model="selectedType"
            :options="types"
            optionLabel="label"
            placeholder="Vehicle Type"
            class="w-48"
          />
          <Dropdown
            v-model="selectedBrand"
            :options="brands"
            optionLabel="label"
            placeholder="Brand"
            class="w-40"
          />
        </div>
      </div>
    </section>

    <!-- Vehicle Grid -->
    <section class="max-w-7xl mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div
          v-for="car in filteredCars"
          :key="car.name"
          class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          <img
            :src="car.image"
            class="w-full h-48 object-cover"
          />

          <div class="p-5">
            <h3 class="text-xl font-semibold mb-1">
              {{ car.name }}
            </h3>
            <p class="text-sm text-gray-500 mb-3">
              {{ car.type }} • {{ car.seats }} Seats • {{ car.transmission }}
            </p>

            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-bold text-yellow-500">
                ${{ car.price }}/day
              </span>
              <span class="text-xs text-green-600 font-medium">
                Available
              </span>
            </div>

            <Button
              label="View Details"
              class="w-full bg-yellow-400! hover:bg-yellow-500! border-0"
            />
          </div>
        </div>

      </div>
    </section>

    <!-- CTA -->
    <section class="bg-gray-900 py-14 text-center text-white">
      <h2 class="text-3xl font-bold mb-4">
        Need Help Choosing a Car?
      </h2>
      <p class="mb-6 text-gray-300">
        Contact our team for the best recommendation
      </p>
      <Button label="Contact Us" class="bg-yellow-400! text-black!" />
    </section>

  </div>
  <Footer/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Navebar from '@/layouts/Navebar.vue'
import Footer from '@/layouts/Footer.vue'

const selectedType = ref(null)
const selectedBrand = ref(null)

const types = [
  { label: 'All Types', value: null },
  { label: 'Sedan', value: 'Sedan' },
  { label: 'SUV', value: 'SUV' },
  { label: 'Luxury', value: 'Luxury' }
]

const brands = [
  { label: 'All Brands', value: null },
  { label: 'Toyota', value: 'Toyota' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Mercedes', value: 'Mercedes' }
]

const cars = ref([
  {
    name: 'Toyota Camry',
    type: 'Sedan',
    brand: 'Toyota',
    seats: 5,
    transmission: 'Auto',
    price: 45,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1f'
  },
  {
    name: 'BMW X5',
    type: 'SUV',
    brand: 'BMW',
    seats: 7,
    transmission: 'Auto',
    price: 95,
    image: 'https://images.unsplash.com/photo-1617814076668-1c9c26b7aef7'
  },
  {
    name: 'Mercedes S-Class',
    type: 'Luxury',
    brand: 'Mercedes',
    seats: 5,
    transmission: 'Auto',
    price: 150,
    image: 'https://images.unsplash.com/photo-1617814065893-d6c9fcb2fdf4'
  }
])

const filteredCars = computed(() => {
  return cars.value.filter(car => {
    const typeMatch = !selectedType.value || car.type === selectedType.value
    const brandMatch = !selectedBrand.value || car.brand === selectedBrand.value
    return typeMatch && brandMatch
  })
})
</script>
