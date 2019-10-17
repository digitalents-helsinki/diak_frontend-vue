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
                    name="forminputName"
                    v-bind:placeholder="$t('message.namePlaceholder')"
                />
            </div>
            <hr class="borderLine">
            <div class="optionValue">
                <label for="choiceRadio" class="optionValuelabel">{{ $t('message.radioOption') }}</label>
                <div class="optionValuediv"><input type="radio" v-model="surveyAnon" name="choiceRadio" value=true ><span class="optionValueleft">{{ $t('message.anonymousRadio') }}</span></div>
                <div class="optionValuediv"><input type="radio" v-model="surveyAnon" name="choiceRadio" value=false ><span class="optionValueleft">{{ $t('message.authenticationRadio') }}</span></div>
            </div>
            <hr class="borderLine">
            <div class="dateOption">
                <p class="date-paragraph">{{ $t('message.dateParagraph') }}</p>
                <div class="startdateOption">
                    <p> {{ $t('message.startDate') }}</p>
                    <datepicker v-model="startDate" :language="fi" :disabled-dates="disabledDates" v-bind:placeholder="$t('message.datePlaceholder')"></datepicker>
                    <div class="calendarIcon"><font-awesome-icon icon="calendar-alt"/></div>
                </div>
                <div class="enddateOption">
                    <p> {{ $t('message.endDate') }}</p>
                    <datepicker v-model="endDate" :language="fi" :disabled-dates="disabledDates" v-bind:placeholder="$t('message.datePlaceholder')"></datepicker>
                    <div class="calendarIcon"><font-awesome-icon icon="calendar-alt"/></div>
                </div>
            </div>
            <hr class="borderLine">
            <div class="insertingQuestions">
                <p class="insertingQuestions-p">{{ $t('message.questionsParagraph')}}</p>
                <div class="questionsModify-div"> 
                    <button @click="addDefaultQuestions" class="btn questionsModify-button">{{ $t('message.defaultQuestions') }}<font-awesome-icon icon="key" class="iconButton-key"/></button>
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
                                        v-editable="question.name ? $t(`message.${question.name}_title`) : question.title"
                                        v-bind:contenteditable="editIndex === index"
                                        spellcheck="false" 
                                        class="questionTitle"
                                        v-bind:data-placeholder="question.name ? '' : question.title ? '' : editIndex === index ? $t('message.questionTitlePlaceholder') : $t('message.questionTitlePlaceholder') + ' *'"
                                    />
                                    <b-card-text 
                                        v-on:input="saveQuestion($event, index, 'description')"
                                        v-on:click.prevent
                                        v-on:dblclick="editQuestion(index)"
                                        v-on:keydown.enter="lockQuestions()"
                                        v-editable="question.name ? $t(`message.question_base`) + $t(`message.question_${question.name}`) : question.description"
                                        v-bind:contenteditable="editIndex === index" 
                                        spellcheck="false" 
                                        class="questionDescription"
                                        v-bind:data-placeholder="question.name ? '' : question.description !== null ? '' : editIndex === index ? $t('message.questionDescriptionPlaceholder') : $t('message.questionDescriptionPlaceholder') + ' *'"
                                    >{{ }}</b-card-text>
                                    <b-card-text 
                                        v-on:input="saveQuestion($event, index, 'help')"
                                        v-on:click.prevent
                                        v-on:dblclick="editQuestion(index)"
                                        v-on:keydown.enter="lockQuestions()"
                                        v-editable="question.name ? $t(`message.help_text_${question.name}`) : question.help"
                                        v-bind:contenteditable="editIndex === index"
                                        spellcheck="false" 
                                        class="questionHelpText"
                                        v-bind:data-placeholder="question.help === null ? $t('message.questionHelpPlaceholder') : ''"
                                    >{{ }}</b-card-text>
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
                        <button class="btn moreEmail-button"><font-awesome-icon icon="users" class="iconmoreEmail"/>{{ $t('message.moreEmail') }}</button>
                        <button class="btn roundedButton"> ? </button>
                    </div>
                </div>
                <div class="emailContent">
                    <div class="emailcontentTop">
                        <input v-model="email" type="email" class="writeinEmail" v-bind:placeholder="$t('message.emailPlaceholder')"/>
                        <button @click="addEmail" class="insertemailButton">{{ $t('message.insertmoreEmail') }}<font-awesome-icon icon="plus" class="moreemailPlus"/></button>
                    </div>
                    <div class="emaillistDiv">
                        <ul class="emailList">
                            <li v-for="(email, index) in emails" v-bind:key="index">
                                <span>{{email}}</span><button @click="removeEmail(index)">X</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  class="putMessagediv">
                    <button v-if="!messageVisible" class="btn putMessage" @click="showMessage"><font-awesome-icon icon="paperclip" class="putMessageicon"/>{{ $t('message.addMessage') }}</button>
                    <input v-if="messageVisible" v-model="message" class="writeMessage" type="text" />
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
        <p>Kyselysi on luotu onnistuneesti</p>
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
                to: new Date()
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
            messageVisible: false
        }
    },
    computed: {
        formattedStartDate() {
            if (this.startDate) return new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate())
            else return null
        },
        formattedEndDate() {
            if (this.endDate) return new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), 23, 59, 59)
            else return null
        }
    },
    components: {
        Datepicker
    },
    methods: {
        addDefaultQuestions() {
            const defaultQuestions = [
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
            ];

            this.lockQuestions()

            if (defaultQuestions.every(defaultQuestion => this.$data.questions.some(question => question.name === defaultQuestion.name))) {
                //delete defaultquestions if all of them exist
                this.$data.questions = this.$data.questions.filter(question => !defaultQuestions.some(defaultQuestion => defaultQuestion.name === question.name))
            } else {
                //add nonexisting defaultquestions
                const filteredDefaultQuestions = defaultQuestions.filter(defaultQuestion => !this.$data.questions.some(question => question.name === defaultQuestion.name))
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
            this.$data.emails.push(this.$data.email)
            this.$data.email = null
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
                    url: process.env.VUE_APP_BACKEND + "/survey/create",
                    data: { 
                        to: this.$data.emails, 
                        id: this.$data.surveyName, 
                        anon: this.$data.surveyAnon,
                        startDate: this.formattedStartDate,
                        endDate: this.formattedEndDate,
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
                    this.$data.created = true
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
            const questionCardWidth = getComputedStyle(el).width

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
            //only updates if element is not focused (prevents caret from jumping around)
            bind(el, binding, vnode) {
                if (binding.value) el.textContent = binding.value
            },
            update(el, binding, vnode) {
                if (document.activeElement !== el && binding.value && binding.value !== binding.oldValue) {
                    el.textContent = binding.value
                }
            }
        }
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
    margin:1rem;
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
                                font-weight: 500;
                                border-bottom: 1px solid white;
                                outline: none;
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
                                outline: none;
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
                                font-size:1.2rem;
                                font-weight:bold;
                                width: 70%;
                                outline: none;
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
                        background-color: #FFFFFF;
                        color: #000000;
                        border:1px solid lightgrey;
                        border-radius: 10px;
                        width:16rem;
                        height:auto;
                        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05);
                        margin-left:1.8rem;

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
                border:1px solid #C0C0C0;

                .emailcontentTop{
                    display:flex;
                    flex-direction:row;
                    justify-content:space-around;
                    margin-bottom:2rem;
                    background-color:#FFFFFF;
                    padding-top:1rem;
                    padding-bottom:1rem;

                    .writeinEmail{
                        width:25rem;
                    }
                        
                    .insertemailButton{
                        .moreemailPlus{
                            margin-left:1rem;
                        }
                    }
                }
                .emaillistDiv{
                    .emailList{
                        li {
                            width: 350px;
                            padding: 15px 0;
                            list-style: none;
                            display: flex;
                            justify-content: space-between;
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
    }
}

@media only screen and (max-width: 1000px) {
    #insertedQuestionsview{
        margin-left:0.1rem !important;
    }

    .questionsModify-div {
        margin-left: 0.1rem !important;
    }
    
    .emailContent{
        margin-left:0.1rem !important;
    }
}
</style>