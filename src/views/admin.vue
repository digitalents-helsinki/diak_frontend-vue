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
            <p>{{ $t('message.Inquiry') }}</p>
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
                <div id="insertedQuestionsview">  </div>
                <div class="moreQuestions-div"> 
                    <p class=""> {{ $t('message.moreQuestionsparagraph') }} </p>
                    <button class="btn moreQuestions-button">{{ $t('message.moreQuestions') }}<font-awesome-icon icon="plus" class="iconButton-plus"/></button>
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
            emails: [],
            email: null
        }
    },
    components: {
        Datepicker
    },
    methods: {
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
    height: 100%;
    display: -webkit-flex; 
    display: flex;
    flex-direction: row;
    font-size: 1rem;
    justify-content:center;
    font-family:Roboto;
    font-style:normal;

    .leftSide{
        background-color:#F9F9FB;
        width:16vw;
        height: 100vh;
        
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
                    border-radius: 10px;
                    box-shadow: 0 5px 5px gray;
                    height:auto;
                    background-color: #353535;
                    color: #ffffff;
                    font-weight:bold;
                    width:11rem;
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
                    border-radius: 10px;
                    box-shadow: 0 5px 5px gray;
                    height:auto;
                    background-color: #353535;
                    color: #ffffff;
                    font-weight:bold;
                    width:11rem;
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
                    border-radius: 10px;
                    box-shadow: 0 5px 5px gray;
                    height:auto;
                    background-color: #353535;
                    color: #ffffff;
                    font-weight:bold;
                    width:11rem;
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
                border-radius: 6px;
                box-shadow: 0 5px 5px gray;
                height:auto;
                background-color: #353535;
                color: #ffffff;
                font-weight:bold;
                width:18rem;
                height:auto;
                
            }
            .discardButton{
                border-radius: 6px;
                box-shadow: 0 5px 5px gray;
                height:auto;
                background-color: #A1318A;
                color: #ffffff;
                font-weight:bold;
                width:10rem;
                height:auto;
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
                    margin:5rem 0 5rem 5rem;

                    .questionsModify-button{
                        border-radius: 10px;
                        box-shadow: 0 5px 5px gray;
                        height:auto;
                        background-color: #353535;
                        color: #ffffff;
                        font-weight:bold;
                        width:10rem;
                        margin-left:1.8rem;

                        .iconButton-pencil{
                            margin-left:1rem;
                        }
                    }
                }

                #insertedQuestionsview{
                    border:1px solid lightgrey;
                    padding:1rem;
                }

                .moreQuestions-div{
                    display:flex;
                    flex-direction:row;
                    margin:5rem 0 5rem 5rem;

                    .moreQuestions-button{
                        border-radius: 10px;
                        box-shadow: 0 5px 5px gray;
                        height:auto;
                        background-color: #353535;
                        color: #ffffff;
                        font-weight:bold;
                        width:10rem;
                        margin-left:1.8rem;
                        
                        .iconButton-plus{
                            margin-left:1rem;
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
                            border-radius: 10px;
                            box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05);
                            height:auto;
                            background-color: #FFFFFF;
                            color: #000000;
                            width:16rem;
                            margin-left:1.8rem;
                            border:1px solid lightgrey;

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
            }
        }
    }
}

@media only screen and (max-width: 1450px) {
    .leftSide{
        width:25vw !important;
        height: 100vh;
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
        height: 100vh !important;
    }

    .rightSide-top{
        width:72.8vw !important;  
    }
}

@media only screen and (max-width: 1000px) {
    .leftSide{
        width:30vw !important;
        height: 100vh;
    }

    .leftSide-top{
        width:30vw !important;
        height:26vh;          
    }

    .rightSide{
        width:67.8vw !important;
        height: 100vh;
    }

    .rightSide-top{
        width:67.8vw !important;
        height: 100vh;
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
}

</style>