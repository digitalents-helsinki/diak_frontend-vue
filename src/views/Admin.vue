<template>
<div class="adminPage">
    <div class="menuContent shadow-sm">
        <div class="menuContentlogo">
            <div class="imagelocation">
                <img class="logoPlace" src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" >
            </div>
            <div class="dropdownmenu">
                <b-dropdown right variant="light" :text="this.$store.state.user.authUser.personalInfo.name || this.$store.state.authentication.email">
                    <b-dropdown-item @click.prevent="$router.push({name: 'user'})">{{ $t('message.userInterFaceLink') }}</b-dropdown-item>
                    <b-dropdown-item @click.prevent="signOut">{{ $t('message.logoutButtontranslate') }}</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
        <div class="textIcons">
            <div class="icontextInquery">
                <img src="../images/note_add_24px_outlined.svg" alt="" />
                <button @click="changeActiveComponent('adminCreate')" class="btn createSurveyopen" v-activeLink:adminCreate>{{ $t('message.surveyCreatebutton') }}</button>
            </div>
            <div class="icontextManage">
                <img src="../images/scatter_plot_24px_outlined.svg" alt="" />
                <button @click="changeActiveComponent('adminManage')" class="btn manageSurveyopen" v-activeLink:adminManage>{{ $t('message.manageSurveysbutton') }}</button>
            </div>
        </div>
    </div>
    <component :is="activeComponent" v-on:changeActiveComponent="changeActiveComponent($event)"/>
    <b-modal 
        id="leaveModal"
        @ok="navigateOutOfSurveyFinalization"
        :title="$t('message.leaveSurvey')"
    >
        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button @click="cancel()">{{$t('message.modifySurveyCancel')}}</b-button>
            <b-button @click="ok()" class="leaveModalButton">{{$t('message.leave')}}</b-button>
        </template>
        {{$t('message.leaveSurveyConfirmation')}}
    </b-modal>
</div>
</template>
<script>
import AdminCreate from '@/components/AdminCreate.vue'
import AdminManage from '@/components/AdminManage.vue'

export default {
    name: 'admin',
    data() {
        return {
            activeComponent: 'adminManage',
            cachedActiveComponent: null
        }
    },
    components: {
        AdminCreate,
        AdminManage
    },
    methods: {
        changeActiveComponent(component) {
            if (component === 'adminFinalize') {
                this.activeComponent = 'adminCreate'
            } else if (this.$store.state.admin.finalizationSurveyId) {
                this.cachedActiveComponent = component
                this.$bvModal.show('leaveModal')
            } else {
                this.activeComponent = component
            }
        },
        navigateOutOfSurveyFinalization() {
            this.$store.commit('admin/setFinalizationSurveyId')
            this.$store.commit('admin/setSurveyBeingCreated')
            this.activeComponent = this.cachedActiveComponent
        },
        signOut() {
            this.$store.dispatch('logout')
            this.$router.push({ path: '/' })
        }   
    },
    directives: {
        activeLink: {
            inserted(el, binding, vnode) {
                if (vnode.context.activeComponent === binding.arg && !vnode.context.$store.state.admin.finalizationSurveyId) el.classList.add('active-link')
            },
            update(el, binding, vnode) {
                if (vnode.context.activeComponent === binding.arg && !vnode.context.$store.state.admin.finalizationSurveyId) el.classList.add('active-link')
                else el.classList.remove('active-link')
            }
        }
    }
}
</script>
<style lang="scss">
.leaveModalButton {
    background-color: #A1318A;
    border-color: #A1318A;

    &:hover {
        background-color: darken(#A1318A, 5%);
        border-color: #A1318A;
    }

    &:active {
        background-color: darken(#A1318A, 10%) !important;
        border-color: #A1318A !important;
    }

    &:focus {
        box-shadow: 0 0 0 0.2rem rgba(161, 49, 139, 0.5);
    }

}
</style>
<style lang="scss" scoped>

.active-link {
    color: #35CDE6 !important;
}

.adminPage{
    background-color:#F9F9FB;
    width:100%;
    min-height: 100%;
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
            .dropdownmenu{
                margin-top:1rem;
                margin-right:5rem;
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
                    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
                    height:2.5rem;
                    font-weight:bold;
                    margin-left:0.2rem;
                    white-space: nowrap;

                    &:hover {
                        background-color: darken(#353535, 5%);
                    }

                    &:focus {
                        background-color: darken(#353535, 10%);
                    }
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
                    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
                    height:2.5rem;
                    font-weight:bold;
                    margin-left:0.2rem;

                    &:hover {
                        background-color: darken(#353535, 5%);
                    }

                    &:focus {
                        background-color: darken(#353535, 10%);
                    }
                }
            }
        }
    }
}
</style>