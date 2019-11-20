<template>
  <div class="rightsideManage">
    <div class="rightsideManage-top">
      <p>{{ $t('message.manageSurveys') }}</p>
    </div>
    <div class="totalinstructionsearch">
      <div class="totalParagraph">
        <p>{{ `${$t('message.total')} ${surveys.length}`}}</p>
      </div>
      <div class="manageInstructions">
        <div class="instructiondivone">
          <p class="divoneHeading">{{ $t('message.instructionsHeading') }} </p>
          <p class="divoneParagraph">{{ $t('message.InstructionPone') }} </p>
          <p class="divoneParagraph">{{ $t('message.InstructionPtwo') }} </p>
          <p class="divoneParagraph">{{ $t('message.InstructionPthree') }} </p>
        </div>
        <div class="arrowbetweendivs">
          <font-awesome-icon icon="arrow-right" style="font-size:1.8rem;"/>
        </div>
        <div class="instructiondivtwo">
          <p class="divtwoHeading">{{ $t('message.reportHeading') }} </p>
          <p class="divtwoParagraph">{{ $t('message.reportParagraph') }} </p>
          <div class="reportimageButton"><img src="../images/assessment_24px.png" alt="" style="width:25px; height:25px;"/></div>
        </div>
      </div>
      <div class="searchbar-div">
        <p class="paragraphTop">{{ $t('message.searchParagraph') }}</p>
        <b-input-group size="md" class="search-bar">
          <span> <font-awesome-icon icon="search" class="iconsearch"/> </span>
          <b-form-input v-model="searchTerm" v-bind:placeholder="$t('message.searchPlaceholder')"></b-form-input>
        </b-input-group>
      </div>
    </div>
    <div class="tableandfilter">
      <div class="buttonstotal">
        <b-dropdown id="dropdownleft" variant="secondary" :text="$t(`message.${display}Button`)" class="m-md-2 dropdownButtonsleft">
          <b-dropdown-item @click="toggleDisplay('all')">{{$t('message.allButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('anonymous')">{{$t('message.anonymousButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('authenticated')">{{$t('message.authenticatedButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('active')">{{$t('message.activeButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('inactive')">{{$t('message.inactiveButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('starting')">{{$t('message.startingButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('ended')">{{$t('message.endedButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('archived')">{{$t('message.archivedButton')}}</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="tableDisplayfields">
      <b-table hover responsive :items="displayedSurveys" :fields="fields" bordered head-variant="light" style="text-align: center">
        <template v-for="(field, index) in fields" :slot="field.key" slot-scope="data">
          <div v-bind:key="field.key">
            <div v-if="field.colType === 'name'">
              <span v-if="data.item.name.length <= 20">{{data.item.name}}</span>
              <span v-else v-b-tooltip="data.item.name" tabindex="0">{{data.item.name.substring(0, 17) + '...'}}</span>
            </div>
            <div v-else-if="field.colType === 'startDate'">
              <span v-if="data.item.startDate">{{data.item.startDate | moment('DD/MM/YYYY')}}</span>
              <span v-else>-</span>
            </div>
            <div v-else-if="field.colType === 'endDate'">
              <span v-if="data.item.endDate">{{data.item.endDate | moment('DD/MM/YYYY')}}</span>
              <span v-else>-</span>
            </div>
            <div v-else-if="field.colType === 'respondentsSize'">
              <span>{{data.item.responses || 0}}/{{data.item.respondents_size}}</span>
            </div>
            <div v-else-if="field.colType === 'analyze'">
              <button @click="openSurveyResults(data.item.surveyId)"><img src="../images/assessment_24px.png" alt="chart" style="width:25px; height:25px;"/></button>
            </div>
            <div v-else-if="field.colType === 'actions'">
              <button @click="modifySurvey(data.item.surveyId)"><font-awesome-icon icon="pencil-alt" style="font-size:1.6rem;"/></button>
              <button @click="archiveSurvey(data.item.surveyId)" :disabled="data.item.archived"><font-awesome-icon :icon="data.item.archived ? 'folder' : 'folder-plus'" style="font-size:1.6rem; color:grey;"/></button>
              <button class="iconButton-times" @click="deleteSurvey(data.item.surveyId)"> <font-awesome-icon icon="times" style="font-size:1.6rem; color:#FF0000;"/> </button>
            </div>
          </div>
        </template>
      </b-table>
    </div>
    <b-modal
      id="modifySurveyModal"
      :title="$t('message.modifySurveyHeader')"
      ref="modifySurveyModal"
      v-model="modifySurveyBoolean"
      @ok="handleModifySurveyModal"
    >
      <form>
        <b-form-group
          :label="$t('message.modifySurveyTitle')"
        >
          <b-form-input
            id="surveyNameInput"
            v-model="modify.surveyName"
            required
          />
        </b-form-group>
        <b-form-group
          :label="$t('message.modifySurveyEndDate')"
        >
          <datepicker v-model="modify.surveyEndDate" :language="modify.fi" :monday-first="true" :disabled-dates="modify.disabledDates" v-bind:placeholder="$t('message.datePlaceholder')"></datepicker>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            v-model="modify.surveyActivity"
            switch
          >
            {{$t('message.modifySurveyActivity')}}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          :label="$t('message.modifySurveyRespondents')"
          style="margin-bottom: 0;"
        >
        <b-input-group>
          <b-input
            :placeholder="$t('message.modifySurveyAddRespondent')"
            v-model="modify.currentRespondent"
          />
          <b-input-group-append>
            <b-button @click="addRespondent" class="addRespondentButton">{{$t('message.insertmoreEmail')}}<font-awesome-icon icon="plus"></font-awesome-icon></b-button>
          </b-input-group-append>
        </b-input-group>
        <ul class="respondentList" v-if="modify.surveyRespondents.length">
          <li v-for="(respondent, index) in modify.surveyRespondents" v-bind:key="index" :style="modify.surveyAnonymity ? 'padding-left: 0;' : 'padding-left: 1rem;'">
            <div class="respondentDiv">
              <p>{{respondent}}</p>
              <font-awesome-icon v-if="!modify.surveyAnonymity" @click="removeRespondent(index)" icon="times"/>
            </div>
          </li>
        </ul>
        </b-form-group>
      </form>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="cancel()">{{$t('message.modifySurveyCancel')}}</b-button>
        <b-button @click="ok()" variant="primary" :disabled="!modify.surveyName">{{$t('message.modifySurveySubmit')}}</b-button>
      </template>
    </b-modal>
    <b-modal
      :title="'Arkistoi kysely'"
      ref="archiveSurveyModal"
      v-model="archiveSurveyBoolean"
      @ok="handleArchiveSurveyModal"
    >
      <b-form-group :label="$t('message.archiveSurveyUndoText')">
        <b-input v-model="archive.inputSurveyName" :placeholder="$t('message.writeSurveyName')"/>
      </b-form-group>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="cancel()">{{$t('message.modifySurveyCancel')}}</b-button>
        <b-button @click="ok()" variant="primary" :disabled="archive.surveyName !== archive.inputSurveyName">{{$t('message.archiveSurveySubmit')}}</b-button>
      </template>
    </b-modal>
    <b-modal
      :title="$t('message.deleteSurveyHeader')"
      ref="deleteSurveyModal"
      v-model="deleteSurveyBoolean"
      @ok="handleDeleteSurveyModal"
    >
      <b-form-group :label="$t('message.deleteSurveyUndoText')">
        <b-input v-model="del.inputSurveyName" :placeholder="$t('message.writeSurveyName')"/>
      </b-form-group>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="cancel()">{{$t('message.modifySurveyCancel')}}</b-button>
        <b-button @click="ok()" variant="danger" :disabled="del.surveyName !== del.inputSurveyName">{{$t('message.deleteSurveySubmit')}}</b-button>
      </template>
    </b-modal>
    <transition name="slide" mode="in-out">
      <SurveyResults
        v-if="surveyResultsId"
        v-on:closeResults="surveyResultsId = null"
        v-bind:surveyId="surveyResultsId" 
        v-bind:surveyName="surveys.find(survey => survey.surveyId === surveyResultsId).name"
      />
    </transition>
    <transition name="fade" mode="in-out">
      <div v-if="surveyResultsId" @click="surveyResultsId = null" class="dark"></div>
    </transition>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { fi } from 'vuejs-datepicker/dist/locale'
import axios from 'axios'
import SurveyResults from './SurveyResults'
import store from '@/store'

export default {
  name: 'admin-manage',
  components: {
    SurveyResults,
    Datepicker
  },
  data() {
    return {
        fields: [
          {
            key: 'name',
            label: 'Kyselyn nimi',
            sortable: true,
            colType: 'name'
          },
          {
            key: 'startDate',
            label: 'Voimassaolo alkaa',
            sortable: true,
            colType: 'startDate'
          },
          {
            key: 'endDate',
            label: 'Voimassaolo päättyy',
            sortable: true,
            colType: 'endDate'
          },
          {
            key: 'respondents',
            label: 'Vastanneita',
            colType: 'respondentsSize'
          },
          {
            key: 'analyze',
            label: 'Raportti',
            colType: 'analyze'
          },
          {
            key: 'actions',
            label: 'Toiminnot',
            colType: 'actions'
          }
        ],
        surveys: [],
        searchTerm: null,
        surveyResultsId: null,
        modify: {
          surveyId: null,
          surveyName: null,
          surveyEndDate: null,
          surveyActivity: null,
          surveyRespondents: [],
          currentRespondent: null,
          fi: fi,
          disabledDates: {
            to: (d => new Date(d.setDate(d.getDate() - 1)))(new Date())
          },
        },
        archive: {
          surveyId: null,
          surveyName: null,
          inputSurveyName: null
        },
        del: {
          surveyId: null,
          surveyName: null,
          inputSurveyName: null
        },
        display: "all",
        loaded: false
    }
  },
  computed: {
    displayedSurveys() {
      let displayedSurveys = this.$data.surveys
      if (this.searchTerm) {
        displayedSurveys = displayedSurveys.filter(obj => obj.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      }

      switch(this.display) {
        case 'anonymous': 
          displayedSurveys = displayedSurveys.filter(obj => obj.anon)
          break
        case 'authenticated':
          displayedSurveys = displayedSurveys.filter(obj => !obj.anon)
          break
        case 'active':
          displayedSurveys = displayedSurveys.filter(obj => {
            if (obj.startDate !== null && Date.now() < new Date(obj.startDate).getTime()) return false
            else if (obj.endDate !== null && new Date(obj.endDate).getTime() < Date.now()) return false
            else if (!obj.active || obj.archived) return false
            else return true
          })
          break
        case 'inactive':
          displayedSurveys = displayedSurveys.filter(obj => {
            if (!obj.active || obj.archived) return true
            else if (obj.startDate !== null && new Date(obj.startDate).getTime() < Date.now()) return true
            else if (obj.endDate !== null && Date.now() < new Date(obj.endDate).getTime()) return true
            else return false
          })
          break
        case 'starting':
          displayedSurveys = displayedSurveys.filter(obj => obj.startDate !== null && Date.now() < new Date(obj.startDate).getTime())
          break
        case 'ended':
          displayedSurveys = displayedSurveys.filter(obj => obj.endDate !== null && new Date(obj.endDate).getTime() < Date.now())
          break
        case "archived":
          displayedSurveys = displayedSurveys.filter(obj => obj.archived)
          break
      }
      return displayedSurveys
    },
    modifySurveyBoolean: {
      get: function() {
        return !!this.modify.surveyId
      },
      set: function() {
        if (this.modify.surveyId) {
          this.modify.surveyId = null
        }
      }
    },
    archiveSurveyBoolean: {
      get: function() {
        return !!this.archive.surveyId
      },
      set: function() {
        if (this.archive.surveyId) {
          this.archive.surveyId = null
        }
      }
    },
    deleteSurveyBoolean: {
      get: function() {
        return !!this.del.surveyId
      },
      set: function() {
        if (this.del.surveyId) {
          this.del.surveyId = null
        }
      }
    }
  },
  methods: {
    async getSurveys() {
      const res = await axios.get(process.env.VUE_APP_BACKEND + "/survey/" + store.state.auth.userId)
      this.$data.surveys = res.data
      this.$data.loaded = true
    },
    updateSurvey(updatedSurvey) {
      const index = this.surveys.findIndex(survey => survey.surveyId === updatedSurvey.surveyId)
      if (~index) this.surveys.splice(index, 1, updatedSurvey)
    },
    deleteSurvey(surveyId) {
      if (!this.del.surveyId) {
        const survey = this.surveys.find(survey => survey.surveyId === surveyId)
        this.del.surveyId = surveyId
        this.del.surveyName = survey.name
        this.del.inputSurveyName = null
      }
    },
    handleDeleteSurveyModal(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.del.surveyName === this.del.inputSurveyName) {
        axios({
          method: "POST",
          url: process.env.VUE_APP_BACKEND + "/survey/delete",
          data: {
            id: this.del.surveyId
          }
        }).then(res => {
          if (res.data === "Survey deleted succesfully") {
            const index = this.surveys.findIndex(survey => survey.surveyId === this.del.surveyId)
            if (~index) this.surveys.splice(index, 1)
            this.$nextTick(() => this.$refs.deleteSurveyModal.hide())
          }
        })
      }
    },
    archiveSurvey(surveyId) {
      if (!this.archive.surveyId) {
        const survey = this.surveys.find(survey => survey.surveyId === surveyId)
        this.archive.surveyId = surveyId
        this.archive.surveyName = survey.name
        this.archive.inputSurveyName = null
      }
    },
    handleArchiveSurveyModal(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.archive.surveyName === this.archive.inputSurveyName) {
        axios({
          method: "POST",
          url: process.env.VUE_APP_BACKEND + "/survey/archive",
          data: {
            id: this.archive.surveyId
          }
        }).then(res => {
          if (res.data === "Survey archived succesfully") {
            this.surveys.find(survey => survey.surveyId === this.archive.surveyId).archived = true
            this.$nextTick(() => this.$refs.archiveSurveyModal.hide())
          }
        })
      }
    },
    modifySurvey(surveyId) {
      if (!this.modify.surveyId) {
        const survey = this.surveys.find(survey => survey.surveyId === surveyId)
        this.modify.surveyId = surveyId
        this.modify.surveyAnonymity = survey.anon
        this.modify.surveyName = survey.name
        this.modify.surveyEndDate = survey.endDate
        this.modify.surveyActivity = survey.active
        if (!survey.anon) this.modify.surveyRespondents = survey.UserGroup.Users.reduce((arr, user) => [...arr, user.email], [])
        else this.modify.surveyRespondents = survey.UserGroup.respondents
      }
    },
    addRespondent() {
      if (!this.surveys.find(survey => survey.surveyId === this.modify.surveyId).UserGroup.respondents.includes(this.modify.currentRespondent) && 
          !this.modify.surveyRespondents.includes(this.modify.currentRespondent) &&
          this.modify.currentRespondent) {
            this.modify.surveyRespondents.push(this.modify.currentRespondent)
            this.modify.currentRespondent = null
      }
    },
    removeRespondent(index) {
      this.modify.surveyRespondents.splice(index, 1)
    },
    handleModifySurveyModal(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.modify.surveyId && this.modify.surveyName) {
        axios({
          method: "POST",
          url: process.env.VUE_APP_BACKEND + "/survey/update",
          data: {
            surveyId: this.modify.surveyId,
            name: this.modify.surveyName,
            endDate: this.modify.surveyEndDate,
            active: this.modify.surveyActivity,
            to: this.modify.surveyRespondents
          }
        })
        .then(res => {
          if (res.data === "Survey update failed") return
          this.updateSurvey(res.data)
          this.$nextTick(() => this.$refs.modifySurveyModal.hide())
        })
      }
    },
    openSurveyResults(surveyId) {
      if (this.surveyResultsId !== null && this.surveyResultsId !== surveyId) {
        this.surveyResultsId = null
        setTimeout(() => this.surveyResultsId = surveyId) //trigger component reload
      } else if (this.surveyResultsId === null) {
        this.surveyResultsId = surveyId
      } else {
        this.surveyResultsId = null
      }
    },
    toggleDisplay(category) {
      this.display = category
    }
  },
  created() {
    this.getSurveys()
  }
}  
</script>
<style lang="scss" scoped>

#modifySurveyModal {
  .addRespondentButton {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;

    svg {
      margin-left: 0.5rem;
    }
  }

  .respondentList {
    max-height: 38vh;
    overflow-y: scroll;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    padding: 0.7rem 1rem 0 1rem;

    li {
      width: 100%;
      list-style: none;

      .respondentDiv {
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

.rightsideManage{
    background-color:#F9F9FB;
    width:80%;
    margin: 1rem;
    box-shadow: 0 5px 5px #787878;

    .slide {
      &-enter {
        transform: translateY(30vh);
        opacity: 0;

        &-to {
          transform: translateY(0);
          opacity: 1;
        }

        &-active {
          transition-duration: 0.2s;
          transition-property: transform, opacity;
        }
      }

      &-leave {
        transform: translateY(0);
        opacity: 1;

        &-to {
          transform: translateY(30vh);
          opacity: 0;
        }

        &-active {
          transition-duration: 0.2s;
          transition-property: transform, opacity;
        }
      }
    }

    .fade {
      &-enter {
        opacity: 0;

        &-to {
          opacity: 1;
        }

        &-active {
          transition: opacity 0.2s;
        }
      }

      &-leave {
        opacity: 1;

        &-to {
          opacity: 0;
        }

        &-active {
          transition: opacity 0.2s;
        }
      }
    }

    .rightsideManage-top{
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
    }

    .totalinstructionsearch{
      background-color:#FFFFFF;
      width:100%;
      padding-top:1rem;
      padding-bottom:1rem;

      .totalParagraph{
        font-size:1rem;
        color:#787878;
        margin-left:1rem;
        margin-bottom:1.8rem;
        }
      
      .manageInstructions{
        display:flex;
        flex-direction:row;
        margin-right:1rem;
        margin-bottom:1.8rem;
        margin-left:1rem;
      
        .instructiondivone{
          border:1px solid #787878;
          padding:1rem 1.8rem;
          margin-right:1rem;
          font-size:1rem;

          .divoneHeading{
            font-size:1.1rem;
            font-weight:bold;

          }
          .divoneParagraph{
            font-size:1.1rem;
            margin-left:1rem;
          }
        }

        .arrowbetweendivs{
          padding:1rem;
          margin-right:1rem;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .instructiondivtwo{
          border:1px solid grey;
          padding:1rem;
          display:flex;
          flex-direction:column;
          align-items:center;

          .divtwoHeading{
            font-size:1.1rem;
            font-weight:bold;
          }

          .divtwoParagraph{
            background-color:lightgrey;
            width:8rem;
            font-size:1.1rem;
            font-weight:bold;
            text-align:center;
            padding:0.1rem;
          }
        }
      }

      .searchbar-div{
        margin:1rem;
        margin-left:1rem;

        .paragraphTop{
          font-size:1.6em;
          font-weight:bold;
        }
        .search-bar{
          width:50%;
          
          .iconsearch{
            font-size:2rem;
            color:#787878;
            margin-right:1rem;
          }
        }
      }
    }
    .tableandfilter{
      display:flex;
      flex-direction:column;
      padding:1rem;

      .buttonstotal{
        display:flex;
        flex-direction:row;

        .buttonRight{
          color: #ffffff;
          border-radius: 5px;
          padding-right:0.7rem;
          padding-left:0.7rem;
          height:auto;
          margin-top:0.5rem;
          margin-left:1.8rem;
        }
      }
      
      .tableDisplayfields{
        background-color:#FFFFFF;

        .iconButton-times{
          margin-left:0.5rem;
        }
      }  
    }

  .dark {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}

.surveyList {
  div {
    display: flex;
    width: 100%;
    padding: 15px;
    justify-content: space-between;
  }
}
@media only screen and (max-width: 1400px) {
    .rightsideManage{
      width:100%;
      margin-bottom: 0;
    }
}
</style>

