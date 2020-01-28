<template>
  <div class="review">
    <h3>{{ $t(`message.reviewHeading`) }}</h3>
    <div class="results">
      <div v-for="(value, index) in results" v-bind:key="index">
        <span v-if="!value.custom">{{ `${index + 1}. ${$t(`message.${value.name}_title`)}` }}</span>
        <span v-else>{{`${index + 1}. ${value.custom.title}`}}</span>              
        <span v-bind:class="{notanswered :value.val === null}">{{value.val !== null ? value.val : $t('message.Unanswered')}}</span>
        <b-collapse id="collapse-reviewcontent" v-bind:visible="!!value.desc">
          <p class="text-review">{{value.desc ? value.desc : $t('message.Unanswered')}}</p>
        </b-collapse>
      </div>
    </div>
    <div class="review-buttons">
      <b-spinner v-if="resultSending" style="color: #350E7E; margin: 0.5rem 2rem;"/>
      <button v-else class="btn send-button" @click.prevent="$emit('saveQuestions')">{{ $t('message.send')}}</button>
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
      type: Array,
      required: true,
      validator: function(prop) {
        const warn = (name) => console.warn(`Invalid prop: results.${name}`)
        const valid = [];
        prop.forEach(obj => {
          if (typeof obj.val !== "number" && obj.val !== null) warn(`${obj.name}.val`)
          else if (typeof obj.desc !== "string" && obj.desc !== null) warn(`${obj.name}.desc`)
          else if (typeof obj.custom !== "object" && obj.custom !== undefined) warn(`${obj.name}.custom`)
          else if (obj.custom !== undefined && typeof obj.custom.title !== "string") warn(`${obj.name}.custom.title`)
          else if (obj.custom !== undefined && typeof obj.custom.description !== "string") warn(`${obj.name}.custom.description`)
          else if (obj.custom !== undefined && obj.custom.help !== null && typeof obj.custom.help !== "string") warn(`${obj.name}.custom.help`)
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
    },
    resultSending: {
      type: Boolean,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>

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
        font-size:1.1rem;
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
         padding-top:0.1rem;
      }
    }
  }

  .review-buttons {
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
        background-color: darken(#350E7E, 5%);
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

@media only screen and (min-width: 768px) {
  .results .text-review{
    padding-top:0rem !important;
  }
}

@media only screen and (min-width: 1900px) {
  .review h3{
      margin:1rem 1rem 2rem 1rem;
  }
}
</style>