<script setup lang="ts">
// import { ref } from 'vue'
// import Button from 'primevue/button'
// import InputText from 'primevue/inputtext'

// const email = ref('')

// const footerLinks = {
//   company: [
//     { label: 'About Us', href: '#' },
//     { label: 'Our Team', href: '#' },
//     { label: 'Careers', href: '#' },
//     { label: 'News & Blog', href: '#' },
//     { label: 'Press', href: '#' }
//   ],
//   services: [
//     { label: 'Car Rental', href: '#' },
//     { label: 'Airport Transfer', href: '#' },
//     { label: 'Chauffeur Service', href: '#' },
//     { label: 'Wedding Car Hire', href: '#' },
//     { label: 'Corporate Rental', href: '#' }
//   ],
//   support: [
//     { label: 'Help Center', href: '#' },
//     { label: 'FAQs', href: '#' },
//     { label: 'Contact Us', href: '#' },
//     { label: 'Terms & Conditions', href: '#' },
//     { label: 'Privacy Policy', href: '#' }
//   ],
//   locations: [
//     { label: 'New York', href: '#' },
//     { label: 'Los Angeles', href: '#' },
//     { label: 'Chicago', href: '#' },
//     { label: 'Miami', href: '#' },
//     { label: 'San Francisco', href: '#' }
//   ]
// }

const socialLinks = [
  { icon: 'pi-facebook', href: '#', color: 'bg-blue-600 hover:bg-blue-700' },
  { icon: 'pi-twitter', href: '#', color: 'bg-blue-400 hover:bg-blue-500' },
  { icon: 'pi-instagram', href: '#', color: 'bg-pink-500 hover:bg-pink-600' },
  { icon: 'pi-linkedin', href: '#', color: 'bg-cyan-500 hover:bg-cyan-600' },
  { icon: 'pi-youtube', href: '#', color: 'bg-red-500 hover:bg-red-600' }
]

// const handleNewsletterSubmit = () => {
//   if (email.value) {
//     console.log('Newsletter subscription:', email.value)
//     alert('Thank you for subscribing!')
//     email.value = ''
//   }
// }
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"> -->
        
        <!-- Company Info & Newsletter -->
        <!-- <div class="lg:col-span-2"> -->
          <!-- Logo -->
          <!-- <div class="mb-6">
            <h2 class="text-3xl font-bold text-white mb-2">
              CAR<span class="text-yellow-500">|</span>RENTAL
            </h2>
            <p class="text-xs text-gray-400 uppercase tracking-wide">
              Top Car Rental Deals - Save Big!
            </p>
          </div> -->
          
          <!-- Description -->
          <!-- <p class="text-sm text-gray-400 mb-6">
            Experience luxury and convenience with our premium car rental services. 
            We offer a wide range of vehicles to suit your needs, from economy to luxury cars.
          </p> -->
          
          <!-- Newsletter -->
          <!-- <div class="mb-6">
            <h3 class="text-white font-semibold mb-3">Subscribe to Newsletter</h3>
            <div class="flex gap-2">
              <InputText
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="flex-1"
              />
              <Button
                label="Subscribe"
                @click="handleNewsletterSubmit"
                class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold border-0"
              />
            </div>
          </div> -->
          
          <!-- Contact Info -->
          <!-- <div class="space-y-2 text-sm">
            <div class="flex items-center space-x-2">
              <i class="pi pi-phone text-yellow-400"></i>
              <span>(562) 498-4600</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-envelope text-yellow-400"></i>
              <span>info@carrental.com</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-map-marker text-yellow-400"></i>
              <span>123 Main Street, Los Angeles, CA 90001</span>
            </div>
          </div>
        </div> -->
        
        <!-- Company Links -->
        <!-- <div>
          <h3 class="text-white font-semibold mb-4">Company</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.company" :key="link.label">
              <a :href="link.href" class="text-sm hover:text-yellow-400 transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div> -->
        
        <!-- Services Links -->
        <!-- <div>
          <h3 class="text-white font-semibold mb-4">Services</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.services" :key="link.label">
              <a :href="link.href" class="text-sm hover:text-yellow-400 transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div> -->
        
        <!-- Support Links -->
        <!-- <div>
          <h3 class="text-white font-semibold mb-4">Support</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.support" :key="link.label">
              <a :href="link.href" class="text-sm hover:text-yellow-400 transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div> -->
      
      <!-- Divider -->
      <!-- <div class="border-t border-gray-800 my-8"></div> -->
      
      <!-- Bottom Footer -->
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <!-- Copyright -->
        <div class="text-sm text-gray-400">
          © {{ new Date().getFullYear() }} Car Rental. All rights reserved.
        </div>
        
        <!-- Social Links -->
        <div class="flex space-x-3">
          <a
            v-for="social in socialLinks"
            :key="social.icon"
            :href="social.href"
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110',
              social.color
            ]"
          >
            <i :class="['pi', social.icon, 'text-white']"></i>
          </a>
        </div>
        
        <!-- Payment Methods -->
        <div class="flex items-center space-x-3">
          <span class="text-sm text-gray-400">We Accept:</span>
          <div class="flex space-x-2">
            <i class="pi pi-credit-card text-2xl text-gray-400"></i>
            <i class="pi pi-paypal text-2xl text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Custom hover effects */
a:hover {
  transition: all 0.3s ease;
}
</style>