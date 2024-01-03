<script setup lang="ts">
const props = defineProps({
  link: {
    type: Object,
    required: false,
  },
})

const icons = {
  facebook: 'i-bxl-facebook',
  twitter: 'i-bxl-twitter',
  instagram: 'i-bxl-instagram',
  linkedin: 'i-bxl-linkedin',
  youtube: 'i-bxl-youtube',
  website: 'i-carbon-link',
  email: 'i-carbon-email',
  phone: 'i-carbon-phone',
  whatsapp: 'i-bxl-whatsapp',
  telegram: 'i-bxl-telegram',
  tiktok: 'i-bxl-tiktok',
  snapchat: 'i-bxl-snapchat',
  pinterest: 'i-bxl-pinterest',
  github: 'i-bxl-github',
  reddit: 'i-bxl-reddit',
  discord: 'i-bxl-discord',
  slack: 'i-bxl-slack',
  medium: 'i-carbon-logo-medium',
  tumblr: 'i-bxl-tumblr',
  vimeo: 'i-bxl-vimeo',
  behance: 'i-bxl-behance',
  dribbble: 'i-bxl-dribbble',
  vk: 'i-bxl-vk',
  weibo: 'i-bxl-weibo',
  quora: 'i-carbon-logo-quora',
  spotify: 'i-bxl-spotify',
  soundcloud: 'i-bxl-soundcloud',
  twitch: 'i-bxl-twitch',
  steam: 'i-bxl-steam',
  paypal: 'i-bxl-paypal',
  cashapp: 'i-bxl-cashapp',
  patreon: 'i-bxl-patreon',
  google: 'i-bxl-google',
  apple: 'i-bxl-apple',
  microsoft: 'i-bxl-microsoft',
  yahoo: 'i-bxl-yahoo',
  bing: 'i-bxl-bing',
  duckduckgo: 'i-bxl-duckduckgo',
  yandex: 'i-bxl-yandex',
  baidu: 'i-bxl-baidu',
  naver: 'i-bxl-naver',
  amazon: 'i-bxl-amazon',
  ebay: 'i-bxl-ebay',
  etsy: 'i-bxl-etsy',
  aliexpress: 'i-bxl-aliexpress',
  flipkart: 'i-bxl-flipkart',
  taobao: 'i-bxl-taobao',
  alibaba: 'i-bxl-alibaba',
  wikipedia: 'i-bxl-wikipedia',
  imdb: 'i-bxl-imdb',
  flickr: 'i-bxl-flickr',
  signal: 'i-bxl-signal',
}
const icon = computed(() => {
  return icons[props.link?.name.toLowerCase()]
})
</script>

<template>
  <v-icon color="orange-darken-4" :icon="icon" left mx-2 mt-2 />
</template>

<style scoped></style>
