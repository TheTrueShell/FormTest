<template>
  <v-container>
    <v-form
        id="data-form"
        ref="data-form"
    >
      <v-row align="center">
        <v-col>
          <v-text-field
              v-model="nameInput"
              label="Name"
              name="name"
              required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
              v-model="practiceInput"
              label="Overs Bowled (Practice)"
              name="practice"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
              v-model="competitiveInput"
              label="Over Bowled (Competitive)"
              name="competitive"
          ></v-text-field>
        </v-col>
        <v-col align="center">
          <v-btn
              class="mr-4"
              color="success"
              @click="submit">
            Submit
          </v-btn>
          <v-btn class="mr-4"
                 color="warning"
                 @click="populateForm">
            Load Example Data
          </v-btn>
          <v-btn class="mr-4"
                 color="error"
                 @click="clearData">
            Reset
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col>
        <v-simple-table>
          <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Overs Bowled (Practice)
            </th>
            <th>
              Overs Bowled (Competitive)
            </th>
          </tr>
          </thead>
          <tr v-for="dataPoint in this.data" :key="dataPoint.name">
            <td> {{ dataPoint.name }}</td>
            <td> {{ dataPoint.practice }}</td>
            <td>{{ dataPoint.competitive }}</td>
          </tr>
        </v-simple-table>
      </v-col>
      <v-col>
        <apexchart ref="chart" :options="chartOptions" :series="series"></apexchart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
class FormElement {
  constructor(name, practice, competitive) {
    this.name = name;
    this.practice = practice;
    this.competitive = competitive;
  }

  getName() {
    return this.name;
  }

  getPractice() {
    return this.practice;
  }

  getCompetitive() {
    return this.competitive;
  }
}

//var data = [];

export default {
  name: 'formTest',
  data: () => ({
    data: [],

    nameInput: "",
    practiceInput: "",
    competitiveInput: "",

    exampleDataLoaded: false,

    series: [{name: "Practice", data: []}, {name: "Competitive", data: []}],
    chartOptions: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Data Chart'
      },
      xaxis: {
        type: "category",
        categories: [],
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
  }),
  created() {
    //this.populateForm();
  },
  methods: {

    //Submits the user inputted data to be placed in the data array. Performs checks for blank entries and duplicate entries.
    submit() {
      const name = this.nameInput;
      const practice = this.practiceInput;
      const competitive = this.competitiveInput;
      if ((name === "" || practice === "" || competitive === "")) {
        console.log("Please complete the form.")
      } else if (!this.checkDuplicates(name)) {
        this.processDataForm(name, practice, competitive)
      }
      this.clearInputs();
    },

    //Creates a FormElement instance and enters said instance into the data array.
    processDataForm(name, practice, competitive) {
      this.name = name;
      this.practice = practice;
      this.competitive = competitive;

      let tempFormData = new FormElement(name, practice, competitive)
      this.data.push(tempFormData)

      this.updateChart();
    },

    //Populates the table with example data.
    populateForm() {
      if (!this.exampleDataLoaded) {
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
        this.exampleDataLoaded = true;

        this.updateChart();
      }
    },

    //Checks if the user input is already found in the array, using Name as the key.
    checkDuplicates(keyInput) {
      for (var dataPoint of this.data) {
        if (dataPoint.name.includes(keyInput)) {
          return true;
        }
      }
      return false;
    },

    //Clears the table and resets vars.
    clearData() {
      this.data = [];
      this.exampleDataLoaded = false;
      this.updateChart();
      this.clearInputs()
    },

    clearInputs() {
      this.nameInput = "";
      this.practiceInput = "";
      this.competitiveInput = "";
    },

    testReturns() {
      console.log(this.getNames())
      console.log(this.getPractices())
      console.log(this.getCompetitives())
      alert("Check logs.")
    },

    //Returns an array of all names found in the data array.
    getNames() {
      //debugger;
      const names = [];
      for (var dataPoint of this.data) {
        names.push(dataPoint.getName())
      }
      return names;
    },

    //Returns an array of all practices found in the data array.
    getPractices() {
      const practices = [];
      for (var dataPoint of this.data) {
        practices.push(dataPoint.getPractice())
      }
      return practices;
    },

    //Returns an array of competitives found in the data array.
    getCompetitives() {
      const competitives = [];
      for (var dataPoint of this.data) {
        competitives.push(dataPoint.getCompetitive())
      }
      return competitives;
    },

    //Returns an array of Practice and Competitive JS Objects
    updateChart() {
      var apexObject = {xaxis: {type: "category", categories: ["Test"]}};
      const chartPractice = {name: "Practice", data: this.getPractices()};
      const chartCompetitive = {name: "Competitive", data: this.getCompetitives()};
      const seriesOut = [chartPractice, chartCompetitive];
      apexObject.xaxis.categories = this.getNames();
      this.chartOptions = apexObject;
      this.series = seriesOut;
    }
  },
}
</script>