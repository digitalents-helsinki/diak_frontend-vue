<template>
  <div class="rightsideManage">
    <div class="rightsideManage-top">
      <p>{{ $t('message.Survey') }}</p>
    </div>
    <div class="searchParagraph-div">
      <div class="totalParagraph">
        <p>{{ $t('message.total') }}</p>
      </div>
      <div class="searchbar-div">
          <p class="paragraphTop">{{ $t('message.searchParagraph') }}</p>
          <b-input-group size="md" class="search-bar">
            <span> <font-awesome-icon icon="search" class="iconsearch"/> </span>
            <b-form-input v-bind:placeholder="$t('message.searchPlaceholder')"></b-form-input>
          </b-input-group>
      </div>
      <div class="tableandfilter">
        <div class="buttonstotal">
            <b-dropdown id="dropdown-1" variant="secondary" text="Kaikki kyselyt" class="m-md-2 dropdownButtons-top">
              <b-dropdown-item>First Action</b-dropdown-item>
              <b-dropdown-item>Second Action</b-dropdown-item>
              <b-dropdown-item>Third Action</b-dropdown-item>
            </b-dropdown>
        </div>
      </div>
    </div>
    <div>
      <b-table hover responsive :items="surveys" :fields="fields" head-variant="light" class="bzo">
        <template v-for="(field, index) in fields" :slot="field.key" slot-scope="data">
          <div v-bind:key="field.key">
            <div v-if="field.colType === 'name'">
              <span>{{data.item.name}}</span>
            </div>
            <div v-else-if="field.colType === 'startDate'">
              <span>{{data.item.startDate | moment('DD/MM/YYYY')}}</span>
            </div>
            <div v-else-if="field.colType === 'endDate'">
              <span>{{data.item.startDate | moment('DD/MM/YYYY')}}</span>
            </div>
            <div v-else-if="field.colType === 'modify'">
              <b-button>Modify</b-button>
            </div>
            <div v-else-if="field.colType === 'analyze'">
              <b-button>Analysoi</b-button>
            </div>
            <div v-else-if="field.colType === 'delete'">
              <b-button>Arkistoi</b-button><b-button @click="deleteSurvey(data.item.id)">Poista</b-button>
            </div>
          </div>
        </template> 
      </b-table>
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
            label: 'Vastanneita'
          },
          {
            key: 'modify',
            label: 'Muokkaa kyselyä',
            colType: 'modify' 
          },
          {
            key: 'control',
            label: 'Analysoi',
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
        const index = this.surveys.findIndex(survey => survey.id === surveyId)
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
<style lang="scss" scoped>
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
    .searchParagraph-div{
      margin-bottom:8rem;
      background-color:#FFFFFF;
      width:100%;
      padding-bottom:1rem;

      .totalParagraph{
        font-size:1em;
        color:grey;
        margin-left:1rem;
        margin-bottom:6rem;
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
      }
    }
}
/*@media only screen and (max-width: 1070px) {
    .bzo{
      max-width: 60rem;
      background-color:#FFFFFF;
    }
}*/

.surveyList {
  div {
    display: flex;
    width: 100%;
    padding: 15px;
    justify-content: space-between;
  }
}
</style>

