<template>
    <div id="personalinfoPage">
      <b-container>
        <div class="contentWrapper">
          <div id="personalContent">
            <p id="instruction"> {{ $t('message.infoInstruction') }}</p>
            <div id="formWrapper">
              <b-form>
                <b-form-group
                  id="fullnameField"
                  v-bind:label="$t('message.userName')"
                  label-for="firstandfamilyname"
                >
                  <b-form-input id="firstandfamilyname" v-model="personalinfo.name" type="text" name="firstandfamilyname"></b-form-input>
                  <b-form-invalid-feedback :state="infovalidation.name" class="nameRequired">
                    {{ $t('message.firstandfamilynameInfo') }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="addressField"
                  v-bind:label="$t('message.userAddress')"
                  label-for="enteraddress"
                >
                  <b-form-input id="enteraddress" v-model="personalinfo.address" type="text" name="enteraddress"></b-form-input>
                  <b-form-invalid-feedback :state="infovalidation.address" class="addressRequired">
                    {{ $t('message.addressInfo') }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="ageField"
                  v-bind:label="$t('message.userAge')"
                  label-for="birthday"
                >
                  <div id="birthdayDisplay">
                    <b-form-input id="dayEnter" type="text" name="day" placeholder="01" ></b-form-input>
                    <!--<b-form-invalid-feedback :state="infovalidation.day" class="dayRequired">
                      {{ $t('message.addressInfo') }}
                    </b-form-invalid-feedback>-->
                    <b-form-select
                        id="monthEnter"
                        v-model="selected"
                        :options="months.fi"
                    ></b-form-select>
                    <!--<b-form-invalid-feedback :state="infovalidation.month" class="monthRequired">
                      {{ $t('message.addressInfo') }}
                    </b-form-invalid-feedback>-->
                    <b-form-input id="yearEnter" type="text" name="year" placeholder="1990"></b-form-input>
                    <!--<b-form-invalid-feedback :state="infovalidation.year" class="yearRequired">
                      {{ $t('message.addressInfo') }}
                    </b-form-invalid-feedback>-->
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
                     v-model="personalinfo.gender"
                  ></b-form-select>
                  <b-form-invalid-feedback :state="infovalidation.gender" class="genderRequired">
                    {{ $t('message.genderInfo') }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="phoneField"
                  v-bind:label="$t('message.userPhonenumber')"
                  label-for="enterphonenumber"
                >
                  <b-form-input id="enterphonenumber" v-model="personalinfo.phonenumber" type="tel" name="enterphonenumber"></b-form-input>
                  <b-form-invalid-feedback :state="infovalidation.phonenumber" class="phonenumberRequired">
                    {{ $t('message.phonenumberInfo') }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <div id="submitinfoForm">
                  <b-button type="submit" @click.prevent="postInfo" class="submitIncluded">{{ $t('message.ProfilesubmitButton') }}</b-button>
                </div>
              </b-form>
            </div>
          </div>
        </div>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import store from '@/store'

export default {
  name: 'PersonalInfo',
  data() {
    return {
      months: {
        fi: ['tammikuu', 'helmikuu', 'maaliskuu','huhtikuu', 'toukokuu', 'kesäkuu','heinäkuu', 'elokuu', 'syyskuu','lokakuu', 'marraskuu', 'joulukuu']
      },
        gender: {
          fi: ['Mies', 'Nainen', 'Muu']
      },
      personalinfo: {
        name: null,
        address: null,
        gender:null,
        phonenumber: null
      },
      infovalidation: {
        name: null,
        address: null,
        gender:null,
        phonenumber: null
      }
    }
  },
  methods: {
    postInfo() {
      this.infovalidation.name = null
      if (!this.personalinfo.name) {
        this.infovalidation.name = false
        return
      }
      this.infovalidation.address = null
      if (!this.personalinfo.address) {
        this.infovalidation.address = false
        return
      }
      /*this.infovalidation.day = null
      if (!this.personalinfo.day) {
        this.infovalidation.day = false
        return
      }
      this.infovalidation.month = null
      if (!this.personalinfo.month) {
        this.infovalidation.month = false
        return
      }
      this.infovalidation.year = null
      if (!this.personalinfo.year) {
        this.infovalidation.year = false
        return
      }*/
      this.infovalidation.gender = null
      if (!this.personalinfo.gender) {
        this.infovalidation.gender = false
        return
      }
      this.infovalidation.phonenumber = null
      if (!this.personalinfo.phonenumber) {
        this.infovalidation.phonenumber = false
        return
      }
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/user/" + store.state.auth.userId + "/info/update",
        data: {
          personalinfo: this.$data.personalinfo
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#personalinfoPage{
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
      #headerLogo{
        width:100%;
        height: 60px;
      }
    }
  }
  .contentWrapper{
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
        
      #formWrapper{
        display:flex;
        flex-direction:column;
        width:100%;
        padding:1rem;
        margin-bottom:1rem;
      
        .nameRequired{
          font-size:1rem;
        }

        .addressRequired{
          font-size:1rem;
        }

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

        /*.dayRequired{
          font-size:1rem;
        }

        .monthRequired{
          font-size:1rem;
        }

        .yearRequired{
          font-size:1rem;
        }*/

        .genderRequired{
          font-size:1rem;
        }

        .phonenumberRequired{
          font-size:1rem;
        }

        #submitinfoForm{
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
  .infoContent{
    padding:0rem;
  }
}
@media screen and (min-width: 768px) { 
  #personalinfoPage{
    height:100%;
  }

  #logoPlace #headerLogo{
    width:100% !important;
    height:80px !important;
  }

  .contentWrapper{
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  
  #personalContent {
    width:38rem !important;
  }
}
</style>