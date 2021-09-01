<template>
  <v-container>
    <v-form
        id="form"
        ref="form"
    >
      <v-text-field
          v-model="nameInput"
          label="Name"
          name="name"
          required
      ></v-text-field>

      <v-text-field
          v-model="practiceInput"
          label="Practice"
          name="practice"
      ></v-text-field>

      <v-text-field
          v-model="competitiveInput"
          label="Competitive"
          name="competitive"
      ></v-text-field>

      <v-btn
          class="mr-4"
          color="success"
          @click="submit()">
        Submit
      </v-btn>
    </v-form>
    <br>
    <v-simple-table style="border: 1px solid black">
      <tr v-for="dataPoint in this.data" :key="dataPoint.name" style="border: 1px solid black">
        <td style="border: 1px solid black"> {{ dataPoint.name }}</td>
        <td style="border: 1px solid black"> {{ dataPoint.practice }}</td>
        <td style="border: 1px solid black">{{ dataPoint.competitive }}</td>
      </tr>
    </v-simple-table>
    <br>
    <apexchart :series="series" :options="chartOptions"></apexchart>
  </v-container>
</template>

<script>
class FormElement {
  constructor(name, practice, competitive) {
    this.name = name;
    this.practice = practice;
    this.competitive = competitive;
  }
}

//var data = [];

export default {
  name: 'form',
  data: () => ({
    data: [],
    nameInput: "",
    practiceInput: "",
    competitiveInput: "",
    series: [{
      name: "Practice",
      data: this.getPractice
    },
      {
        name: "Competitive",
        data: this.getCompetitive()
      }],
    chartOptions: {
      chart: {
        type: "bar",
        stacked: true,
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        categories: this.getNames
      }
    }
  }),
  created() {
    this.populateForm();
  },
  methods: {
    //
    processDataForm(name, practice, competitive) {
      this.name = name;
      this.practice = practice;
      this.competitive = competitive;

      let tempFormData = new FormElement(name, practice, competitive)
      console.log(tempFormData)
      this.data.push(tempFormData)
      console.log(this.data)
    },

    submit() {
      const name = this.nameInput;
      const practice = this.practiceInput;
      const competitive = this.competitiveInput;
      this.processDataForm(name, practice, competitive)
    },

    populateForm() {
      const hogan = new FormElement("Hogan", 40, 71);
      const deLange = new FormElement("de Lange", 29, 76);
      const vanDerGugten = new FormElement("Van der Gugten", 56, 40);
      const carey = new FormElement("Carey", 35, 78);
      const meschede = new FormElement("Meschede", 21, 47);
      const smith = new FormElement("Smith", 44, 15);
      const wagg = new FormElement("Wagg", 25, 23);
      const lloyd = new FormElement("Lloyd", 43, 45);
      const lawlor = new FormElement("Lawlor", 50, 0);

      this.data.push(hogan, deLange, vanDerGugten, carey, meschede, smith, wagg, lloyd, lawlor);

      console.log(this.data);
    },

    getNames(){
      const names = [];
      for (var dataPoint in this.data){
        names.push(dataPoint.name)
      }
      return names;
    },

    getPractice(){
      const practices = [];
      for (var dataPoint in this.data){
        practices.push(dataPoint.practice)
      }
      return practices;
    },

    getCompetitive(){
      const competitives = [];
      for (var dataPoint in this.data){
        competitives.push(dataPoint.competitive)
      }
      return competitives;
    }
  }
}
</script>