<template>
  <v-data-table
    :headers="headers"
    :items="ontalogyData"
    dense
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Recomendation Details </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              @click="(editedIndex = -1), (editedItem = {})"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Add New Recomendation Detais
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.case"
                      label="Case"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.disidedCriteria"
                      label="Decided criteria"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                   <v-col>
                    <v-text-field
                      v-model="editedItem.catogory"
                      label="Catagory"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
               <v-row dense>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.recomendationEn"
                      label="Recomendation(English)"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.recomendationSi"
                      label="Recomendation(Sinhala)"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-checkbox
                  v-model="editedItem.isConform"
                  label="Conform Question"
                ></v-checkbox>
               
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
   ontalogyData: [],
    headers: [
      {
        text: "Case",
        align: "start",
        sortable: false,
        value: "case",
      },
      { text: "Decided Criteria", value: "disidedCriteria" },
      { text: "Recomendation(English)", value: "recomendationEn" },
      { text: "Recomendation(Sinhala)", value: "recomendationSi" },
      { text: "Catagory", value: "catogory" },
      {
        text: "Is Confrom",
        align: "start",
        sortable: false,
        value: "isConform",
      },

      { text: "Actions", value: "actions", sortable: false },
    ],

    editedIndex: -1,
    editedItem: {
        isConform:false
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  mounted() {
    this.getOntalogyData();
  },

  methods: {
    getOntalogyData() {
      this.$axios.$get(`/ontalogy`).then(
        (res) => {
          console.log(res);
          this.ontalogyData = res;
        },
        (error) => {}
      );
    },

    editItem(item) {
      this.editedIndex = 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$axios.$delete("/ontalogy/" + this.editedItem._id).then(
        (res) => {
          this.closeDelete();
          this.getOntalogyData();
        },
        (error) => {}
      );
    },

    close() {
      this.dialog = false;
      this.editedIndex = -1;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.editedIndex = -1;
    },

    save() {
    this.editedItem.isConform ? true:false
    console.log(this.editedItem);
      if (this.editedIndex > -1) {
        this.$axios
          .$patch("/ontalogy/" + this.editedItem._id, this.editedItem)
          .then(
            (res) => {
              this.close();
              this.getOntalogyData();
            },
            (error) => {}
          );
      } else {
        this.$axios.$post("/ontalogy", this.editedItem).then(
          (res) => {
            this.close();
            this.getOntalogyData();
          },
          (error) => {}
        );
      }
    },
  },
};
</script>

<style></style>
