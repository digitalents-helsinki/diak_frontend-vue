<template>
    <div id="personalinfoPage">
      <b-container>
        <div class="contentWrapper">
          <div id="personalContent">
            <p id="instruction"> {{isFirstTime ? $t('message.infoInstruction') : $t('message.infoInstructionOld')}}</p>
            <div id="formWrapper">
              <b-form>
                <b-form-group
                  id="fullnameField"
                  v-bind:label="$t('message.userName')"
                  label-for="firstandfamilyname"
                >
                  <b-form-input id="firstandfamilyname" @input="$emit('updateInfo', {name: $event})" :value="personalinfo.name" type="text" name="firstandfamilyname"></b-form-input>
                  <b-form-invalid-feedback :state="infovalidation.name" class="nameRequired">
                    {{ $t('message.firstandfamilynameInfo') }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="addressField"
                  v-bind:label="$t('message.userAddress')"
                  label-for="enteraddress"
                >
                  <b-form-input id="enteraddress" @input="$emit('updateInfo', {address: $event})" :value="personalinfo.address" type="text" name="enteraddress"></b-form-input>
                  <b-form-invalid-feedback :state="infovalidation.address" class="addressRequired">
                    {{ $t('message.addressInfo') }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="ageField"
                  v-bind:label="$t('message.userAge')"
                  label-for="birthday"
                >
                  <Datepicker id="birthday" @input="$emit('updateInfo', {birthdate: $event})" :value="personalinfo.birthdate" :language="fi" :monday-first="true" v-bind:placeholder="$t('message.datePlaceholder')"></Datepicker>
                <b-form-invalid-feedback :state="infovalidation.birthdate" class="birthDateRequired">
                    {{ $t('message.birthDateInfo') }}
                </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="genderField"
                  v-bind:label="$t('message.userGender')"
                  label-for="genderEnter"
                >
                  <b-form-select
                    id="genderEnter"
                    :options="gender.fi"
                    @input="$emit('updateInfo', {gender: $event})"
                    :value="personalinfo.gender"
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
                  <b-form-input id="enterphonenumber" @input="$emit('updateInfo', {phonenumber: $event})" :value="personalinfo.phonenumber" type="tel" name="enterphonenumber"></b-form-input>
                  <b-form-invalid-feedback :state="infovalidation.phonenumber" class="phonenumberRequired">
                    {{ $t('message.phonenumberInfo') }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <div id="submitinfoform">
                  <p v-if="error">{{error}}</p>
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
import Datepicker from 'vuejs-datepicker'
import { fi } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'PersonalInfo',
  props: {
    personalinfo: {
      type: Object,
      required: true
    },
    isFirstTime: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Datepicker
  },
  data() {
    return {
      fi: fi,
      months: {
        fi: ['tammikuu', 'helmikuu', 'maaliskuu','huhtikuu', 'toukokuu', 'kesäkuu','heinäkuu', 'elokuu', 'syyskuu','lokakuu', 'marraskuu', 'joulukuu']
      },
      gender: {
        fi: ['Mies', 'Nainen', 'Muu']
      },
      infovalidation: {
        name: null,
        address: null,
        birthdate: null,
        gender:null,
        phonenumber: null
      },
      error: null
    }
  },
  methods: {
    postInfo() {
      Object.keys(this.infovalidation).forEach(key => {
        if (this.personalinfo[key]) {
          this.infovalidation[key] = true
        } else {
          this.infovalidation[key] = false
        }
      })
      if (Object.values(this.infovalidation).every(value => value)) {
        axios({
          method: "POST",
          url: process.env.VUE_APP_BACKEND + "/user/" + this.$store.state.auth.userId + "/info/update",
          headers: {
            'Authorization': `Bearer ${this.$store.state.auth.accessToken}`
          },
          data: {
            personalinfo: this.personalinfo
          }
        }).then(res => {
          if (res.status === 200) this.$emit('infoSaved')
        }).catch(err => {
          if (err.response) this.error = err.response.data
          throw err
        })
      }
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
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width:100%;
      box-shadow: 0 5px 5px gray;
      margin-top: 1rem;
      margin-bottom:1rem;
      padding: 0.5rem;

      #instruction{
        font-size:1.1rem;
        margin:1rem auto;
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

        .birthDateRequired{
          font-size:1rem;
        }


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
    margin-top: 1.8rem;
    width:38rem !important;
  }
}
</style>