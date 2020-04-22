<template>
  <div id="register" class="alignCenter vh-90">
    <el-row type="flex" align="middle">
      <el-card class="login-box alignCenter loginCard-shadow" shadow="always">
        <el-col span="20" :offset="2">
          <el-row>
            <el-col>
              <span>
                <h1>Registeration Complete</h1>
              </span>
            </el-col>
            <el-col>
              <el-button type="primary" @click="gotoLogin()" class="btnFontWt loginAnimation">
                Click Here To Login
                <i class="el-icon-right"></i>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
// @ is an alias to /src
export default {
  name: "RegisterationSuccess",
  data() {
    return {};
  },
  components: {},

  methods: {
    gotoLogin() {
      this.$router.push("/login");
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
  height: 300px;
  transition: 1s;
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
