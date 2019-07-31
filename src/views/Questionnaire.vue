<template>
  <div class="background">
    <div class="container-fluid" id="questionnaire-top">
      <img class="logo" src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" />
      <button @click="toggleHelp" class="btn buttonOhjeet-Ohjeet">Ohjeet</button>
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
          <button
            @click.prevent="moveHome"
            class="btn btn-primary"
          >{{ $t('message.cancel_discard') }}</button>
        </div>
      </div>
    </div>
    <div class="questionnaire container text-center shadow-lg">
      <button @click="toggleHelp" class="btn buttonOhjeet">Ohjeet</button>
      <form>
        <div class="question" v-show="questionnum == 0">
          <div class="question_text">
            <div class="questionHelp_button">
              <p>Kysymys 1.</p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('health')"
              >?</button>
            </div>
            <p v-html="$t('message.question_health')"></p>
          </div>
          <p v-if="help_text_visible === 'health'">{{ $t('message.help_text_health') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.health}}</p>
            <b-form-input
              v-bind:class="{activeRange: questiondata.health}"
              type="range"
              min="0"
              max="10"
              v-model="questiondata.health"
            />
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
          <textarea
            v-model="questiondata.health_desc"
            rows="3"
            v-bind:placeholder="$t('message.question_desc_placeholder')"
          ></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 1">
          <div class="question_text">
            <div class="questionHelp_button">
              <p>Kysymys 2.</p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('overcoming')"
              >?</button>
            </div>
            <p v-html="$t('message.question_overcoming')"></p>
          </div>
          <p v-if="help_text_visible === 'overcoming'">{{ $t('message.help_text_overcoming') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.overcoming}}</p>
            <b-form-input
              v-bind:class="{activeRange: questiondata.overcoming}"
              type="range"
              min="0"
              max="10"
              v-model="questiondata.overcoming"
            />
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
          <textarea
            v-model="questiondata.overcoming_desc"
            rows="3"
            v-bind:placeholder="$t('message.question_desc_placeholder')"
          ></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 2">
          <div class="question_text">
            <div class="questionHelp_button">
              <p>Kysymys 3.</p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('living')"
              >?</button>
            </div>
            <p v-html="$t('message.question_living')"></p>
          </div>
          <p v-if="help_text_visible === 'living'">{{ $t('message.help_text_living') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.living}}</p>
            <b-form-input
              v-bind:class="{activeRange: questiondata.living}"
              type="range"
              min="0"
              max="10"
              v-model="questiondata.living"
            />
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
          <textarea
            v-model="questiondata.living_desc"
            rows="3"
            v-bind:placeholder="$t('message.question_desc_placeholder')"
          ></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 3">
          <div class="question_text">
            <div class="questionHelp_button">
              <p>Kysymys 4.</p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('coping')"
              >?</button>
            </div>
            <p v-html="$t('message.question_coping')"></p>
          </div>
          <p v-if="help_text_visible === 'coping'">{{ $t('message.help_text_coping') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.coping}}</p>
            <b-form-input
              v-bind:class="{activeRange: questiondata.coping}"
              type="range"
              min="0"
              max="10"
              v-model="questiondata.coping"
            />
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
          <textarea
            v-model="questiondata.coping_desc"
            rows="3"
            v-bind:placeholder="$t('message.question_desc_placeholder')"
          ></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 4">
          <div class="question_text">
            <div class="questionHelp_button">
              <p>Kysymys 5.</p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('family')"
              >?</button>
            </div>
            <p v-html="$t('message.question_family')"></p>
          </div>
          <p v-if="help_text_visible === 'family'">{{ $t('message.help_text_family') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.family}}</p>
            <b-form-input
              v-bind:class="{activeRange: questiondata.family}"
              type="range"
              min="0"
              max="10"
              v-model="questiondata.family"
            />
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
          <textarea
            v-model="questiondata.family_desc"
            rows="3"
            v-bind:placeholder="$t('message.question_desc_placeholder')"
          ></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 5">
          <div class="question_text">
            <div class="questionHelp_button">
              <p>Kysymys 6.</p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('friends')"
              >?</button>
            </div>
            <p v-html="$t('message.question_friends')"></p>
          </div>
          <p v-if="help_text_visible === 'friends'">{{ $t('message.help_text_friends') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.friends}}</p>
            <b-form-input
              v-bind:class="{activeRange: questiondata.friends}"
              type="range"
              min="0"
              max="10"
              v-model="questiondata.friends"
            />
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
          <textarea
            v-model="questiondata.friends_desc"
            rows="3"
            v-bind:placeholder="$t('message.question_desc_placeholder')"
          ></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 6">
          <div class="question_text">
            <div class="questionHelp_button">
              <p>Kysymys 7.</p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('finance')"
              >?</button>
            </div>
            <p v-html="$t('message.question_finance')"></p>
          </div>
          <p v-if="help_text_visible === 'finance'">{{ $t('message.help_text_finance') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.finance}}</p>
            <b-form-input
              v-bind:class="{activeRange: questiondata.finance}"
              type="range"
              min="0"
              max="10"
              v-model="questiondata.finance"
            />
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
          <textarea
            v-model="questiondata.finance_desc"
            rows="3"
            v-bind:placeholder="$t('message.question_desc_placeholder')"
          ></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 7">
          <div class="question_text">
            <div class="questionHelp_button">
              <p>Kysymys 8.</p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('strengths')"
              >?</button>
            </div>
            <p v-html="$t('message.question_strengths')"></p>
          </div>
          <p v-if="help_text_visible === 'strengths'">{{ $t('message.help_text_strengths') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.strengths}}</p>
            <b-form-input
              v-bind:class="{activeRange: questiondata.strengths}"
              type="range"
              min="0"
              max="10"
              v-model="questiondata.strengths"
            />
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
          <textarea
            v-model="questiondata.strengths_desc"
            rows="3"
            v-bind:placeholder="$t('message.question_desc_placeholder')"
          ></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 8">
          <div class="question_text">
            <div class="questionHelp_button">
              <p>Kysymys 9.</p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('self_esteem')"
              >?</button>
            </div>
            <p v-html="$t('message.question_self_esteem')"></p>
          </div>
          <p v-if="help_text_visible === 'self_esteem'">{{ $t('message.help_text_self_esteem') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.self_esteem}}</p>
            <b-form-input
              v-bind:class="{activeRange: questiondata.self_esteem}"
              type="range"
              min="0"
              max="10"
              v-model="questiondata.self_esteem"
            />
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
          <textarea
            v-model="questiondata.self_esteem_desc"
            rows="3"
            v-bind:placeholder="$t('message.question_desc_placeholder')"
          ></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 9">
          <div class="question_text">
            <div class="questionHelp_button">
              <p>Kysymys 10.</p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('life_as_whole')"
              >?</button>
            </div>
            <p v-html="$t('message.question_life_as_whole')"></p>
          </div>
          <p
            v-if="help_text_visible === 'life_as_whole'"
          >{{ $t('message.help_text_life_as_whole') }}</p>
          <div class="range-input">
            <p class="rangeQuestiondata">{{questiondata.life_as_whole}}</p>
            <b-form-input
              v-bind:class="{activeRange: questiondata.life_as_whole}"
              type="range"
              min="0"
              max="10"
              v-model="questiondata.life_as_whole"
            />
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
          <textarea
            v-model="questiondata.life_as_whole_desc"
            rows="3"
            v-bind:placeholder="$t('message.question_desc_placeholder')"
          ></textarea>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="review" v-show="questionnum == 10">
          <h3>Kooste vastauksistasi</h3>
          <div class="results">
            <div>
              <span>Kysymys 1.</span><span v-bind:class="{notanswered :!questiondata.health}">{{questiondata.health ? questiondata.health : "Ei vastattu"}}</span>
              <b-button v-b-toggle.collapse-health class="textarea-collapse up">^</b-button>
              <b-collapse id="collapse-health">
                <p>{{questiondata.health_desc ? questiondata.health_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span>Kysymys 2.</span><span v-bind:class="{notanswered :!questiondata.overcoming}">{{questiondata.overcoming ? questiondata.overcoming :"Ei vastattu"}}</span>
              <b-button v-b-toggle.collapse-overcoming class="textarea-collapse up">^</b-button>
              <b-collapse id="collapse-overcoming">
                <p>{{questiondata.overcoming_desc ? questiondata.overcoming_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span>Kysymys 3.</span><span v-bind:class="{notanswered :!questiondata.living}">{{questiondata.living ? questiondata.living :"Ei vastattu" }}</span>
              <b-button v-b-toggle.collapse-living class="textarea-collapse up">^</b-button>
              <b-collapse id="collapse-living">
                <p>{{questiondata.living_desc ? questiondata.living_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span>Kysymys 4.</span><span v-bind:class="{notanswered :!questiondata.coping}">{{questiondata.coping ? questiondata.coping :"Ei vastattu" }}</span>
              <b-button v-b-toggle.collapse-coping class="textarea-collapse up">^</b-button>
              <b-collapse id="collapse-coping">
                <p>{{questiondata.coping_desc ? questiondata.coping_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span>Kysymys 5.</span><span v-bind:class="{notanswered :!questiondata.family}">{{questiondata.family ? questiondata.family :"Ei vastattu" }}</span>
              <b-button v-b-toggle.collapse-family class="textarea-collapse up">^</b-button>
              <b-collapse id="collapse-family">
                <p>{{questiondata.family_desc ? questiondata.family_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span>Kysymys 6.</span><span v-bind:class="{notanswered :!questiondata.friends}">{{questiondata.friends ? questiondata.friends :"Ei vastattu" }}</span>
              <b-button v-b-toggle.collapse-friends class="textarea-collapse up">^</b-button>
              <b-collapse id="collapse-friends">
                <p>{{questiondata.friends_desc ? questiondata.friends_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span>Kysymys 7.</span><span v-bind:class="{notanswered :!questiondata.finance}">{{questiondata.finance ? questiondata.finance :"Ei vastattu" }}</span>
              <b-button v-b-toggle.collapse-finance class="textarea-collapse up">^</b-button>
              <b-collapse id="collapse-finance">
                <p>{{questiondata.finance_desc ? questiondata.finance_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span>Kysymys 8.</span><span v-bind:class="{notanswered :!questiondata.overcoming}">{{questiondata.strengths ? questiondata.strengths :"Ei vastattu" }}</span>
              <b-button v-b-toggle.collapse-strengths class="textarea-collapse up">^</b-button>
              <b-collapse id="collapse-strengths">
                <p>{{questiondata.strengths_desc ? questiondata.strengths_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span>Kysymys 9.</span><span v-bind:class="{notanswered :!questiondata.self_esteem}">{{questiondata.self_esteem ? questiondata.self_esteem :"Ei vastattu" }}</span>
              <b-button v-b-toggle.collapse-selfesteem class="textarea-collapse up">^</b-button>
              <b-collapse id="collapse-selfesteem">
                <p>{{questiondata.self_esteem_desc ? questiondata.self_esteem_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span>Kysymys 10.</span><span v-bind:class="{notanswered :!questiondata.life_as_whole}">{{questiondata.life_as_whole ? questiondata.life_as_whole :"Ei vastattu" }}</span>
              <b-button v-b-toggle.collapse-lifeaswhole class="textarea-collapse up">^</b-button>
              <b-collapse id="collapse-lifeaswhole">
                <p>{{questiondata.life_as_whole_desc ? questiondata.life_as_whole_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
          </div>
          <div class="review-buttons">
            <button
              class="btn btn-primary"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.return')}}</button>
            <button class="btn btn-primary" @click.prevent="saveQuestions">{{ $t('message.send')}}</button>
          </div>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Questionnaire",
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
      help_text_visible: "",
      cancel_visible: false,
      show: false
    };
  },
  methods: {
    toNextQuestion() {
      this.questionnum++;
    },
    toPreviousQuestion() {
      this.questionnum--;
    },
    saveQuestions() {
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/result",
        data: { ...this.questiondata }
      })
        .then(res => {
          if (res.data.status === "ok") {
            this.$router.push({ path: `/results/${res.data.resultId}` });
          }
        })
        .catch(err => {});
    },
    toggleHelp() {
      this.help_visible = !this.help_visible;
    },
    toggleQuestionHelp(question) {
      if (this.help_text_visible === question) {
        this.help_text_visible = "";
      } else {
        this.help_text_visible = question;
      }
    },
    toggleCancel() {
      this.cancel_visible = !this.cancel_visible;
    },
    moveHome() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="scss" scoped>
.notAnswered {
  color: red;
}

.background {
  //background: linear-gradient(to right, #0078f0, #80bfff);
  background: #ffffff;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  overflow: hidden;
  font-size: 1rem;

  #questionnaire-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #80cde6;
    font-size: 10rem;
    height: 16vh;
    overflow: hidden;
    margin-bottom: 1rem;

    .logo {
      height: 60px;
    }

    .buttonOhjeet-Ohjeet {
      border-radius: 8px 1px;
      background-color: #80cde6;
      color: #ffffff;
      padding: 0.6rem 1.8rem;
      font-size: 1.1rem;
      font-weight: bold;
      text-align: center;
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
  border-radius: 14px;

  .buttonOhjeet {
    display: none;
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

        .questionHelp_button {
          display: flex;
          justify-content: center;
          margin: 2rem 0;

          p:nth-of-type(1) {
            font-weight: bold;
            font-size: 1.125em;
            color: #350e7e !important;
          }
        }

        .help_button {
          background-color: #350e7e;
          width: 2rem;
          height: 2rem;
          padding: 0rem;
          font-size: 1.1rem;
          font-weight: bold;
          align-items: center;
          color: #ffffff;
          margin-left: 2rem;
          //align-self: flex-end;
        }
      }

      .question_text p:nth-of-type(1) {
        font-size: 1.125em;
        color: #353535;
      }

      .range-input {
        .rangeQuestiondata {
          font-size: 1.8em;
        }

        .rangeLabel-mobile {
          display: -webkit-flex;
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }

        .rangeLabel {
          display: none;
        }
        .activeRange {
          &::-webkit-slider-thumb {
            background: #350e7e;
          }

          &::-moz-range-thumb {
            background: #350e7e;
          }

          &::-ms-thumb {
            background: #350e7e;
          }
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
        .button-next {
          background-color: #353535;
          color: #ffffff;
        }
        .button-previous {
          background-color: #353535;
          color: #ffffff;
        }
      }
      .cancel-button {
        color: #350e7e;
        opacity: 70%;
        font-size: 1.3em;
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
  color: #353535;
}

.review {

    h3{
      margin:3rem;
    }

  .results {
    display: flex;
    flex-flow: column;
    text-align: start;

    .notanswered{
      color:red;
      font-size:1.1em !important;
    }

    div {
      border: 1px solid lightgray;
      padding: 0.7rem;
      margin: 0.6rem;

      span:nth-of-type(1) {
        font-weight: bold;
        font-size:1.125em;   
        color:#350E7E;
      }

      span:nth-of-type(2) {
        font-size:1.6em;
        padding-right:1rem;   
      }

      span:nth-child(even) {
        float: right;
      }
      
      .textarea-collapse{
        background-color:white;
        color:black;
        border:0;
        font-size:1.1rem;
        font-weight:bold;
        margin-left:1rem;
        font-weight:bold;
      }
     .up{
       transform: rotate(180deg);
    }}
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
    color: lightskyblue;
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
  font-size: 1.1rem;

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

//iPhone 4 Portrait
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  textarea {
    width: 100%;
    border-radius: 4px;
    margin: 1rem 0;
    padding-bottom: 5rem;
  }

  textarea::placeholder {
    opacity: 40%;
    color: #353535;
    font-size: 1rem;
  }

  .cancel-button {
    margin: 1rem 0;
  }
}

//iPhone 5 Portrait
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  textarea {
    width: 100%;
    border-radius: 4px;
    margin: 1rem 0;
    padding-bottom: 5rem;
  }

  textarea::placeholder {
    opacity: 40%;
    color: #353535;
    font-size: 1rem;
  }

  .cancel-button {
    margin: 1rem 0;
  }
}

@media only screen and (min-width: 575px) {
  .questionHelp_button p {
    font-size: 1.25em !important;
  }
}

@media only screen and (min-width: 768px) {
  #questionnaire-top > img {
    height: 70px !important;
  }

  .dim-background {
    text-align: center;
  }

  .question_text p:nth-of-type(1) {
    font-size: 1.2em !important;
  }

  .rangeLabel-mobile {
    display: none !important;
  }

  .rangeLabel {
    display: block !important;
    display: -webkit-flex !important;
    display: flex !important;
    justify-content: space-between !important;
    padding: 0 0.3rem !important;
  }

  .rangeLabel > div {
    height: 0.6875rem;
    width: 0.0625rem;
    background: #000000;
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

@media only screen and (min-width: 1025px) {
  #questionnaire-top {
    display: flex !important;
    justify-content: center !important;
  }

  .buttonOhjeet-Ohjeet {
    display: none !important;
  }

  .buttonOhjeet {
    display: block !important;
    position: absolute !important;
    top: 16%;
    left: 20%;
    border-radius: 8px 1px;
    background-color: #80cde6;
    color: #ffffff;
    padding: 0.6rem 1.8rem;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
  }

  .question_text p:nth-of-type(1) {
    font-size: 1.3em !important;
  }

  textarea {
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
}

@media only screen and (min-width: 1400px) {
  .question_text p:nth-of-type(1) {
    padding: 0 5rem !important;
  }

  .cancel-container {
    width: 30vw !important;
  }
}

@media only screen and (min-width: 1900px) {
  .questionnaire {
    height: 100%;
  }

  .buttonOhjeet {
    position: relative !important;
    top: 0%;
    left: -5%;
  }

  .questionHelp_button {
    margin-top: 0rem !important;
  }

  .review h3{
      margin:1rem 1rem 2rem 1rem;
    }
}
</style>