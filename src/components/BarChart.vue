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
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            value: this.calcAvg(this.avgdata),
            scaleID: 'y-axis-0',
            borderColor: 'red',
            borderWidth: 2
          }]
        },
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
            },
            barPercentage: 0.5
          }]
        }
      },
      data: {
        labels: this.names,
        datasets: [
          {
            label: 'Vastaajaryhmän vastauksien keskiarvot ja keskihajonnat',
            data: this.avgdata,
            backgroundColor: 'lightgreen',
            borderColor: 'green',
            errorBars: this.names.reduce((obj, name, idx) => {
                return {
                  ...obj,
                  [name]: {
                    plus: this.checkAboveTen(this.dvddata[idx], this.avgdata[idx]),
                    minus: this.checkBelowZero(this.dvddata[idx], this.avgdata[idx])
                  }
                }
              }, {})
            //errorBars: {
            //  'Terveys': {plus: this.checkAboveTen(this.dvddata[0], this.avgdata[0]), minus: this.checkBelowZero(this.dvddata[0], this.avgdata[0])},
            //  'Resilienssi': {plus: this.checkAboveTen(this.dvddata[1], this.avgdata[1]), minus: this.checkBelowZero(this.dvddata[1], this.avgdata[1])},
            //  'Asuminen': {plus: this.checkAboveTen(this.dvddata[2], this.avgdata[2]), minus: this.checkBelowZero(this.dvddata[2], this.avgdata[2])},
            //  'Pärjääminen': {plus: this.checkAboveTen(this.dvddata[3], this.avgdata[3]), minus: this.checkBelowZero(this.dvddata[3], this.avgdata[3])},
            //  'Perhesuhteet': {plus: this.checkAboveTen(this.dvddata[4], this.avgdata[4]), minus: this.checkBelowZero(this.dvddata[4], this.avgdata[4])},
            //  'Ystävyyssuhteet': {plus: this.checkAboveTen(this.dvddata[5], this.avgdata[5]), minus: this.checkBelowZero(this.dvddata[5], this.avgdata[5])},
            //  'Talous': {plus: this.checkAboveTen(this.dvddata[6], this.avgdata[6]), minus: this.checkBelowZero(this.dvddata[6], this.avgdata[6])},
            //  'Itsensä kehittäminen': {plus: this.checkAboveTen(this.dvddata[7], this.avgdata[7]), minus: this.checkBelowZero(this.dvddata[7], this.avgdata[7])},
            //  'Itsetunto': {plus: this.checkAboveTen(this.dvddata[8], this.avgdata[8]), minus: this.checkBelowZero(this.dvddata[8], this.avgdata[8])},
            //  'Elämään tyytyväisyys': {plus: this.checkAboveTen(this.dvddata[9], this.avgdata[9]), minus: this.checkBelowZero(this.dvddata[9], this.avgdata[9])}
            //}
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
    },
    checkAboveTen: (dvd, avg) => {
      if (avg + dvd > 10) {
        return 10-avg
      } else {
        return dvd
      }
    }, 
    calcAvg: (arr) => {
      return arr.reduce((acc, val) => acc + val) / arr.length
    }
  },
  props: ['avgdata', 'dvddata', 'names']
}
</script>
<style lang="scss" scoped>

</style>
