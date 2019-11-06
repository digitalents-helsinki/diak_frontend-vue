<template>
  <div class="noticePage">
      <div class="divWrapper">
        <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" class="logo"/>
        <div class="contentWrapper">
          <div class="empty">
          </div>
          <div class="noticeWrapper">
            <p class="heading">Confidentiality Notice</p>
            <p class="content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.  </p>
          </div>
          <b-button class="noticeButton">Button</b-button>
        </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ConfidentialityNotice',
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.noticePage {
  background-color: #FFFFFF;
  width:100%;
  height:100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;
  
  .divWrapper{
    .logo{
      width:100%;
    }
  }

  .contentWrapper {
    background-color:#FFFFFF;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 5px 5px gray;
    margin:1rem;
    padding-bottom:1.8rem;

    .empty{
      background-color:#80CDE6;
      width:100%;
      margin-bottom:1rem;
      padding: 1rem;
    }

    .noticeWrapper {
      margin-top:1rem;
      margin-bottom:1rem;
      padding:1rem;
      
      .heading{
        font-size:1.6rem;
        text-align:center;
      }

      .content{
        font-size:1rem;
        text-align:left;
      }
    }

    .noticeButton {
      background-color: #350E7E;
      color:#FFFFFF;
      font-size: 1rem;
      font-weight:bold;
      padding-top: 0.5rem;
      padding-bottom:0.5rem;
      border: none;
      border-radius: 50px;
      box-shadow: 0 5px 5px gray;
      align-self: center;
      line-height:2;
      width:16rem;
    }
  }
}
@media screen and (min-width: 768px) { 
  .contentWrapper{
    width:38rem !important;
  }
}
</style>