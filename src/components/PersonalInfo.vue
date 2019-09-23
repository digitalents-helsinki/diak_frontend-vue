<template>
    <div id="maindivInfo">
        <div class="container-fluid" id="topofPage">
        <div id="logoPlace"><img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" id="profileLogo"/></div>
    </div>
    <b-container>
        <div class="infoTopcontent">
            <div id="personalContent">
                <p id="instruction"> {{ $t('message.infoInstruction') }}</p>
                <div id="infoContentFields">
                    <b-form>
                        <b-form-group
                            id="fullnameField"
                            v-bind:label="$t('message.userName')"
                            label-for="firstandfamilyname"
                        >
                            <b-form-input id="firstandfamilyname" type="text" name="firstandfamilyname"></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="addressField"
                            v-bind:label="$t('message.userAddress')"
                            label-for="enteraddress"
                        >
                            <b-form-input id="enteraddress" type="text" name="enteraddress"></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="ageField"
                            v-bind:label="$t('message.userAge')"
                            label-for="birthday"
                        >
                            <div id="birthdayDisplay">
                                <b-form-input id="dayEnter" type="text" name="day" placeholder="01" ></b-form-input>
                                    <b-form-select
                                        id="monthEnter"
                                        v-model="selected"
                                        :options="months.fi"
                                    ></b-form-select>
                                <b-form-input id="yearEnter" type="text" name="year" placeholder="1990"></b-form-input>
                            </div>
                        </b-form-group>
                        <b-form-group
                            id="genderField"
                            v-bind:label="$t('message.userGender')"
                            label-for="genderEnter"
                        >
                            <b-form-select
                                id="genderEnter"
                                :options="gender.fi"
                            ></b-form-select>
                        </b-form-group>
                        <b-form-group
                            id="phoneField"
                            v-bind:label="$t('message.userPhonenumber')"
                            label-for="enterphonenumber"
                        >
                            <b-form-input id="enterphonenumber" type="tel" name="enterphonenumber"></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="emailaddressField"
                            v-bind:label="$t('message.userEmailaddress')"
                            label-for="emailaddressField"
                        >
                        <b-form-input id="enteremailaddress" type="email" name="emailaddressField"></b-form-input>
                        </b-form-group>
                        <div id="submitinfoform">
                          <b-button type="submit" class="submitIncluded">{{ $t('message.ProfilesubmitButton') }}</b-button>
                        </div>
                    </b-form>
                </div>
            </div>
        </div>
    </b-container>
  </div>
</template>
<script>
 
export default {
  name: 'pro',
  data() {
    return {
      selected: 'tammikuu',
      months: {
        fi: ['tammikuu', 'helmikuu', 'maaliskuu','huhtikuu', 'toukokuu', 'kesäkuu','heinäkuu', 'elokuu', 'syyskuu','lokakuu', 'marraskuu', 'joulukuu']
      },
        gender: {
            fi: ['Mies', 'Nainen', 'Muu']
        },
    }
  }
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

        #ageField{
          display:flex;
          flex-direction:column;
          margin-bottom:1rem;

          #birthdayDisplay{
            
            #monthEnter{
              margin-top:0.1rem;
              margin-bottom:0.1rem;
            } 
          }
        }
        #submitinfoform{
          display:flex;
          flex-direction:row;
          justify-content:center;

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