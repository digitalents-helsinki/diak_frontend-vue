<template>
<div class="adminPage">
    <div class="menuContent">
        <div class="menuContentlogo">
            <div class="imagelocation">
                <img class="logoPlace" src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" >
            </div>
            <div class="nameemailLogout">
                <div class="adminnameemail">
                    <p class="namelocation"> {{ $t('message.adminName') }}</p>
                    <p class="emaillocation"> {{ $t('message.adminEmail') }}</p>
                </div>
                <div class="logoutDiv">
                    <button class="btn logoutButton">{{ $t('message.logoutButtontranslate') }}</button>
                </div>
            </div>
        </div>
        <div class="textIcons">
            <div class="icontextInquery">
                <img src="../images/note_add_24px_outlined.svg" alt="" />
                <button @click="activeComponent = 'adminCreate'" class="btn createSurveyopen" v-bind:class="classObjectcreate">{{ $t('message.surveyCreatebutton') }}</button>
            </div>
            <div class="icontextManage">
                <img src="../images/scatter_plot_24px_outlined.svg" alt="" />
                <button @click="activeComponent = 'adminManage'" class="btn manageSurveyopen" v-bind:class="classObjectmanage">{{ $t('message.manageSurveysbutton') }}</button>
            </div>
            <!--<div class="text-icons-content produce">
                <div class="producediv"> </div>
                <img src="../images/paste_24px_outlined.svg" alt="" />
                <button class="btn produceReport-open">{{ $t('message.produceReportbutton') }}</button>
            </div>-->
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
    },
    computed: {
        classObjectcreate: function () {
            return {
                'text-info': this.activeComponent === 'adminCreate'
            }
        },

        classObjectmanage: function () {
            return {
                'text-info': this.activeComponent === 'adminManage'
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.adminPage{
    background-color:#F9F9FB;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    font-family: Arial, Helvetica, sans-serif;
    font-style:normal;
    font-size: 1rem;

    .menuContent{
        background-color:#F9F9FB;
        width:100%; 
        
        .menuContentlogo{
            background-color:#35CDE6;
            width:100%;
            height:7rem; 
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            padding:1rem;
            
            .imagelocation{

                .logoPlace{
                    width:100%;
                    height:65px;
                    margin-top:0.1rem;
                }
            }   
            .nameemailLogout{
                display:flex;
                flex-direction:row;

                .adminnameemail{
                    margin-top:0.1rem;

                    .namelocation{
                        font-size:1.1rem;
                        color:#FFFFFF;
                        font-weight:bold;
                    }

                    .emaillocation{
                        font-size:0.875rem;
                        color:#FFFFFF;
                        font-weight:bold;
                    }
                }

                .logoutDiv{
                    margin-top:1rem;
                    margin-right:1rem;
                    margin-left:1rem;
                    
                    .logoutButton{
                        background-color: #A1318A;
                        color: #FFFFFF;
                        border-radius: 10px;
                        box-shadow: 0 5px 5px gray;
                        width:10rem;
                        height:2.5rem;
                        font-weight:bold;
                        margin-left:0.2rem;
                    }
                }
            }     
        }

        .textIcons {
            background-color: #FFFFFF;
            display: flex;
            flex-direction: row;
            justify-content:center;
            font-size:1rem;
            padding-top:1.8rem;
            padding-bottom:1.8rem;

            .icontextInquery {
                display: flex;
                flex-flow: row;
            
                img {
                    height: 25px;
                    flex-basis: 20%;
                    margin-left:0.2rem;
                    margin-top:0.5rem;
                }

                .createSurveyopen {
                    background-color: #353535;
                    color: #FFFFFF;
                    border-radius: 10px;
                    box-shadow: 0 5px 5px gray;
                    width:11.5rem;
                    height:2.5rem;
                    font-weight:bold;
                    margin-left:0.2rem;
                }
            }
            .icontextManage {
                display: flex;
                flex-flow: row;
                margin-left:1rem;

                img {
                    height: 25px;
                    flex-basis: 20%;
                    margin-left:0.2rem;
                    margin-top:0.5rem;
                }

                .manageSurveyopen {
                    background-color: #353535;
                    color: #FFFFFF;
                    border-radius: 10px;
                    box-shadow: 0 5px 5px gray;
                    width:11.5rem;
                    height:2.5rem;
                    font-weight:bold;
                    margin-left:0.2rem;
                }
            }
                /*.produceReport-open {
                    background-color: #353535;
                    color: #FFFFFF;
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
                }*/
        }
    }
}
</style>