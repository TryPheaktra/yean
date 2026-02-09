<template>
  <div class=" bg-gradient-to-r from-yellow-400! to-yellow-500! py-16 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <!-- Page Title -->
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">{{ t('contact.header') }}</h1>

      <!-- <div class="grid md:grid-cols-2 gap-8"> -->
        <!-- Contact Form -->
        <!-- <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              v-model="name"
              type="text"
              placeholder="Your full name"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              v-model="message"
              placeholder="Your message"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-32"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md shadow-md transition-colors"
          >
            Send Message
          </button>
        </form> -->

        <!-- Contact Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <i class="pi pi-map-marker text-yellow-400 text-xl"></i>
            <p class="text-gray-700">123 Main Street, City, Country</p>
          </div>

          <div class="flex items-center space-x-3">
            <i class="pi pi-phone text-yellow-400 text-xl"></i>
            <p class="text-gray-700">+1 (562) 498-4600</p>
          </div>

          <div class="flex items-center space-x-3">
            <i class="pi pi-envelope text-yellow-400 text-xl"></i>
            <p class="text-gray-700">info@carrental.com</p>
          </div>

          <div>
            <h3 class="text-gray-800 font-medium mt-4">Follow us</h3>
            <div class="flex space-x-4 mt-2">
              <a href="#" class="text-gray-500 hover:text-yellow-400">
                <i class="pi pi-facebook text-2xl"></i>
              </a>
              <a href="#" class="text-gray-500 hover:text-yellow-400">
                <i class="pi pi-twitter text-2xl"></i>
              </a>
              <a href="#" class="text-gray-500 hover:text-yellow-400">
                <i class="pi pi-instagram text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

// import { ref } from 'vue'
const { t ,locale} = useI18n({ useScope: 'global' })
watch(locale, (val) => {
  console.log('Language changed to:', val)
})


// const name = ref('')
// const email = ref('')
// const message = ref('')

// const handleSubmit = () => {
//   console.log('Contact form submitted', {
//     name: name.value,
//     email: email.value,
//     message: message.value
//   })

//   alert('Thank you! Your message has been sent.')
//   name.value = ''
//   email.value = ''
//   message.value = ''
// }
</script>
