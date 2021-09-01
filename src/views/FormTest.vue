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
  </v-container>
</template>

<script>
//import Vue from "vue";

class FormElement {
  constructor(name, practice, competitive) {
    this.name = name;
    this.practice = practice;
    this.competitive = competitive;
  }
}

var data = [];

export default {
  name: 'form',
  data: () => ({
    nameInput: "",
    practiceInput: "",
    competitiveInput: ""
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
      data.push(tempFormData)
      console.log(data)
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

      data.push(hogan, deLange, vanDerGugten, carey, meschede, smith, wagg, lloyd, lawlor);

      console.log(data);
    }
  }
}
</script>