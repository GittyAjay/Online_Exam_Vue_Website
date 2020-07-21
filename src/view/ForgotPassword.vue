<template>

    <div>
        <Header/>
        <div class="row justify-content-center">
     
      <div class="col-md-5">
   
          
          <div class="card-body">
        <form @submit.prevent="forgetPassword">
            <h3>Forgot Password</h3>

            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Reset password</button>
        </form>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
import firebase from "firebase";
import Header from "./Header.vue";

export default {
  data() {
    return {
      user: {   
        email: ''
      }
    };
  },
  components: {
    Header
  },
  methods: {
    forgetPassword() {
        firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
            alert('Check your registered email to reset the password!')
            this.user = {   
              email: ''
            }
        }).catch((error) => {
          alert(error)
        })
    }
  }
};
</script>