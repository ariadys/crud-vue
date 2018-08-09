<template>
  <div class="alert alert-warning alert-dismissible" role="alert">
  <a type="button" class="close" href="/"><span>&times;</span></a>
    {{message}}
</div>
</template>

<script>
export default {
  name: 'alert',
  props: ['message'],
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>