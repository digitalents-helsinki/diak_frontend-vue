<template>
    <div class="differentlanguages">
        <div class="iconLang">
            <img src="../images/language-icon.svg" alt="" style="width:60px; height:28px; margin-top:0.3rem;"/>
        </div>
        <div class="dropdownforLang">
            <b-form-select v-model="selectedLang" :options="langOption"></b-form-select>
        </div> 
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Languages',
  
  data() {
    return {
      error: false,
      selectedLang:'Suomi',
      langOption: ['Suomi','Swedish','English']
    }
  },
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