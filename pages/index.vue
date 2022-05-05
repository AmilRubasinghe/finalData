<template>
  <v-container>
    <v-layout wrap>
      <v-flex sm12 md10 align="center" justify-center>
        <v-card elevation="4" light tag="section">
          <v-card-title>
            <v-layout align-center justify-space-between>
              <h3 class="headline">
                {{ platformName }}
              </h3>
              <v-flex>
                <!-- <v-img
                  :alt="platformName"
                  class="ml-3"
                  contain
                  height="48px"
                  position="center right"
                  src="https://www.mobygames.com/images/i/12/25/1435075.png"
                ></v-img> -->
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>Sign in with your username and password:</p>
            <v-form>
              <v-text-field
                outline
                label="Username"
                type="text"
                v-model="username"
              ></v-text-field>
              <v-text-field
                outline
                hide-details
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
            <v-spacer></v-spacer>
            <v-btn @click="login" color="info" :large="$vuetify.breakpoint.smAndUp">
              <v-icon left>mdi-account-outline</v-icon>
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState ,mapActions } from "vuex";
export default {
  layout: "nodrawer",
  data() {
    return {
      darkTheme: true,
      platformName: "AIMIND DATA CHANGE PLATFORM",
      password: null,
      username: null,
    };
  },

  methods:{
     ...mapActions([
      "toogleIsMoh",
      "toogleIsDocter",
    ]),
    login(){
      if(this.username=="moh" && this.password == "moh"){
        this.$router.push({ path: '/moh' })
        this.toogleIsMoh(true)
        console.log("test1");
      }
      else if(this.username=="docter" && this.password == "docter"){
         this.$router.push({ path: '/recomendation' })
        this.toogleIsDocter(true)
        console.log("test2");
      }
    }
  }
};
</script>
<style scoped>
.v-card {
  border-radius: 4px;
}

.v-card__title {
  text-transform: uppercase;
}
</style>
