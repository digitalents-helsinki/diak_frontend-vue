<template>
  <div class="review">
    <h3>Kooste vastauksistasi</h3>
    <div class="results">
      <div v-for="(value, name, index) in results" v-bind:key="index">
        <span v-if="!value.custom">{{$t(`message.${name}_title`)}}</span>
        <span v-else>{{`${index + 1}. ${value.custom.title}`}}</span>              
        <span v-bind:class="{notanswered :!value.val}">{{value.val ? value.val : "Ei vastattu"}}</span>
        <b-collapse id="collapse-health" v-bind:visible="!!value.desc">
          <p class="text-review">{{value.desc ? value.desc : "Ei vastattu" }}</p>
        </b-collapse>
      </div>
    </div>
    <div class="review-buttons">
      <button class="btn send-button" @click.prevent="$emit('saveQuestions')">{{ $t('message.send')}}</button>
      <button
        class="btn return-button" 
        @click.prevent="$emit('update:navigation', 'subtract')"
      >{{ $t('message.return')}}</button>
    <button @click.prevent="$emit('toggleModal', 'cancel')" class="btn cancel-button">{{ $t('message.cancel')}}</button>
    </div>
  </div>
</template>
<script>

export default {
  name: "QuestionnaireReview",
  props: {
    results: {
      type: Object,
      required: true,
      validator: function(prop) {
        const warn = (name) => console.warn(`Invalid prop: results.${name}`)
        const valid = [];
        Object.keys(prop).forEach(key => {
          if (typeof prop[key].val !== "number" && prop[key].val !== null) warn(`${key}.val`)
          else if (typeof prop[key].desc !== "string" && prop[key].desc !== null) warn(`${key}.desc`)
          else if (typeof prop[key].custom !== "object" && prop[key].custom !== undefined) warn(`${key}.custom`)
          else if (prop[key].custom !== undefined && typeof prop[key].custom.title !== "string") warn(`${key}.custom.title`)
          else if (prop[key].custom !== undefined && typeof prop[key].custom.description !== "string") warn(`${key}.custom.description`)
          else if (prop[key].custom !== undefined && typeof prop[key].custom.help !== "string") warn(`${key}.custom.help`)
          else valid.push(true)
        })
        return valid.length === Object.keys(prop).length
      }
    },
    navigation: {
      type: Object,
      required: true,
      validator: function(prop) {
        if (typeof prop.questionnum !== "number") return false
        if (typeof prop.questionamount !== "number") return false
        return true
      }
    }
  }
};
</script>
<style lang="scss" scoped>

.notAnswered {
  color: red;
}

.review {

  h3{
    margin:2rem;
  }

  .results {
    display: flex;
    flex-flow: column;
    text-align: start;

    .notanswered{
      color:#A1318A;
      font-size:1rem !important;
    }

    div {
      border: 1px solid lightgray;
      padding: 0.7rem;
      margin: 0.6rem;

      span:nth-of-type(1) {
        font-weight: bold;
        font-size:1.125rem;   
        color:#350E7E;
      }

      span:nth-of-type(2) {
        font-size:1rem;
        padding-right:1rem;
      }

      span:nth-child(even) {
        float: right;
      }
      
      .textarea-collapse{
        background-color:white;
        color:black;
        border:0;
        font-size:1.1rem;
        font-weight:bold;
        margin-left:1rem;
      }
       .text-review{
         white-space: pre-wrap;
         word-wrap:break-word;
         padding-top:0.6rem;
      }
    }
  }

  .review-buttons {
    //margin: 1.8rem 0;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin:2rem 0;

    .send-button {
      border-radius: 50px;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
      line-height: 2;
      width: 16rem;
      padding: 1rem 2rem;
      background-color:#350E7E;
      color:#FFFFFF;
      font-weight:bold;
      margin:1rem;
      font-size:1rem;

       &:focus {
        box-shadow: 0 5px 5px rgba(0, 64, 112, 0.5);
      }

      &:hover {
        background-color: lighten(#350E7E, 5%)
      }
    }

    .return-button {
      color:#350E7E;
      font-size:1.1rem;
    }

    .cancel-button {
      color:#350E7E;
      font-size:1.1rem;
    }
  }
}

//iPhone 4 Portrait
/*@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  textarea {
    width: 100%;
    border-radius: 4px;
    margin: 1rem 0;
    padding-bottom: 5rem;
  }

  textarea::placeholder {
    opacity: 40%;
    color: #353535;
    font-size: 1rem;
  }

  .cancel-button {
    margin: 1rem 0;
  }
}*/
//iPhone 5 Portrait
/*@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  textarea {
    width: 100%;
    border-radius: 4px;
    margin: 1rem 0;
    padding-bottom: 5rem;
  }

  textarea::placeholder {
    opacity: 40%;
    color: #353535;
    font-size: 1rem;
  }

  .cancel-button {
    margin: 1rem 0;
  }
}*/

@media only screen and (min-width: 768px) {
  .results .text-review{
    padding-top:0rem !important;
  }
  //input[type=range]:not(:hover) ~ .rangeLabel { opacity: 0.10; }
}

@media only screen and (min-width: 1900px) {

  /*.buttonOhjeet {
    position: relative !important;
    top: 0%;
    left: -5%;
  }*/

  .review h3{
      margin:1rem 1rem 2rem 1rem;
  }
}
</style>