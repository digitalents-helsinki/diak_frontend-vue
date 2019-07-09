<template>
  <div class="background">
    <div class="questionnaire container col-md-8 text-center">
      <form v-on:submit.prevent="saveQuestions">
        <div class="question" v-show="questionnum == 0">
          <p>1. {{ $t('message.question_health') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.health" />
          <p>{{questiondata.health}}</p>
          <textarea v-model="questiondata.health_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 1">
          <p>2. {{ $t('message.question_overcoming') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.overcoming" />
          <p>{{questiondata.overcoming}}</p>
          <textarea v-model="questiondata.overcoming_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 2">
          <p>3. {{ $t('message.question_living') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.living" />
          <p>{{questiondata.living}}</p>
          <textarea v-model="questiondata.living_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 3">
          <p>4. {{ $t('message.question_coping') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.coping" />
          <p>{{questiondata.coping}}</p>
          <textarea v-model="questiondata.coping_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 4">
          <p>5. {{ $t('message.question_family') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.family" />
          <p>{{questiondata.family}}</p>
          <textarea v-model="questiondata.family_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 5">
          <p>6. {{ $t('message.question_friends') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.friends" />
          <p>{{questiondata.friends}}</p>
          <textarea v-model="questiondata.friends_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 6">
            <p>{{ $t('message.question_finance') }}</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.finance" />
            <p>{{questiondata.finance}}</p>
            <textarea v-model="questiondata.finance_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
            <div class="text-center">
              <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
              <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            </div>
        </div>
        <div class="question" v-show="questionnum == 7">
          <p>{{ $t('message.question_strengths') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.strengths" />
          <p>{{questiondata.strengths}}</p>
          <textarea v-model="questiondata.strengths_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 8">
          <p>{{ $t('message.question_self_esteem') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.self_esteem" />
          <p>{{questiondata.self_esteem}}</p>
          <textarea v-model="questiondata.self_esteem_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 9">
          <p>{{ $t('message.question_life_as_whole') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.life_as_whole" />
          <p>{{questiondata.life_as_whole}}</p>
          <textarea v-model="questiondata.life_as_whole_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
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
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Palaa kyselyyn</button>
            <button class="btn btn-primary" @click="saveQuestions">Lähetä</button>
          </div>
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
      questionnum: 0
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
          this.$router.push({ path: 'results' })
        }
      })
      .catch(err => {
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.background {
  background-color: gray;
  height: 100vh;
  display: flex;
  align-items: center;
}

.questionnaire {
  background-color: white;
  padding: 5vh;
  border-radius: 15px;
}

.question {
}

.results {
  display: flex;
  flex-flow: column;
  text-align: start;

  div {
    span:nth-child(even) {
      float: right;
    }
    span:nth-child(odd) {

    }
  }
}

</style>