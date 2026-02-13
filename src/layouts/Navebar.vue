<template>
  <nav class=" shadow-md sticky top-0 z-50" style=" background-color: transparent; box-shadow: none;">

    <!-- Top Bar -->
    <div class="bg-gray-100 border-b border-gray-200" >
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-6">
          <div class="flex items-center space-x-2 text-sm text-gray-700">
            <i class="pi pi-phone text-gray-600"></i>
            <span class="font-medium">CONTACT: (562) 498-4600</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <div  >
      <div class="px-4 py-2">
        <div class="flex items-center justify-between h-14 
                rounded-full bg-yellow-400
                bg-cover bg-center
                shadow-lg"
        >

          <!-- Logo -->
          <!-- <img src="../assets/logocar2.png" class="w-36 ml-4" /> -->
          <!-- <div class=" w-56  pl-6 p-1 rounded-full shadow-yellow-500 shadow-2xl">
            <h1 class="text-3xl font-bold text-white">
              CAMBODIA<span class="text-yellow-600">|</span>
            </h1>
            <p class="text-xs text-gray-500 uppercase">
              PRIVATETRANSPORT
            </p>
          </div> -->
          <div class="flex items-center justify-center ">
            <div class="relative group">
              <!-- <div class="absolute -inset-1 bg-yellow-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div> -->
              
              <div class="relative w-50 h-14 bg-yellow-400p-[2px] ">
                <div class="flex flex-col items-center justify-center w-full h-full rounded-l-full  bg-yellow-400  border-yellow-300">
                  
                  <h1 class="text-2xl font-black text-white tracking-tighter flex items-center leading-none">
                    CAMBODIA
                    <span class="mx-1 text-white opacity-150 font-light">|</span>
                    <div class="flex flex-col space-y-[2px]">
                      <div class="w-2 h-1 bg-white opacity-50"></div>
                      <div class="w-2 h-1 bg-white"></div>
                      <div class="w-2 h-1 bg-white opacity-50"></div>
                    </div>
                  </h1>
                  
                  <p class="text-[10px] font-bold text-white tracking-[0.2em] uppercase mt-1 opacity-90">
                    Private Transport
                  </p>
                  
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-4  backdrop-blur 
                      pl-6 pr-2 py-1 ">
            <a
              v-for="item in navItems"
              :key="item.label"
              href="javascript:void(0)"
              class="px-4 py-2 transition-all rounded-full"
              :class="isActive(item.to)
                ? 'bg-yellow-200 text-gray-900 font-semibold'
                : 'text-white font-bold text-xl hover:bg-yellow-200'"
              @click="scrollToSection(item.to)"
            >
              {{ item.label }}
            </a>
          </div>

          <!-- Language Button -->
          <Button
            icon="pi pi-globe"
            iconPos="right"
            iconClass=" text-xl!"
            class="bg-yellow-400! te hover:bg-yellow-500! border-0! mr-3 md:-40! hidden md:flex rounded-full "
            @click="showLanguageDialog = true"
          />

          <!-- Mobile Menu -->
          <Button
            icon="pi pi-bars"
            class="md:hidden! bg-yellow-400! text-white! border-0! rounded-full mr-3"
            @click="drawerVisible = true"
          />
        </div>
      </div>

    </div>

    <!-- Mobile Drawer -->
    <Drawer v-model:visible="drawerVisible" position="right" class="md:hidden bg-yellow-400!">
      <template #header>
        <div class="flex items-center justify-between h-14 rounded-full w-50  bg-center shadow-lg">
          <!-- <h2 class="text-2xl font-bold">
            CAR<span class="text-yellow-400">|</span>RENTAL
          </h2>
          <p class="text-xs text-gray-500 uppercase">Menu</p> -->
          <!-- Logo -->
          <!-- <img src="../assets/logo1.png" class="w-36 mt-5 justify-center items-center" /> -->
           <div class="flex items-center justify-center ">
            <div class="relative group">
              <!-- <div class="absolute -inset-1 bg-yellow-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div> -->
              
              <div class="relative w-50 h-14 bg-yellow-400p-[2px] ">
                <div class="flex flex-col items-center justify-center w-full h-full rounded-full  bg-yellow-400  border-yellow-300">
                  
                  <h1 class="text-2xl font-black text-white tracking-tighter flex items-center leading-none">
                    CAMBODIA
                    <span class="mx-1 text-white opacity-150 font-light">|</span>
                    <div class="flex flex-col space-y-[2px]">
                      <div class="w-2 h-1 bg-white opacity-50"></div>
                      <div class="w-2 h-1 bg-white"></div>
                      <div class="w-2 h-1 bg-white opacity-50"></div>
                    </div>
                  </h1>
                  
                  <p class="text-[10px] font-bold text-white tracking-[0.2em] uppercase mt-1 opacity-90">
                    Private Transport
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="space-y-2">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.to"
          class="block px-4 py-3 text-xl font-bold text-white rounded-md  hover:bg-yellow-50 hover:text-black"
          @click="drawerVisible = false"
        >
          {{ item.label }}
        </a>
        <Divider/>
        <div class="px-4 py-3 text-sm text-white ">
          <i class="pi pi-phone mr-2"></i>(562) 498-4600
        </div>
        <div class="px-4 py-3 text-sm text-gray-700">
          <a href="https://www.facebook.com/share/1892q4SgGk/?mibextid=wwXIfr" class="text-white"><i class="pi pi-facebook mr-2"></i>YEAN TRANSPORT</a>
        </div>
        <div class="px-4 py-3 text-sm text-gray-700">
          <!-- <i class="pi pi-instagram mr-2"></i>(562) 498-4600 -->
          <a href="https://www.facebook.com/share/1892q4SgGk/?mibextid=wwXIfr" class="text-white"><i class="pi pi-instagram mr-2"></i>YEAN TRANSPORT</a>
        </div>
        <div class="px-4 py-3 text-sm text-gray-700">
          <!-- <i class="pi pi-telegram mr-2"></i>(562) 498-4600 -->
          <a href="https://www.facebook.com/share/1892q4SgGk/?mibextid=wwXIfr" class="text-white"><i class="pi pi-telegram mr-2"></i>YEAN TRANSPORT</a>
        </div>
      </div>
    </Drawer>
  </nav>
  <Dialog
    v-model:visible="showLanguageDialog"
    modal
    :dismissableMask="true"
    :draggable="false"
    :closable="false"
    :style="{ width: '400px', backgroundColor: 'transparent',  boxShadow: 'none' }"
    :pt="{
      root: { class: 'rounded-3xl overflow-hidden shadow-2xl' },
      mask: { class: 'backdrop-blur-md bg-black/60' },
      header: { class: ' border-0 pt-12 pb-6 px-8' },
      content: { class: ' p-0 px-8 pb-12' }
    }"
  >
    <template #header>
      <div class="w-full text-center">
        <!-- Animated Globe Icon -->
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full mb-6 border-3 border-white/30 animate-pulse">
          <i class="pi pi-globe text-4xl text-white animate-spin-slow"></i>
        </div>
        
        <!-- Title -->
        <h2 class="text-3xl font-bold text-white mb-2 tracking-tight">
          {{ t('dialog.title') }}
        </h2>
        
        <!-- Subtitle -->
        <p class="text-white/85 text-base font-normal">
          {{ t('dialog.subtitle') }}
        </p>
      </div>
    </template>

    <!-- Language Options -->
    <div class="flex flex-col gap-4">
      <!-- English Button -->
      <button
        @click="selectLanguage('en')"
        class="group relative w-full bg-transparent  rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 overflow-hidden"
      >
        <!-- Hover Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div class="relative flex items-center gap-4">
          <!-- Flag Icon Container -->
          <div class="relative flex items-center justify-center">
            <div class="absolute inset-0 bg-white/30 rounded-full blur-xl group-hover:bg-white/40 transition-all duration-300"></div>
            <div class="relative flex items-center justify-center w-16 h-16 bg-white rounded-full border-2 border-white/40 group-hover:border-white/60 shadow-md transition-all duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w80/us.png" 
                alt="United States Flag"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          
          <!-- Text Content -->
          <div class="flex-1 text-left">
            <div class="text-xl font-bold text-white leading-tight flex items-center gap-2">
              <span>English</span>
              <i class="pi pi-map-marker text-base opacity-60"></i>
            </div>
            <div class="text-sm font-medium text-amber-900/75 mt-0.5 flex items-center gap-1">
              <i class="pi pi-flag text-xs"></i>
              <span>United States</span>
            </div>
          </div>
          
          <!-- Arrow Icon -->
          <i class="pi pi-arrow-right text-xl text-gray-900/60 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300"></i>
        </div>
      </button>

      <!-- French Button -->
      <button
        @click="selectLanguage('fr')"
        class="group relative w-full bg-transparent   rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 overflow-hidden"
      >
        <!-- Hover Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div class="relative flex items-center gap-4">
          <!-- Flag Icon Container -->
          <div class="relative flex items-center justify-center">
            <div class="absolute inset-0 bg-white/30 rounded-full blur-xl group-hover:bg-white/40 transition-all duration-300"></div>
            <div class="relative flex items-center justify-center w-16 h-16 bg-white rounded-full border-2 border-white/40 group-hover:border-white/60 shadow-md transition-all duration-300 overflow-hidden">
              <img 
                src="https://flagcdn.com/w80/fr.png" 
                alt="France Flag"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          
          <!-- Text Content -->
          <div class="flex-1 text-left">
            <div class="text-xl font-bold text-white leading-tight flex items-center gap-2">
              <span>Français</span>
              <i class="pi pi-map-marker text-base opacity-60"></i>
            </div>
            <div class="text-sm font-medium text-blue-200/75 mt-0.5 flex items-center gap-1">
              <i class="pi pi-flag text-xs"></i>
              <span>France</span>
            </div>
          </div>
          
          <!-- Arrow Icon -->
          <i class="pi pi-arrow-right text-xl text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"></i>
        </div>
      </button>
    </div>
  </Dialog>

</template>

<script setup lang="ts">
import { ref, onMounted ,onUnmounted, computed } from 'vue'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import Divider from 'primevue/divider'
import { useI18n } from 'vue-i18n'

const drawerVisible = ref(false)
const showLanguageDialog = ref(false)
const selectedLanguage = ref<'en' | 'fr'>('en')
const { t, locale } = useI18n({ useScope: 'global' })



const activeSection = ref('#home') 

const navItems = computed(() => [
  { label: t('nav.home'), to: '#home' },
  { label: t('nav.vehicles'), to: '#vehicles' },
  { label: t('nav.contact'), to: '#contact' }
])


const scrollToSection = (hash: string) => {
  const section = document.querySelector(hash) as HTMLElement;
  if (section) {
    // Smooth scroll animation
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeSection.value = hash;
  }
}



const handleScroll = () => {
  const scrollPos = window.scrollY + 120 // offset to consider navbar height

  for (const item of navItems.value) {
    const section = document.querySelector(item.to) as HTMLElement
    if (section) {
      const top = section.offsetTop
      const bottom = top + section.offsetHeight

      if (scrollPos >= top && scrollPos < bottom) {
        activeSection.value = item.to
      }
    }
  }
}



onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


const isActive = (hash: string) => {
  return activeSection.value === hash
}


const selectLanguage = (lang: 'en' | 'fr') => {
  locale.value = lang
  selectedLanguage.value = lang
  localStorage.setItem('lang', lang)
  showLanguageDialog.value = false
}

onMounted(() => {
  const savedLang = localStorage.getItem('lang') as 'en' | 'fr' | null
  if (savedLang) {
    locale.value = savedLang
    selectedLanguage.value = savedLang
    showLanguageDialog.value = true
  } else {
    showLanguageDialog.value = true
  }

  window.addEventListener('scroll', handleScroll)
  handleScroll()
})


</script>

<style scoped>
/* Dialog Custom Styling */
:deep(.language-dialog-mask) {
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.6);
  animation: fadeIn 0.3s ease;
}

:deep(.language-dialog-root) {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

:deep(.language-dialog-content) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  border-radius: 24px;
}

:deep(.p-dialog-header) {
  background: transparent;
  border: none;
  padding: 3rem 2rem 1.5rem;
}

:deep(.p-dialog-content) {
  padding: 0 2rem 3rem;
  background: transparent;
}

/* Header Styling */
.language-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

.language-icon {
  font-size: 2.5rem;
  color: white;
  animation: rotate 20s linear infinite;
}

.dialog-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem;
  letter-spacing: -0.025em;
}

.dialog-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  font-weight: 400;
}

/* Language Options */
.language-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.language-button {
  position: relative;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: 16px;
  background: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.language-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.language-button:hover::before {
  opacity: 1;
}

.language-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.language-button:active {
  transform: translateY(-2px);
}

.language-button-primary {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.language-button-secondary {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
}

.language-button-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  position: relative;
}

.language-flag {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.language-button:hover .language-flag {
  transform: scale(1.1);
}

.language-text {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.language-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: inherit;
  line-height: 1.2;
}

.language-button-primary .language-name {
  color: #111827;
}

.language-button-secondary .language-name {
  color: white;
}

.language-native {
  font-size: 0.875rem;
  opacity: 0.75;
  font-weight: 500;
}

.language-button-primary .language-native {
  color: #78350f;
}

.language-button-secondary .language-native {
  color: rgba(255, 255, 255, 0.7);
}

.language-arrow {
  font-size: 1.25rem;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.language-button-primary .language-arrow {
  color: #111827;
}

.language-button-secondary .language-arrow {
  color: white;
}

.language-button:hover .language-arrow {
  opacity: 1;
  transform: translateX(4px);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 480px) {
  :deep(.language-dialog-root) {
    width: 90vw !important;
    margin: 1rem;
  }

  .dialog-title {
    font-size: 1.5rem;
  }

  .language-icon-wrapper {
    width: 64px;
    height: 64px;
  }

  .language-icon {
    font-size: 2rem;
  }

  .language-button-content {
    padding: 1rem;
  }

  .language-flag {
    font-size: 2rem;
  }

  .language-name {
    font-size: 1.125rem;
  }
}
</style>