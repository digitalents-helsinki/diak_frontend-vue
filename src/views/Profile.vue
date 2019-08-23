<template>
  <form>
    <div class="form-group">
      <label for="userName">Nimi</label>
      <input type="text" class="form-control" id="userName" placeholder="" />
    </div>
    <div class="form-group">
      <label for="userGender">Sukupuoli</label>
      <select class="form-control" id="userGender">
        <option>mies</option>
        <option>nainen</option>
        <option>muu</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Tallenna</button>
  </form>
</template>
<script>
export default {
  name: 'profile'
}
</script>
<style lang="scss" scoped>

</style>