<template>
  <div class="background">
    <div class="container-fluid" id="questionnaire-main">
      <div class="questionnaire-top">
        <img class="logo" src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" />
        <button @click="toggleHelp" class="btn buttonOhjeet">Ohjeet</button>
      </div>
      <div class="questionnaire-bottom">
        <span v-if="user">{{user}}</span>
        <span v-if="!user">anonyymi kysely {{surveyId}}</span>
      </div>
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
      <form>
        <div class="question" v-show="questionnum == 0">
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t('message.health_title')"></p>
              <p v-html="$t('message.question_health')"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('health')"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p v-if="help_text_visible === 'health'">{{ $t('message.help_text_health') }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{questiondata.health}}</p>
              <div v-show="questiondata.health" class="remove-icon"><font-awesome-icon icon="times-circle" @click.prevent="questiondata.health = undefined"/></div>
              <div v-show="questiondata.health"><button class="btn remove-button" @click.prevent="questiondata.health = undefined">Poista Vastaus</button></div>
            </div>
            <div class="range">
              <b-form-input
                v-bind:class="{activeRange: questiondata.health}"
                type="range"
                min="0"
                max="10"
                v-model="questiondata.health"
              />
            </div>
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
              <div class="rangeLabel-icons">
                <span><font-awesome-icon icon="thumbs-down" style="font-size:1.6rem; color:grey;"/></span>
                <span><font-awesome-icon icon="thumbs-up" style="font-size:1.6rem; color:grey;"/></span>
            </div>
          </div>
          <div class="textarea-wordCount">
            <textarea
              v-model="questiondata.health_desc"
              rows="3" 
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{questiondata.health_desc ? questiondata.health_desc.length : '0'}}/2000</p>
          </div>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
          </div>
          <p class="page-number"  style="align-self: center"><span class="current">1</span><span class="total">/10</span></p>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 1">
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t('message.overcoming_title')"></p>
              <p v-html="$t('message.question_overcoming')"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('overcoming')"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p v-if="help_text_visible === 'overcoming'">{{ $t('message.help_text_overcoming') }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{questiondata.overcoming}}</p>
              <div v-show="questiondata.overcoming" class="remove-icon" @click.prevent="questiondata.overcoming = undefined"><font-awesome-icon icon="times-circle"/></div>
              <div v-show="questiondata.overcoming"><button class="btn remove-button" @click.prevent="questiondata.overcoming = undefined">Poista Vastaus</button></div>
            </div>
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
            <div class="rangeLabel-words">
                <span>{{ $t('message.dissatisfied') }}</span>
                <span>{{ $t('message.satisfied') }}</span>
            </div>
          </div>
          <div class="textarea-wordCount">
            <textarea
              v-model="questiondata.overcoming_desc"
              rows="3"
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{questiondata.overcoming_desc ? questiondata.overcoming_desc.length : '0'}}/2000</p>
          </div>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <p class="page-number"><span class="current">2</span><span class="total">/10</span></p>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 2">
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t('message.living_title')"></p>
              <p v-html="$t('message.question_living')"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('living')"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p v-if="help_text_visible === 'living'">{{ $t('message.help_text_living') }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{questiondata.living}}</p>
              <div v-show="questiondata.living" class="remove-icon"><font-awesome-icon icon="times-circle" @click.prevent="questiondata.living = undefined" title="Poista numero"/></div>
              <div v-show="questiondata.living"> <button class="btn remove-button" @click.prevent="questiondata.living = undefined">Poista Vastaus</button></div>
            </div>
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
             <div class="rangeLabel-words">
                <span>{{ $t('message.dissatisfied') }}</span>
                <span>{{ $t('message.satisfied') }}</span>
            </div>
          </div>
          <div class="textarea-wordCount">
            <textarea
              v-model="questiondata.living_desc"
              rows="3"
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{questiondata.living_desc ? questiondata.living_desc.length : '0'}}/2000</p>
          </div>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <p class="page-number"><span class="current">3</span><span class="total">/10</span></p>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 3">
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t('message.coping_title')"></p>
              <p v-html="$t('message.question_coping')"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('coping')"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p v-if="help_text_visible === 'coping'">{{ $t('message.help_text_coping') }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{questiondata.coping}}</p>
              <div v-show="questiondata.coping" class="remove-icon"><font-awesome-icon icon="times-circle" @click.prevent="questiondata.coping = undefined"/></div>
              <div v-show="questiondata.coping"><button class="btn remove-button" @click.prevent="questiondata.coping = undefined">Poista Vastaus</button></div>
            </div>
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
             <div class="rangeLabel-words">
                <span>{{ $t('message.dissatisfied') }}</span>
                <span>{{ $t('message.satisfied') }}</span>
            </div>
          </div>
          <div class="textarea-wordCount">
            <textarea
              v-model="questiondata.coping_desc"
              rows="3"
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{questiondata.coping_desc ? questiondata.coping_desc.length : '0'}}/2000</p>
          </div>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <p class="page-number"><span class="current">4</span><span class="total">/10</span></p>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 4">
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t('message.family_title')"></p>
              <p v-html="$t('message.question_family')"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('family')"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p v-if="help_text_visible === 'family'">{{ $t('message.help_text_family') }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{questiondata.family}}</p>
              <div v-show="questiondata.family" class="remove-icon"><font-awesome-icon icon="times-circle" @click.prevent="questiondata.family = undefined"/></div>
              <div v-show="questiondata.family"><button class="btn remove-button" @click.prevent="questiondata.family = undefined">Poista Vastaus</button></div>
            </div>
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
             <div class="rangeLabel-words">
                <span>{{ $t('message.dissatisfied') }}</span>
                <span>{{ $t('message.satisfied') }}</span>
            </div>
          </div>
          <div class="textarea-wordCount">
            <textarea
              v-model="questiondata.family_desc"
              rows="3"
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{questiondata.family_desc ? questiondata.family_desc.length : '0'}}/2000</p>
          </div>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <p class="page-number"><span class="current">5</span><span class="total">/10</span></p>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 5">
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t('message.friends_title')"></p>
              <p v-html="$t('message.question_friends')"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('friends')"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p v-if="help_text_visible === 'friends'">{{ $t('message.help_text_friends') }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{questiondata.friends}}</p>
              <div v-show="questiondata.friends" class="remove-icon"><font-awesome-icon icon="times-circle" @click.prevent="questiondata.friends = undefined" title="Poista numero"/></div>
              <div v-show="questiondata.friends"><button class="btn remove-button" @click.prevent="questiondata.friends = undefined">Poista Vastaus</button></div>
            </div>
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
             <div class="rangeLabel-words">
                <span>{{ $t('message.dissatisfied') }}</span>
                <span>{{ $t('message.satisfied') }}</span>
            </div>
          </div>
          <div class="textarea-wordCount">
            <textarea
              v-model="questiondata.friends_desc"
              rows="3"
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{questiondata.friends_desc ? questiondata.friends_desc.length : '0'}}/2000</p>
          </div>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <p class="page-number"><span class="current">6</span><span class="total">/10</span></p>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 6">
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t('message.finance_title')"></p>
              <p v-html="$t('message.question_finance')"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('finance')"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p v-if="help_text_visible === 'finance'">{{ $t('message.help_text_finance') }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{questiondata.finance}}</p>
              <div v-show="questiondata.finance" class="remove-icon" ><font-awesome-icon icon="times-circle" @click.prevent="questiondata.finance = undefined"/></div>
              <div v-show="questiondata.finance" ><button class="btn remove-button" @click.prevent="questiondata.finance = undefined">Poista Vastaus</button></div>
            </div>
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
             <div class="rangeLabel-words">
                <span>{{ $t('message.dissatisfied') }}</span>
                <span>{{ $t('message.satisfied') }}</span>
            </div>
          </div>
          <div class="textarea-wordCount">
            <textarea
              v-model="questiondata.finance_desc"
              rows="3"
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{questiondata.finance_desc ? questiondata.finance_desc.length : '0'}}/2000</p>
          </div>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <p class="page-number"><span class="current">7</span><span class="total">/10</span></p>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 7">
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t('message.strengths_title')"></p>
              <p v-html="$t('message.question_strengths')"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('strengths')"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p v-if="help_text_visible === 'strengths'">{{ $t('message.help_text_strengths') }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{questiondata.strengths}}</p>
              <div v-show="questiondata.strengths" class="remove-icon"><font-awesome-icon icon="times-circle" @click.prevent="questiondata.strengths = undefined"/></div>
              <div v-show="questiondata.strengths"><button class="btn remove-button" @click.prevent="questiondata.strengths = undefined">Poista Vastaus</button></div>
            </div>
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
             <div class="rangeLabel-words">
                <span>{{ $t('message.dissatisfied') }}</span>
                <span>{{ $t('message.satisfied') }}</span>
            </div>
          </div>
          <div class="textarea-wordCount">
            <textarea
              v-model="questiondata.strengths_desc"
              rows="3"
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{questiondata.strengths_desc ? questiondata.strengths_desc.length : '0'}}/2000</p>
          </div>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <p class="page-number"><span class="current">8</span><span class="total">/10</span></p>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 8">
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t('message.self_esteem_title')"></p>
              <p v-html="$t('message.question_self_esteem')"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('self_esteem')"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p v-if="help_text_visible === 'self_esteem'">{{ $t('message.help_text_self_esteem') }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{questiondata.self_esteem}}</p>
              <div v-show="questiondata.self_esteem" class="remove-icon"><font-awesome-icon icon="times-circle" @click.prevent="questiondata.self_esteem = undefined"/></div>
              <div v-show="questiondata.self_esteem"><button class="btn remove-button" @click.prevent="questiondata.self_esteem = undefined">Poista Vastaus</button></div>
            </div>
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
             <div class="rangeLabel-words">
                <span>{{ $t('message.dissatisfied') }}</span>
                <span>{{ $t('message.satisfied') }}</span>
            </div>
          </div>
          <div class="textarea-wordCount">
            <textarea
              v-model="questiondata.self_esteem_desc"
              rows="3"
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{questiondata.self_esteem_desc ? questiondata.self_esteem_desc.length : '0'}}/2000</p>
          </div>
          <div class="buttons">
            <button class="btn button-next" @click.prevent="toNextQuestion">{{ $t('message.next') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <p class="page-number"><span class="current">9</span><span class="total">/10</span></p>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="question" v-show="questionnum == 9">
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t('message.life_as_whole_title')"></p>
              <p v-html="$t('message.question_life_as_whole')"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="toggleQuestionHelp('life_as_whole')"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p
            v-if="help_text_visible === 'life_as_whole'"
          >{{ $t('message.help_text_life_as_whole') }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{questiondata.life_as_whole}}</p>
              <div v-show="questiondata.life_as_whole" class="remove-icon" ><font-awesome-icon icon="times-circle" @click.prevent="questiondata.life_as_whole = undefined"/></div>
              <div v-show="questiondata.life_as_whole" ><button class="btn remove-button" @click.prevent="questiondata.life_as_whole = undefined">Poista Vastaus</button></div>
            </div>
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
             <div class="rangeLabel-words">
                <span>erittäin tyytymätön</span>
                <span>erittäin tyytyväinen</span>
            </div>
          </div>
          <div class="textarea-wordCount">
            <textarea
              v-model="questiondata.life_as_whole_desc"
              rows="3" 
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{questiondata.life_as_whole_desc ? questiondata.life_as_whole_desc.length : '0'}}/2000</p>
          </div>
          <div class="buttons">
            <button class="btn button-complete" @click.prevent="toNextQuestion">{{ $t('message.complete') }}</button>
            <button
              class="btn button-previous"
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.previous') }}</button>
          </div>
          <p class="page-number"><span class="current">10</span><span class="total">/10</span></p>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        <div class="review" v-show="questionnum == 10">
          <h3>Kooste vastauksistasi</h3>
          <div class="results">
            <div>
              <span v-html="$t('message.health_title')"></span><span v-bind:class="{notanswered :!questiondata.health}">{{questiondata.health ? questiondata.health : "Ei vastattu"}}</span>
              <b-collapse id="collapse-health" v-bind:visible="questiondata.health_desc">
                <p class="text-review">{{questiondata.health_desc ? questiondata.health_desc : "Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span v-html="$t('message.overcoming_title')"></span><span v-bind:class="{notanswered :!questiondata.overcoming}">{{questiondata.overcoming ? questiondata.overcoming :"Ei vastattu"}}</span>
              <b-collapse id="collapse-overcoming"  v-bind:visible="questiondata.overcoming_desc">
                <p class="text-review">{{questiondata.overcoming_desc ? questiondata.overcoming_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span v-html="$t('message.living_title')"></span><span v-bind:class="{notanswered :!questiondata.living}">{{questiondata.living ? questiondata.living :"Ei vastattu" }}</span>
              <b-collapse id="collapse-living" v-bind:visible="questiondata.living_desc">
                <p class="text-review">{{questiondata.living_desc ? questiondata.living_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span v-html="$t('message.coping_title')"></span><span v-bind:class="{notanswered :!questiondata.coping}">{{questiondata.coping ? questiondata.coping :"Ei vastattu" }}</span>
              <b-collapse id="collapse-coping" v-bind:visible="questiondata.coping_desc">
                <p class="text-review">{{questiondata.coping_desc ? questiondata.coping_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span v-html="$t('message.family_title')"></span><span v-bind:class="{notanswered :!questiondata.family}">{{questiondata.family ? questiondata.family :"Ei vastattu" }}</span>
              <b-collapse id="collapse-family" v-bind:visible="questiondata.family_desc">
                <p class="text-review">{{questiondata.family_desc ? questiondata.family_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span v-html="$t('message.friends_title')"></span><span v-bind:class="{notanswered :!questiondata.friends}">{{questiondata.friends ? questiondata.friends :"Ei vastattu" }}</span>
              <b-collapse id="collapse-friends" v-bind:visible="questiondata.friends_desc">
                <p class="text-review">{{questiondata.friends_desc ? questiondata.friends_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span v-html="$t('message.finance_title')"></span><span v-bind:class="{notanswered :!questiondata.finance}">{{questiondata.finance ? questiondata.finance :"Ei vastattu" }}</span>
              <b-collapse id="collapse-finance" v-bind:visible="questiondata.finance_desc">
                <p class="text-review">{{questiondata.finance_desc ? questiondata.finance_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span v-html="$t('message.strengths_title')"></span><span v-bind:class="{notanswered :!questiondata.strengths}">{{questiondata.strengths ? questiondata.strengths :"Ei vastattu" }}</span>
              <b-collapse id="collapse-strengths" v-bind:visible="questiondata.strengths_desc">
                <p class="text-review">{{questiondata.strengths_desc ? questiondata.strengths_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span v-html="$t('message.self_esteem_title')"></span><span v-bind:class="{notanswered :!questiondata.self_esteem}">{{questiondata.self_esteem ? questiondata.self_esteem :"Ei vastattu" }}</span>
              <b-collapse id="collapse-selfesteem" v-bind:visible="questiondata.self_esteem_desc">
                <p class="text-review">{{questiondata.self_esteem_desc ? questiondata.self_esteem_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
            <div>
              <span v-html="$t('message.life_as_whole_title')"></span><span v-bind:class="{notanswered :!questiondata.life_as_whole}">{{questiondata.life_as_whole ? questiondata.life_as_whole :"Ei vastattu" }}</span>
              <b-collapse id="collapse-lifeaswhole" v-bind:visible="questiondata.life_as_whole_desc">
                <p class="text-review">{{questiondata.life_as_whole_desc ? questiondata.life_as_whole_desc :"Ei vastattu" }}</p>
              </b-collapse>
            </div>
          </div>
          <div class="review-buttons">
            <button class="btn send-button" @click.prevent="saveQuestions">{{ $t('message.send')}}</button>
            <button
              class="btn return-button" 
              @click.prevent="toPreviousQuestion"
            >{{ $t('message.return')}}</button>
          <button @click.prevent="toggleCancel" class="btn cancel-button">{{ $t('message.cancel')}}</button>
        </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Questionnaire",
  props: ['user'],
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
      show: false,
      surveyId: this.$route.params.surveyId
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

.range {
  display: flex;
  width: 100%;
  margin: auto;
}

.background {
  //background: linear-gradient(to right, #0078f0, #80bfff);
  background: #FFFFFF;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  //justify-content: flex-end;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;

  #questionnaire-main {
    display: flex;
    flex-direction:column;
    background-color: #80cde6;
    font-size: 1rem;
    height:8rem;
    overflow: hidden;
    margin-bottom: 1rem;

    .questionnaire-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top:1rem;

    .logo {
      height: 60px;
    }

    .buttonOhjeet {
      border-radius: 8px 1px;
      background-color: #353535;
      //background-color: #80cde6;
      color: #FFFFFF;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      }
    }
    .questionnaire-bottom{
      display: flex;
      justify-content:flex-end;
      margin-top:0.1rem;
      font-weight:bold;

      span {
        color: white;
        font-size: 1rem;
        position: absolute;
        
        }
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

  /*.buttonOhjeet {
    display: none;
  }*/

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

        .questionHelpbutton {
          margin-top:1rem;
          margin-bottom:1rem;
          text-align: left;

          p, button{
            display:inline;
          }

          p:nth-of-type(1) {
            font-weight: bold;
            font-size: 1.1rem;
            color: #350e7e;
            margin-right: 1rem;
          }

          p:nth-of-type(2) {
            font-size: 1.1rem;
            color: #353535;
            margin-right: 1rem;
            }

          .help_button {
            background-color: #350e7e;
            padding: 0 0.6rem ;
            font-size: 1.1rem;
            font-weight: bold;
            align-items: center;
            color: #FFFFFF;
            //align-self: flex-end;
          }
        } 
      }

      .range-input {
        display: flex;
        flex-direction: column;

        .rangeQuestiondata-icon{
          position: relative;
          display: flex;
          left: calc(50% - 30px);
          margin-bottom: 1rem;
          width: 50%;
          
          .rangeQuestiondata {
            font-size: 1.8rem;
            width:60px;
            height:60px;
            border:1px solid lightgrey;
            display: flex;
            justify-content:center;
            align-items:center;
          }
          .remove-icon{
            font-size:2rem;
            color:#353535;
            display:flex;
          }
          .remove-button{
            display:none;
          }
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
        .rangeLabel-icons{
          display: -webkit-flex;
          display: flex;
          justify-content: space-between;
          margin-bottom:0.1rem;
        }
        .rangeLabel-words{
          display: -webkit-flex;
          display: flex;
          justify-content: space-between;
          margin-bottom:0.2rem;
          font-size:0.9rem;
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
        text-align:center;

        button {
          border-radius: 50px;
          box-shadow: 0 5px 5px gray;
          line-height: 2;
          width: 8rem;
        }
        .button-next {
          background-color: #353535;
          color: #FFFFFF;
          font-weight:bold;
        }
        .button-previous {
          background-color: #353535;
          color: #FFFFFF;
          font-weight:bold;
        }
        .button-complete{
          background-color:#350E7E;
          color:#FFFFFF;
          font-weight:bold;
        }
      }

    .page-number{
      font-size:1.1rem;
      margin-top:1rem;
      margin-bottom:0;

      .current{
        padding:0.1rem;
      }
      .total{
        padding:0.1rem;
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
.textarea-wordCount{
  textarea {
    width: 100%;
    border-radius: 4px;
  }
  textarea::placeholder {
    opacity: 40%;
    color: #353535;
  }
  p{
    display:flex;
    justify-content:flex-end;
    font-size:1rem;
  }
}

.review {

  h3{
    margin:2rem;
  }

  .results {
    display: flex;
    flex-flow: column;
    text-align: start;

    .notanswered{
      color:#A1318A;
      font-size:1rem !important;
    }

    div {
      border: 1px solid lightgray;
      padding: 0.7rem;
      margin: 0.6rem;

      span:nth-of-type(1) {
        font-weight: bold;
        font-size:1.125rem;   
        color:#350E7E;
      }

      span:nth-of-type(2) {
        font-size:1rem;
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
      }
       .text-review{
         white-space: pre-wrap;
         word-wrap:break-word;
         padding-top:0.6rem;
      }
    }
  }

  .review-buttons {
    //margin: 1.8rem 0;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin:2rem 0;

    .send-button {
      border-radius: 50px;
      box-shadow: 0 5px 5px gray;
      line-height: 2;
      width: 16rem;
      padding: 1rem 2rem;
      background-color:#350E7E;
      color:#FFFFFF;
      font-weight:bold;
      margin:1rem;
      font-size:1rem;
    }

    .return-button{
      color:#350E7E;
      font-size:1.1rem;
    }

    .cancel-button {
      color:#350E7E;
      font-size:1.1rem;
    }
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
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    background-color: white;
    height: 70vh;
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
/*@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
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
}*/
//iPhone 5 Portrait
/*@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
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
}*/

@media only screen and (min-width: 575px) {
  .questionHelpbutton p:nth-of-type(1) {
    font-size: 1.2rem !important;
  }

  .questionHelpbutton p:nth-of-type(2) {
    font-size: 1.1rem !important;
  }
}

@media only screen and (min-width: 768px) {
  #questionnaire-main {
    height: 9rem !important;
  }

  .questionnaire-top > img {
    height: 70px !important;
  }

  .dim-background {
    text-align: center;
  }

  .questionHelpbutton p:nth-of-type(1) {
    font-size: 1.2rem !important;
  }

  .questionHelpbutton p:nth-of-type(2) {
    font-size: 1.1rem !important;
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
    width: 100%;
    margin: auto;
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

  .rangeLabel-icons{
    display:none !important;
  }

  .rangeLabel-words{
    display:block !important;
    display: -webkit-flex !important;
    display: flex !important;
    justify-content: space-between !important;
    margin-bottom:0.1rem;
    margin-top:2rem;
    font-size:1rem !important;
  }

  .results .text-review{
    padding-top:0rem !important;
  }

  .page-number{
    margin-top:0rem !important;
  }

  .help-container {
    height: 60vh !important; 
    width: 60vw !important;
  }
  //input[type=range]:not(:hover) ~ .rangeLabel { opacity: 0.10; }
}

.custom-range {
  &::-webkit-slider-thumb {
    background: lightgray;
  }

  &::-moz-range-thumb {
    background: gray;
  }

  &::-ms-thumb {
    background: gray;
  }

  &::-webkit-slider-runnable-track {
    background: lightgray;
  }
}

@media only screen and (min-width: 1025px) {
  #questionnaire-main {
    height: 9rem !important;
  }
  
  .questionnaire-top {
    display: flex !important;
    justify-content: center !important;
  }

  .questionnaire-bottom{
    margin-top:0 !important;
  }

  /*.buttonOhjeet-Ohjeet {
    display: none !important;
  }*/

  .buttonOhjeet {
    //display: block !important;
    position: absolute;
    top: 3%;
    right: 1%;
    //background-color: #353535 !important;
    font-size: 1rem !important;
    padding: 0.5rem 1.8rem !important;
    //border-radius: 8px 1px;
    //color: #FFFFFF;
    //padding: 0.6rem 1.8rem;
    //font-weight: bold;
    //text-align: center;
  }
  
  .questionHelpbutton {
    margin-top:2rem !important;
  }

  .questionHelpbutton p:nth-of-type(1) {
    font-size: 1.3rem !important;
  }
  
  .questionHelpbutton p:nth-of-type(2) {
    font-size: 1.2rem !important;
  }

  .help_button {
    font-size: 1.3rem !important;
  }

  .rangeLabel-words{
      margin-top:1.7rem;
  }

  textarea {
    margin-top: 2rem;
  }

  /*.rangeQuestiondata-icon .remove-icon{
     display:none !important;
    }

  .rangeQuestiondata-icon .remove-button{
     display:block !important;
     border-radius: 50px;
     box-shadow: 0 5px 5px gray;
     line-height: 2;
     width: 10rem;
     background-color: #353535;
     color: #ffffff;
     padding:0.1rem 0;
     margin:0.6rem 0 0 1rem;
     Outline: none;
  }*/
}

@media only screen and (min-width: 1400px) {
  .questionHelpbutton {
    margin-top:2.5rem !important;
    margin:0 4rem;
    text-align: center !important;
  }

  .questionHelpbutton p:nth-of-type(1) {
    font-size: 1.375rem !important;
  }
  
  .questionHelpbutton p:nth-of-type(2) {
    font-size: 1.3rem !important;
  }

  .rangeLabel-words{
      margin-top:2rem;
  }
  
  .cancel-container {
    width: 30vw !important;
  }
}

@media only screen and (min-width: 1900px) {
  .questionnaire {
    height: 100%;
  }

  /*.buttonOhjeet {
    position: relative !important;
    top: 0%;
    left: -5%;
  }*/

  .questionHelpbutton {
    margin-top: 2.5rem !important;
    margin:0 4rem;
  }

  .questionHelpbutton p:nth-of-type(1) {
    font-size: 1.375rem !important;
  }

  .questionHelpbutton p:nth-of-type(2) {
    font-size: 1.3rem !important;
  }

  .review h3{
      margin:1rem 1rem 2rem 1rem;
  }
}
</style>