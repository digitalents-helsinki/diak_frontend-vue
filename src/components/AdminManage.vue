<template>
  <div class="rightsideManage">
    <div class="rightsideManage-top">
      <p>{{ $t('message.manageSurveys') }}</p>
    </div>
    <div class="totalinstructionsearch shadow-sm">
      <div class="totalSurveysContainer">
        <p class="totalParagraph">{{ `${$t('message.total')}: ${surveys.length}`}}</p>
        <font-awesome-icon @click="showTotalDetailed = !showTotalDetailed" :icon="showTotalDetailed ? 'chevron-left' : 'chevron-right'" class="chevron"/>
        <transition name="slider-width">
          <div v-if="showTotalDetailed" class="moreDetailsContainer">
            <p class="totalParagraph">{{ `Käynnissä: ${filteredSurveys.active.length}` }}</p>
            <p class="totalParagraph">{{ `Tulossa: ${filteredSurveys.starting.length}` }}</p>
            <p class="totalParagraph">{{ `Päättynyt: ${filteredSurveys.ended.length}` }}</p>
            <p class="totalParagraph">{{ `Suljettu: ${filteredSurveys.closed.length}` }}</p>
            <p class="totalParagraph">{{ `Arkistoitu: ${filteredSurveys.archived.length}` }}</p>
          </div>
        </transition>
      </div>
      <div class="manageInstructions">
        <b-badge @click="showInstructions = !showInstructions" class="instructionsTitle">Info<font-awesome-icon :icon="showInstructions ? 'chevron-left' : 'chevron-right'"/></b-badge>
        <transition name="slider-width">
          <div v-if="showInstructions" class="total-instructions-container">
            <div class="action-instructions-container instructions-container">
              <div class="instructiondiv">
                <font-awesome-icon icon="chart-bar" style="color:#353535;"/><p>Kyselyn tulokset</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="pencil-alt" style="color:#353535;"/><p>Muokkaa kyselyä</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="redo" style="color:#353535;"/><p>Toista kysely</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="folder-open" style="color:#353535;"/><p>Käytä pohjana</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="stamp" style="color:#353535;"/><p>Viimeistele kysely</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="folder" style="color:grey;"/><p>Arkistoi kysely</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="times" style="color:#FF0000;"/><p>Poista kysely</p>
              </div>
            </div>
            <div class="indicator-instructions-container instructions-container">
              <div class="instructiondiv">
                <font-awesome-icon icon="user-slash" class="instruction-indicator-icon" /><p>Anonyymi</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="user-check" class="instruction-indicator-icon" /><p>Autentikoitu</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="circle" style="color: rgb(0, 194, 0);" class="instruction-indicator-icon-circle" /><p>Käynnissä</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="circle" style="color: yellow;" class="instruction-indicator-icon-circle" /><p>Tuleva</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="circle" style="color: orange;" class="instruction-indicator-icon-circle" /><p>Päättynyt</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="circle" style="color: crimson;" class="instruction-indicator-icon-circle" /><p>Suljettu</p>
              </div>
              <div class="instructiondiv">
                <font-awesome-icon icon="circle" style="color: grey;" class="instruction-indicator-icon-circle" /><p>Arkistoitu</p>
              </div>              
              <div class="instructiondiv">
                <font-awesome-icon icon="circle" style="color: steelblue;" class="instruction-indicator-icon-circle" /><p>Keskeneräinen</p>
              </div>
            </div>
          </div>
        </transition>
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
          <b-dropdown-item @click="toggleDisplay('starting')">{{$t('message.startingButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('ended')">{{$t('message.endedButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('closed')">{{$t('message.closedButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('inComplete')">{{$t('message.inCompleteButton')}}</b-dropdown-item>
          <b-dropdown-item @click="toggleDisplay('archived')">{{$t('message.archivedButton')}}</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="tableDisplayfields">
      <b-table hover responsive :items="filteredSurveys[this.display]" :fields="fields" head-variant="light" table-class="surveyTable shadow-sm">
        <template v-for="(field, index) in fields" :slot="field.key" slot-scope="data">
          <div v-bind:key="field.key" class="surveyTableCel">
            <div v-if="field.colType === 'name'">
              <span v-if="data.item.name.length <= 20" class="surveyName">
                <font-awesome-icon icon="circle" class="indicator-icon" :data-indicatorcolor="!data.item.final ? 'steelblue' : data.item.archived ? 'grey' : data.item.ended ? 'orange' : !data.item.active ? 'red' : data.item.starting ? 'yellow' : 'green'"/>
                <font-awesome-icon :icon="data.item.anon ? 'user-slash' : 'user-check'" class="indicator-icon"/>
                {{data.item.name}}
              </span>
              <span v-else v-b-tooltip="data.item.name" tabindex="0" class="surveyName">
                <font-awesome-icon icon="circle" class="indicator-icon" :data-indicatorcolor="!data.item.final ? 'steelblue' : data.item.archived ? 'grey' : data.item.ended ? 'orange' : !data.item.active ? 'red' : data.item.starting ? 'yellow' : 'green'"/>
                <font-awesome-icon :icon="data.item.anon ? 'user-slash' : 'user-check'" class="indicator-icon"/>
                {{data.item.name.substring(0, 17) + '...'}}
              </span>
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
              <button v-if="data.item.final" @click="openSurveyResults(data.item.surveyId)" class="tableButton"><font-awesome-icon icon="chart-bar" class="tableButtonIcon" /></button>
            </div>
            <div v-else-if="field.colType === 'actions'" class="actionsCel">
              <button v-if="!data.item.archived && data.item.final" @click="modifySurvey(data.item.surveyId)" class="tableButton modifyButton"><font-awesome-icon icon="pencil-alt" class="tableButtonIcon" /></button>
              <button v-if="!data.item.archived && data.item.final" @click="archiveSurvey(data.item.surveyId)" class="tableButton archiveButton"><font-awesome-icon icon='folder' class="tableButtonIcon"/></button>
              <button v-else-if="data.item.final" @click="reCreateSurvey(data.item.surveyId)" class="tableButton reCreateButton"><font-awesome-icon icon='folder-open' class="tableButtonIcon"/></button>
              <button v-else @click="finalizeSurvey(data.item.surveyId)" class="tableButton finalizeButton"><font-awesome-icon icon='stamp' class="tableButtonIcon"/></button>
              <button @click="deleteSurvey(data.item.surveyId)" class="tableButton deleteButton"> <font-awesome-icon icon="times" class="tableButtonIcon"/></button>
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
            maxlength="100"
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
            type="email"
          />
          <b-input-group-append>
            <b-button @click="addRespondent" :disabled="!emailIsValid" class="addRespondentButton">{{$t('message.insertmoreEmail')}}<font-awesome-icon icon="plus"></font-awesome-icon></b-button>
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
        showTotalDetailed: false,
        showInstructions: true
    }
  },
  computed: {
    surveys() {
      return this.$store.state.admin.surveys
    },
    computedSurveys() {
      return this.surveys.map(survey => {
        return {
          ...survey,
          open: 
            (survey.startDate === null || new Date(survey.startDate).getTime() < Date.now()) &&
            (survey.endDate === null || Date.now() < new Date(survey.endDate).getTime()) &&
            survey.active && !survey.archived,
          starting: survey.startDate !== null && Date.now() < new Date(survey.startDate).getTime(),
          ended: survey.endDate !== null && new Date(survey.endDate) < Date.now()
        }
      }).sort((a, b) => b.final - a.final).sort((a, b) => a.archived - b.archived)
    },
    filteredSurveys() {
      const surveysToBeFiltered = (() => {
        if (this.searchTerm) return this.computedSurveys.filter(obj => obj.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
        else return this.computedSurveys
      })()

      const filteredSurveys = surveysToBeFiltered.filter(obj => obj.final && !obj.archived)

      return {
        all: surveysToBeFiltered,
        anonymous: surveysToBeFiltered.filter(obj => obj.anon),
        authenticated: surveysToBeFiltered.filter(obj => !obj.anon),
        active: filteredSurveys.filter(obj => obj.open),
        closed: filteredSurveys.filter(obj => !obj.active),
        starting: filteredSurveys.filter(obj => obj.starting),
        ended: filteredSurveys.filter(obj => obj.ended),
        inComplete: surveysToBeFiltered.filter(obj => !obj.final),
        archived: surveysToBeFiltered.filter(obj => obj.archived)
      }
    },
    modifySurveyBoolean: {
      get: function() {
        return !!this.modify.surveyId
      },
      set: function() {
        if (this.modify.surveyId) {
          this.modify.surveyId = null
          this.modify.surveyName = null
          this.modify.surveyEndDate = null
          this.modify.surveyActivity = null
          this.modify.surveyRespondents = []
          this.modify.currentRespondent = null
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
          this.archive.surveyName = null
          this.archive.inputSurveyName = null
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
          this.del.surveyName = null,
          this.del.inputSurveyName = null
        }
      }
    },
    emailIsValid() {
      if (this.modify.surveyId) {
        return this.modify.currentRespondent &&
          !this.modify.surveyRespondents.some(email => email.toLowerCase() === this.modify.currentRespondent.toLowerCase()) &&
          this.modify.currentRespondent &&
          this.modify.currentRespondent.match(/.+@.+/)
      } else {
        return null
      }
    }
  },
  methods: {
    updateSurveys() {
      this.$store.dispatch('admin/getSurveys')
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
          method: "DELETE",
          url: process.env.VUE_APP_BACKEND + "/admin/survey/" + this.del.surveyId + "/delete",
          headers: {
            'Authorization': `Bearer ${this.$store.state.authentication.accessToken}`
          }
        }).then(res => {
          if (res.status === 204) {
            this.updateSurveys()
            this.$nextTick(() => this.$refs.deleteSurveyModal.hide())
          }
        }).catch(err => {
          this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
            title: this.$t('message.genericError'),
            toaster: 'b-toaster-bottom-right',
            variant: 'danger'
          })
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
          method: "PATCH",
          url: process.env.VUE_APP_BACKEND + "/admin/survey/" + this.archive.surveyId + "/archive",
          headers: {
            'Authorization': `Bearer ${this.$store.state.authentication.accessToken}`
          }
        }).then(res => {
          if (res.status === 204) {
            this.updateSurveys()
            this.$nextTick(() => this.$refs.archiveSurveyModal.hide())
          }
        }).catch(err => {
          this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
            title: this.$t('message.genericError'),
            toaster: 'b-toaster-bottom-right',
            variant: 'danger'
          })
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
      if (this.emailIsValid) {
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
          method: "PATCH",
          url: process.env.VUE_APP_BACKEND + "/admin/survey/" + this.modify.surveyId + "/update",
          headers: {
            'Authorization': `Bearer ${this.$store.state.authentication.accessToken}`
          },
          data: {
            name: this.modify.surveyName,
            endDate: this.modify.surveyEndDate,
            active: this.modify.surveyActivity,
            to: this.modify.surveyRespondents
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.updateSurveys()
            this.$nextTick(() => this.$refs.modifySurveyModal.hide())
          }
        }).catch(err => {
          this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
            title: this.$t('message.genericError'),
            toaster: 'b-toaster-bottom-right',
            variant: 'danger'
          })
        })
      }
    },
    reCreateSurvey(surveyId) {
      this.$store.dispatch('admin/reCreateSurvey', surveyId)
        .then(() => this.$emit('changeActiveComponent', 'adminCreate'))
        .catch(err => {
          this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
            title: this.$t('message.genericError'),
            toaster: 'b-toaster-bottom-right',
            variant: 'danger'
          })
        })
    },
    finalizeSurvey(surveyId) {
      this.$store.dispatch('admin/finalizeSurvey', surveyId)
        .then(() => this.$emit('changeActiveComponent', 'adminFinalize'))
        .catch(err => {
          this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
            title: this.$t('message.genericError'),
            toaster: 'b-toaster-bottom-right',
            variant: 'danger'
          })
        })
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
    this.$store.dispatch('admin/getSurveys')
  }
}  
</script>
<style lang="scss" scoped>

.tableDisplayfields /deep/ .surveyTable {
  background-color: white;
  color: #353535;
  text-align: center;

  td {
    vertical-align: middle;
  }

  th {
    background-color: #8E8998;
    color: white;
    width: max-content;

    &[aria-sort="ascending"], &[aria-sort="descending"] {
      background-color: #666070;
    }
  }

  .surveyTableCel {
    display: grid;
    margin: auto;
    align-items: center;
    width: max-content;
  }

  [aria-colindex="1"] .surveyTableCel {
    margin: initial;
  }

  .surveyName {
    font-weight: bold;
    color: #350E7E;

    .indicator-icon {
      color: #212529;
      width: 1rem;
      height: 1rem;
      margin-right: 0.25rem;

      &[data-icon="circle"] {
        width: 0.5rem;
        margin-right: 0.5rem;

        &[data-indicatorcolor="green"] {
          color: rgb(0, 194, 0);
        }

        &[data-indicatorcolor="orange"] {
          color: orange;
        }

        &[data-indicatorcolor="yellow"] {
          color: yellow;
        }

        &[data-indicatorcolor="red"] {
          color: crimson;
        }

        &[data-indicatorcolor="grey"] {
          color: grey;
        }
        
        &[data-indicatorcolor="steelblue"] {
          color: steelblue;
        }
      }
    }
  }

  .actionsCel {
    display: grid;
    justify-self: center;
    grid-auto-flow: column;
    grid-column-gap: 0.75rem;
    grid-auto-columns: 2rem;
    justify-items: end;

    .modifyButton {
      grid-column: 1 / 2;
    }

    .reCreateButton {
      grid-column: 2 / 3;
    }

    .finalizeButton {
      grid-column: 2 / 3;
    }

    .archiveButton {
      grid-column: 2 / 3;
      color: grey;
    }

    .deleteButton {
      grid-column: 3 / 4;
      color: #FF0000;
    }
  }

  .tableButton {
    background-color: white;
    border: 1px solid #ced4da;
    border-radius: 5px;
    max-width: fit-content;
    max-height: fit-content;
    padding: 0.4rem;
    line-height: 0;
    transition: background-color 150ms ease-in-out;
    
    &Icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    &:not([disabled]) {
      &:hover {
        background-color: darken(white, 5%);
      }

      &:focus, &:active {
        background-color: darken(white, 10%);
      }
    }
  }
}

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

    .slider-width-enter, .slider-width-leave-to {
      max-width: 0;
    }

    .slider-width-enter-to, .slider-width-leave {
      max-width: 100vw;
    }

    .slider-width-enter-active, .slider-width-leave-active {
      transition: max-width 150ms ease-in-out;
    }

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

    .totalinstructionsearch {
      background-color:#FFFFFF;
      width:100%;
      padding-top:1rem;
      padding-bottom:1rem;

      .totalSurveysContainer {
        display: flex;
        font-size: 1rem;
        color: #787878;
        margin-left: 1rem;

        .moreDetailsContainer {
          display: flex;
          white-space: nowrap;
          overflow: hidden;
        }

        .totalParagraph {
          margin-right: 2rem;

          &:first-of-type {
            margin-right: 1rem;
          }
        }

        .chevron {
          margin-right: 1rem;
          font-size: 0.75rem;
          margin-top: 0.33rem;
          
          &:hover {
            cursor: pointer;
          }
        }
      }
      
      .manageInstructions{
        display: grid;
        grid-template-columns: max-content 1fr;
        margin-right:1rem;
        margin-left:1rem;
        height: 8rem;

        .total-instructions-container {
          display: grid;
          grid-auto-flow: column;
          overflow: hidden;
          grid-template-columns: repeat(2, 1fr);
          width: max-content;
        }

        .instructions-container {
          display: grid;
          grid-auto-flow: column;
          grid-template-rows: repeat(4, 1fr);
          grid-template-columns: repeat(2, 1fr);
          overflow: hidden;
          width: max-content;
        }

        .instructionsTitle {
          align-self: baseline;
          color: #350E7E;
          background-color: white;
          border: 1px solid #ced4da;
          font-size: 1.5rem;

          &:hover {
            cursor: pointer;
          }

          svg {
            font-size: 0.75rem;
            margin-bottom: 0.125rem;
            margin-left: 0.25rem;
          }
        }

        .instructiondiv{
          padding: 0.2rem 1rem;
          display:flex;
          align-items: center;

          .instruction-indicator-icon {
            color: #212529;
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;

            &-circle {
              width: 0.5rem;
              transform: translateX(25%);
            }
          }
          
          p {
            margin-bottom: 0;
          }

          svg, img {
            margin-right: 1rem;
            height: 1.5rem;
            width: 1.5rem;
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

        .dropdownButtonsleft {

          & /deep/ button {
            background-color: white;
            color: #353535;
            border: 1px solid #ced4da;
          }
        }
      }
      
      .tableDisplayfields {
        background-color:#FFFFFF;
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

