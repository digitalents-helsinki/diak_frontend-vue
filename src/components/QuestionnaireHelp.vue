<template>
<div class="wrapper">
  <div class="text-container">
    <p class="welcomeMessage">{{ $t('message.home') }}</p>
    <div class="text-container-content">
      <img src="../images/diak-meter.svg" alt="" />
      <p>{{ $t('message.help_text_1') }}</p>
    </div>
    <div class="text-container-content">
      <img src="../images/DiakThumbs.svg" alt="" />
      <p>{{ $t('message.help_text_2') }}</p>
    </div>
    <div class="text-container-content">
      <img src="../images/diak-balance.svg" alt="" />
      <p>{{ $t('message.help_text_3') }}</p>
    </div>
    <div class="text-container-content">
      <img src="../images/Diak-null.svg" alt="" />
      <p>{{ $t('message.help_text_4') }}</p>
    </div>
    <button @click="$emit('nextPage')">Seuraava</button>
  </div>
</div>
</template>
<script>
export default {
  name: 'questionnaire-help'
}
</script>
<style lang="scss" scoped>
img {
  width: 25px;
}
</style>