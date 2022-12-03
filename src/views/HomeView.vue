<template>
  <div id="app" >
    <vs-col clas>
      <h1 style="text-align: center">Génération du relevé d'heure hebdo</h1>
    </vs-col>
    <vs-divider color="primary">Informations personnels</vs-divider>
    <vs-row vs-justify="space-around">
      <vs-input label="Nom" v-model="nom"/>
      <vs-input label="Prénom" v-model="prenom"/>
      <vs-input label="Responsable" v-model="responsable"/>
      <vs-input label="Société" v-model="societe"/>
    </vs-row>
    <vs-divider color="primary">Relevé d'heure</vs-divider>
    <vs-row vs-w="12" vs-justify="center">
      <vs-select label="Numéro de la semaine" v-model="weeknumber" @change="defineWeekDays">
        <vs-select-item :key="index" v-for="index in totalweek  " :value="index" :text="index"/>
      </vs-select>
    </vs-row>
    <div v-if="week.length === 7">
      <vs-row vs-justify="center">
        <vs-col  vs-type="flex" vs-align="center" vs-w="3">Jour de la semaine</vs-col>
        <vs-col  vs-type="flex" vs-align="center" vs-w="3">Jour</vs-col>
        <vs-col  vs-type="flex" vs-align="center" vs-w="3">Heures</vs-col>
        <vs-col  vs-type="flex" vs-align="center" vs-w="3">Heures de nuit</vs-col>
      </vs-row>
      <vs-row :key="index" v-for="day, index in week"  >
        <vs-col  vs-type="flex" vs-align="center" vs-w="3">{{day.day}}</vs-col>
        <vs-col  vs-type="flex"  vs-align="center" vs-w="3">{{day.date.format('DD/MM/YYYY')}}</vs-col>
        <vs-col  vs-type="flex"  vs-align="center" vs-w="3">
          <vs-input-number v-model="day.hours" :min="0" :max="24"></vs-input-number>
        </vs-col>
        <vs-col  vs-type="flex"  vs-align="center" vs-w="3">
          <vs-input-number v-model="day.nightHours" :min="0" :max="24"></vs-input-number>
        </vs-col>
      </vs-row>
    </div>
    <vs-divider color="primary">Informations Supplémentaires</vs-divider>
    <vs-row vs-justify="space-around">
      <vs-textarea label="Observations" width="30%" counter="300" v-model="infos.observation"/>
      <vs-input label="Lieu" v-model="infos.lieu"></vs-input>
      <vs-input label="Mission" v-model="infos.mission"></vs-input>
      <div>
        <vs-checkbox v-model="infos.missionContinue">Mission continue</vs-checkbox>
        <vs-checkbox v-model="infos.departVolontaire">Départ volontaire</vs-checkbox>
        <vs-checkbox v-model="infos.missionTerminee">Mission Terminée</vs-checkbox>
      </div>
    </vs-row>
    <vs-row vs-w="12" vs-justify="center">
      <vs-button @click="makePdf">Générer le CRA</vs-button>
    </vs-row>



  </div>
</template>

<script>


import moment from "moment";
import axios from "axios"
import template from '../template.json'
import {generate} from "@pdfme/generator";
moment.locale('fr')
export default {
  name: 'HomeView',
  data() {
    return {
      infos: {
        observation: '',
        missionContinue: true,
        missionTerminee: false,
        departVolontaire: false,
        lieu: '',
        mission: '',
      },
      nom: '',
      prenom:'',
      responsable: '',
      societe: '',
      totalweek: null,
      weeknumber: null,
      week : [

      ],

    }
  },
  methods : {
    makePdf(){
      let contextObject = {}
      let sum = 0
      this.week.forEach(d => {
        contextObject[`${d.day}Date`] = d.date.format('DD/MM/YYYY')
        contextObject[`${d.day}Heures`] =d.hours > 0 ?  d.hours.toString(): ''
        contextObject[`${d.day}HeuresNuit`] = d.nightHours > 0 ? d.nightHours.toString() : ''
        sum += (parseInt(d.hours) + parseInt(d.nightHours))
      })
      contextObject.totalHeures = sum+'h'
      contextObject.nomPrenom = `${this.nom} ${this.prenom}`
      contextObject.responsable = this.responsable
      contextObject.societe = this.societe
      contextObject.lieu = 'ASP'
      contextObject.weekStart = moment().week(this.weeknumber).day(1).format('DD/MM')
      contextObject.weekEnd = moment().week(this.weeknumber).day(7).format('DD/MM')
      contextObject.weekNumber = this.weeknumber.toString()
      contextObject.observation = this.infos.observation
      contextObject.mission = this.infos.mission
      contextObject.weekPresent = moment().week(this.weeknumber).day(5).format('DD/MM/YYYY')
      contextObject.lieuMission = this.infos.lieu
      contextObject.missionContinue = this.infos.missionContinue ? 'x': ''
      contextObject.missionTerminee = this.infos.missionTerminee ? 'x': ''
      contextObject.departVolontaire = this.infos.departVolontaire ? 'x': ''

      const inputs = [contextObject]
      generate({template, inputs}).then(pdf => {
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
      })
    },
    async defineWeekDays(){
      const apiResp = await axios.get(`https://calendrier.api.gouv.fr/jours-feries/metropole/${moment().year()}.json`, {Authorization : ''})
      this.week = []
      console.log(apiResp)
      for (let i = 0; i < 7 ; i++) {
        let dayDate = moment().week(this.weeknumber).day(i+1)
        let day = {}
        if (i<5){
          // eslint-disable-next-line no-prototype-builtins
          if (apiResp.data.hasOwnProperty(dayDate.format('YYYY-MM-DD'))){
            day.hours = 0
          }else {
            day.hours = 7
          }

        }else {
          day.hours = 0
        }
        day.nightHours = 0
        day.date = moment().week(this.weeknumber).day(i+1)
        day.day = day.date.format('dddd')
        this.week[i] = day
      }
    }
  },
  async mounted() {
    this.$vs.loading({background: '#FFFFFF'})
    this.totalweek = moment().weeksInYear()
    this.weeknumber = moment().week()
    if (this.$store.state.isLoggedIn){
      const resp = await this.$axios.get('/user/infos')
      if (resp.data.id){
        this.nom = resp.data.nom
        this.prenom = resp.data.prenom
        this.societe = resp.data.info.societe
        this.responsable = resp.data.info.responsable
        this.infos.lieu = resp.data.info.lieu
        this.infos.mission = resp.data.info.mission
      }
    }
    await this.defineWeekDays()
    this.$vs.loading.close()

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
