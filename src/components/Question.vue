<template>
  <div class="question" v-show="questionnum == 0">
    <div class="question_text">
      <p>1. {{ $t('message.question_health') }}</p>
      <button class="btn help_button" @click.prevent="toggleQuestionHelp('health')">?</button>
    </div>
    <p v-if="help_text_visible === 'health'">{{ $t('message.help_text_health') }}</p>
    <b-form-input type="range" min="0" max="10" v-model="questiondata.health" />
    <p>{{questiondata.health}}</p>
    <textarea v-model="questiondata.health_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
    <div class="buttons">
      <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
    </div>
    <router-link to="/">{{ $t('message.cancel')}}</router-link>
  </div>
</template>
<script>
export default {
  name: 'question'
}
</script>
<style lang="scss" scoped>

</style>
