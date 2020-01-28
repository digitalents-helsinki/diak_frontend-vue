<template>
  <div>
    <p id="instruction"> {{ $t('message.instructionInfo') }}</p>
    <div id="infoWrapper">
      <b-form>
        <b-form-group
          id="ageField"
          v-bind:label="$t('message.anonymousUser')"
          label-for="age"
        >
          <b-form-input id="age" @input="$emit('updateInfo', {age: $event < 200 ? $event : 200})" :value="anonymousinfo.age" type="number" name="age" min="0" max="200"></b-form-input>
          <b-form-invalid-feedback :state="infovalidation.age !== false" class="ageRequired">
            {{ $t('message.ageInfo') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="genderField"
          v-bind:label="$t('message.userGender')"
          label-for="gender"
        >
          <b-form-select
            id="gender"
            :options="gender"
            @input="$emit('updateInfo', {gender: $event})"
            :value="anonymousinfo.gender" 
          ></b-form-select>
          <b-form-invalid-feedback :state="infovalidation.gender !== false" class="genderRequired">
            {{ $t('message.genderInfo') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <div id="submitForm">
          <p v-if="error">{{error}}</p>
          <b-spinner v-if="infoSaved" style="color: #350E7E; margin: 1rem 0;"/>
          <b-button v-else type="submit" @click.prevent="postInfo" class="submitIncluded">
            {{ $t('message.submitandcontinuebutton') }}
          </b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'AnonymousInfo',
  props: {
    anonymousinfo: {
      type: Object,
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
        age: null,
        gender: null,
      },
      infoSaved: null,
      error: null
    }
  },
  methods: {
    async postInfo() {
      Object.keys(this.infovalidation).forEach(key => {
        if (this.anonymousinfo[key]) {
          this.infovalidation[key] = null
        } else {
          this.infovalidation[key] = false
        }
      })
      if (Object.values(this.infovalidation).every(value => value === null)) {
        try {
          this.infoSaved = true
          const res = await axios({
            method: "POST",
            url: process.env.VUE_APP_BACKEND + "/anon/user/" + this.$store.state.questionnaire.meta.anonId + "/info/update",
            data: {
              anonymousinfo: this.anonymousinfo
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
  margin: 0rem auto 0rem auto;
  text-align:center;
  padding: 0 1rem;
}
        
#infoWrapper {
  display:flex;
  flex-direction:column;
  width:100%;
  padding: 1rem 1rem 0 1rem;
  text-align: start;

  .ageRequired {
    font-size:1rem;
  }

  .genderRequired {
    font-size:1rem;
  }

  #submitForm {
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