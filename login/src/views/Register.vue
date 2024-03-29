<template>
  <div
    id="register"
    class="alignCenter vh-90"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="Checking Registration"
    element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <el-row type="flex" align="middle" class="alignCenter">
      <el-card class="login-box loginCard-shadow" shadow="always">
        <el-col span="20" :offset="2">
          <el-row style="margin: 1em 0em">
            <el-col style="margin: 0em 0em">
              <span>
                <h1>Register</h1>
              </span>
            </el-col>
          </el-row>

          <el-form
            :model="registration"
            :rules="rules"
            ref="regForm"
            @keyup.enter.native="formValidation"
          >
            <el-form-item label prop="username" style="margin: 2em 0em">
              <el-input placeholder="Username" v-model="registration.username" clearable></el-input>
            </el-form-item>

            <el-form-item label prop="password">
              <el-input placeholder="Password" v-model="registration.password" show-password></el-input>
            </el-form-item>
          </el-form>

          <el-row type="flex" justify="end" align="top" style="margin: 1em 3em 0em 3em">
            <el-col :span="4">
              <el-button
                type="primary"
                class="btnFontWt loginAnimation"
                @click.native.prevent="formValidation"
              >
                Register
                <i class="el-icon-right"></i>
              </el-button>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center" style="margin-top:1em; margin-bottom:-1em">
            <el-col>
              <router-link to="/login">
                <el-button type="text" class="btnFontWt">Have an account?</el-button>
              </router-link>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col>
              <el-tooltip class="item" effect="light" placement="bottom">
                <div slot="content" style="text-align:center;">
                  Registering helps me keep track of how many visits this project has.
                  <br />Use lazyUser as username and password if you'd like to skip.
                </div>
                <el-button
                  type="text"
                  style="color:#909399; font-weight:500;"
                  class="btnFontWt"
                >Don't want to create an accountt?</el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import fb from "../firebaseConfigFiles/firebaseInit";
// @ is an alias to /src
export default {
  name: "Register",
  data() {
    return {
      fullscreenLoading: false,
      registration: {
        username: "",
        password: "",
        name: ""
      },

      rules: {
        username: [
          {
            required: true,
            message: "Please enter your username.",
            trigger: "blur"
          },
          {
            min: 5,
            max: 16,
            message: "Username length should be between 5 to 16 charecters.",
            trigger: "blur"
          }
        ],

        password: [
          {
            required: true,
            message: "Please enter your password.",
            trigger: "change"
          },

          {
            min: 5,
            max: 16,
            message: "Recommended password length should be between 5 to 16.",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},

  methods: {
    formValidation() {
      if (this.registration.username == "") {
        this.openError("Username field is blank.");
      } else if (this.registration.password == "") {
        this.openError("Password field is blank.");
      } else {
        this.submitReg();
      }
    },

    openError(error) {
      this.$message({
        showClose: true,
        message: error,
        type: "error",
        duration: 5000,
        center: true,
        offset: 100
      });
    },
    async submitReg() {
      this.fullscreenLoading = true;
      await fb
        .auth()
        .createUserWithEmailAndPassword(
          this.registration.username + "@dummyemail.com", //Firebase does not support usernames and I don't want your email address.
          this.registration.password
        )
        .then(() => {
          console.log("Registered");
          //Enable during debug
          console.log("Loader is (Submit) " + this.fullscreenLoading);
          this.fullscreenLoading = false;
          console.log("Loader is (Submit)" + this.fullscreenLoading);
          //Make another router page
          this.$router.replace("/registeration-success");
        })
        .catch(error => {
          this.fullscreenLoading = false;
          console.log(error);
          if (error.code == "auth/user-not-found") {
            this.openError(
              "This user does not exist. Please enter a valid username."
            );
            error = "";
            console.log(error);
            return;
          } else if (error.code == "auth/invalid-email") {
            error = "";
            console.log(error);
            return;
          } else if (error.code == "auth/email-already-in-use") {
            this.openError(
              "Username already exists. Please try another username."
            );
            error = "";
            console.log(error);
            return;
          } else if (
            error.code == "auth/id-token-expired" ||
            error.code == "auth/id-token-revoked"
          ) {
            this.openError("Token Error. Please try again in a while.");
            error = "";
            console.log(error);
            return;
          } else {
            this.openError(
              "Unknown Error. Please try again later or raise an issue on Github."
            );
            error = "";
            console.log(error);
            return;
          }
        });
    },

    //Background Gradient Animation Functions
    animatedGradientBG() {
      var colors = new Array(
        [255, 154, 157],
        [250, 208, 196],

        [255, 236, 210],
        [252, 182, 159],

        [255, 154, 157],
        [254, 207, 239],

        [194, 233, 251],
        [161, 196, 253],

        [102, 126, 234],
        [118, 75, 162],

        [102, 166, 255],
        [72, 197, 239],

        [128, 208, 199],
        [19, 84, 122],

        [255, 117, 140],
        [255, 126, 179]
      );

      var step = 0;
      //color table indices for:
      // current color left
      // next color left
      // current color right
      // next color right
      var colorIndices = [0, 1, 2, 3];

      //transition speed
      var gradientSpeed = 0.006;

      function updateGradient() {
        var c0_0 = colors[colorIndices[0]];
        var c0_1 = colors[colorIndices[1]];
        var c1_0 = colors[colorIndices[2]];
        var c1_1 = colors[colorIndices[3]];

        var istep = 1 - step;
        var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        var color1 = "#" + ((r1 << 16) | (g1 << 8) | b1).toString(16);

        var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        var color2 = "#" + ((r2 << 16) | (g2 << 8) | b2).toString(16);

        $("body")
          .css({
            background:
              "-webkit-gradient(linear, left top, right top, from(" +
              color1 +
              "), to(" +
              color2 +
              "))"
          })
          .css({
            background:
              "-moz-linear-gradient(left, " +
              color1 +
              " 0%, " +
              color2 +
              " 100%)"
          })
          .css({
            // "-webkit-text-fill-color": "transparent",
            // "-webkit-background-clip": "text"
          });

        step += gradientSpeed;
        if (step >= 1) {
          step %= 1;
          colorIndices[0] = colorIndices[1];
          colorIndices[2] = colorIndices[3];

          //pick two new target color indices
          //do not pick the same as the current one
          colorIndices[1] =
            (colorIndices[1] +
              Math.floor(1 + Math.random() * (colors.length - 1))) %
            colors.length;
          colorIndices[3] =
            (colorIndices[3] +
              Math.floor(1 + Math.random() * (colors.length - 1))) %
            colors.length;
        }
      }

      setInterval(updateGradient, 10);
    },
    localStoreSetter() {
      if (this.$router.currentRoute.name == "Home") {
        return console.log("Home");
      }
      if (sessionStorage.getItem("routeCheck") == null) {
        sessionStorage.clear();
        sessionStorage.setItem("routeCheck", 1);
      } else if (sessionStorage.getItem("routeCheck") == 1) {
        {
          sessionStorage.clear();
          sessionStorage.setItem("routeCheck", 0);
        }
      }
      // if ($this.$router.currentRoute.name == "Login") {
      //   sessionStorage.setItem("prevRoute", true);
      // } else {
      //   sessionStorage.setItem("prevRoute", true);
      // }
    },
    routeCheck() {
      this.localStoreSetter();
      console.log(sessionStorage.getItem("routeCheck"));
      if (sessionStorage.getItem("routeCheck") == 1) {
        this.animatedGradientBG();
        this.localStoreSetter();
      }
    }
  },

  created: function() {
    this.routeCheck();
    window.onbeforeunload = function() {
      sessionStorage.removeItem("routeCheck");
    };
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 700px;
  height: 500px;
}
.loginCard-shadow {
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2) !important;
}

.CardHead {
  font-weight: 700;
  font-size: 2em;
  color: #333333;
  // align-items: center;
}

.alignCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vh-90 {
  height: 90vh;
}

#register {
  text-align: center;
}

.btnFontWt {
  font-weight: 700;
  letter-spacing: 0.03em;
}

.loginAnimation {
  i {
    padding-left: 0.8em;
    transition: 0.3s;
  }
  &:hover {
    i {
      padding-left: 2em;
    }
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
