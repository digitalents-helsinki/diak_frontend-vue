<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  name: 'bar-chart',
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 10
            }
          }]
        }
      },
      data: {
        labels: ['Terveydentila', 'Kyky voittaa...', 'Asumisolot', 'Päivittäinen pärjääminen', 'Perhe', 'Ystävät', 'Taloudellinen tilanne', 'Vahvuudet', 'Itsetunto', 'Elämän kokonaisuus'],
        datasets: [
          {
            label: 'Vastaajaryhmän vastauksien keskiarvot',
            data: this.avgdata,
            backgroundColor: 'lightgreen',
            borderColor: 'green',
            errorBars: {
              'Terveydentila': {plus: this.dvddata[0], minus: this.dvddata[0]},
              'Kyky voittaa...': {plus: this.dvddata[1], minus: this.dvddata[1]},
              'Asumisolot': {plus: this.dvddata[2], minus: this.dvddata[2]},
              'Päivittäinen pärjääminen': {plus: this.dvddata[3], minus: this.dvddata[3]},
              'Perhe': {plus: this.dvddata[4], minus: this.dvddata[4]},
              'Ystävät': {plus: this.dvddata[5], minus: this.dvddata[5]},
              'Taloudellinen tilanne': {plus: this.dvddata[6], minus: this.dvddata[6]},
              'Vahvuudet': {plus: this.dvddata[7], minus: this.dvddata[7]},
              'Itsetunto': {plus: this.dvddata[8], minus: this.dvddata[8]},
              'Elämän kokonaisuus': {plus: this.dvddata[9], minus: this.dvddata[9]}
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
  props: ['avgdata', 'dvddata']
}
</script>
<style lang="scss" scoped>

</style>
