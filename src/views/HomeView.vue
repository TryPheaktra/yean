<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import Navebar from '@/layouts/Navebar.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Footer from '@/layouts/Footer.vue'
import ContactView from './ContactView.vue'
import CarDetailView from './CarDetailView.vue'
// import { Loader } from "@googlemaps/js-api-loader";
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import bus25 from '../assets/bus-r.png'
import suv from '../assets/suv-r.png'
import starex from '../assets/starex-r.png'
// Form data
const selectedCarType = ref<string | null>(null)
const username = ref('')
const hotelname = ref('')
const phone = ref('')
const pickupLocation = ref('')    // ✅ New: for pick-up address
const dropoffLocation = ref('')   // ✅ Bound to drop-off input
const pickupDate = ref<Date | null>(null)
// const dropoffDate = ref<Date | null>(null)
const templatedisplay = ref<Date | null>(null)

// const mapElement = ref<HTMLDivElement | null>(null);
// // const inputRef = ref<HTMLInputElement | null>(null);
// // const dropoff = ref<HTMLInputElement | null>(null)
// const pickupInputRef = ref<HTMLInputElement | null>(null);

// const map = ref<google.maps.Map | null>(null);
// const marker = ref<google.maps.Marker | null>(null);


const turnstileEl = ref<HTMLElement | null>(null)
const turnstileToken = ref<string | null>(null)

// const rawSiteKey = '0x4AAAAAACX_nYbebNEkhiGa';
// const siteKey = typeof rawSiteKey === 'string' ? rawSiteKey : '';
const siteKey = import.meta.env.VITE_TURNSTILE_SITEKEY as string;

if (!siteKey || typeof siteKey !== 'string') {
  throw new Error('Missing or invalid Cloudflare Turnstile site key');
}

// if (!siteKey) {
//   console.warn('Turnstile site key is missing!');
// }

  // Animation states
const isFormVisible = ref(false)
const isHeroTextVisible = ref(false)
const isCarVisible = ref(false)
const showDialog = ref(false)

const sectionRefs = ref<HTMLElement[]>([])
const visibleSections = ref<boolean[]>([])
const { t ,locale} = useI18n({ useScope: 'global' })
const toast = useToast()

interface CarType {
  label: string,
  value: string
}
// Options
const carTypes = computed<CarType[]>(() =>[
  { label: t('form.cartypes.label.a'), value: 'bus25seats' },
  { label: t('form.cartypes.label.b'), value: 'starex' },
  // { label: t('form.cartypes.label.c'), value: 'midsize' },
  // { label: t('form.cartypes.label.d'), value: 'fullsize' },
  { label: t('form.cartypes.label.e'), value: 'suv' },
  // { label: t('form.cartypes.label.f'), value: 'luxury' },
  // { label: t('form.cartypes.label.g'), value: 'van' }
])

// const carTypes = computed<CarType[]>(() =>[
//   { label: 'Economy', value: 'economy' },
//   { label: 'Compact', value: 'compact' },
//   { label: 'Mid-size', value: 'midsize' },
//   { label: 'Full-size', value: 'fullsize' },
//   { label: 'SUV', value: 'suv' },
//   { label: 'Luxury', value: 'luxury' },
//   { label: 'Van', value: 'van' }
// ])
// Carousel
const currentSlide = ref(0)
const isAnimating = ref(false)
const cars = ref([
  { name: 'SUV', price: 28, image: suv},
  { name: 'STAREX', price: 35, image: starex },
  { name: 'Honda', price: 32, image: 'https://vehicle-images.dealerinspire.com/ab51-110007812/thumbnails/large/2HGFE2F26TH548229/f1b4f4b1ac07dabafd839fa1b314ddc4.png' },
  { name: 'BUS25', price: 32, image: bus25 }
])

// 🎵 Thank you sound
const thankYouAudio = new Audio(
  new URL('@/assets/sounds/thankyou-en.mp3', import.meta.url).href
)

// (optional) កំណត់ volume
thankYouAudio.volume = 0.8


const nextSlide = () => {
  if (!isAnimating.value) {
    isAnimating.value = true
    currentSlide.value = (currentSlide.value + 1) % cars.value.length
    setTimeout(() => isAnimating.value = false, 500)
  }
}

const prevSlide = () => {
  if (!isAnimating.value) {
    isAnimating.value = true
    currentSlide.value = currentSlide.value === 0 ? cars.value.length - 1 : currentSlide.value - 1
    setTimeout(() => isAnimating.value = false, 500)
  }
}

// const handleSubmit = () => {
//   console.log('Form submitted', {
//     companyname: name.value,
//     username: username.value,
//     phone: phone.value,
//     selectedCarType: selectedCarType.value,
//     pickupLocation: pickupLocation.value,
//     dropoffLocation: dropoffLocation.value,
//     pickupDate: pickupDate.value,
//     pickupTime: pickupTime.value,
//     dropoffDate: dropoffDate.value,
//     dropoffTime: dropoffTime.value
//   })
// }

// const formatTime = (date: Date | null): string => {
//   if (!date) return 'Not selected';
//   return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
// };
const handleSubmit = async () => {
  // ✅ Validation: Check required fields
  if (!selectedCarType.value) {
    toast.add({ 
      severity: 'warn', 
      summary: 'Warning', 
      detail: 'Please select a car type', 
      life: 3000 
    });
    return;
  }
//   if (!turnstileToken.value) {
//   toast.add({
//     severity: 'warn',
//     summary: 'Verification required',
//     detail: 'Please verify you are human',
//     life: 3000
//   })
//   return
// }

  if (!username.value.trim()) {
    toast.add({ 
      severity: 'warn', 
      summary: 'Warning', 
      detail: 'Please enter your name', 
      life: 3000 
    });
    return;
  }

  if (!hotelname.value.trim()) {
    toast.add({ 
      severity: 'warn', 
      summary: 'Warning', 
      detail: 'Please enter hotel name', 
      life: 3000 
    });
    return;
  }

  if (!phone.value.trim()) {
    toast.add({ 
      severity: 'warn', 
      summary: 'Warning', 
      detail: 'Please enter your phone number', 
      life: 3000 
    });
    return;
  }

  // if (!pickupLocation.value.trim()) {
  //   toast.add({ 
  //     severity: 'warn', 
  //     summary: 'Warning', 
  //     detail: 'Please select pick-up location', 
  //     life: 3000 
  //   });
  //   return;
  // }

  // Helper to format date
  const formatDate = (date: Date | null) => 
    date ? date.toLocaleDateString('en-US') : '—';

  // Helper to format time
  const formatTime = (date: Date | null): string => {
    if (!date) return '—';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Get Car Type Label with fallback
  let selectedCarLabel = '—';
  if (selectedCarType.value && carTypes.value.length > 0) {
    const foundCarType = carTypes.value.find(item => item.value === selectedCarType.value);
    selectedCarLabel = foundCarType?.label || selectedCarType.value;
  }

  // Debug: Log all values
  // console.log('Form Data:', {
  //   username: username.value,
  //   hotelanme: hotelname.value,
  //   phone: phone.value,
  //   selectedCarType: selectedCarType.value,
  //   selectedCarLabel: selectedCarLabel,
  //   pickupLocation: pickupLocation.value,
  //   pickupDate: pickupDate.value,
  //   pickupTime: formatTime(templatedisplay.value)
  // });

  // Build message
  const message = `
  🚗 *New Car Reservation Request*

  👤 Full Name: ${username.value || '—'}

  📍 Pick-up Location: ${hotelname.value || '—'}

  📞 Phone: ${phone.value || '—'}

  🚘 Car Type: ${selectedCarLabel}


  📅 Date: ${formatDate(pickupDate.value)}

  ⏰ Time: ${formatTime(templatedisplay.value)}
    `.trim();

  // Telegram config
  const TELEGRAM_BOT_TOKEN = '7780016525:AAEOWPwkhjBtwWMPFxfoMFodDKcb_eQHFco';
  const TELEGRAM_CHAT_ID = '-5100444724';

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const responseData = await response.json();
    // console.log('Telegram Response:', responseData);

    if (response.ok) {
      // ✅ Show success toast
      // toast.add({ 
      //   severity: 'success', 
      //   summary: '✅ Success', 
      //   detail: 'Reservation request sent! Our team will contact you shortly.', 
      //   life: 5000 
      // });
       // 🔊 Play thank you sound
      try {
        thankYouAudio.currentTime = 0 // reset បើ submit ច្រើនដង
        await thankYouAudio.play()
      } catch (e) {
        console.warn('Audio play blocked by browser:', e)
      }
      showDialog.value = true
      
      // Reset form after successful submission
      selectedCarType.value = null;
      username.value = '';
      hotelname.value = '';
      phone.value = '';
      pickupLocation.value = '';
      dropoffLocation.value = '';
      pickupDate.value = null;
      // dropoffDate.value = null;
      templatedisplay.value = null;
      // templatedisplay1.value = null;
    } else {
      console.error('Telegram API error:', responseData);
      toast.add({ 
        severity: 'error', 
        summary: '❌ Error', 
        detail: `Failed to send: ${responseData.description || 'Unknown error'}`, 
        life: 5000 
      });
    }
  } catch (error) {
    console.error('Network error:', error);
    toast.add({ 
      severity: 'error', 
      summary: '⚠️ Network Error', 
      detail: 'Please check your connection and try again.', 
      life: 5000 
    });
  }
};


watch(locale, (val) => {
  console.log('Language changed to:', val)
})
onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!siteKey) return

  const waitTurnstile = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.turnstile && turnstileEl.value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.turnstile.render(turnstileEl.value, {
        sitekey: siteKey,
        theme: 'light',
        callback: (token: string) => {
          turnstileToken.value = token
        },
        'expired-callback': () => {
          turnstileToken.value = null
        }
      })
    } else {
      setTimeout(waitTurnstile, 200)
    }
  }

  waitTurnstile()
  // const loader = new Loader({
  //   apiKey: 'AIzaSyALj0BfPEBYgfCxJES4-F5iZw2rZ7CAJic',
  //   libraries: ["places"]
  // });

  // loader.load().then(() => {
  //   // Initialize Map
  //   if (mapElement.value) {
  //     map.value = new google.maps.Map(mapElement.value, {
  //       center: { lat: 11.5564, lng: 104.9282 }, // Phnom Penh center
  //       zoom: 12,
  //     });
  //   }

  //   // Initialize Autocomplete for PICK-UP
  //   if (pickupInputRef.value) {
  //     const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInputRef.value, {
  //       types: ["geocode"],
  //       componentRestrictions: { country: "kh" }
  //     });

  //     pickupAutocomplete.addListener("place_changed", () => {
  //       const place = pickupAutocomplete.getPlace();
  //       if (!place.geometry || !place.geometry.location) return;

  //       const location = place.geometry.location;

  //       // ✅ Update pickupLocation with formatted address
  //       if (place.formatted_address) {
  //         pickupLocation.value = place.formatted_address;
  //       }

  //       // Move map to selected place
  //       map.value?.setCenter(location);
  //       map.value?.setZoom(15);

  //       // Set or update marker
  //       if (!marker.value) {
  //         marker.value = new google.maps.Marker({
  //           position: location,
  //           map: map.value,
  //         });
  //       } else {
  //         marker.value.setPosition(location);
  //       }

  //       console.log("Pick-up location selected:", place.formatted_address);
  //     });
  //   }

    // Initialize Autocomplete for DROP-OFF
    // if (inputRef.value) {
    //   const dropoffAutocomplete = new google.maps.places.Autocomplete(inputRef.value, {
    //     types: ["geocode"],
    //     componentRestrictions: { country: "kh" }
    //   });

    //   dropoffAutocomplete.addListener("place_changed", () => {
    //     const place = dropoffAutocomplete.getPlace();
    //     if (!place.geometry || !place.geometry.location) return;

    //     const location = place.geometry.location;

    //     // ✅ Update dropoffLocation with formatted address
    //     if (place.formatted_address) {
    //       dropoffLocation.value = place.formatted_address;
    //     }

    //     // Move map to selected place
    //     map.value?.setCenter(location);
    //     map.value?.setZoom(15);

    //     // Set or update marker
    //     if (!marker.value) {
    //       marker.value = new google.maps.Marker({
    //         position: location,
    //         map: map.value,
    //       });
    //     } else {
    //       marker.value.setPosition(location);
    //     }

    //     console.log("Drop-off location selected:", place.formatted_address);
    //   });
    // }
  // });
  
  // Trigger animations
  setTimeout(() => isFormVisible.value = true, 100)
  setTimeout(() => isHeroTextVisible.value = true, 300)
  setTimeout(() => isCarVisible.value = true, 500)

  // Intersection observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = sectionRefs.value.indexOf(entry.target as HTMLElement)
        if (entry.isIntersecting && index !== -1) {
          visibleSections.value[index] = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  sectionRefs.value.forEach((el) => observer.observe(el))
});
</script>

<template>
  <Toast/>
  <div class="min-h-screen bg-gradient-to-r from-yellow-400 to-yellow-500">
    <Navebar />
    
    <!-- Hero Section -->
    <div id="home" class="bg-gradient-to-r from-yellow-400 to-yellow-500 relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="floating-circle"></div>
        <div class="floating-circle-2"></div>
        <div class="floating-circle-3"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div class="grid lg:grid-cols-2 gap-8 items-center">
          
          <!-- Booking Form -->
          <div class="order-2 lg:order-1">
            <div 
              class="booking-form bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-md mx-auto lg:mx-0"
              :class="{ 'form-visible': isFormVisible }"
            >
              <form @submit.prevent="handleSubmit" class="space-y-4">
                
                <!-- Car Type Selection -->
                <div class="form-field">
                  <Select
                    v-model="selectedCarType"
                    :options="carTypes"
                    optionLabel="label"
                    optionValue="value"
                    :placeholder="t('form.placeholder.cartype')"
                    class="w-full dropdown-animated"
                  />
                </div>
                

                <!-- Pick-up Location -->
                <div class="form-field relative">
                  <InputGroup>
                    <InputGroupAddon class="bg-slate-200! w-35 addon-animated">
                      <i class="pi pi-map-marker text-black"> Location</i>
                    </InputGroupAddon>
                    <InputText 
                      ref="pickupInput"
                      v-model="hotelname" 
                      :placeholder="t('form.placeholder.name')"
                    />
                  </InputGroup>
                </div>
                <div class="form-field">
                  <InputGroup>
                    <InputGroupAddon class="bg-slate-200! w-35 addon-animated">
                      <i class="pi pi-user text-black "> Name</i>
                    </InputGroupAddon>
                    <InputText 
                      ref="pickupInput"
                      v-model="username" 
                      :placeholder="t('form.placeholder.username')"
                    />
                  </InputGroup>
                </div>
                <div class="form-field">
                  <InputGroup>
                    <InputGroupAddon class="bg-slate-200! w-35 addon-animated">
                      <i class="pi pi-phone text-black"> Phone</i>
                    </InputGroupAddon>
                    <InputMask 
                      ref="pickupInput"
                      v-model="phone" 
                      mask="(999) 999-9999" placeholder="(+855) 999-9999" fluid
                    />
                  </InputGroup>
                </div>

                <!-- Different Drop-off Toggle -->
                <!-- <div class="form-field text-sm text-gray-600">
                  <span 
                    class="cursor-pointer hover:text-gray-800 transition-colors duration-200 hover:underline"
                  >
                    {{ t('form.diffenrent') }}
                  </span>
                </div> -->

                <!-- Drop-off Location -->
                <!-- <div class="form-field relative">
                 
                  <input
                    ref="pickupInputRef"
                    type="text"
                    v-model="dropoffLocation"
                    :placeholder="t('form.placeholder.map')"
                    class="border border-slate-500 p-2 rounded w-full"
                  />
                </div> -->
                
                <!-- Pick-up Date & Time -->
                <div class="form-field ">
                  <div class="relative col-span-2">
                    <InputGroup>
                      <InputGroupAddon class="bg-slate-200! w-35 addon-animated">
                        <i class="pi pi-calendar text-black"> Pick-up Date </i>
                      </InputGroupAddon>
                      <DatePicker
                        v-model="pickupDate"
                        dateFormat="mm/dd/yy"
                        class="w-full datepicker-animated"
                        inputClass="pl-10 placeholder:text-yellow-500"
                      />
                    </InputGroup>
                  </div>
                  
                </div>
                <div>
                    
                    
                    <InputGroup>
                      <InputGroupAddon class="bg-slate-200! w-35 addon-animated">
                        <i class="pi pi-clock text-black"> Pick-up Time </i>
                      </InputGroupAddon>
                      <DatePicker 
                        v-model="templatedisplay" 
                        hourFormat="12" 
                        fluid 
                        iconDisplay="input" 
                        timeOnly 
                        inputId="templatedisplay"
                        class="datepicker-animated"
                      >
                        <!-- <template #inputicon="slotProps">
                          <i class="pi pi-clock" @click="slotProps.clickCallback" />
                        </template> -->
                      </DatePicker>
                    </InputGroup>
                  </div>

                <!-- Drop-off Date & Time -->
                <!-- <div class="form-field grid grid-cols-3 gap-3">
                  <div class="relative col-span-2">
                    <InputGroup>
                      <InputGroupAddon class="bg-slate-200! addon-animated">
                        <i class="pi pi-calendar text-black"> Drop-off</i>
                      </InputGroupAddon>
                      <DatePicker
                        v-model="dropoffDate"
                        dateFormat="mm/dd/yy"
                        class="w-full datepicker-animated"
                        inputClass="pl-10 placeholder:text-yellow-500"
                      />
                    </InputGroup>
                  </div>
                  <div>
                    <DatePicker 
                      v-model="templatedisplay1" 
                      showIcon 
                      fluid 
                      iconDisplay="input" 
                      timeOnly 
                      inputId="templatedisplay1"
                      class="datepicker-animated"
                    >
                      <template #inputicon="slotProps">
                        <i class="pi pi-clock" @click="slotProps.clickCallback" />
                      </template>
                    </DatePicker>
                  </div>
                </div> -->

                <!-- Turnstile -->
                <div
                  ref="turnstileEl"
                  class="cf-turnstile flex justify-center pt-2"
                ></div>
                <!-- Submit Button -->
                <Button
                  type="submit"
                  :disabled="!turnstileToken"
                  :label="t('button')"
                  class="w-full submit-button bg-yellow-400! hover:bg-yellow-500! text-gray-800 font-bold py-4 border-0! uppercase tracking-wide shadow-lg"
                />
              </form>
            </div>
          </div>

          <!-- Hero Content & Car Display -->
          <div class="order-1 lg:order-2 text-white">
            <div 
              class="mb-8 hero-text"
              :class="{ 'text-visible': isHeroTextVisible }"
            >
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {{ t('homepage.cardisplay.l') }} ${{ cars[currentSlide]?.price }} {{ t('homepage.cardisplay.d') }}
              </h1>
              <p class="text-xl md:text-2xl text-yellow-100">
                {{ t('homepage.cardisplay.t') }}
              </p>
            <div
              class="
                absolute
                -inset-[10%]
                w-[400px] sm:w-[450px] md:w-[600px] lg:w-[700px]
                mt-6 ml-7 
                bg-[url('../assets/ankorwate.png')]
                bg-cover bg-center bg-no-repeat
                blur-[1px]
                scale-[1.1] sm:scale-[1.15] md:scale-[1.2]
                opacity-20
              "
            ></div>

            </div>
                <!-- Background image + shadow -->
            <!-- Car Display Area -->
            <div 
              class="relative car-container hero-bg"
              :class="{ 'car-visible': isCarVisible }"
            >
        
              <div class="bg-gradient-to-br from-transparent to-transparent rounded-lg p-4 ">
                <!-- Car Image -->
                <div class="relative h-64 md:h-80 flex items-center justify-center">
                  <Transition
                    mode="out-in"
                    enter-active-class="car-enter-active"
                    enter-from-class="car-enter-from"
                    enter-to-class="car-enter-to"
                    leave-active-class="car-leave-active"
                    leave-from-class="car-leave-from"
                    leave-to-class="car-leave-to"
                  >
                    <div :key="currentSlide" class="text-center">
                      <img
                        :src="cars[currentSlide]?.image"
                        :alt="cars[currentSlide]?.name"
                        class="max-h-64 md:max-h-80 mx-auto object-contain drop-shadow-2xl car-image"
                      />
                      <p class="text-2xl font-bold drop-shadow-lg mt-1 car-name">
                        {{ cars[currentSlide]?.name }}
                      </p>
                    </div>
                  </Transition>
                </div>
                
                <!-- Navigation Arrows -->
                <div class="absolute bottom-4 right-4 flex space-x-2">
                  <Button
                    icon="pi pi-chevron-left"
                    rounded
                    text
                    class="nav-button bg-white/20! hover:bg-white/30 text-white! backdrop-blur-sm border-0"
                    @click="prevSlide"
                    :disabled="isAnimating"
                  />
                  <Button
                    icon="pi pi-chevron-right"
                    rounded
                    text
                    class="nav-button bg-white/20! hover:bg-white/30 text-white! backdrop-blur-sm border-0"
                    @click="nextSlide"
                    :disabled="isAnimating"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Arrow Decoration -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 hidden md:block arrow-decoration">
        <div class="bg-yellow-500 w-16 h-16 rotate-45 shadow-lg"></div>
      </div>
      
    </div>

    <section id="vehicles">
      <CarDetailView />
    </section>
    <h1 class="text-center text-3xl mb-5 font-extrabold text-white">Map</h1>
    <div class=" flex items-center justify-center">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24376.131197841325!2d103.8593696610689!3d13.357157145555059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1skm!2skh!4v1770230383524!5m2!1skm!2skh" width="81%" height="450" style="border:0; border-radius: 15px;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <section id="contact">
      <ContactView />
    </section>
    
    <!-- Success Dialog -->
    <Dialog
      v-model:visible="showDialog"
      modal
      :breakpoints="{ '960px': '90vw' }"
      :style="{ width: '40vw' , backgroundColor: 'transparent',  boxShadow: 'none'}"
      :closable="false"
      class="success-dialog"
    >
      <!-- <div class="flex flex-column gap-3 text-center py-4">
        <div class="text-5xl text-yellow-500">
          <i class="pi pi-check-circle"></i>
        </div>
        <p class="text-xl font-semibold text-gray-800">
          Thank you for your reservation!
        </p>
        <p class="text-gray-600">
          Our team will contact you shortly to confirm your booking details.
        </p>
        <p class="text-sm text-gray-500 mt-2">
          Please check your phone for our call or message.
        </p>
      </div> -->
      
      <h1 class=" text-2xl font-bold text-center text-white">{{ t('dialogform.thank') }} </h1>
      <div class=" flex justify-center items-center">
          <img src="../assets/thank2r.png" class="h-60  rounded-2xl">
        
          <!-- <h1 class="text-2xl font-bold text-white">Thank you for using our service. </h1>
          <h1>🙏🙏🙏</h1> -->
        
      </div>
      
      
      <template #footer>
        <Button
          :label="t('dialogform.button')"
          @click="
              () => {
                showDialog = false
                thankYouAudio.currentTime = 0
                thankYouAudio.play()
              }
            "
          class="w-full border-0! submit-button bg-yellow-400! hover:bg-yellow-500!"
        />
      </template>
    </Dialog>

   

  </div>

  <Footer/>
</template>


<style scoped>

/* ============================================
   HERO BACKGROUND IMAGE (CAR SHADOW STYLE)
   ============================================ */
.hero-bg {
  overflow: hidden;
}

.hero-bg-image {
  position: absolute;
  inset: -10% ;
  width: 700px;
  margin-top: 20px;
  background-image: url("../assets/ankorwate.png");
  background-size: cover;
  background-position: center;
  filter: blur(1px);
  transform: scale(1.2);
  opacity: 0.2;
}

/* ============================================
   FLOATING BACKGROUND ANIMATIONS
   ============================================ */
.floating-circle,
.floating-circle-2,
.floating-circle-3 {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.floating-circle {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation: float 20s ease-in-out infinite;
}

.floating-circle-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  right: 10%;
  animation: float 15s ease-in-out infinite reverse;
}

.floating-circle-3 {
  width: 150px;
  height: 150px;
  top: 30%;
  right: -75px;
  animation: float 18s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(1);
  }
  25% {
    transform: translateY(-30px) translateX(20px) scale(1.05);
  }
  50% {
    transform: translateY(-50px) translateX(-20px) scale(1.1);
  }
  75% {
    transform: translateY(-30px) translateX(20px) scale(1.05);
  }
}

/* ============================================
   BOOKING FORM ANIMATIONS
   ============================================ */
.booking-form {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.booking-form.form-visible {
  opacity: 1;
  transform: translateX(0);
}

.form-field {
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease-out forwards;
}

.form-field:nth-child(1) { animation-delay: 0.1s; }
.form-field:nth-child(2) { animation-delay: 0.2s; }
.form-field:nth-child(3) { animation-delay: 0.3s; }
.form-field:nth-child(4) { animation-delay: 0.4s; }
.form-field:nth-child(5) { animation-delay: 0.5s; }
.form-field:nth-child(6) { animation-delay: 0.6s; }
.form-field:nth-child(7) { animation-delay: 0.7s; }

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   INPUT FIELD ANIMATIONS
   ============================================ */
.input-animated,
.dropdown-animated,
.datepicker-animated {
  transition: all 0.3s ease;
}

.input-animated:focus,
.dropdown-animated:focus,
.datepicker-animated:focus {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(234, 179, 8, 0.2);
}

.addon-animated {
  transition: all 0.3s ease;
}

.input-animated:focus + .addon-animated,
.input-animated:focus-within ~ .addon-animated {
  background-color: #fef3c7 !important;
}

/* ============================================
   SUBMIT BUTTON ANIMATIONS
   ============================================ */
/* .submit-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
} */

/* .submit-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
} */

.submit-button:hover::before {
  width: 300px;
  height: 300px;
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(234, 179, 8, 0.3);
}

.submit-button:active {
  transform: translateY(-1px);
}

/* ============================================
   HERO TEXT ANIMATIONS
   ============================================ */
.hero-text {
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-text.text-visible {
  opacity: 1;
  transform: translateX(0);
}

.hero-text h1 {
  animation: fadeInScale 1s ease-out 0.3s both;
}

.hero-text p {
  animation: fadeInScale 1s ease-out 0.5s both;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ============================================
   CAR DISPLAY ANIMATIONS
   ============================================ */
.car-container {
  opacity: 0;
  transform: scale(0.9);
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.car-container.car-visible {
  opacity: 1;
  transform: scale(1);
}

.car-image {
  animation: carFloat 3s ease-in-out infinite;
}

@keyframes carFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.car-name {
  animation: textGlow 2s ease-in-out infinite;
}

@keyframes textGlow {
  0%, 100% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(234, 179, 8, 0.5);
  }
}

/* Car Transition Animations */
.car-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.car-leave-active {
  transition: all 0.3s ease-in;
}

.car-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.8) rotate(5deg);
}

.car-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1) rotate(0deg);
}

.car-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1) rotate(0deg);
}

.car-leave-to {
  opacity: 0;
  transform: translateX(-100px) scale(0.8) rotate(-5deg);
}

/* ============================================
   NAVIGATION BUTTONS
   ============================================ */
.nav-button {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-button:hover:not(:disabled) {
  transform: scale(1.15) rotate(360deg);
  background: rgba(255, 255, 255, 0.4) !important;
}

.nav-button:active:not(:disabled) {
  transform: scale(0.95);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ============================================
   ARROW DECORATION
   ============================================ */
.arrow-decoration {
  animation: arrowPulse 2s ease-in-out infinite;
}

@keyframes arrowPulse {
  0%, 100% {
    transform: translate(-50%, 50%) scale(1);
  }
  50% {
    transform: translate(-50%, 50%) scale(1.1);
  }
}

/* ============================================
   SECTION FADE IN
   ============================================ */
.section-fade-in {
  opacity: 0;
  transform: translateY(30px);
  animation: sectionFadeIn 0.8s ease-out forwards;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@keyframes sectionFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   PRIMEVUE CUSTOM STYLES
   ============================================ */
:deep(.p-inputtext::placeholder) {
  color: #eab308 !important;
}

:deep(.p-dropdown .p-dropdown-label.p-placeholder) {
  color: #6b7280 !important;
}

:deep(.p-calendar .p-inputtext) {
  padding-left: 2.5rem;
}

:deep(.p-dropdown) {
  border-color: #d1d5db;
  transition: all 0.3s ease;
}

:deep(.p-dropdown:hover) {
  border-color: #9ca3af;
  transform: translateY(-1px);
}

:deep(.p-dropdown.p-focus) {
  border-color: #eab308;
  box-shadow: 0 0 0 0.2rem rgba(234, 179, 8, 0.2);
  transform: translateY(-2px);
}

:deep(.p-inputtext) {
  transition: all 0.3s ease;
}

:deep(.p-inputtext:hover) {
  border-color: #9ca3af;
}

:deep(.p-inputtext:focus) {
  border-color: #eab308;
  box-shadow: 0 0 0 0.2rem rgba(234, 179, 8, 0.2);
}

/* ============================================
   RESPONSIVE ADJUSTMENTS
   ============================================ */
@media (max-width: 1024px) {
  .floating-circle,
  .floating-circle-2,
  .floating-circle-3 {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .car-image {
    animation: none;
  }
  
  .booking-form {
    transform: translateX(0);
  }
  
  .hero-text {
    transform: translateX(0);
  }
}

/* ============================================
   SMOOTH SCROLL BEHAVIOR
   ============================================ */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* Reduce animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ============================================
   SUCCESS DIALOG STYLES
   ============================================ */
:deep(.success-dialog .p-dialog-header) {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: #1f2937;
  font-weight: 700;
  font-size: 1.25rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

:deep(.success-dialog .p-dialog-content) {
  background-color: #ffffff;
  padding: 2rem;
}

:deep(.success-dialog .p-dialog-footer) {
  background-color: #f9fafb;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 1.5rem;
}

:deep(.success-dialog .p-dialog-header-close) {
  display: none;
}

/* Dialog animation */
:deep(.success-dialog) {
  animation: dialogSlideIn 0.3s ease-out;
}

@keyframes dialogSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Backdrop overlay */
:deep(.p-dialog-mask) {
  backdrop-filter: blur(4px);
}

:deep(.p-dialog-mask.p-component-overlay) {
  background-color: rgba(0, 0, 0, 0.6) !important;
}
</style>