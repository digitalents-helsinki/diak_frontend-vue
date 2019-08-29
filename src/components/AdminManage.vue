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
          <b-table hover responsive :items="items" :fields="fields" head-variant="light">
                <!--<template slot="arkistoi_tai_poista_kysely" slot-scope="{ item: { arkistoi_tai_poista_kysely }}">
                  <i :class="'fas ' + arkistoi_tai_poista_kysely"></i>
                </template>-->
          </b-table>
        </div>
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

</style>

