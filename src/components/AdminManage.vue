<template>
  <div class="rightsideManage">
    <div class="rightsideManage-top">
      <p>{{ $t('message.manageSurveys') }}</p>
    </div>
    <div class="totalinstructionsearch">
      <div class="totalParagraph">
        <p>{{ $t('message.total') }}</p>
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
          <b-form-input v-bind:placeholder="$t('message.searchPlaceholder')"></b-form-input>
        </b-input-group>
      </div>
    </div>
    <div class="tableandfilter">
      <div class="buttonstotal">
        <div>
          <b-dropdown id="dropdownleft" variant="secondary" text="Kaikki kyselyt" class="m-md-2 dropdownButtonsleft">
            <b-dropdown-item>item</b-dropdown-item>
            <b-dropdown-item>item</b-dropdown-item>
          </b-dropdown>
        </div>
        <div>
          <b-button variant="secondary" @click="toggleDisplay" id="butttonRight">{{ $t('message.archiveButton') }}</b-button>
        </div>
      </div>
    </div>
    <div class="tableDisplayfields">
      <b-table hover responsive :items="surveys" :fields="fields" bordered head-variant="light">
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
              <button v-if="data.item.active" @click="suspendActivateSurvey(data.item.surveyId, false)"><font-awesome-icon icon="stop" style="font-size:1.5rem;"/></button>
              <button v-else @click="suspendActivateSurvey(data.item.surveyId, true)"><font-awesome-icon icon="play" style="font-size:1.6rem;"/></button>
              <button @click="archiveSurvey(data.item.surveyId)"> <font-awesome-icon icon="folder" style="font-size:1.6rem; color:grey;"/></button>
              <button class="iconButton-times" @click="deleteSurvey(data.item.surveyId)"> <font-awesome-icon icon="times" style="font-size:1.6rem; color:#FF0000;"/> </button>
            </div>
          </div>
        </template>
      </b-table>
    </div>
    <b-modal
      id="modifySurveyModal"
      :title="$t('message.modifySurveyHeader')"
      :ok-title="$t('message.modifySurveySubmit')"
      :cancel-title="$t('message.modifySurveyCancel')"
      ref="modifySurveyModal"
      size="xl"
      v-model="modifySurveyBoolean"
      @ok="handleModifySurveyModal"
    >
      <form>
        <b-form-group
          :label="$t('message.modifySurveyTitle')"
        >
          <b-form-input
            id="surveyNameInput"
            v-model="modifySurveyName"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          :label="$t('message.modifySurveyEndDate')"
        >
          <datepicker v-model="modifySurveyEndDate" :language="fi" :monday-first="true" :disabled-dates="disabledDates" v-bind:placeholder="$t('message.datePlaceholder')"></datepicker>
        </b-form-group>
      </form>
    </b-modal>
    <transition name="slide" mode="in-out">
      <SurveyResults 
        v-if="surveyResultsId"
        v-on:closeResults="surveyResultsId = null"
        v-bind:surveyId="surveyResultsId" 
        v-bind:surveyName="surveys.find(survey => survey.surveyId === surveyResultsId).name"
      />
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
        surveys: [],
        surveyResultsId: null,
        modifySurveyId: null,
        modifySurveyName: null,
        modifySurveyEndDate: null,
        modifySurveyActive: null,
        fi: fi,
        disabledDates: {
          to: (d => new Date(d.setDate(d.getDate() - 1)))(new Date)
        },
        display: "archived",
        loaded: false
    }
  },
  computed: {
    displayedSurveys() {
      if (this.display === "archived") {
        return this.$data.surveys.filter(obj => obj.archived)
      } else if (this.display === "all") {
        return this.$data.surveys
      }
    },
    modifySurveyBoolean: {
      get: function() {
        return !!this.modifySurveyId
      },
      set: function() {
        if (this.modifySurveyId) {
          this.modifySurveyId = null
        }
      }
    }
  },
  methods: {
    async getSurveys() {
      const res = await axios.get(process.env.VUE_APP_BACKEND + "/survey/all")
      this.$data.surveys = res.data
      this.$data.loaded = true
    },
    updateSurvey(updatedSurvey) {
      const index = this.surveys.findIndex(survey => survey.surveyId === updatedSurvey.surveyId)
      if (~index) this.surveys.splice(index, 1, updatedSurvey)
    },
    deleteSurvey(surveyId) {
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/survey/delete",
        data: {
          id: surveyId
        }
      }).then(res => {
        const index = this.surveys.findIndex(survey => survey.surveyId === surveyId)
        if (~index)
          this.surveys.splice(index, 1)
      })
    },
    archiveSurvey(surveyId) {
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/survey/archive",
        data: {
          id: surveyId
        }
      })
    },
    suspendActivateSurvey(surveyId, status) {
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/survey/suspendactivate",
        data: {
          id: surveyId,
          active: status
        }
      }).then(res => {
        if (res.data !== "No survey found") this.updateSurvey(res.data)
      })
    },
    modifySurvey(surveyId) {
      if (!this.modifySurveyId) {
        this.modifySurveyId = surveyId
        this.modifySurveyName = this.surveys.find(survey => survey.surveyId === surveyId).name
        this.modifySurveyEndDate = this.surveys.find(survey => survey.surveyId === surveyId).endDate
      }
    },
    handleModifySurveyModal(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.modifySurveyId && this.modifySurveyName) {
        axios({
          method: "POST",
          url: process.env.VUE_APP_BACKEND + "/survey/update",
          data: {
            surveyId: this.modifySurveyId,
            name: this.modifySurveyName,
            endDate: this.modifySurveyEndDate
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
    toggleDisplay() {
      if (this.display === "all") {
        this.display = "archived"
      } else {
        this.display = "all"
      }
    }
  },
  created() {
    this.getSurveys()
  }
}  
</script>
<style lang="scss">
.table {
  thead {
    tr {
      th {
        text-align: center;
      }
    }
  }
  tbody {
    tr {
      text-align: center;
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
        transform: translateY(100vh);

        &-to {
          transform: translateY(0);
        }

        &-active {
          transition: transform 0.2s;
        }
      }

      &-leave {
        transform: translateY(0);

        &-to {
          transform: translateY(100vh);
        }

        &-active {
          transition: transform 0.2s;
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
        margin-bottom:1rem;
    }

    .totalinstructionsearch{
      background-color:#FFFFFF;
      margin-top:1rem;
      margin-bottom:3rem;
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

          .reportimageButton{
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
        margin-bottom:1rem;

        #butttonRight{
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

