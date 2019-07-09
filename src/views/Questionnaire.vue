<template>
  <div class="background">
    <button @click="toggleHelp" class="btn help-button">Ohjeet</button>
    <div @click="toggleHelp" class="help-background" v-show="help_visible">
      <div class="help-container">
        <p>{{ $t('message.help_text_1') }}</p>
        <p>{{ $t('message.help_text_2') }}</p>
      </div>
    </div>
    <div class="questionnaire container col-md-8 text-center">
      <form v-on:submit.prevent="saveQuestions">
        <div class="question" v-show="questionnum == 0">
          <div class="question_text">
            <p>1. {{ $t('message.question_health') }}</p>
            <button class="btn help_button" @click.prevent="toggleQuestionHelp('health')">?</button>
          </div>
          <p v-if="help_text_visible === 'health'">{{ $t('message.help_text_health') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.health" />
          <p>{{questiondata.health}}</p>
          <textarea v-model="questiondata.health_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
        <div class="question" v-show="questionnum == 1">
          <div class="question_text">
            <p>2. {{ $t('message.question_overcoming') }}</p>
            <button class="btn help_button" @click.prevent="toggleQuestionHelp('overcoming')">?</button>
          </div>
          <p v-if="help_text_visible === 'overcoming'">{{ $t('message.help_text_overcoming') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.overcoming" />
          <p>{{questiondata.overcoming}}</p>
          <textarea v-model="questiondata.overcoming_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
        <div class="question" v-show="questionnum == 2">
          <div class="question_text">
            <p>3. {{ $t('message.question_living') }}</p>
            <button class="btn help_button" @click.prevent="toggleQuestionHelp('living')">?</button>
          </div>
          <p v-if="help_text_visible === 'living'">{{ $t('message.help_text_living') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.living" />
          <p>{{questiondata.living}}</p>
          <textarea v-model="questiondata.living_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
        <div class="question" v-show="questionnum == 3">
          <div class="question_text">
            <p>4. {{ $t('message.question_coping') }}</p>
            <button class="btn help_button" @click.prevent="toggleQuestionHelp('coping')">?</button>
          </div>
          <p v-if="help_text_visible === 'coping'">{{ $t('message.help_text_coping') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.coping" />
          <p>{{questiondata.coping}}</p>
          <textarea v-model="questiondata.coping_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
        <div class="question" v-show="questionnum == 4">
          <div class="question_text">
            <p>5. {{ $t('message.question_family') }}</p>
            <button class="btn help_button" @click.prevent="toggleQuestionHelp('family')">?</button>
          </div>
          <p v-if="help_text_visible === 'family'">{{ $t('message.help_text_family') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.family" />
          <p>{{questiondata.family}}</p>
          <textarea v-model="questiondata.family_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
        <div class="question" v-show="questionnum == 5">
          <div class="question_text">
            <p>6. {{ $t('message.question_friends') }}</p>
            <button class="btn help_button" @click.prevent="toggleQuestionHelp('friends')">?</button>
          </div>
          <p v-if="help_text_visible === 'friends'">{{ $t('message.help_text_friends') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.friends" />
          <p>{{questiondata.friends}}</p>
          <textarea v-model="questiondata.friends_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
        <div class="question" v-show="questionnum == 6">
          <div class="question_text">
            <p>7. {{ $t('message.question_finance') }}</p>
            <button class="btn help_button" @click.prevent="toggleQuestionHelp('finance')">?</button>
          </div>
          <p v-if="help_text_visible === 'finance'">{{ $t('message.help_text_finance') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.finance" />
          <p>{{questiondata.finance}}</p>
          <textarea v-model="questiondata.finance_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
        <div class="question" v-show="questionnum == 7">
          <div class="question_text">
            <p>8. {{ $t('message.question_strengths') }}</p>
            <button class="btn help_button" @click.prevent="toggleQuestionHelp('strengths')">?</button>
          </div>
          <p v-if="help_text_visible === 'strengths'">{{ $t('message.help_text_strengths') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.strengths" />
          <p>{{questiondata.strengths}}</p>
          <textarea v-model="questiondata.strengths_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
        <div class="question" v-show="questionnum == 8">
          <div class="question_text">
            <p>9. {{ $t('message.question_self_esteem') }}</p>
            <button class="btn help_button" @click.prevent="toggleQuestionHelp('self_esteem')">?</button>
          </div>
          <p v-if="help_text_visible === 'self_esteem'">{{ $t('message.help_text_self_esteem') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.self_esteem" />
          <p>{{questiondata.self_esteem}}</p>
          <textarea v-model="questiondata.self_esteem_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
        <div class="question" v-show="questionnum == 9">
          <div class="question_text">
            <p>10. {{ $t('message.question_life_as_whole') }}</p>
            <button class="btn help_button" @click.prevent="toggleQuestionHelp('life_as_whole')">?</button>
          </div>
          <p v-if="help_text_visible === 'life_as_whole'">{{ $t('message.help_text_life_as_whole') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.life_as_whole" />
          <p>{{questiondata.life_as_whole}}</p>
          <textarea v-model="questiondata.life_as_whole_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
        <div class="review" v-show="questionnum == 10">
          <h3>Kooste vastauksistasi</h3>
          <div class="results">
            <div>
              <span>terveydentilaasi</span><span>{{questiondata.health}}</span>
              <p>{{questiondata.health_desc}}</p>
            </div>
            <div>
              <span>kykyysi voittaa elämässä eteen tulevia vaikeuksia</span><span>{{questiondata.overcoming}}</span>
              <p>{{questiondata.overcoming_desc}}</p>
            </div>
            <div>
              <span>asumisoloihisi</span><span>{{questiondata.living}}</span>
              <p>{{questiondata.living_desc}}</p>
            </div>
            <div>
              <span>päivittäiseen pärjäämiseesi</span><span>{{questiondata.coping}}</span>
              <p>{{questiondata.coping_desc}}</p>
            </div>
            <div>
              <span>perheeseesi ja läheisiisi</span><span>{{questiondata.family}}</span>
              <p>{{questiondata.family_desc}}</p>
            </div>
            <div>
              <span>luotettavien ystävien määrään</span><span>{{questiondata.friends}}</span>
              <p>{{questiondata.friends_desc}}</p>
            </div>
            <div>
              <span>taloudelliseen tilanteeseesi</span><span>{{questiondata.finance}}</span>
              <p>{{questiondata.finance_desc}}</p>
            </div>
            <div>
              <span>omien vahvuuksien kehittämiseen (esim. harrastamalla mieluisia asioita)</span><span>{{questiondata.strengths}}</span>
              <p>{{questiondata.strengths_desc}}</p>
            </div>
            <div>
              <span>itsetuntoosi</span><span>{{questiondata.self_esteem}}</span>
              <p>{{questiondata.self_esteem_desc}}</p>
            </div>
            <div>
              <span>elämääsi kokonaisuutena</span><span>{{questiondata.life_as_whole}}</span>
              <p>{{questiondata.life_as_whole_desc}}</p>
            </div>
          </div>
          <div class="buttons">
            <button class="btn btn-primary" @click="saveQuestions">{{ $t('message.send')}}</button>
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.return')}}</button>
          </div>
          <router-link to="/">{{ $t('message.cancel')}}</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Questionnaire',
  data() {
    return {
      questiondata: {
        health: 5,
        overcoming: 5,
        living: 5,
        coping: 5,
        family: 5,
        friends: 5,
        finance: 5,
        strengths: 5,
        self_esteem: 5,
        life_as_whole: 5,
        health_desc: null,
        overcoming_desc: null,
        living_desc: null,
        coping_desc: null,
        family_desc: null,
        friends_desc: null,
        finance_desc: null,
        strengths_desc: null,
        self_esteem_desc: null,
        life_as_whole_desc: null
      },
      questionnum: 0,
      help_visible: false,
      help_text_visible: ''
    }
  },
  methods: {
    toNextQuestion() {
      this.questionnum++
    },
    toPreviousQuestion() {
      this.questionnum--
    },
    saveQuestions() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/result',
        data: { ...this.questiondata }
      })
      .then(res => {
        if (res.data.status === 'ok') {
          this.$router.push({ path: `/results/${res.data.resultId}` })
        }
      })
      .catch(err => {
      })
    },
    toggleHelp() {
      this.help_visible = !this.help_visible
    },
    toggleQuestionHelp(question) {
      if (this.help_text_visible === question) {
        this.help_text_visible = ''
      } else {
        this.help_text_visible = question
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.background {
  background: linear-gradient(to right, #0078f0, #80bfff);
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;

  .help-button {
    color: white;
    align-self: flex-start;
    padding-bottom: 5vh;
    padding-left: 5vh;
  }
}

.questionnaire {
  background-color: white;
  padding: 5vh;
  border-radius: 15px 15px 0 0;
  height: 85%;
}

.question {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 75vh;
  .question_text {
    display: flex;
    flex-flow: row nowrap;
    .help_button {
      background-color: lightblue;
      width: 2rem;
      height: 2rem;
    }
  }
}

.buttons {
  button {
    border-radius: 50px;
    box-shadow: 0 5px 5px gray;
    line-height: 2;
    width: 8rem;
  }

  button:nth-child(1) {
    float: right;
  }
  button:nth-child(0) {
    float: left;
  }
}

textarea {
  width: 100%;
}

.results {
  display: flex;
  flex-flow: column;
  text-align: start;

  div {
    span:nth-child(even) {
      float: right;
    }
  }
}

.help-background {
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;

  .help-container {
    background-color: white;
    height: 60%;
    border-radius: 15px;
    width: 100vw;
    padding-left: 5vh;
    padding-right: 5vh;

    p:nth-of-type(1) {
      padding-top: 3rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid lightgray;
    }

    p:nth-of-type(2) {
      padding-top: 3rem;
    }
  }
}

</style>