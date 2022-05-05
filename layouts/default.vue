<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      color="indigo lighten-4"
      app
    >
      <v-list v-if="isMoh">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="isDocter">
        <v-list-item
          v-for="(item, i) in docterItem"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <nuxt-link to="/">
        <v-btn icon @click="toogleIsDocter(false),toogleIsMoh(false)">
          <v-icon>mdi-logout</v-icon>
        </v-btn></nuxt-link
      >
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} AIMind team</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState ,mapActions } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "MOH Details",
          to: "/moh",
        },
        {
          icon: "mdi-chart-bubble",
          title: "PHI Details",
          to: "/phi",
        },
      ],
       docterItem: [
        {
          icon: "mdi-apps",
          title: "Recomendations Details",
          to: "/recomendation",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Genaral Details",
          to: "/genaral",
        },
      ],
      miniVariant: false,
      title: "AImind chatbot Admin pannel",
    };
  },
    computed: {
     ...mapState(["isDocter","isMoh"]),
  },
  methods:{
        ...mapActions([
      "toogleIsMoh",
      "toogleIsDocter",
    ]),
  }
};
</script>
