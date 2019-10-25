<template>
<div>
  <p>Agree to this</p>
  <button @click="$emit('nextPage')">Agree</button>
</div>
</template>
<script>
export default {
  name: 'questionnaire-agreement'
}
</script>
<style lang="scss" scoped>

</style>