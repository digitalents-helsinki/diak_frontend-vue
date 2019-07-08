<template>
  <div class="background">
    <div class="questionnaire container col-md-8 text-center">
      <form v-on:submit.prevent="saveQuestions">
        <div class="question" v-show="questionnum == 0">
          <p>1. {{ $t('message.question_health') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.health" />
          <p>{{questiondata.health}}</p>
          <textarea v-model="questiondata.health_desc" rows="3" placeholder="Voit halutessasi tarkentaa vastausta..."></textarea>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 1">
          <p>2. {{ $t('message.question_overcoming') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.overcoming" />
          <p>{{questiondata.overcoming}}</p>
          <textarea rows="3" placeholder="Voit halutessasi tarkentaa vastausta..."></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 2">
          <p>3. {{ $t('message.question_living') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.living" />
          <p>{{questiondata.living}}</p>
          <textarea rows="3" placeholder="Voit halutessasi tarkentaa vastausta..."></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 3">
          <p>4. {{ $t('message.question_coping') }}</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.coping" />
          <p>{{questiondata.coping}}</p>
          <textarea rows="3" placeholder="Voit halutessasi tarkentaa vastausta..."></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 4">
          <p>Kun ajattelet nykyhetkeä, niin kuinka tyytyväinen olet seuraaviin asioihin?</p>
          <p>5. perheeseesi ja läheisiisi</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.family" />
          <p>{{questiondata.family}}</p>
          <textarea rows="3" placeholder="Voit halutessasi tarkentaa vastausta..."></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 5">
          <p>Kun ajattelet nykyhetkeä, niin kuinka tyytyväinen olet seuraaviin asioihin?</p>
          <p>6. luotettavien ystävien määrään</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.friends" />
          <p>{{questiondata.friends}}</p>
          <textarea rows="3" placeholder="Voit halutessasi tarkentaa vastausta..."></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 6">
            <p>Kun ajattelet nykyhetkeä, niin kuinka tyytyväinen olet seuraaviin asioihin?</p>
            <p>7. taloudelliseen tilanteesi</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.finance" />
            <p>{{questiondata.finance}}</p>
            <textarea rows="3" placeholder="Voit halutessasi tarkentaa vastausta..."></textarea>
            <div class="text-center">
              <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
              <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
            </div>
        </div>
        <div class="question" v-show="questionnum == 7">
          <p>Kun ajattelet nykyhetkeä, niin kuinka tyytyväinen olet seuraaviin asioihin?</p>
          <p>8. omien vahvuuksiesi kehittämiseen (esim. harrastamalla mieluisia asioita)</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.strengths" />
          <p>{{questiondata.strengths}}</p>
          <textarea rows="3" placeholder="Voit halutessasi tarkentaa vastausta..."></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 8">
          <p>Kun ajattelet nykyhetkeä, niin kuinka tyytyväinen olet seuraaviin asioihin?</p>
          <p>9. itsetuntoosi</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.self_esteem" />
          <p>{{questiondata.self_esteem}}</p>
          <textarea rows="3" placeholder="Voit halutessasi tarkentaa vastausta..."></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 9">
          <p>Kun ajattelet nykyhetkeä, niin kuinka tyytyväinen olet seuraaviin asioihin?</p>
          <p>10. elämääsi kokonaisuutena</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.life_as_whole" />
          <p>{{questiondata.life_as_whole}}</p>
          <textarea rows="3" placeholder="Voit halutessasi tarkentaa vastausta..."></textarea>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="review" v-show="questionnum == 10">
          <h3>Kooste vastauksistasi</h3>
          <div class="results">
            <span>terveydentilaasi</span><span>{{questiondata.health}}</span>
            <span>kykyysi voittaa elämässä eteen tulevia vaikeuksia</span><span>{{questiondata.overcoming}}</span>
            <span>asumisoloihisi</span><span>{{questiondata.living}}</span>
            <span>päivittäiseen pärjäämiseesi</span><span>{{questiondata.coping}}</span>
            <span>perheeseesi ja läheisiisi</span><span>{{questiondata.family}}</span>
            <span>luotettavien ystävien määrään</span><span>{{questiondata.friends}}</span>
            <span>taloudelliseen tilanteeseesi</span><span>{{questiondata.finance}}</span>
            <span>omien vahvuuksien kehittämiseen (esim. harrastamalla mieluisia asioita)</span><span>{{questiondata.strengths}}</span>
            <span>itsetuntoosi</span><span>{{questiondata.self_esteem}}</span>
            <span>elämääsi kokonaisuutena</span><span>{{questiondata.life_as_whole}}</span>
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
  flex-flow: row wrap;
  justify-content: space-between;
  text-align: start;
  span:nth-child(odd) {
    width: 70%;
    margin-bottom: 10px;
  }
  span:nth-child(even) {
    width: 10%;
    margin-bottom: 10px;
  }
}

</style>