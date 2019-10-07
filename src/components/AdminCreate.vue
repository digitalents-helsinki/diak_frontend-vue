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
                <input 
                id="surveyname"
                v-model="surveyName"
                type="text"
                name="forminputName"
                v-bind:placeholder="$t('message.namePlaceholder')"
                >
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
                    <p class=""> {{ $t('message.defaultQuestions') }} </p>
                    <button class="btn questionsModify-button">{{ $t('message.questionsModify') }}<font-awesome-icon icon="pencil-alt" class="iconButton-pencil"/></button>
                </div>
                <div id="insertedQuestionsview">
                    <div class="questionInsert">
                        <textarea 
                            v-model="question" 
                            rows="3"
                            v-bind:placeholder="$t('message.questionPlaceholder')"
                            class="writeinQuestion">
                        </textarea>
                    </div>
                    <div class="moreQuestions-div"> 
                        <p class=""> {{ $t('message.addQuestionsparagraph') }} </p>
                        <button  @click="addQuestion" class="btn moreQuestions-button">{{ $t('message.addQuestions') }}<font-awesome-icon icon="plus" class="iconButton-plus"/></button>
                        </div>
                    <div class="questionlistDiv">
                            <ul class="questionList">
                            <li v-for="(question, index) in questions" v-bind:key="index">
                                <div class="questionMention"><span class="questionTitle"> Question </span><button @click="removeQuestion(index)">X</button></div>
                                <span>{{question}}</span>
                            </li>
                        </ul>
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
                    <button class="btn putMessage"><font-awesome-icon icon="paperclip" class="putMessageicon"/>{{ $t('message.addMessage') }}</button>
                </div> 
                <div class="bottom-buttons">
                    <button class="btn savecontinueBottom">{{ $t('message.saveContinue') }}</button>
                    <button class="btn sendsurveyButton" @click="sendSurvey">{{ $t('message.sendSurvey') }}<font-awesome-icon icon="paper-plane" class="putMessageicon"/></button>
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
            question:null,
            emails: [],
            email: null,
            surveyName: null,
            surveyAnon: true,
            startDate: null,
            endDate: null
        }
    },
    components: {
        Datepicker
    },
    methods: {
        addQuestion() {
            this.$data.questions.push(this.$data.question)
            this.$data.question = null
        },
        removeQuestion(index) {
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
            if (this.$data.surveyName !== null) {
                axios({
                    method: "POST",
                    url: process.env.VUE_APP_BACKEND + "/survey/create",
                    data: { 
                        to: this.$data.emails, 
                        id: this.$data.surveyName, 
                        anon: this.$data.surveyAnon,
                        startDate: this.$data.startDate,
                        endDate: this.$data.endDate,
                        respondents_size: this.$data.emails.length
                    }
                })
                .then(res => {
                    this.$data.created = true
                })
            } else {
                console.log('error')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
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
                margin:5rem 0 1rem 5rem;

                .questionsModify-button{
                    background-color: #353535;
                    color: #FFFFFF;
                    border-radius: 10px;
                    box-shadow: 0 5px 5px gray;
                    width:10rem;
                    height:auto;
                    font-weight:bold;
                    margin-left:1.8rem;

                    .iconButton-pencil{
                        margin-left:1rem;
                    }
                }
            }

            #insertedQuestionsview{
                background-color:#F9F9FB;
                padding:1rem;
                margin-right:5rem;
                margin-left:5rem;
                margin-bottom:2rem;

                .questionInsert{
                    display:flex;
                    flex-direction:row;
                    justify-content:space-around;
                    margin-bottom:2rem;
                    background-color:#FFFFFF;
                    padding-top:1rem;
                    padding-bottom:1rem;

                    .writeinQuestion{
                        width:80rem;
                    }
                }
                .moreQuestions-div{
                    display:flex;
                    justify-content:flex-end;
                    margin:0rem 0 2rem 1rem;

                    .moreQuestions-button{
                        background-color: #353535;
                        color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 5px 5px gray;
                        width:10rem;
                        height:auto;
                        font-weight:bold;
                        margin-left:1.8rem;
                        
                        .iconButton-plus{
                            margin-left:1rem;
                        }
                    }
                }
                .questionlistDiv{
                    .questionList{
                        li{
                            width:96%;;
                            height:auto;
                            border: 1px solid lightgrey;
                            background-color:#FFFFFF;
                            margin:1rem 0;
                            padding:1rem;
                            list-style-type:none;
                            white-space: pre-wrap;
                            word-wrap:break-word;
                            font-size:1rem;

                            .questionMention{
                                margin-bottom:0.6rem;

                                .questionTitle{
                                    color:#350E7E;
                                    font-size:1rem;
                                    font-weight:bold;
                                    margin-bottom:0.1rem;
                                }
                            }
                        }
                    }
                }
            }
        }

        .adminaddEmail{
            margin-left:5rem;
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
    
    .emailContent{
        margin-left:0.1rem !important;
    }
}
</style>