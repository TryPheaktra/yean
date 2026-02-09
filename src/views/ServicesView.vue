<template>
    <div class="w-full">

        <!-- Hero Section -->
        <section class="relative h-[320px] bg-gray-900 flex items-center justify-center">
        <img
            src="https://images.unsplash.com/photo-1549924231-f129b911e442"
            class="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div class="relative text-center text-white">
            <h1 class="text-4xl font-bold mb-2">Our Services</h1>
            <p class="text-gray-200">
            Reliable & Affordable Car Rental Solutions
            </p>
        </div>
        </section>

        <!-- Services Section -->
        <section class="max-w-7xl mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold text-center mb-10">
            What We Offer
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
            v-for="service in services"
            :key="service.title"
            class="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
            >
            <i :class="service.icon" class="text-4xl text-yellow-400 mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">
                {{ service.title }}
            </h3>
            <p class="text-gray-600 text-sm">
                {{ service.desc }}
            </p>
            </div>
        </div>
        </section>

        <!-- Why Choose Us -->
        <section class="bg-gray-50 py-16">
        <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            
            <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            class="rounded-xl shadow"
            />

            <div>
            <h2 class="text-3xl font-bold mb-6">
                Why Choose Us?
            </h2>
            <ul class="space-y-4 text-gray-700">
                <li>✔ Well-maintained vehicles</li>
                <li>✔ Affordable & transparent pricing</li>
                <li>✔ 24/7 customer support</li>
                <li>✔ Easy online booking</li>
                <li>✔ Insurance included</li>
            </ul>
            </div>
        </div>
        </section>

        <!-- How It Works -->
        <section class="max-w-7xl mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold text-center mb-10">
            How It Works
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div v-for="step in steps" :key="step.title">
            <div class="w-14 h-14 mx-auto rounded-full bg-yellow-400 text-white flex items-center justify-center text-xl font-bold mb-4">
                {{ step.no }}
            </div>
            <h3 class="font-semibold mb-1">{{ step.title }}</h3>
            <p class="text-sm text-gray-600">{{ step.desc }}</p>
            </div>
        </div>
        </section>

        <!-- CTA -->
        <section class="bg-yellow-400 py-14 text-center">
        <h2 class="text-3xl font-bold mb-4">
            Ready to Book Your Car?
        </h2>
        <p class="mb-6">
            Choose from our wide range of vehicles today
        </p>
        <div class="flex justify-center gap-4">
            <Button label="Browse Cars" class="bg-black! text-white!" />
            <Button label="Contact Us" outlined />
        </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

const services = [
  {
    title: 'Self-Drive Rental',
    desc: 'Drive the car yourself with flexible rental plans.',
    icon: 'pi pi-car'
  },
  {
    title: 'Chauffeur Service',
    desc: 'Professional drivers for your comfort & safety.',
    icon: 'pi pi-user'
  },
  {
    title: 'Airport Pickup',
    desc: 'Convenient airport pickup and drop-off services.',
    icon: 'pi pi-send'
  },
  {
    title: 'Corporate Rental',
    desc: 'Business and long-term rental solutions.',
    icon: 'pi pi-briefcase'
  }
]

const steps = [
  { no: 1, title: 'Choose Car', desc: 'Select your preferred vehicle' },
  { no: 2, title: 'Pick Date', desc: 'Select date & location' },
  { no: 3, title: 'Confirm', desc: 'Complete booking process' },
  { no: 4, title: 'Enjoy Ride', desc: 'Drive and enjoy your trip' }
]
</script>
