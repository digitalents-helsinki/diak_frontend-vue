<template>
<div class="rightsideCreate">
    <div class="createWrapper-before" v-if="!created">
        <div class="rightsideCreate-top">
            <p>{{ $t('message.surveyCreate') }}</p> 
        </div>
        <div class="top-buttons">
            <button class="btn savecontinueButton">{{ $t('message.saveContinue') }}</button>
            <button class="btn discardButton">{{ $t('message.disCard') }}</button>
        </div>
        <div class="adminForm">
            <div class="nameInputsection">
                <label for="forminputName" class="nameInputlabel">{{ $t('message.adminformName') }}</label>
                <b-input 
                    id="surveyname"
                    v-model="surveyName"
                    v-bind:state="surveyNameState === null ? null : surveyName ? true : false"
                    type="text"
                    maxlength="100"
                    name="forminputName"
                    v-bind:placeholder="$t('message.namePlaceholder')"
                />
                <b-form-invalid-feedback>
                    {{$t('message.surveyNameRequired')}}
                </b-form-invalid-feedback>
            </div>
            <hr class="borderLine">
            <div class="optionValue">
                <label for="choiceRadio" class="optionValuelabel">{{ $t('message.radioOption') }}</label>
                <div class="optionValuediv"><input type="radio" v-model="surveyAnon" name="choiceRadio" :value="true" ><span class="optionValueleft">{{ $t('message.anonymousRadio') }}</span></div>
                <div class="optionValuediv"><input type="radio" v-model="surveyAnon" name="choiceRadio" :value="false" ><span class="optionValueleft">{{ $t('message.authenticationRadio') }}</span></div>
            </div>
            <hr class="borderLine">
            <div class="dateOption">
                <p class="date-paragraph">{{ $t('message.dateParagraph') }}</p>
                <div class="startdateOption">
                    <p> {{ $t('message.startDate') }}</p>
                    <datepicker v-model="startDate" :language="fi" :monday-first="true" :disabled-dates="disabledDates" v-bind:placeholder="$t('message.datePlaceholder')"></datepicker>
                    <div class="calendarIcon"><font-awesome-icon icon="calendar-alt"/></div>
                </div>
                <div class="enddateOption">
                    <p> {{ $t('message.endDate') }}</p>
                    <datepicker v-model="endDate" :language="fi" :monday-first="true" :disabled-dates="disabledDates" v-bind:placeholder="$t('message.datePlaceholder')"></datepicker>
                    <div class="calendarIcon"><font-awesome-icon icon="calendar-alt"/></div>
                </div>
            </div>
            <hr class="borderLine">
            <div class="insertingQuestions">
                <p class="insertingQuestions-p">{{ $t('message.questionsParagraph')}}</p>
                <div class="questionsModify-div"> 
                    <button @click="addDefaultQuestions" class="btn questionsModify-button">{{ $t(`message.${allDefaultQuestionsExistence ? 'remove' : 'add'}DefaultQuestions`) }}<font-awesome-icon icon="key" class="iconButton-key"/></button>
                </div>
                <div id="insertedQuestionsview">
                    <div class="questionlistDiv">
                        <b-card-group class="flex-column questionList" tag="div">
                            <transition-group 
                                name="question-list" 
                                v-on:before-enter="beforeQuestionAnimation"
                                v-on:before-leave="beforeQuestionAnimation"
                                v-on:enter="questionAnimation"
                                v-on:leave="questionAnimation"
                                v-on:after-enter="afterQuestionAnimation"
                                v-on:after-leave="afterQuestionAnimation"
                            >
                                <b-card class="questionCard" v-for="(question, index) in questions" v-bind:key="question.questionAnimationId">
                                    <b-card-title
                                        v-on:input="saveQuestion($event, index, 'title')"
                                        v-on:click.prevent
                                        v-on:dblclick="editQuestion(index)"
                                        v-on:keydown.enter="lockQuestions()"
                                        v-editable:100="{condition: editIndex === index, content: question.name ? $t(`message.${question.name}_title`) : question.title}"
                                        spellcheck="false" 
                                        class="questionTitle"
                                        v-bind:data-placeholder="question.name ? '' : question.title ? '' : editIndex === index ? $t('message.questionTitlePlaceholder') : $t('message.questionTitlePlaceholder') + ' *'"
                                    />
                                    <b-card-text 
                                        v-on:input="saveQuestion($event, index, 'description')"
                                        v-on:click.prevent
                                        v-on:dblclick="editQuestion(index)"
                                        v-on:keydown.enter="lockQuestions()"
                                        v-editable:200="{condition: editIndex === index, content: question.name ? $t(`message.question_base`) + $t(`message.question_${question.name}`) : question.description}"
                                        spellcheck="false" 
                                        class="questionDescription"
                                        v-bind:data-placeholder="question.name ? '' : question.description ? '' : editIndex === index ? $t('message.questionDescriptionPlaceholder') : $t('message.questionDescriptionPlaceholder') + ' *'"
                                    />
                                    <b-card-text 
                                        v-on:input="saveQuestion($event, index, 'help')"
                                        v-on:click.prevent
                                        v-on:dblclick="editQuestion(index)"
                                        v-on:keydown.enter="lockQuestions()"
                                        v-editable:1000="{condition: editIndex === index, content: question.name ? $t(`message.help_text_${question.name}`) : question.help}"
                                        spellcheck="false" 
                                        class="questionHelpText"
                                        v-bind:data-placeholder="(question.help === null || question.help === '') ? $t('message.questionHelpPlaceholder') : ''"
                                    />
                                    <div v-if="!question.name && editIndex === index" class="charLimits">
                                        <div>{{question.title ? question.title.length : '0'}}/100</div>
                                        <div>{{question.description ? question.description.length : '0'}}/200</div>
                                        <div>{{question.help ? question.help.length : '0'}}/1000</div>
                                    </div>
                                    <div class="questionNumber">{{index + 1}}</div>
                                    <button class="questionButton questionButtonFourth" @click="shiftQuestion(index, 'up')" aria-label="Move question up"><font-awesome-icon class="icon" icon="arrow-up"></font-awesome-icon></button>
                                    <button class="questionButton questionButtonThird" @click="shiftQuestion(index, 'down')" aria-label="Move question down"><font-awesome-icon class="icon" icon="arrow-down"></font-awesome-icon></button>
                                    <button v-if="editIndex !== index && question.name === null" class="questionButton questionButtonSecond" @click="editQuestion(index)" aria-label="Edit question"><font-awesome-icon class="icon" icon="pencil-alt"></font-awesome-icon></button>
                                    <button v-else-if="editIndex === index" class="questionButton questionButtonSecond" @click="lockQuestions()" aria-label="Save question"><font-awesome-icon class="icon" icon="save"></font-awesome-icon></button>
                                    <button v-else-if="question.name" class="questionButton questionButtonSecond questionButtonKey" @click="editQuestion(index)" aria-label="Edit default question"><font-awesome-icon class="icon" icon="key"></font-awesome-icon></button>
                                    <button class="questionButton questionButtonDelete" @click="removeQuestion(index)" aria-label="Delete question"><font-awesome-icon class="icon" icon="times"></font-awesome-icon></button>
                                </b-card>
                                <button  @click="addQuestion" key="moreQuestionButton" class="btn moreQuestions-button">{{ $t('message.addQuestions') }}<font-awesome-icon icon="plus" class="iconButton-plus"/></button>
                            </transition-group>
                        </b-card-group>
                    </div>
                </div>  
            </div>
            <hr class="borderLine">
            <div class="adminaddEmail">
                <p class="emailmain-Paragraph">{{ $t('message.emailParagraph') }}</p>
                <div class="emailTop">
                    <p> {{ $t('message.emailtopparagrapgh') }} </p>
                    <div class="moreroundedButton">
                        <font-awesome-icon icon="users" class="iconmoreEmail"/>
                        <b-form-file v-model="groupInputFile" accept="text/plain;charset=UTF-8" :browse-text="$t('message.browseFiles')" class="btn moreEmail-button" :placeholder="$t('message.moreEmail')"></b-form-file>
                        <button class="btn roundedButton" v-b-popover.focus="'Voit antaa vastaajat listana. Lista on yksinkertainen tekstitiedosto (.txt), jossa sähköpostisoitteet ovat peräkkäin yksi osoite per rivi.'" > ? </button>
                    </div>
                </div>
                <div class="emailContent">
                    <div class="emailcontentTop">
                        <b-input-group class="writeinEmail">
                            <b-input v-model="email" type="email" v-bind:placeholder="$t('message.emailPlaceholder')"/>
                            <b-input-group-append>
                                <b-button @click="addEmail" :disabled="!email || !email.match(/.+@.+/)" class="insertemailButton">{{ $t('message.insertmoreEmail') }}<font-awesome-icon icon="plus" class="moreemailPlus"/></b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                    <div class="emaillistDiv">
                        <ul class="emailList">
                            <li v-for="(email, index) in emails" v-bind:key="index">
                                <div class="emailDiv">
                                    <font-awesome-icon @click="removeEmail(index)" icon="times"/><span>{{email}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="putMessagediv">
                    <button v-if="!messageVisible" class="btn putMessage" @click="showMessage"><font-awesome-icon icon="paperclip" class="putMessageicon"/>{{ $t('message.addMessage') }}</button>
                    <b-textarea v-if="messageVisible" v-model="message" class="writeMessage" type="text" />
                </div> 
                <div class="bottom-buttons">
                    <button class="btn savecontinueBottom">{{ $t('message.saveContinue') }}</button>
                    <button id="sendSurveyButton" class="btn sendsurveyButton" @click="sendSurvey">{{ $t('message.sendSurvey') }}<font-awesome-icon icon="paper-plane" class="putMessageicon"/></button>
                    <b-popover target="sendSurveyButton" triggers="manual" placement="top">
                        {{$t('message.sendSurveyError')}}
                    </b-popover>
                </div>
            </div>
        </div>
    </div>
    <div class="createWrapper-after" v-if="created">
        <p>{{ $t('message.queryMessage') }}</p>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import Datepicker from 'vuejs-datepicker'
import { fi } from 'vuejs-datepicker/dist/locale'

export default {
    name: 'admin-create',
    data() {
        return {
            created: false,
            form: {

            },
            disabledDates: {
                to: (d => new Date(d.setDate(d.getDate() - 1)))(new Date)
            },
            fi: fi,
            questions: [],
            emails: [],
            email: null,
            surveyName: null,
            surveyAnon: true,
            startDate: null,
            endDate: null,
            lastWrapperHeight: null,
            lastQuestionCardWidth: null,
            editIndex: null,
            surveyNameState: null,
            message: null,
            messageVisible: false,
            groupInputFile: null,
            defaultQuestions: [
                {
                    name: 'health',
                    default: true,
                    questionAnimationId: Math.random()
                },
                {
                    name: 'overcoming',
                    default: true,
                    questionAnimationId: Math.random()
                },                        
                {
                    name: 'living',
                    default: true,
                    questionAnimationId: Math.random()
                },
                {
                    name: 'coping',
                    default: true,
                    questionAnimationId: Math.random()
                },
                {
                    name: 'family',
                    default: true,
                    questionAnimationId: Math.random()
                },
                {
                    name: 'friends',
                    default: true,
                    questionAnimationId: Math.random()
                },
                {
                    name: 'finance',
                    default: true,
                    questionAnimationId: Math.random()
                },
                {
                    name: 'strengths',
                    default: true,
                    questionAnimationId: Math.random()
                },
                {
                    name: 'self_esteem',
                    default: true,
                    questionAnimationId: Math.random()
                },
                {
                    name: 'life_as_whole',
                    default: true,
                    questionAnimationId: Math.random()
                }
            ]
        }
    },
    components: {
        Datepicker
    },
    computed: {
        allDefaultQuestionsExistence() {
            return this.defaultQuestions.every(defaultQuestion => this.$data.questions.some(question => question.name === defaultQuestion.name))
        }
    },
    watch: {
        groupInputFile(val) {
            if (val !== null) {
                const fileReader = new FileReader()
                fileReader.onload = e => {
                    const emails = [...this.$data.emails, ...e.target.result.split(/\r?\n/).filter(email => email)]
                    
                    let valid = true

                    emails.forEach((email, index) => {
                        if (!email.match(/.+@.+/)) {
                            this.$bvToast.toast(`${email}`, {
                                title: 'Epäkelpo sähköpostiosoite',
                                toaster: 'b-toaster-bottom-right',
                                variant: 'danger',
                                noAutoHide: true
                            })
                            valid = false
                        }
                        emails.forEach((Email, Index) => {
                            if (index !== Index && email === Email && email.match(/.+@.+/) && Email.match(/.+@.+/)) {
                                this.$bvToast.toast(`${email} - ${Email}`, {
                                    title: 'Sähköposteissa kaksoiskappaleet',
                                    toaster: 'b-toaster-bottom-right',
                                    variant: 'danger',
                                    noAutoHide: true
                                })
                                valid = false
                            }
                        })
                    })
                    
                    if (valid) this.$data.emails = emails
                    this.$data.groupInputFile = null
                }
                fileReader.readAsText(val)
            }
        }
    },
    methods: {
        addDefaultQuestions() {

            this.lockQuestions()

            if (this.allDefaultQuestionsExistence) {
                //delete defaultquestions if all of them exist
                this.$data.questions = this.$data.questions.filter(question => !this.defaultQuestions.some(defaultQuestion => defaultQuestion.name === question.name))
            } else {
                //add nonexisting defaultquestions
                const filteredDefaultQuestions = this.defaultQuestions.filter(defaultQuestion => !this.$data.questions.some(question => question.name === defaultQuestion.name))
                this.$data.questions = [...filteredDefaultQuestions, ...this.$data.questions]
            }
        },
        addQuestion() {
            this.lockQuestions()

            this.editIndex = this.$data.questions.length
            this.$data.questions.push({
                name: null,
                title: null,
                description: null,
                help: null,
                questionAnimationId: Math.random()
            })
        },
        shiftQuestion(index, direction) {
            this.lockQuestions()

            if (direction === 'up') {
                this.$data.questions.splice(index === 0 ? this.$data.questions.length - 1 : index - 1, 0, ...this.$data.questions.splice(index, 1))
            } else if (direction === 'down') {
                this.$data.questions.splice(index === this.$data.questions.length - 1 ? 0 : index + 1, 0, ...this.$data.questions.splice(index, 1))
            }
        },
        editQuestion(index) {
            this.lockQuestions()

            this.editIndex = index
        },
        saveQuestion(event, index, key) {
            if (this.$data.questions[index].name) {
                this.$data.questions[index].title = this.$t(`message.${this.$data.questions[index].name}_title`)
                this.$data.questions[index].description = this.$t(`message.question_base`) + this.$t(`message.question_${this.$data.questions[index].name}`)
                this.$data.questions[index].help = this.$t(`message.help_text_${this.$data.questions[index].name}`)
                this.$data.questions[index].name = null
                this.$data.questions[index][key] = event.target.textContent
            } else {
                this.$data.questions[index][key] = event.target.textContent
            }
        },
        lockQuestions() {
            if (this.editIndex !== null) {
                this.editIndex = null
            }
        },
        removeQuestion(index) {
            this.lockQuestions()

            this.$data.questions.splice(index, 1)
        },
        addEmail() {
            if (!this.$data.emails.some(email => email.toLowerCase() === this.$data.email.toLowerCase()) 
            && this.$data.email.match(/.+@.+/)) {
                this.$data.emails.push(this.$data.email)
                this.$data.email = null
            }
        },
        removeEmail(index) {
            this.$data.emails.splice(index, 1)
        },
        sendSurvey() {
            if (this.$data.questions.length === 0 || this.$data.questions.some(question => !question.name && (!question.title || !question.description)) || !this.$data.surveyName) {
                if (!this.$data.surveyName) this.$data.surveyNameState = false
                this.$root.$emit('bv::show::popover', 'sendSurveyButton')
                setTimeout(() => this.$root.$emit('bv::hide::popover', 'sendSurveyButton'), 5000)
            } else {
                axios({
                    method: "POST",
                    url: process.env.VUE_APP_BACKEND + "/admin/survey/create",
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.authentication.accessToken}`
                    },
                    data: { 
                        to: this.$data.emails, 
                        id: this.$data.surveyName,
                        ownerId: this.$store.state.authentication.userId,
                        anon: this.$data.surveyAnon,
                        startDate: this.startDate,
                        endDate: this.endDate,
                        respondents_size: this.$data.emails.length,
                        message: this.$data.message,
                        questions: [...this.$data.questions.map((question, idx) => {
                            return {
                                name: question.name,
                                title: question.title,
                                description: question.description,
                                help: question.help,
                                number: idx + 1
                            }
                        })]
                    }
                })
                .then(res => {
                    if (res.status === 200) this.$data.created = true
                }).catch(err => {
                    this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
                        title: this.$t('message.errorToastTitle'),
                        toaster: 'b-toaster-bottom-right',
                        variant: 'danger'
                    })
                })
            }
        },
        showMessage() {
            this.$data.messageVisible = true
        },
        beforeQuestionAnimation(el) {
            this.lastWrapperHeight = getComputedStyle(this.$el.querySelector('#insertedQuestionsview')).height
            this.lastQuestionCardWidth = getComputedStyle(el).width
        },
        questionAnimation(el) {
            const wrapper = this.$el.querySelector('#insertedQuestionsview')
            const wrapperHeight = getComputedStyle(wrapper).height

            wrapper.style.height = this.lastWrapperHeight
            el.style.width = this.lastQuestionCardWidth

            setTimeout(() => wrapper.style.height = wrapperHeight);
        },
        afterQuestionAnimation(el) {
            this.$el.querySelector('#insertedQuestionsview').style.height = null
            el.style.width = null
            this.lastWrapperHeight = null
            this.lastQuestionCardWidth = null
        }
    },
    directives: {
        editable: {
            bind(el, binding) {
                if (binding.value.content) el.textContent = binding.value.content
                if (binding.value.condition) el.contentEditable = true
                //character limit from directive arg
                const limit = Number(binding.arg) || Infinity
                //prevents accidentally pasting html in the field and limits paste length
                el.addEventListener('paste', e => {
                    e.preventDefault();
                    const remainingLimit = limit - el.textContent.length
                    const text = e.clipboardData.getData('text/plain').substring(0, remainingLimit);
                    document.execCommand('inserttext', false, text);
                });
                //prevent typing at the limit
                const allowedKeys = ['Home', 'End', 'PageUp', 'PageDown', 'Backspace', 'Delete', 'Down', 'ArrowDown', 'Up', 'ArrowUp', 'Left', 'ArrowLeft', 'Right', 'ArrowRight']
                el.addEventListener('keydown', e => {
                    if (!allowedKeys.includes(e.key) && !e.ctrlKey) {
                        if (e.target.textContent.length >= limit) {
                            e.preventDefault()
                        }
                    }
                })
            },
            update(el, binding) {
                //only updates if element is not focused (prevents caret from jumping around)
                if (binding.value.content && binding.value.content !== el.textContent && document.activeElement !== el) {
                    el.textContent = binding.value.content
                }
                //set contenteditable attribute to the condition
                if (binding.value.condition !== el.contentEditable) {
                    el.contentEditable = binding.value.condition
                }
            }
        }
    },
    created() {
        this.addDefaultQuestions()
    }
}
</script>
<style lang="scss" scoped>

.sendSurveyPopover {
    color: red;
}
.rightsideCreate{
    background-color:#FFFFFF;
    width:80%;
    margin: 1rem;
    box-shadow: 0 5px 5px #787878;

    .rightsideCreate-top{
        background-color:#350E7E;
        width:100%;
        height: 5rem;
        font-size:1.1rem;
        font-weight:bold;
        color:#FFFFFF;
        display:flex;
        justify-content:center;
        align-items:center;
        padding-top:1.1rem;
        margin-bottom:0;
    }

    .top-buttons{
        display:flex;
        flex-direction:row;
        justify-content:flex-end;
        margin-top:0.1rem;
        margin-right:3rem;

        .savecontinueButton{
            background-color: #353535;
            color: #FFFFFF;
            border-radius: 6px;
            box-shadow: 0 5px 5px gray;
            width:18rem;
            height:auto;
            font-weight:bold;
        }
        .discardButton{
            background-color: #A1318A;
            color: #FFFFFF;
            border-radius: 6px;
            box-shadow: 0 5px 5px #787878;
            width:10rem;
            height:auto;
            font-weight:bold;
            margin-left:1rem;
        }
    }
    
    .adminForm{
        margin-top:5rem;
        font-size:1.1rem;

        .nameInputsection{
            display:flex;
            flex-direction:column;
            margin-bottom:5rem;
            margin-left:5rem;
            
            .nameInputlabel{
                color:#350E7E;
                font-weight:bold;
            }

            #surveyname{
                width:30rem;
            }
        }
        .borderLine{
            margin:5rem 0;
        }
        .optionValue{
            display:flex;
            flex-direction:column;
            margin-left:5rem;

            .optionValuelabel{
                color:#350E7E;
                font-weight:bold;
                margin-bottom:1rem;
            }

            .optionValuediv{
                margin-left:5rem;
            }
            .optionValueleft{
                margin-left:1rem;
            }
        }

        .dateOption{
            margin-left:5rem;

            .date-paragraph{
                color:#350E7E;
                font-weight:bold;
                margin-bottom:1.8rem;
            }

            .startdateOption{
                display:flex;
                flex-direction:row;
                margin-left:5rem;

                p{
                    margin-right:1.9rem;
                }
                .calendarIcon{
                    font-size:1.6rem;
                    margin-left:1.8rem;
                }
            }
            .enddateOption{
                display:flex;
                flex-direction:row;
                margin-left:5rem;

                p{
                    margin-right:1rem;
                }

                .calendarIcon{
                    font-size:1.6rem;
                    margin-left:1.8rem;
                }
            }
        }
        .insertingQuestions{
            margin-left:5rem;

            .insertingQuestions-p{
                color:#350E7E;
                font-weight:bold;
                margin-bottom:1.8rem;
            }

            .questionsModify-div{
                display:flex;
                flex-direction:row;
                margin:1rem 0 1rem 5rem;

                .questionsModify-button{
                    background-color: #353535;
                    color: #FFFFFF;
                    border-radius: 10px;
                    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
                    height:auto;
                    font-weight:bold;

                    .iconButton-key {
                        margin-left:1rem;
                    }

                    &:hover {
                        background-color: darken(#353535, 5%);
                    }

                    &:focus {
                        background-color: darken(#353535, 10%);
                    }
                }
            }

            #insertedQuestionsview{
                background-color:#F9F9FB;
                border-radius: 10px;
                padding: 0 1rem 1rem 1rem;
                margin-right:5rem;
                margin-left:5rem;
                margin-bottom:2rem;
                transition: height 0.3s;

                .moreQuestions-button {
                    background-color: #353535;
                    color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
                    height:auto;
                    font-weight:bold;
                    margin-top: 1rem;
                    float: right;

                    .iconButton-plus{
                        margin-left:1rem;
                    }

                    &:hover {
                        background-color: darken(#353535, 5%)
                    }

                    &:focus {
                        background-color: darken(#353535, 10%)
                    }
                }

                .questionlistDiv{
                    .questionList{
                        .question-list  {
                            &-move {
                                transition: transform 0.4s;
                            }
                            &-enter {
                                opacity: 0;
                                transform: scale(0, 0);
                            }
                            &-enter-active {
                                transition: all 0.4s;
                            }
                            &-leave-to {
                                opacity: 0;
                                transform: scale(0, 0);
                            }
                            &-leave-active {
                                transition: all 0.4s;
                                position: absolute;
                            }
                        }

                        .questionCard {
                            border: 1px solid lightgrey;
                            border-radius: 10px;
                            background-color:#FFFFFF;
                            margin-top:1rem;
                            list-style-type:none;
                            word-wrap: normal;
                            font-size:1rem;

                            .questionNumber {
                                color: rgb(118, 118, 118);
                                position: absolute;
                                top: 0.9rem;
                                font-weight: bold;
                                right: 9rem;
                                user-select: none;
                            }
                            
                            .questionHelpText {
                                color: #6c757d;
                                margin-top: -0.375rem;
                                margin-bottom: 0;
                                line-height: 1.2;
                                min-height: 1.2rem;
                                font-weight: 500;
                                border-bottom: 1px solid white;
                                white-space: pre-wrap;

                                &[contenteditable="true"] {
                                    border-bottom: 1px dashed rgb(224, 224, 224);

                                    &:not(:focus):before {
                                        content:attr(data-placeholder);
                                        color:grey;
                                        font-weight: normal;
                                        position: absolute;
                                        pointer-events: none;
                                    }
                                }
                                
                            }

                            .questionDescription {
                                border-bottom: 1px solid white;
                                min-height: 1.5rem;
                                white-space: pre-wrap;
                                
                                &[contenteditable="true"] {
                                    border-bottom: 1px dashed rgb(224, 224, 224);

                                    &:not(:focus):before {
                                        content:attr(data-placeholder);
                                        color:grey;
                                        font-weight: normal;
                                        position: absolute;
                                        pointer-events: none;
                                    }
                                }

                                &[contenteditable="false"]:before {
                                    content:attr(data-placeholder);
                                    color: rgba(220, 20, 60, 1);
                                    font-weight: normal;
                                    position: absolute;
                                    pointer-events: none;
                                }
                            }

                            .questionTitle {
                                color:#350E7E;
                                line-height: 1.2;
                                min-height: 1.44rem;
                                font-size: 1.2rem;
                                font-weight:bold;
                                width: 70%;
                                border-bottom: 1px solid white;
                                white-space: pre-wrap;

                                &[contenteditable="true"] {
                                    border-bottom: 1px dashed rgb(224, 224, 224);

                                    &:not(:focus):before {
                                        content:attr(data-placeholder);
                                        color:grey;
                                        position: absolute;
                                        font-weight: normal;
                                        pointer-events: none;
                                    }
                                }

                                &[contenteditable="false"]:before {
                                    content:attr(data-placeholder);
                                    color: rgba(220, 20, 60, 1);
                                    font-weight: normal;
                                    position: absolute;
                                    pointer-events: none;
                                }

                            }

                            .questionButton {
                                all: unset;
                                line-height: 0;
                                color: rgb(118, 118, 118);
                                position: absolute;
                                top: 1rem;
                                transition: color 150ms;

                                &:hover, &:focus {
                                    color: #353535;
                                }

                                .icon {
                                    width: 1.2rem;
                                    height: 1.2rem;
                                }

                                &Delete {
                                    right: 1rem
                                }

                                &Second {
                                    right: 3rem;
                                }

                                &Third {
                                    right: 5rem;
                                }

                                &Fourth {
                                    right: 7rem;
                                }
                            }

                            .charLimits {
                                position: absolute;
                                bottom: 0;
                                right: 1rem;
                                display: grid;
                                grid-auto-flow: column;
                                grid-column-gap: 1rem;
                                font-size: 0.8rem;
                                color: rgb(118, 118, 118);
                            }
                        }
                    }
                }
            }
        }

        .adminaddEmail{
            margin-left:5rem;
            margin-right: 5rem;
            display:flex;
            flex-direction:column;

            .emailmain-Paragraph{
                color:#350E7E;
                font-weight:bold;
                margin-bottom:1.8rem;
            }

            .emailTop{
                display:flex;
                flex-direction:row;
                justify-content:space-between;
                margin-left:5rem;
                margin-bottom:1rem;

                p{
                    font-weight:bold;
                }

                .moreroundedButton{
                    margin-right:6rem;

                    .moreEmail-button{
                        width: fit-content;
                        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05);
                        margin-left:1rem;
                        text-align: left;

                        .iconmoreEmail{
                            margin-right:1rem;
                        }
                    }

                    .roundedButton{
                        border-radius: 50%;
                        margin:0 1rem;
                        background-color:#000000;
                        color:#FFFFFF;
                        font-weight:bold;

                    }
                }
            }
            .emailContent{
                background-color:#F9F9FB;
                padding:1rem;
                margin-right:5rem;
                margin-left:5rem;
                margin-bottom:2rem;
                border-radius: 15px;

                .emailcontentTop{
                    display:flex;
                    flex-direction:row;
                    justify-content:space-around;
                    margin-bottom:2rem;
                    justify-content: flex-start;

                    .writeinEmail{
                    }
                        
                    .insertemailButton{
                        background-color: #353535;
                        .moreemailPlus{
                            margin-left:1rem;
                        }
                    }
                }
                .emaillistDiv{
                    .emailList{
                        max-height: 50vh;
                        overflow-y: scroll;

                        li {
                            width: 350px;
                            margin-bottom: 1rem;
                            list-style: none;
                            display: flex;
                            justify-content: space-between;

                            .emailDiv {
                                display: flex;
                                position: relative;

                                svg {
                                    position: absolute;
                                    color: crimson;
                                    margin-left: -1rem;
                                    margin-top: 0.3rem;
                                }
                            }
                        }
                    }
                }
            }
            .putMessagediv{
                margin-left:3rem;
                margin-bottom:8rem;
                margin-right: 3rem;

                .putMessage{
                    background-color: #FFFFFF;
                    color: #000000;
                    border:1px solid lightgrey;
                    border-radius: 6px;
                    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05);
                    width:16rem;
                    height:auto;
                    margin-left:1.8rem;

                    .putMessageicon{
                        margin-right:1rem;
                    }
                }

                .writeMessage {
                    width: 100%;
                }
            }
        }
        .bottom-buttons{
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            margin:0 5rem 8rem 5rem;

            .savecontinueBottom{
                background-color: #353535;
                color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 5px 5px gray;
                width:18rem;
                height:auto;
                padding:1rem 0;
                font-weight:bold;
            }
            .sendsurveyButton{
                background-color:#350E7E;
                color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 5px 5px gray;
                width:16rem;
                height:auto;
                padding:1rem 0;
                font-weight:bold;

                .putMessageicon{
                    margin-left:1rem;
                }
            }
        }  
    }
}

@media only screen and (max-width: 1400px) {
    .rightsideCreate{
        width:100%;
        margin-bottom: 0;
    }
}

@media only screen and (max-width: 1000px) {
    #insertedQuestionsview{
        margin-left:0.1rem !important;
    }

    .emailTop {
        flex-direction: column !important;
    } 

    .questionsModify-div {
        margin-left: 0.1rem !important;
    }
    
    .emailContent{
        margin-left:0.1rem !important;
    }
}
</style>