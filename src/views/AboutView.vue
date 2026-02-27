<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

// const drawerVisible = ref(false)
const { t } = useI18n({ useScope: 'global' })


const navItems = computed(() => [
  { label: t('about.b'), to: '#home' }
])

const activeSection = ref('')

const scrollToSection = (hash: string) => {
  const section = document.querySelector(hash) as HTMLElement
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = hash
  }
}

const handleScroll = () => {
  const scrollPos = window.scrollY + 120

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

const isActive = (hash: string) => {
  return activeSection.value === hash
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section
    class="relative overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-500 py-20 px-6"
  >
    <!-- Background Blur Circle -->
    <div class="absolute -top-20 -left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>

    <div class="relative max-w-6xl mx-auto">

      <!-- Title -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
          Cambodia Private Transport
        </h1>
        <p class="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          {{ t('about.a1') }}
        </p>
      </div>

      <!-- Content Card -->
      <div class="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10 space-y-14">

        <!-- Travel Anywhere -->
        <div>
          <h2 class="text-3xl font-bold text-white mb-4">
            {{ t('about.ta') }}
          </h2>
          <p class="text-white/90 leading-relaxed text-lg">
            {{ t('about.a2') }}
          </p>
        </div>

        <!-- What to Expect -->
        <div>
          <h2 class="text-3xl font-bold text-white mb-6">
            {{ t('about.wte.label') }}
          </h2>

          <ul class="grid md:grid-cols-2 gap-6">
            <li class="flex items-center gap-3 text-white/95 text-lg">
              <span class="bg-white text-yellow-600 p-2 rounded-full shadow-md">✔</span>
              {{ t('about.wte.w1') }}
            </li>
            <li class="flex items-center gap-3 text-white/95 text-lg">
              <span class="bg-white text-yellow-600 p-2 rounded-full shadow-md">✔</span>
              {{ t('about.wte.w2') }}
            </li>
            <li class="flex items-center gap-3 text-white/95 text-lg">
              <span class="bg-white text-yellow-600 p-2 rounded-full shadow-md">✔</span>
              {{ t('about.wte.w3') }}
            </li>
            <li class="flex items-center gap-3 text-white/95 text-lg">
              <span class="bg-white text-yellow-600 p-2 rounded-full shadow-md">✔</span>
              {{ t('about.wte.w4') }}
            </li>
            <li class="flex items-center gap-3 text-white/95 text-lg">
              <span class="bg-white text-yellow-600 p-2 rounded-full shadow-md">✔</span>
              {{ t('about.wte.w5') }}
            </li>
          </ul>
        </div>

        <!-- Airport Pickups -->
        <div>
          <h2 class="text-3xl font-bold text-white mb-4">
            {{ t('about.apt') }}
          </h2>
          <p class="text-white/90 text-lg leading-relaxed">
            {{ t('about.skip') }}
          </p>
        </div>

        <!-- CTA Section -->
        <div class="rounded-2xl shadow-xl p-10 text-center space-y-6">

          <p class="text-white text-xl font-medium">
            {{ t('about.let') }}
          </p>

          <!-- Beautiful CTA Button -->
          <a
            v-for="item in navItems"
            :key="item.label"
            :href="item.to"
            @click.prevent="scrollToSection(item.to)"
            class="inline-block px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            :class="isActive(item.to)
              ? 'bg-yellow-500 text-white'
              : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:shadow-2xl'"
          >
            🚗 {{ item.label }}
          </a>

          <!-- <div class="pt-6 border-t text-gray-600">
            <p class="font-semibold mb-2">
              Send a message to book a car or ask about our rates.
            </p>

            <a
              href="https://t.me/+85511944244"
              target="_blank"
              class="text-blue-600 font-bold text-lg hover:underline"
            >
              Telegram / WhatsApp: +855 11 944 244
            </a>
          </div> -->

        </div>

      </div>

    </div>
  </section>
</template>