<template>
  <div class="rightsideManage">
    <div class="rightsideManage-top">
      <p>{{ $t('message.Survey') }}</p>
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
    background-color:#FFFFFF;
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
        margin-bottom:3rem;
    }
}
@media only screen and (max-width: 1070px) {
    .bzo{
      max-width: 60rem;
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

