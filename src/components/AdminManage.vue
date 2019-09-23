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
            <b-dropdown id="dropdown-1" variant="secondary" text="Kaikki kyselyt" class="m-md-2 dropdownButtons-top">
              <b-dropdown-item>First Action</b-dropdown-item>
              <b-dropdown-item>Second Action</b-dropdown-item>
              <b-dropdown-item>Third Action</b-dropdown-item>
            </b-dropdown>
        </div>
        <div class="tableDisplayfields">
          <b-table hover responsive :items="surveys" :fields="fields" head-variant="light">
            <template v-for="(field, index) in fields" :slot="field.key" slot-scope="data">
              <div v-bind:key="field.key">
                <div v-if="field.colType === 'name'">
                  <span>{{data.item.name}}</span>
                </div>
                <div v-else-if="field.colType === 'startDate'">
                  <span>{{data.item.startDate | moment('DD/MM/YYYY')}}</span>
                </div>
                <div v-else-if="field.colType === 'endDate'">
                  <span>{{data.item.endDate | moment('DD/MM/YYYY')}}</span>
                </div>
                <div v-else-if="field.colType === 'respondentsSize'">
                  <span>0/{{data.item.respondents_size}}</span>
                </div>
                <div v-else-if="field.colType === 'modify'">
                  <button> <font-awesome-icon icon="pencil-alt" style="font-size:1.5rem;"/></button>
                </div>
                <div v-else-if="field.colType === 'analyze'">
                  <button> <img src="../images/assessment_24px.png" alt="" style="width:25px; height:25px;"/></button>
                </div>
                <div v-else-if="field.colType === 'delete'">
                  <button> <font-awesome-icon icon="folder" style="font-size:1.6rem; color:grey;"/></button>
                  <button class="iconButton-times" @click="deleteSurvey(data.item.surveyId)"> <font-awesome-icon icon="times" style="font-size:1.6rem; color:red;"/> </button>
                </div>
              </div>
            </template> 
          </b-table>
        </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'admin-manage',
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
            key: 'modify',
            label: 'Muokkaa kyselyä',
            colType: 'modify' 
          },
          {
            key: 'control',
            label: 'Reportti',
            colType: 'analyze'
          },
          {
            key: 'delete',
            label: 'Arkistoi tai poista kysely',
            colType: 'delete'
          }
        ],
        surveys: null,
        loaded: false
    }
  },
  methods: {
    async getSurveys() {
      const res = await axios.get(process.env.VUE_APP_BACKEND + "/survey/all")
      this.$data.surveys = res.data
      this.$data.loaded = true
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
    }
  },
  mounted() {
    this.getSurveys()
  }
}  
</script>
<style lang="scss">
.table {
  tbody {
    tr {
      text-align: center;
    }
  }
}

.rightsideManage{
    background-color:#F9F9FB;
    width:81.8%;
    margin:1rem 1rem 0rem 1rem;

    .rightsideManage-top{
        background-color:#350E7E;
        width:100%;
        height: 5rem;
        font-size:1.1rem;
        font-weight:bold;
        color:white;
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
        color:grey;
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
          border:1px solid grey;
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
            color:grey;
            margin-right:1rem;
          }
        }
      }
    }
    .tableandfilter{
      display:flex;
      flex-direction:column;

      .buttonstotal{
        display:flex;
        flex-direction:row;
      }
      
      .tableDisplayfields{
        background-color:#FFFFFF;

        .iconButton-times{
          margin-left:1rem;
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
</style>

