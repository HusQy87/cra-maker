<template>
  <div id="profil">
    <h1>Mon profil</h1>
    <vs-spacer></vs-spacer>
    <vs-input label="Responsable" v-model="info.responsable"></vs-input>
    <vs-input label="Mission" v-model="info.mission"></vs-input>
    <vs-input label="Société" v-model="info.societe"></vs-input>
    <vs-input label="lieu" v-model="info.lieu"></vs-input>
    <vs-button @click="save">Enregister</vs-button>
  </div>
</template>
<script>


export default {
  data (){
    return {
      info: {
        responsable: null,
        societe: null,
        lieu: null,
        mission: null,
      }
    }
  },
  methods:{
    async save(){
      await this.$axios.post('/profile', this.info)
    },
    async login(){

    }
  },
  async mounted() {
    const resp = await this.$axios.get('/profile')
    if (resp.data.id){
      this.info = resp.data
    }

  }
}
</script>

<style scoped>
.link{
  cursor: pointer;
  transition-duration: 200ms;
}
.link:hover {
  color: rgb(31, 116, 255);
}
</style>
