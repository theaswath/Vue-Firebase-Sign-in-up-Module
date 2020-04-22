<template>
  <div class="home" style="text-align: center;">
    <el-row>
      <el-col :span="24">
        <h1>
          Logged IN:
          <br />
          <span v-if="logged">Yes</span>
          <span v-else>No</span>
          <br />
          <el-button @click="logOut()">Signout</el-button>
        </h1>
        <p>
          This is for the standalone login module. Please visit
          <a href="https://github.com/theaswath/Daily-VUeI" target="_blank">Daily VUe</a> repo for the actual project.
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import fb from "../firebaseConfigFiles/firebaseInit";
export default {
  name: "Home",
  data() {
    return { logged: false };
  },

  components: {},

  methods: {
    async logOut() {
      try {
        const userCheck = await fb.auth().signOut();
        console.log("Usercheck is" + userCheck);

        this.$router.push("login");
      } catch (err) {
        console.log("Error is " + err);
      }
    }
  },

  created() {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.logged = true;
        console.log("Logged is " + this.logged);
      } else {
        this.logged = false;
        console.log("Logged is " + this.logged);
      }
    });
  }
};
</script>
