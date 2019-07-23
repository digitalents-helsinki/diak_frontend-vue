<template>
  <div class="background">
  <div class="container-fluid" id="questionnaire-top">
  <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" />
  </div>
    <div @click="toggleHelp" class="dim-background" v-show="help_visible">
      <div class="help-container">
        <p>{{ $t('message.help_text_1') }}</p>
        <p>{{ $t('message.help_text_2') }}</p>
      </div>
    </div>
    <div @click="toggleCancel" class="dim-background" v-show="cancel_visible">
      <div class="cancel-container">
        <div>
          <button class="btn btn-primary">{{ $t('message.cancel_save') }}</button>
        </div>
        <div>
          <button @click.prevent="moveHome" class="btn btn-primary">{{ $t('message.cancel_discard') }}</button>
        </div>
      </div>
    </div>
    <div class="questionnaire container text-center">
      <button @click="toggleHelp" class="btn buttonOhjeet" >Ohjeet</button>
      <form>
        <div class="question" v-show="questionnum == 0">
         <div class="question_text">
            <p>Kysymys 1.</p>
            <p v-html="$t('message.question_health')"></p> 
            <button class="btn help_button buttonHelp"  @click.prevent="toggleQuestionHelp('health')">?</button>
          </div>
          <p v-if="help_text_visible === 'health'">{{ $t('message.help_text_health') }}</p>
          <div class="range-input">
          <p class="rangeQuestiondata">{{questiondata.health}}</p>
            <b-form-input v-bind:class="{activeRange: questiondata.health}" type="range" min="0" max="10" v-model="questiondata.health" />
              <div class="rangeLabel-mobile">
                <div>0</div>
                <div>10</div>
              </div>
              <div class="rangeLabel">
                <div>0</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
              </div>
            </div>
           <textarea v-model="questiondata.health_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 1">
          <div class="question_text">
            <p>Kysymys 2.</p>
            <p>{{ $t('message.question_overcoming') }}</p>
            <button class="btn help_button buttonHelp" @click.prevent="toggleQuestionHelp('overcoming')">?</button>
          </div>
          <p v-if="help_text_visible === 'overcoming'">{{ $t('message.help_text_overcoming') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.overcoming}}</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.overcoming" />
            <div class="rangeLabel-mobile">
                <div>0</div>
                <div>10</div>
            </div>
            <div class="rangeLabel">
              <div>0</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>
          <textarea v-model="questiondata.overcoming_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn button-previous" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 2">
          <div class="question_text">
            <p>Kysymys 3.</p>
            <p>{{ $t('message.question_living') }}</p>
            <button class="btn help_button buttonHelp" @click.prevent="toggleQuestionHelp('living')">?</button>
          </div>
          <p v-if="help_text_visible === 'living'">{{ $t('message.help_text_living') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.living}}</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.living" />
            <div class="rangeLabel-mobile">
              <div>0</div>
              <div>10</div>
            </div>
            <div class="rangeLabel">
               <div>0</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>
          <textarea v-model="questiondata.living_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn button-previous" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 3">
          <div class="question_text">
            <p>Kysymys 4.</p>
            <p>{{ $t('message.question_coping') }}</p>
            <button class="btn help_button buttonHelp" @click.prevent="toggleQuestionHelp('coping')">?</button>
          </div>
          <p v-if="help_text_visible === 'coping'">{{ $t('message.help_text_coping') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.coping}}</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.coping" />
            <div class="rangeLabel-mobile">
              <div>0</div>
              <div>10</div>
            </div>
            <div class="rangeLabel">
                <div>0</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
            </div>
          </div>
          <textarea v-model="questiondata.coping_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn button-previous" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 4">
          <div class="question_text">
            <p>Kysymys 5.</p>
            <p>{{ $t('message.question_family') }}</p>
            <button class="btn help_button buttonHelp" @click.prevent="toggleQuestionHelp('family')">?</button>
          </div>
          <p v-if="help_text_visible === 'family'">{{ $t('message.help_text_family') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.family}}</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.family" />
            <div class="rangeLabel-mobile">
              <div>0</div>
              <div>10</div>
            </div>
            <div class="rangeLabel">
              <div>0</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>
          <textarea v-model="questiondata.family_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn button-previous" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 5">
          <div class="question_text">
            <p>Kysymys 6.</p>
            <p>{{ $t('message.question_friends') }}</p>
            <button class="btn help_button buttonHelp" @click.prevent="toggleQuestionHelp('friends')">?</button>
          </div>
          <p v-if="help_text_visible === 'friends'">{{ $t('message.help_text_friends') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.friends}}</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.friends" />
            <div class="rangeLabel-mobile">
              <div>0</div>
              <div>10</div>
            </div>
            <div class="rangeLabel">
                <div>0</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
            </div>
          </div>
          <textarea v-model="questiondata.friends_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn button-previous" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 6">
          <div class="question_text">
            <p>Kysymys 7.</p>
            <p>{{ $t('message.question_finance') }}</p>
            <button class="btn help_button buttonHelp" @click.prevent="toggleQuestionHelp('finance')">?</button>
          </div>
          <p v-if="help_text_visible === 'finance'">{{ $t('message.help_text_finance') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.finance}}</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.finance" />
            <div class="rangeLabel-mobile">
              <div>0</div>
              <div>10</div>
            </div>
             <div class="rangeLabel">
                <div>0</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
              </div>
            </div>
          <textarea v-model="questiondata.finance_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn button-previous" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 7">
          <div class="question_text">
            <p>Kysymys 8.</p>
            <p>{{ $t('message.question_strengths') }}</p>
            <button class="btn help_button buttonHelp" @click.prevent="toggleQuestionHelp('strengths')">?</button>
          </div>
          <p v-if="help_text_visible === 'strengths'">{{ $t('message.help_text_strengths') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.strengths}}</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.strengths" />
            <div class="rangeLabel-mobile">
              <div>0</div>
              <div>10</div>
            </div>
            <div class="rangeLabel">
                <div>0</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
              </div>
          </div>
          <textarea v-model="questiondata.strengths_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn button-previous" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 8">
          <div class="question_text">
            <p>Kysymys 9.</p>
            <p>{{ $t('message.question_self_esteem') }}</p>
            <button class="btn help_button buttonHelp" @click.prevent="toggleQuestionHelp('self_esteem')">?</button>
          </div>
          <p v-if="help_text_visible === 'self_esteem'">{{ $t('message.help_text_self_esteem') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.self_esteem}}</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.self_esteem" />
            <div class="rangeLabel-mobile">
                <div>0</div>
                <div>10</div>
            </div>
            <div class="rangeLabel">
              <div>0</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>
          <textarea v-model="questiondata.self_esteem_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn button-previous" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 9">
          <div class="question_text">
            <p>Kysymys 10.</p>
            <p>{{ $t('message.question_life_as_whole') }}</p>
            <button class="btn help_button buttonHelp" @click.prevent="toggleQuestionHelp('life_as_whole')">?</button>
          </div>
          <p v-if="help_text_visible === 'life_as_whole'">{{ $t('message.help_text_life_as_whole') }}</p>
         <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.life_as_whole}}</p>
            <b-form-input type="range" min="0" max="10" v-model="questiondata.life_as_whole" />
            <div class="rangeLabel-mobile">
                <div>0</div>
                <div>10</div>
            </div>
            <div class="rangeLabel">
              <div>0</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>
          <textarea v-model="questiondata.life_as_whole_desc" rows="3" v-bind:placeholder="$t('message.question_desc_placeholder')"></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button class="btn button-previous" @click.prevent="toPreviousQuestion">{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
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
          <div class="review-buttons">
            <button class="btn btn-primary" @click.prevent="toPreviousQuestion">{{ $t('message.return')}}</button>
            <button class="btn btn-primary" @click.prevent="saveQuestions">{{ $t('message.send')}}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
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
        health: null,
        overcoming: null,
        living: null,
        coping: null,
        family: null,
        friends: null,
        finance: null,
        strengths: null,
        self_esteem: null,
        life_as_whole: null,
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
      help_text_visible: '',
      cancel_visible: false,
      show: false
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
    },
    toggleCancel() {
      this.cancel_visible = !this.cancel_visible
    },
    moveHome() {
      this.$router.push({ path: '/'})
    }
}
}
</script>
<style lang="scss" scoped>
.background {
  //background: linear-gradient(to right, #0078f0, #80bfff);
  background:#FFFFFF;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  overflow: hidden;
  font-size:1rem;

  #questionnaire-top{
    display: flex;
    justify-content: center;
    align-items:center;
    background-color:#80CDE6;
    font-size:10rem;
    height:16vh;
    overflow: hidden;
    margin-bottom:1rem;

  img {
      height: 70px;
    }
  }
  
  .help-button {
    color: white;
    align-self: flex-start;
    padding-bottom: 5vh;
    padding-left: 5vh;
  }
}

.questionnaire {
  background-color: white;
  padding: 0 5vh;
  border-radius: 15px 15px 0 0;
  height: 85%;
  overflow: auto;
  border-radius:14px;
  box-shadow: 1px 1px 1px 1px #888888;

  .buttonOhjeet{
    border-radius:8px 1px;
    position: relative !important;
    top: 15%;    
    right:52%;
    background-color:#80CDE6;
    color:#FFFFFF;
    padding:0.6rem 1.8rem;
    font-size:1rem;
    font-weight:bold;text-align:center;
    } 

  @media screen and (min-width: 1024px) {
    width: 60vw;
    margin-bottom: 5vh;
    border-radius: 15px;
  }

  form {
    .question {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      height: 75vh;

      .question_text {
        display: flex;
        flex-flow: column nowrap;

        .help_button {
          background-color: lightblue;
          width: 2.5rem;
          height: 2.5rem;
          padding:0rem;
          font-size:1.1rem;
          font-weight:bold;
          align-items:center;
        }
      }

      .buttons {
        display: flex;
        flex-flow: row-reverse nowrap;
        justify-content: space-between;

        button {
          border-radius: 50px;
          box-shadow: 0 5px 5px gray;
          line-height: 2;
          width: 8rem;
        }
        .button-next{
        background-color:#353535;
        color:#FFFFFF;
        }
        .button-previous{
        background-color:#353535;
        color:#FFFFFF;
        }
      }
      .cancel-button {
        color: #350E7E;
        opacity: 70%;
      }
    }
  }
}

textarea {
  width: 100%;
  border-radius: 4px;
}

textarea::placeholder {
  opacity: 40%;
  color:#353535;
}

.review {

  .results {
    display: flex;
    flex-flow: column;
    text-align: start;

    div {
      border: 1px solid lightgray;
      padding: 0.7rem;
      margin: 0.6rem;

      span:nth-child(even) {
        float: right;
      }
    }
  }

  .review-buttons {
    margin: 1.8rem 0;

    button {
      border-radius: 50px;
      box-shadow: 0 5px 5px gray;
      line-height: 2;
      width: 8rem;
    }

    button:nth-of-type(2) {
      padding: 1.3rem;
      margin-left: 1rem;
    }
  }

  .cancel-button {
    color:lightskyblue;
  }
}
.dim-background {
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

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

  .cancel-container {
    background-color: white;
    height: 40%;
    border-radius: 15px;
    //width: 80vw;
    padding-left: 5vw;
    padding-right: 5vw;

    div {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      height: 50%;

      button {
        border-radius: 50px;
        box-shadow: 0 5px 5px gray;
      }
    }

    div:nth-of-type(1) {
      border-bottom: 1px solid lightgray;
    }
  }
}

.question_text > p {
  color:#353535;
}
.question_text p:nth-of-type(1) {
  font-weight: bold;
  font-size:1.125em;   
  color:#350E7E;
}
.question_text p:nth-of-type(2) {
    font-size:1.125em;
  }
.buttonHelp{
  position: absolute;
  top: 21%;    
  right:1%;
}
.rangeLabel-mobile{
  display: -webkit-flex;
  display: flex;
  justify-content:space-between;
  font-weight: bold;
}
.rangeLower{
  font-size:1.1rem;
  font-weight: bold;
}
.rangeHigher{
  font-size:1.1rem;
  font-weight: bold;
}
.rangeLabel  {
  display: none;
}

@media screen and (min-width: 575px) {
  .question_text p:nth-of-type(1) {
    font-size:1.25em;   
}
  .buttonHelp{
    position: relative;
    top:-80%;    
    left:100%;
  }
}
@media screen and (min-width: 768px) {
  .question_text p:nth-of-type(2) {
    font-size:1.2em;
  }
  .buttonHelp{
    position: relative;
    top: -80%; 
    left:100%;
  }
  .rangeLabel-mobile{
    display: none;
  }
  .rangeLabel  {
    display: block;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    padding: 0 0.30rem;
  }
  .rangeLabel > div {
    height: 0.6875rem;
    width: 0.0625rem;
    background:#000000;
    font-weight: bold;
    line-height: 2.875rem;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
  }
  //input[type=range]:not(:hover) ~ .rangeLabel { opacity: 0.10; }
}

.custom-range {
  &::-webkit-slider-thumb {
    background: gray;
  }

  &::-moz-range-thumb {
    background: gray;
  }

  &::-ms-thumb {
    background: gray;
  }
}

.activeRange {
  &::-webkit-slider-thumb {
    background: blue;
  }

  &::-moz-range-thumb {
    background: blue;
  }

  &::-ms-thumb {
    background: blue;
  }
}

@media screen and (min-width: 1025px) {
  .question_text p:nth-of-type(2) {
  font-size:1.3em;
  
}
  .buttonHelp{
    position: absolute !important;
    top: 21%;    
    left:76%;
  }
}
@media screen and (min-width: 1400px){
  .question_text p:nth-of-type(2) {
  padding:0 5rem;
}
  .buttonHelp{
    position: absolute !important;
    top: 21%;    
    left:70%;
  }
  .cancel-container{
    width:30vw !important;
  }
}
</style>