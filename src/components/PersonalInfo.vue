<template>
  <div id="maindivInfo">
    <div class="container-fluid" id="topofPage">
      <div id="logoPlace"><img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" id="profileLogo"/></div>
    </div>
    <div class="container infoTopcontent">
      <div id="personalContent">
        <p id="instruction"> {{ $t('message.infoInstruction') }}</p>
          <div id="infoContentFields">
            <form action="" method="post" name="">
            <p id="fullnameField">
              <label for="firstandfamilyname">{{ $t('message.userName') }}</label>
              <input id="firstandfamilyname" type="text" name="firstandfamilyname">
            </p>
             <p id="addressField">
              <label for="enteraddress">{{ $t('message.userAddress') }}</label>
              <input id="enteraddress" type="text" name="enteraddress">
            </p>
             <div id="ageField">
                <div id="labelCenter"><p>{{ $t('message.userAge') }}</p></div>
                <div id="calanderPosition"><datepicker v-model="pickDate" :language="fi" v-bind:placeholder="$t('message.calanderPlaceholder')"></datepicker></div>
            </div>
             <p id="genderField">
              <label for="entergender">{{ $t('message.userGender') }}</label>
                <select name="entergender">
                  <option value="" disabled selected>{{ $t('message.selectGender') }}</option>
                  <option value="male">{{ $t('message.genderMale') }}</option>
                  <option value="female">{{ $t('message.genderFemale') }}</option>
                  <option value="other">{{ $t('message.genderOther') }}</option>
                </select>
            </p>
             <p id="phonenumberField">
              <label for="enterphonenumber">{{ $t('message.userPhonenumber') }}</label>
              <input id="enterphonenumber" type="tel" name="enterphonenumber">
            </p>
            <p id="emailaddressField">
              <label for="emailaddressField">{{ $t('message.userEmailaddress') }}</label>
              <input id="emailaddressField" type="email" name="emailaddressField">
            </p>
            <div id="infosubmitButton"> <button type="submit" class="btn submitIncluded">{{ $t('message.ProfilesubmitButton') }}</button></div>
            </form>
          </div>
      </div>
    </div>
  </div>
  <!--<form>
    <div class="form-group">
      <label for="userName">Nimi</label>
      <input type="text" class="form-control" id="userName" placeholder="" />
    </div>
    <div class="form-group">
      <label for="userGender">Sukupuoli</label>
      <select class="form-control" id="userGender">
        <option>mies</option>
        <option>nainen</option>
        <option>muu</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Tallenna</button>
  </form>-->
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { fi } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'PersonalInfo',
  data() {
    return {
      fi: fi,
      pickDate: null
  }
},
components: {
        Datepicker
    },
}
</script>
<style lang="scss" scoped>
#maindivInfo{
  background-color: #F9F9FB;
  width:100%;
  display: flex;
  flex-flow: column nowrap;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;
  
  #topofPage{
    background-color: #80cde6;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    width:100%;
    height:7rem;
    
    #logoPlace{
      #profileLogo{
        width:100%;
        height: 60px;
      }
    }
  }

  .infoTopcontent{

    #personalContent{
      background-color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width:100%;
      box-shadow: 0 5px 5px gray;
      margin-top: 1.8rem;
      margin-bottom:1rem;

      #instruction{
        font-size:1.1rem;
        text-align:left;
        margin:1rem 0;
        text-align:center;
      }
        
      #infoContentFields{
        display:flex;
        flex-direction:column;
        width:100%;
        padding:1rem;
        margin-bottom:1rem;

        #fullnameField{
          display:flex;
          flex-direction:column;

          label{
            font-size:1.1rem;
          }

          input{
            width:100%;
          }
        }

        #addressField{
          display:flex;
          flex-direction:column;

          label{
            font-size:1.1rem;
          }

          input{
            width:100%;
          }
        }

        #ageField{
          display:flex;
          flex-direction:column;
          margin-bottom:1rem;

          #labelCenter{
            font-size:1.1rem;
          }
        }

        #genderField{
          display:flex;
          flex-direction:column;

          label{
            font-size:1.1rem;
          }
        }

        #phonenumberField{
          display:flex;
          flex-direction:column;

          label{
            font-size:1.1rem;
          }

          input{
            width:100%;
          }
        }

        #emailaddressField{
          display:flex;
          flex-direction:column;
          margin-bottom:2rem;

          label{
            font-size:1.1rem;
          }

          input{
            width:100%;
          }
        }
        #infosubmitButton{
          display:flex;
          flex-direction:column;
          align-items:center;
          
          .submitIncluded{
            background-color: #350E7E;
            font-weight:bold;
            color:#FFFFFF;
            border-radius: 50px;
            box-shadow: 0 5px 5px gray;
            line-height: 2;
            align-self: center;
            padding: 0.5rem 6rem;
            font-size: 1rem;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 360px) { 
   .infoTopcontent{
     padding:0rem;
   }
}
@media screen and (min-width: 768px) { 
  #maindivInfo{
    height:100%;
  }

  #logoPlace #profileLogo{
    width:100% !important;
    height:80px !important;
  }

  .infoTopcontent{
    display:flex;
    flex-direction:column;
    align-items:center;
  }

  #personalContent {
    width:38rem !important;
  
  }
}
</style>