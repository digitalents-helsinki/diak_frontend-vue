<template>
  <div>
    <p id="instruction"> {{instruction}}</p>
    <div id="formWrapper">
      <b-form>
        <b-form-group
          id="fullnameField"
          v-bind:label="$t('message.userName')"
          label-for="firstandfamilyname"
        >
          <b-form-input id="firstandfamilyname" @input="$emit('updateInfo', {name: $event})" :value="personalInfo.name" type="text" name="firstandfamilyname"></b-form-input>
          <b-form-invalid-feedback :state="infovalidation.name" class="nameRequired">
            {{ $t('message.firstandfamilynameInfo') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="postnumberField"
          v-bind:label="$t('message.userPostnumber')"
          label-for="enterpostnumber"
        >
          <b-form-input id="enterpostnumber" @input="$emit('updateInfo', {postNumber: $event})" :value="personalInfo.postNumber" type="text" name="enterpostnumber"></b-form-input>
          <b-form-invalid-feedback :state="infovalidation.postNumber" class="postnumberRequired">
            {{ $t('message.postNumberInfo') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="ageField"
          v-bind:label="$t('message.anonymousUser')"
          label-for="ageInput"
        >
          <b-form-input id="ageInput" @input="$emit('updateInfo', {age: $event < 200 ? $event : 200})" :value="personalInfo.age" type="number" name="ageInput" min="0" max="200" ></b-form-input>
          <b-form-invalid-feedback :state="infovalidation.age" class="ageRequired">
            {{ $t('message.ageInfo') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="genderField"
          v-bind:label="$t('message.userGender')"
          label-for="genderEnter"
        >
          <b-form-select
            id="genderEnter"
            :options="gender"
            @input="$emit('updateInfo', {gender: $event})"
            :value="personalInfo.gender"
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
          <b-form-input id="enterphonenumber" @input="$emit('updateInfo', {phoneNumber: $event})" :value="personalInfo.phoneNumber" type="tel" name="enterphonenumber"></b-form-input>
          <b-form-invalid-feedback :state="infovalidation.phoneNumber" class="phonenumberRequired">
            {{ $t('message.phonenumberInfo') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <div id="submitinfoForm">
          <p v-if="error">{{error}}</p>
          <b-button @click.prevent="signOut" class="submitIncluded">
            {{ $t('message.logoutButtontranslate') }}
          </b-button>
          <b-button v-if="!this.$store.state.questionnaire.meta.surveyId && !infoSaved" type="submit" @click.prevent="postInfo" class="submitIncluded">
            {{ $t('message.ProfilesubmitButton') }}
          </b-button>
          <b-button v-else-if="!infoSaved" type="submit" @click.prevent="postInfo" class="submitIncluded">
            {{ $t('message.continue') }}
          </b-button>
          <b-spinner v-else style="color: #350E7E; margin: 0.5rem 1rem;"/>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PersonalInfo',
  props: {
    personalInfo: {
      type: Object,
      required: true
    },
    isFirstTime: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      gender: [
        {
          value: 'Male',
          text: this.$t('message.genderMale')
        }, 
        {
          value: 'Female',
          text: this.$t('message.genderFemale')
        }, 
        {
          value: 'Other',
          text: this.$t('message.genderOther')
        }
      ],
      infovalidation: {
        name: null,
        postNumber: null,
        age:null,
        gender: null,
        phoneNumber: null
      },
      infoSaved: null,
      error: null
    }
  },
  computed: {
    instruction() {
      if (this.$store.state.questionnaire.meta.surveyId) {
        if (this.isFirstTime) return this.$t('message.infoInstruction')
        else return this.$t('message.infoInstructionOld')
      } else {
        if (this.isFirstTime) return this.$t('message.noSurveyInfoInstruction')
        else return this.$t('message.noSurveyInfoInstructionOld')
      }
    }
  },
  methods: {
    async postInfo() {
      Object.keys(this.infovalidation).forEach(key => {
        if (this.personalInfo[key]) {
          this.infovalidation[key] = null
        } else {
          this.infovalidation[key] = false
        }
      })
      if (Object.values(this.infovalidation).every(value => value === null)) {
        this.infoSaved = true
        try {
          const res = await this.$axios({
            method: "POST",
            url: "/auth/user/info/update",
            headers: {
              'Authorization': `Bearer ${this.$store.state.authentication.accessToken}`
            },
            data: {
              personalInfo: this.personalInfo
            }
          })
          if (res.status === 200) {
            if (this.$store.state.questionnaire.meta.surveyId) {
              this.$emit('moveToQuestionnaire')
            }
          }
        } catch(err) {
            if (err.response) this.error = err.response.data
            throw err
        } finally {
          this.infoSaved = false
        }
      }
    },
    signOut() {
      this.$store.dispatch('logout')
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="scss" scoped>

#instruction {
  font-size: 1.1rem;
  margin: 2rem auto 1rem auto;
  text-align:center;
  padding: 0 1rem;
}
        
#formWrapper {
  display:flex;
  flex-direction:column;
  width:100%;
  padding: 1rem 1rem 0 1rem;
  text-align: start;

  .nameRequired {
    font-size:1rem;
  }

  .postnumberRequired {
    font-size:1rem;
  }

  .ageRequired {
    font-size:1rem;
  }
  .genderRequired {
    font-size:1rem;
  }

  .phonenumberRequired {
    font-size:1rem;
  }

  #submitinfoForm {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-evenly;

    @media screen and (min-width: 768px) {
      flex-direction: row;
    }

    .submitIncluded {
      position: relative;
      background-color: #350E7E;
      font-weight:bold;
      color:#FFFFFF;
      border-radius: 50px;
      box-shadow: 0 5px 5px gray;
      line-height: 2;
      align-self: center;
      padding: 0.5rem 2rem;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
}
</style>