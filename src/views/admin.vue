<template>
<div class="adminPage">
    <div class="leftSide">
        <div class="leftSide-top">
            <img class="diakLogo" src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" >
            <p> {{ $t('message.adminName') }}</p>
            <p> {{ $t('message.adminEmail') }}</p>
        </div>
        <div class="text-icons">
            <div class="text-icons-content inquery">
                <img src="../images/note_add_24px_outlined.svg" alt="" />
                <button class="btn inquery-open">{{ $t('message.newInquery') }}</button>
                <div class="inquerydiv"> </div>
            </div>
            <div class="text-icons-content manage">
                <img src="../images/scatter_plot_24px_outlined.svg" alt="" />
                <button class="btn manageSurveys-open">{{ $t('message.manageSurveys') }}</button>
                <div class="managediv"> </div>
            </div>
            <div class="text-icons-content produce">
                <img src="../images/paste_24px_outlined.svg" alt="" />
                <button class="btn produceReport-open">{{ $t('message.produceReport') }}</button>
                <div class="producediv"> </div>
            </div>
        </div>
    </div>
    <div class="rightSide  ">
        <div class="rightSide-top">
            <p>{{ $t('message.Survey') }}</p>
        </div>
        <div class="top-buttons">
            <button class="btn savecontinueButton">{{ $t('message.saveContinue') }}</button>
            <button class="btn discardButton">{{ $t('message.disCard') }}</button>
        </div>
        <div class="adminForm">
            <b-form-group  
                id="nameInput"
                class="nameInput-form"
                v-bind:label="$t('message.adminformName')"
                label-for="forminputName">
                <b-form-input
                    id="forminputName"
                    class="col-lg-8 col-xl-5"
                    v-model="form.name"
                    type="name"
                    v-bind:placeholder="$t('message.namePlaceholder')">
                </b-form-input>
            </b-form-group>
            <hr class="borderLine">
            <b-form-group 
                v-bind:label="$t('message.radioOption')"
                class="optionValue"
                >
                <b-form-radio v-model="authentication" name="choiceRadio" value="A" class="optionValue-form">{{ $t('message.authenticationRadio') }}</b-form-radio>
                <b-form-radio v-model="authentication" name="choiceRadio" value="B" class="optionValue-form">{{ $t('message.anonymousRadio') }}</b-form-radio>
            </b-form-group>
            <hr class="borderLine">
            <div class="dateOption">
                <p class="date-paragraph">{{ $t('message.dateParagraph') }}</p>
                <div class="startdateOption">
                    <p> {{ $t('message.startDate') }}</p>
                    <datepicker  :language="fi" :disabled-dates="disabledDates" v-bind:placeholder="$t('message.datePlaceholder')"></datepicker>
                    <div class="calendarIcon"><font-awesome-icon icon="calendar-alt"/></div>
                </div>
                <div class="enddateOption">
                    <p> {{ $t('message.endDate') }}</p>
                    <datepicker :language="fi" :disabled-dates="disabledDates" v-bind:placeholder="$t('message.datePlaceholder')"></datepicker>
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
                    <button class="btn sendsurveyButton">{{ $t('message.sendSurvey') }}<font-awesome-icon icon="paper-plane" class="putMessageicon"/></button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { fi } from 'vuejs-datepicker/dist/locale'

export default {
    name: 'Admin',
    data() {
        return {
            form: {
                name: '',
                authentication: ''
            },
            disabledDates: {
                to: new Date()
            },
            fi: fi,
            questions: [],
            question:null,
            emails: [],
            email: null
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
            this.$data.questions.pop(index)
        },
        addEmail() {
            this.$data.emails.push(this.$data.email)
            this.$data.email = null
        },
        removeEmail(index) {
            this.$data.emails.pop(index)
        }
    }
}
</script>
<style lang="scss" scoped>
.adminPage{
    background-color:#F9F9FB;
    width:100%;
    display: flex;
    flex-direction: row;
    font-size: 1rem;
    justify-content:center;
    font-family:Roboto, Arial;
    font-style:normal;

    .leftSide{
        background-color:#F9F9FB;
        width:16vw;
        
        .leftSide-top{
            background-color:#35CDE6;
            width:16vw;
            height:28vh; 
            display:flex;
            flex-direction:column;
            align-items:center;

            .diakLogo{
                width:67%;
                height:auto;
                margin-top:2rem;
            }
        }
        .leftSide-top > p {
            font-weight:bold;
            color:#FFFFFF;
            line-height:1.1rem;
        }

        .leftSide-top > p:nth-of-type(1) {
            margin-top:5rem;
            font-size:1.1em;
            padding-left:0.1rem;
        }

        .leftSide-top > p:nth-of-type(2) {
            font-size:0.875em;
            word-break: break-all;
            padding-left:0.1rem;
        }

        .text-icons {
            background-color: #FFFFFF;
            display: flex;
            flex-direction: column;
            box-shadow: 0 2px 2px lightgray;
            font-size:1rem;
            height:38vh;

            div {
                display: flex;
                flex-flow: row nowrap;

                img {
                    height: 25px;
                    flex-basis: 20%;
                    margin-top:2.8rem;
                    margin-left:2rem;
                }

                .inquery-open {
                    background-color: #353535;
                    color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 5px 5px gray;
                    width:11rem;
                    height:auto;
                    font-weight:bold;
                    margin-top:2.5rem;
                    margin-right:1rem;
                    margin-left:1rem;
                }
        
                .inquerydiv{
                    width:1rem;
                    height:2rem;
                    margin-left:0rem;
                    margin-top:2.7rem;
                }

                .manageSurveys-open {
                    background-color: #353535;
                    color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 5px 5px gray;
                    width:11rem;
                    height:auto;
                    font-weight:bold;
                    margin-top:2.5rem;
                    margin-right:1rem;
                    margin-left:1rem;
                }

                .managediv{
                    width:1rem;
                    height:2rem;
                    margin-left:0rem;
                    margin-top:2.7rem; 
                }

                .produceReport-open {
                    background-color: #353535;
                    color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 5px 5px gray;
                    width:11rem;
                    height:auto;
                    font-weight:bold;
                    margin-top:2.5rem;
                    margin-right:1rem;
                    margin-left:1rem;
                }
    
                .producediv{
                    width:1rem;
                    height:2rem;
                    margin-left:0rem;
                    margin-top:2.7rem; 
                }
            }
        }
    }
      
        .inquery-open:active + .inquerydiv{
            background-color::#350E7E;
        }
        .manageSurveys-open:active + .managediv{
            background-color::#350E7E;
        }
        .produceReport-open:active + .producediv{
            background-color::#350E7E;
        }

    .rightSide{
        background-color:#FFFFFF;
        width:81.8vw;
        margin:1rem 1rem 0rem 1rem;
     
        .rightSide-top{
            background-color:#350E7E;
            width:81.8vw;
            height: 8vh;
            font-size:1.1rem;
            font-weight:bold;
            color:white;
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
                color: #ffffff;
                border-radius: 6px;
                box-shadow: 0 5px 5px gray;
                width:18rem;
                height:auto;
                font-weight:bold;
            }
            .discardButton{
                background-color: #A1318A;
                color: #ffffff;
                border-radius: 6px;
                box-shadow: 0 5px 5px gray;
                width:10rem;
                height:auto;
                font-weight:bold;
                margin-left:1rem;
            }
        }
        
        .adminForm{
           margin-top:5rem;
           font-size:1.1em;

            .nameInput-form{
                color:#350E7E;
                font-weight:bold;
                margin-bottom:5rem;
                margin-left:5rem;
            }
            .borderLine{
                margin:5rem 0;
            }
            .optionValue{
                color:#350E7E;
                font-weight:bold;
                margin-left:5rem;

                .optionValue-form{
                    color:black;
                    margin-top:1rem;
                    margin-left:5rem;
                    font-weight: normal;
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
                        margin-right:1.8rem;
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
                        margin-right:1.1rem;
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
                        color: #ffffff;
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
                                width:100%;;
                                height:auto;
                                border: 1px solid lightgrey;
                                background-color:#FFFFFF;
                                margin:1rem 0;
                                padding:1rem 0;
                                list-style-type:none;
                                word-wrap:break-word;
                                font-size:1.1em;

                                .questionMention{
                                    margin-bottom:0.6rem;

                                    .questionTitle{
                                        color:#350E7E;
                                        font-size:1.1em;
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
    }
}

@media only screen and (max-width: 1450px) {
    .leftSide{
        width:25vw !important;
    }

    .leftSide-top{
        width:25vw  !important;
        height:26vh;          
    }

    .leftSide-top > p:nth-of-type(2) {
        margin-bottom:6rem;
    }

    .rightSide{
        width:72.8vw !important;
    }

    .rightSide-top{
        width:72.8vw !important;  
    }
}

@media only screen and (max-width: 1000px) {
    .leftSide{
        width:30vw !important;
    }

    .leftSide-top{
        width:30vw !important;
        height:26vh;          
    }

    .rightSide{
        width:67.8vw !important;
    }

    .rightSide-top{
        width:67.8vw !important;
    }

    .adminaddEmail{
        margin-left:0rem !important;
    }

    .emailContent{
        margin-right:0 !important;
        margin-left:0 !important;
        width:100%;
    }

    .emailTop{
        display:flex !important;
        flex-direction:column !important;
        align-items:flex-start;
    }
    .bottom-buttons{
       margin:0 1rem 8rem 1rem !important;
    }
    .savecontinueBottom{
        margin-right:1rem;
    }
}
@media only screen and (max-width: 767px) {
    .adminPage{
        display:flex !important;
        flex-direction:column !important;
    }
    .leftSide{
        width:100vw !important;
        height:72vh;
        margin-bottom:1rem;
    }

    .leftSide-top{
        width:100vw !important;
        height:38vh !important;
    }

    .rightSide{
        width:100vw !important;
    }

    .rightSide-top{
        width:100vw !important;
    }

}
</style>