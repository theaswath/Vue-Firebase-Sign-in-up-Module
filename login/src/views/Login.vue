<template>
  <div
    id="login"
    class="alignCenter"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="Attempting To Authenticate"
    element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <el-row type="flex" align="middle">
      <el-card class="login-box loginCard-shadow" shadow="always">
        <el-col span="20" :offset="2">
          <el-row style="margin: 1em 0em">
            <el-col style="margin: 0.25em 0em">
              <span>
                <h1>Login</h1>
              </span>
            </el-col>
          </el-row>

          <el-form
            :model="login"
            :rules="rules"
            ref="loginForm"
            @keyup.enter.native="formValidation"
          >
            <el-form-item label prop="username" style="margin: 2em 0em">
              <el-input placeholder="Username" v-model="login.username" clearable></el-input>
            </el-form-item>

            <el-form-item label prop="password">
              <el-input placeholder="Password" v-model="login.password" show-password></el-input>
            </el-form-item>
          </el-form>

          <el-row type="flex" justify="start" style="margin-top: -1.5em;">
            <el-tooltip class="item" effect="light" placement="bottom">
              <div slot="content" style="text-align:center;">
                Due to privacy and technical reasons,
                <br />this button does nothing.
              </div>
              <el-button type="text" class="btnFontWt" style="color:#909399">Forogt Password</el-button>
            </el-tooltip>
          </el-row>
          <el-row type="flex" justify="end" align="top" style="margin: 0em 1.5em">
            <el-col :span="4">
              <el-button
                @click.native.prevent="formValidation()"
                type="primary"
                class="btnFontWt loginAnimation"
              >
                Login
                <i class="el-icon-right"></i>
              </el-button>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center" style="margin-top:1em; margin-bottom:-1em">
            <el-col>
              <router-link to="/register">
                <el-button type="text" class="btnFontWt">Don't have an account?</el-button>
              </router-link>
            </el-col>
          </el-row>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import $ from "jquery";
import fb from "../firebaseConfigFiles/firebaseInit";
export default {
  name: "Login",
  data() {
    return {
      fullscreenLoading: false,
      login: { username: "", password: "" },
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
            message: "Username length should be between 5 to 16.",
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
            message: "Password length should be between 5 to 16.",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},

  methods: {
    openError(error) {
      this.$message({
        showClose: true,
        message: error,
        type: "error",
        duration: 10000,
        center: true,
        offset: 100
      });
    },

    formValidation() {
      if (this.login.username == "") {
        this.openError("Username field is blank.");
      } else if (this.login.password == "") {
        this.openError("Password field is blank.");
      } else {
        console.log("Loader (Valid) is " + this.fullscreenLoading);
        this.fullscreenLoading = true;
        console.log("Loader is (Valid) " + this.fullscreenLoading);
        this.submitLogin();
      }
    },

    async submitLogin() {
      await fb
        .auth()
        .signInWithEmailAndPassword(
          this.login.username + "@dummyemail.com", //Firebase does not support usernames and I don't want your email address.
          this.login.password
        )
        .then(() => {
          console.log("Logged In");
          //Enable during debug
          console.log("Loader is (Submit) " + this.fullscreenLoading);
          this.fullscreenLoading = false;
          console.log("Loader is (Submit)" + this.fullscreenLoading);
          this.$router.replace("/");
          //Enable during deploy
          // window.location = 'http://www.example.com';
        })
        .catch(error => {
          console.log(error);
          this.fullscreenLoading = false;
          if (error.code == "auth/user-not-found") {
            this.openError(
              "This user does not exist. Please enter a valid username."
            );
            error = "";
            return;
          } else if (error.code == "auth/invalid-email") {
            error = "";
            return;
          } else if (error.code == "auth/email-already-in-use") {
            error = "";
            return;
          } else if (
            error.code == "auth/id-token-expired" ||
            error.code == "auth/id-token-revoked"
          ) {
            this.openError("Token Error. Please try again in a while.");
            error = "";
            return;
          } else {
            this.openError(
              "Unknown Error. Please try again later or raise an issue on Github."
            );
            error = "";
            return;
          }
        });
    },

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
  },

  mounted: function() {}
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
  height: 90vh;
  align-items: center;
  justify-content: center;
}

#login {
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
