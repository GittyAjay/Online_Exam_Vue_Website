<template>
  <div class="back">
    <div class="c-app d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol md="8" mt="200">
            <CCardGroup>
              <CCard class="p-4">
                <CCardBody>
                  <CForm>
                    <div v-if="user==null && !forgetPasswordState">
                      <h1>Login</h1>
                      <p class="text-muted m-2">Sign In to your account</p>
                      <CInput
                        placeholder="Username"
                        autocomplete="username email"
                        v-model="form.email"
                      >
                        <template #prepend-content>
                          <i class="fa fa-user icon-prop"></i>
                        </template>
                      </CInput>
                      <CInput
                        placeholder="Password"
                        type="password"
                        v-model="form.password"
                        autocomplete="curent-password"
                      >
                        <template #prepend-content>
                          <i class="fa fa-lock icon-prop"></i>
                        </template>
                      </CInput>
                    </div>
                    <div v-if="user!=null && !forgetPasswordState">
                      <div class="d-flex justify-content-center mb-3">
                        <b-avatar src="https://placekitten.com/300/300" size="6rem"></b-avatar>
                      </div>
                      <div class="d-flex justify-content-center mb-3">
                        <h2>Welcome Back</h2>
                      </div>
                      <b-button block variant="success" @click="gotoDashboard()">Dashboard</b-button>
                      <b-button block variant="warning" @click="signout()">SignOut</b-button>
                    </div>
                    <CRow>
                      <div v-if="user==null && !forgetPasswordState">
                        <CCol col="6" class="text-left">
                          <CButton color="primary" class="px-4" @click="submit">Login</CButton>
                        </CCol>
                      </div>
                      <CCol col="6" class="text-right">
                        <div v-if="user==null && !forgetPasswordState">
                          <CButton
                            color="link"
                            class="px-0"
                            @click="createNew()"
                          >Forgot password?</CButton>
                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                color="primary"
                text-color="white"
                class="text-center py-5 d-md-down-none"
                body-wrapper
              >
                <CCardBody>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <CButton color="light" variant="outline" size="lg">Register Now!</CButton>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      actionCodeSettings: {
        url: "https://www.example.com/finishSignUp?cartId=1234",
        handleCodeInApp: true,
        iOS: {
          bundleId: "com.example.ios"
        },
        android: {
          packageName: "com.example.android",
          installApp: true,
          minimumVersion: "12"
        },
        dynamicLinkDomain: "example.page.link"
      },
      error: null,
      forgetPasswordState: false,
      forgetemail: "",
      visibility: true,
      submitedEmail:''
    };
  },
  methods: {
     createNew() {
      this.$dialog
        .prompt({
          title: "Forget Password?",
          body: "Enter email you can change it leter?",
          promptHelp:
            'Type section email in the box below and click "[+:okText]"'
        })
        .then(dialog => {
          this.submitedEmail = dialog.data;
          if (dialog.data != "") {
                firebase
              .auth()
              .sendPasswordResetEmail(this.submitedEmail)
              .then(() => {
                console.log("send succesfully");
              });
          } else {
            this.$dialog.alert(
              dialog.data || "OOPS! section name can not be empty"
            );
          }
        });
    },
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.sucessToast();
          this.$store.commit("setUser");
          this.$router.replace({ name: "Dashboard" });
        })
        .catch(err => {
          console.log("error");
          this.errorToast(err.message);
          this.SignIn = "SignIn";
        });
    },
    errorToast(msg) {
      this.toastCount++;
      this.$bvToast.toast(msg, {
        title: "Error Login",
        autoHideDelay: 5000,
        appendToast: false,
        variant: "danger"
      });
    },
     sucessToast() {
      this.toastCount++;
      this.$bvToast.toast('Sucesfull', {
        title: "Login",
        autoHideDelay: 5000,
        appendToast: false,
        variant: "success",
        toaster: 'b-toaster-bottom-right',
        
      });
    },
    
    emailVarification() {
      this.visibility = false;
      firebase
        .auth()
        .sendSignInLinkToEmail(this.form.email, this.actionCodeSettings)
        .then(function() {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem("emailForSignIn", this.form.email);
        })
        .catch(function(error) {
          // Some error occurred, you can inspect the code: error.code
          console.log(error);
        });
    },
    gotoDashboard() {
      this.$router.replace({ name: "Dashboard" });
    },
    signout() {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            navigator.pop();
          },
          function(error) {
            console.log(error);
          }
        );
    },
    forgetPassword() {
      this.visibility = true;
      if (this.forgetemail != "")
        firebase
          .auth()
          .sendPasswordResetEmail(this.form.email)
          .then(() => {
            this.visibility = false;
            console.log("send succesfully");
          });
    }
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
<style >
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-group {
  display: flex;
  flex-flow: col wrap;
  margin-top: 120px;
}
.icon-prop {
  color: rgb(184, 179, 179);
}
.back {
  background-color: hotpinks;
}
</style>
