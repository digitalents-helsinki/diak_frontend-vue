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
          <b-form-input id="age" @input="$emit('updateInfo', {age: $event})" :value="anonymousinfo.age" type="number" name="age" min="0" ></b-form-input>
          <b-form-invalid-feedback :state="infovalidation.age" class="ageRequired">
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
            :options="gender.fi"
            @input="$emit('updateInfo', {gender: $event})"
            :value="anonymousinfo.gender" 
          ></b-form-select>
          <b-form-invalid-feedback :state="infovalidation.gender" class="genderRequired">
            {{ $t('message.genderInfo') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <div id="submitForm">
          <p v-if="error">{{error}}</p>
          <b-button v-if="!this.$store.state.questionnaire.meta.surveyId" type="submit" @click.prevent="postInfo" class="submitIncluded">
            {{ $t('message.ProfilesubmitButton') }}
            <b-spinner v-if="infoSaved" class="saver" small/>
          </b-button>
          <b-button v-else type="submit" @click.prevent="postInfo" class="submitIncluded">
            {{ 'Jatka' }}
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
      gender: {
        fi: ['Mies', 'Nainen', 'Muu']
      },
      infovalidation: {
        age: null,
        gender: null,
      },
      infoSaved: null,
      error: null
    }
  },
  methods: {
    postInfo() {
      Object.keys(this.infovalidation).forEach(key => {
        if (this.anonymousinfo[key]) {
          this.infovalidation[key] = null
        } else {
          this.infovalidation[key] = false
        }
      })
      if (Object.values(this.infovalidation).every(value => value === null)) {
        axios({
          method: "POST",
          url: process.env.VUE_APP_BACKEND + "/anon/user/" + this.$store.state.questionnaire.meta.anonId + "/info/update",
          data: {
            anonymousinfo: this.anonymousinfo
          }
        }).then(res => {
          if (res.status === 200) {
            if (this.$store.state.questionnaire.meta.surveyId) {
              this.$emit('moveToQuestionnaire')
            } else {
              this.infoSaved = true
              setTimeout(() => this.infoSaved = false, 1000)
            }
          }
        }).catch(err => {
          if (err.response) this.error = err.response.data
          throw err
        })
      }
    },
    signOut() {
      this.$store.commit('logout')
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
      
      .saver {
        position: absolute;
        right: 0.75rem;
        top: 1rem;
      }
    }
  }
}
</style>