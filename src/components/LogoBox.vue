<template functional>
  <div class="page">
    <b-container>
      <div class="pageWrapper">
        <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" :class="`logo ${props.size}`"/>
        <div :class="`contentWrapper ${props.size}`">
          <div class="topbar">
            <slot name="topbar"></slot>
          </div>
          <slot name="content"></slot>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'LogoBox',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (prop) => ['small', 'medium', 'large'].includes(prop)
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  background-color: #FFFFFF;
  width:100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;

  .pageWrapper {
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    text-align: center;
    align-items: center;
    margin-top: 0.1rem;
      
      .logo {
        width: 100%;
      }

    .contentWrapper {
      background-color: #F9F9FB;
      width:100%;
      box-shadow: 0 5px 5px gray;
      margin-bottom: 1rem;
      border-radius: 15px;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);

      .topbar {
        background-color:#80CDE6;
        width: 100%;
        line-height: 2rem;
        color: #343434;
        font-weight: bold;
        font-size: 1.2rem;
        border-radius: 15px 15px 0 0;

        &:empty {
          padding: 1rem 0;
        }
      }
    }
  }
}
@media screen and (min-width: 768px) { 
  .pageWrapper {
    margin-top:1.8rem !important;
  }

  .logo {
    margin-bottom:1rem;
    
    &.small {
      width: 29rem !important;
    }

    &.medium {
      width: 37rem !important;
    }

    &.large {
      width: 45rem !important;
    }
  }

  .contentWrapper {

    &.small {
      width: 30rem !important;
    }

    &.medium {
      width: 38rem !important;
    }

    &.large {
      width: 46rem !important;
    }
  }
}
</style>