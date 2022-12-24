<template>
<div id="login" class="">
  <div v-if="type === 'login'">
    <vs-row vs-justify="center" style="margin-top: 200px">
      <div style="border: solid 0.1px; padding: 2em">
        <h1>Connexion</h1>
        <vs-input label-placeholder="Adresse email" v-model="loginInfos.mail" style="margin-bottom: 2em"/>
        <vs-input label-placeholder="Mot de passe" v-model="loginInfos.mdp" type="password" style="margin-bottom: 2em"/>
        <vs-button @click="login">Se connecter</vs-button>
        <p class="link"  @click.prevent="type = 'register'"> Pas de compte ?</p>
      </div>
    </vs-row>
  </div>
  <div v-else>
    <vs-row vs-justify="center" style="margin-top: 200px">
      <div style="border: solid 0.1px; padding: 2em">
        <h1>Inscription</h1>
        <vs-row vs-justify="center">
          <vs-input label-placeholder="Nom" v-model="registerInfos.nom"/>
          <vs-input label-placeholder="Prénom" v-model="registerInfos.prenom"/>
        </vs-row>
        <vs-row vs-justify="center">
          <div>
            <vs-input label-placeholder="Adresse email" type="email" v-model="registerInfos.mail"/>
            <vs-input label-placeholder="Mot de passe" type="password" v-model="registerInfos.mdp"/>
          </div>

        </vs-row>

        <vs-button style="margin-top: 1em" @click="register">S'inscrire</vs-button>
        <p class="link"  @click.prevent="type = 'login'"> Se connecter</p>
      </div>
    </vs-row>
  </div>

</div>
</template>
<script>


export default {
  data (){
    return {
      loginInfos: {
        username: '',
        password: ''
      },
      registerInfos: {
        mail: '',
        nom: '',
        prenom: '',
        mdp: ''
      },
      type: 'login'
    }
  },
  methods:{
    async register(){
      const resp = await this.$axios.post('/register', this.registerInfos)
      if (resp.status === 200){
        this.$vs.notify({title:"Inscription", text: "Inscription réussi",color:'success', icon: 'how_to_reg', position: 'top-center'})
      }
    },
    async login(){
      const resp = await this.$axios.post('/login', this.loginInfos)
      if (resp.data.token){
        this.$store.commit('login', resp.data.token)
        this.$vs.notify({title:"Connexion", text: "Connexion réussi",color:'success', icon: 'login', position: 'bottom-center'})
        await this.$router.push('/')
      }else {
        this.$vs.notify({title: "Connexion", text:"Mauvaise correspondance mot de passe/email", color:'danger'})
      }
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
