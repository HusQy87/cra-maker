<template>
  <div id="profil">
    <h1>Mon profil</h1>
    <vs-spacer></vs-spacer>
    <vs-row vs-justify="space-around">
      <vs-input label="Responsable" v-model="info.responsable"></vs-input>
      <vs-input label="Mission" v-model="info.mission"></vs-input>
      <vs-input label="Société" v-model="info.societe"></vs-input>
      <vs-input label="lieu" v-model="info.lieu"></vs-input>
    </vs-row>

    <vs-row>
      <vs-button color="danger" @click=" updatePassword = true">Modifier le mot de passe</vs-button>

    </vs-row>

    <div v-if="updatePassword" style="margin-top: 1em; margin-bottom: 1em" >
      <vs-input v-model="newPass" label="Nouveau mot de passe" type="password"></vs-input>

      <vs-row>
        <vs-button color="warning" @click="changePassword">Modifier</vs-button>

      </vs-row>
    </div>
    <vs-row>
      <vs-button @click="save">Enregister</vs-button>

    </vs-row>
  </div>
</template>
<script>


export default {
  data (){
    return {
      updatePassword : false,
      newPass: '',
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
    async changePassword(){

      const resp = await this.$axios.put('/user/changepass', {newPass: this.newPass})
      if (resp.data.status){
        this.$vs.notify({title:"Changement de mot de passe ", text: "Mot de passe modifié",color:'success', position: 'bottom-center'})
        this.newPass = ''
      }else {
        this.$vs.notify({title:"Changement de mot de passe ", text: "Mot de passe modifié",color:'danger', position: 'bottom-center'})

      }
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
