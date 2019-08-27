<template>
    <div class="rightsideManage">
        <div class="rightsideManage-top">
         <p>{{ $t('message.Survey') }}</p>
    </div>
  
    <div>
        <b-table hover responsive :items="items" :fields="fields" head-variant="light" class="bzo">
          <!--<template slot="arkistoi_tai_poista_kysely" slot-scope="{ item: { arkistoi_tai_poista_kysely }}">
            <i :class="'fas ' + arkistoi_tai_poista_kysely"></i>
          </template>-->
        </b-table>
  </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //url: '',
          fields: [
          {
            key: 'kyselyn_nimi',
            label: 'Kyselyn nimi',
            //name: 'id',
            sortable: true,
            //filterable: true,
             tdClass: 'nameOfTheClass'
          },
          {
            key: 'luoto',
            label: 'Luoto',
            sortable: true,
          },
          {
            key: 'voimassaolo_alkaa',
            label: 'Voimassaolo alkaa',
            sortable: true,
          },
          {
            key: 'voimassaolo_päättyy',
            label: 'Voimassaolo Päättyy',
            sortable: true,

          },
          {
            key: 'vastanneita',
            label: 'Vastanneita',
            sortable: true,

          },
           {
            key: 'muokkaa_kyselyä',
            label: 'Muokkaa kyselyä',
            sortable: true,

          },
          {
            key: 'analysoi',
            label: 'Analysoi',
            sortable: true,

          },
          {
           key: 'arkistoi_tai_poista_kysely',
            label: 'Arkistoi tai poista kysely',
          }
        ],
        items: [
          { arkistoi_tai_poista_kysely:'', analysoi:'', muokkaa_kyselyä:'', vastanneita:'18/18', voimassaolo_päättyy: '20/8/2019', voimassaolo_alkaa: '5/8/2019', luotu:'Luotu 5/8/2019', kyselyn_nimi:'Digitalents kysely'},
          { arkistoi_tai_poista_kysely:'', analysoi:'', muokkaa_kyselyä:'', vastanneita:'0/22', voimassaolo_päättyy: '31/8/2019', voimassaolo_alkaa: '6/8/2019', luotu:'Luotu 8/8/2019',  kyselyn_nimi: 'Diak kysely' },
          { arkistoi_tai_poista_kysely:'', analysoi:'', muokkaa_kyselyä:'', vastanneita:'1/30', voimassaolo_päättyy: '1/9/2019', voimassaolo_alkaa: '16/8/2019', luotu:'Luotu 10/8/2019',  kyselyn_nimi: 'Other kysely' },

        ]
        }
      }
     /*methods: {
            updateUrl(url) {
                this.url = url;
            }
        },*/
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

</style>

