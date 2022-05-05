<template>
  <v-data-table
    :headers="headers"
    :items="mohData"
    dense
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Moh Office Details </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" @click="editedIndex = -1, editedItem={}" dark class="mb-2" v-bind="attrs" v-on="on">
              Add New MOH Detais
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
                      v-model="editedItem.name"
                      label="Moh ofice name"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.district"
                      label="District"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.mobile"
                      label="Mobile NO"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                 <v-row dense>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.address"
                      label="Address"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="my-2">For Sinhala Language</div>
                <v-row dense>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.sinName"
                      label="Moh ofice name(Sinhala)"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.sinDistrict"
                      label="District(Sinhala)"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.sinAddress"
                      label="Address(Sinhala)"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
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
    mohData:[],
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "District", value: "district" },
      { text: "Mobile Number", value: "mobile" },
      { text: "Address", value: "address" },
      {
        text: "Name(Sinhala)",
        align: "start",
        sortable: false,
        value: "sinName",
      },
      { text: "District(Sinhala)", value: "sinDistrict" },
       { text: "Address(Sinhala)", value: "sinAddress" },
      { text: "Email", value: "email" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {},

  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  mounted() {
    this.getMohData();
  },


  methods: {
        getMohData() {
      this.$axios.$get(`/moh`).then(
        (res) => {
          console.log(res);
          this.mohData = res;
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
             this.$axios.$delete('/moh/'+this.editedItem._id).then(
        (res) => {
           this.closeDelete();
            this.getMohData();
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
      if (this.editedIndex > -1) {
        this.$axios.$patch('/moh/'+this.editedItem._id,this.editedItem).then(
        (res) => {
           this.close();
            this.getMohData();
        },
        (error) => {}
      );
      } else {
        this.$axios.$post('/moh',this.editedItem).then(
        (res) => {
           this.close();
            this.getMohData();
        },
        (error) => {}
      );
      }
    
    },
  },
};
</script>

<style></style>
