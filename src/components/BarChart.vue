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
          }],
          xAxes: [{
            gridLines: {
              display: false
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
              'Terveydentila': {plus: this.dvddata[0], minus: this.checkBelowZero(this.dvddata[0], this.avgdata[0])},
              'Kyky voittaa...': {plus: this.dvddata[1], minus: this.checkBelowZero(this.dvddata[1], this.avgdata[1])},
              'Asumisolot': {plus: this.dvddata[2], minus: this.checkBelowZero(this.dvddata[2], this.avgdata[2])},
              'Päivittäinen pärjääminen': {plus: this.dvddata[3], minus: this.checkBelowZero(this.dvddata[3], this.avgdata[3])},
              'Perhe': {plus: this.dvddata[4], minus: this.checkBelowZero(this.dvddata[4], this.avgdata[4])},
              'Ystävät': {plus: this.dvddata[5], minus: this.checkBelowZero(this.dvddata[5], this.avgdata[5])},
              'Taloudellinen tilanne': {plus: this.dvddata[6], minus: this.checkBelowZero(this.dvddata[6], this.avgdata[6])},
              'Vahvuudet': {plus: this.dvddata[7], minus: this.checkBelowZero(this.dvddata[7], this.avgdata[7])},
              'Itsetunto': {plus: this.dvddata[8], minus: this.checkBelowZero(this.dvddata[8], this.avgdata[8])},
              'Elämän kokonaisuus': {plus: this.dvddata[9], minus: this.checkBelowZero(this.dvddata[9], this.avgdata[9])}
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
  methods: {
    checkBelowZero: (dvd, avg) => {
      if (avg - dvd < 0) {
        return avg
      } else {
        return dvd
      }
    }
  },
  props: ['avgdata', 'dvddata']
}
</script>
<style lang="scss" scoped>

</style>
