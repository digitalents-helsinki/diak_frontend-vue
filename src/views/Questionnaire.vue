<template>
  <div class="background">
    <div class="questionnaire container col-md-6 text-center">
      <form v-on:submit.prevent="saveQuestions">
        <div class="question" v-show="questionnum == 0">
          <p>Kun ajattelet nykyhetkeä, niin kuinka tyytyväinen olet seuraaviin asioihin?</p>
          <p>1. terveydentilaasi</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.health" />
          <p>{{questiondata.health}}</p>
          <div class="buttons">
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 1">
          <p>Kun ajattelet nykyhetkeä, niin kuinka tyytyväinen olet seuraaviin asioihin?</p>
          <p>2. kykyysi voittaa elämässä eteen tulevia vaikeuksia</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.overcoming" />
          <p>{{questiondata.overcoming}}</p>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 2">
          <p>Kun ajattelet nykyhetkeä, niin kuinka tyytyväinen olet seuraaviin asioihin?</p>
          <p>3. asumisoloihisi</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.living" />
          <p>{{questiondata.living}}</p>
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="question" v-show="questionnum == 3">
          <p>Kun ajattelet nykyhetkeä, niin kuinka tyytyväinen olet seuraaviin asioihin?</p>
          <p>4. päivittäiseen pärjäämiseesi</p>
          <b-form-input type="range" min="0" max="10" v-model="questiondata.coping" />
          <p>{{questiondata.coping}}</p>
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
          <div class="text-center">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">Edellinen</button>
            <button class="btn btn-primary" @click.prevent="toNextQuestion">Seuraava</button>
          </div>
        </div>
        <div class="review" v-show="questionnum == 10">
          <p>Vastauksesi</p>
          <p>terveydentilaasi {{questiondata.health}}</p>
          <p>kykyysi voittaa elämässä eteen tulevia vaikeuksia {{questiondata.overcoming}}</p>
          <p>asumisoloihisi {{questiondata.living}}</p>
          <p>päivittäiseen pärjäämiseesi {{questiondata.coping}}</p>
          <p>perheeseesi ja läheisiisi {{questiondata.family}}</p>
          <p>luotettavien ystävien määrään {{questiondata.friends}}</p>
          <p>taloudelliseen tilanteeseesi {{questiondata.finance}}</p>
          <p>omien vahvuuksien kehittämiseen (esim. harrastamalla mieluisia asioita) {{questiondata.strengths}}</p>
          <p>itsetuntoosi {{questiondata.self_esteem}}</p>
          <p>elämääsi kokonaisuutena {{questiondata.life_as_whole}}</p>
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
        life_as_whole: 5
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
  form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    .buttons {
    }
  }
}


</style>