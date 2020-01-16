<template>
  <div class="differentlanguages">
    <div class="iconLang">
      <img src="../images/language-icon.svg" alt="" style="width:60px; height:28px; margin-top:0.3rem;"/>
    </div>
    <div class="dropdownforLang">
      <b-form-select v-model="selectedLang" :options="langOptions"></b-form-select>
    </div> 
  </div>
</template>
<script>

export default {
  name: 'Languages',
  data() {
    return {
      error: false,
      selectedLang: this.$i18n.locale,
      langOptions: [
        {
          value: 'fi', text: 'Suomi',
        },
        {
          value: 'sv', text: 'Svenska'
        },
        {
          value: 'en', text: 'English'
        }
      ]
    }
  },
  watch: {
    selectedLang(newVal) {
      this.$i18n.locale = newVal
      document.cookie = `3X10D_LANGUAGE=${newVal}; expires=${(date => date.setDate(date.getDate() + 365*24*60*60*1000))(new Date)}; path=/`
    }
  }
}

</script>
<style lang="scss" scoped>

.differentlanguages{
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  margin-top:0.1rem;
  margin-right:1rem;
  margin-bottom:1rem;
  margin-left:0.1rem;

  .iconLang{
    display:flex;
    flex-direction:column;
    align-items:center;
  }
} 
@media only screen and (min-width: 320px) and (max-width: 360px){
  .differentlanguages{
    margin-bottom:0.1rem;
  }
}  
</style>