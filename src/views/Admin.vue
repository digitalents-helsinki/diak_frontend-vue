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
                <div v-if="activeComponent === 'adminCreate'" class="inquerydiv"> </div>
                <img src="../images/note_add_24px_outlined.svg" alt="" />
                <button @click="activeComponent = 'adminCreate'" class="btn inquery-open">{{ $t('message.surveyCreatebutton') }}</button>
            </div>
            <div class="text-icons-content manage">
                <div v-if="activeComponent === 'adminManage'" class="managediv"> </div>
                <img src="../images/scatter_plot_24px_outlined.svg" alt="" />
                <button @click="activeComponent = 'adminManage'" class="btn manageSurveys-open">{{ $t('message.manageSurveysbutton') }}</button>
            </div>
            <div class="text-icons-content produce">
                <div class="producediv"> </div>
                <img src="../images/paste_24px_outlined.svg" alt="" />
                <button class="btn produceReport-open">{{ $t('message.produceReportbutton') }}</button>
            </div>
        </div>
    </div>
    <admin-create v-if="activeComponent === 'adminCreate'"/>
    <admin-manage v-if="activeComponent === 'adminManage'"/>
</div>
</template>
<script>
import AdminCreate from '@/components/AdminCreate.vue'
import AdminManage from '@/components/AdminManage.vue'

export default {
    name: 'admin',
    data() {
        return {
            activeComponent: 'adminCreate'
        }
    },
    components: {
        AdminCreate,
        AdminManage
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
        width:16%; 
        
        .leftSide-top{
            background-color:#35CDE6;
            width:100%;
            height:16rem; 
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
            align-items:center;
            box-shadow: 0 2px 2px lightgray;
            font-size:1rem;
            height:43vh;

            div {
                display: flex;
                flex-flow: row nowrap;
                display:flex;
                justify-content:flex-end;

                img {
                    height: 25px;
                    flex-basis: 20%;
                    margin-top:2.8rem;
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
                    margin-right:0.1rem;
                    margin-left:1rem;
                }
        
                .inquerydiv{
                    width:1rem;
                    height:2rem;
                    margin-left:-1rem;
                    margin-top:2.7rem;
                    background: #350E7E;
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
                    margin-right:0.1rem;
                    margin-left:1rem;
                }

                .managediv{
                    width:1rem;
                    height:2rem;
                    margin-left:-1rem;
                    margin-top:2.7rem;
                    background: #350E7E;
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
                    margin-right:0.1rem;
                    margin-left:1rem;
                }
    
                .producediv{
                    width:1rem;
                    height:2rem;
                    margin-left:-1rem;
                    margin-top:2.7rem; 
                }
            }
        }
    }
}

@media only screen and (max-width: 1450px) {
    .leftSide{
        width:25% !important;
    }

    .leftSide-top > p:nth-of-type(2) {
        margin-bottom:6rem;
    }
}

@media only screen and (max-width: 1024px) {
    .adminPage{
        display:flex;
        flex-direction:column;
        width:100%;
    }
    
    .leftSide{
        width:100% !important;
        display:flex;
        flex-direction:column;
        align-items:center;
    }

    .leftSide-top{
        height:13rem !important;
    }

    .leftSide-top > p:nth-of-type(1) {
            margin-top:1rem !important;
        }

    .text-icons{
        width:100% !important;
        display:flex !important;
        flex-direction:row !important;
        justify-content:center;
        height:auto !important;
        padding-bottom:2rem;
    }

    .managediv{
        margin-left:0rem !important;
    }

    .rightsideCreate{
        width:100% !important;
        margin:0 !important;
    }

    .rightsideManage{
        width:100% !important;
        margin:0 !important;
    }
}

/*@media only screen and (max-width: 767px) {
    .adminPage{
        display:flex !important;
        flex-direction:column !important;
    }
    .leftSide{
        width:100% !important;
        margin-bottom:1rem;
    }

}*/
</style>