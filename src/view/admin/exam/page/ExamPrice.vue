<template>

  <div class="row d-flex justify-content-center">
    <div class="col-10">
    <b-card  bg-variant="secondary" text-variant="white" title="Exam Price">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
        <p>Info Page Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus minima necessitatibus est laborum porro ut blanditiis dignissimos, dolorem quod quidem sint modi. In laudantium aperiam reiciendis libero laboriosam facilis ratione!</p>
      </b-card-text>
      <div class="row my-3">
        <b-input-group class="col-3" style="min-width: 250px;" prepend="PRICE" append=".00">
          <b-form-input v-model.number="amount.price" value="100" type="number" class="text-right"></b-form-input>
        </b-input-group>
        <b-input-group class="col-3" style="min-width: 250px;" prepend="MRP" append=".00">
          <b-form-input v-model.number="amount.mrp" value="100" type="number" class="text-right"></b-form-input>
        </b-input-group>
        <!-- <b-input placeholder="Price" class="col-lg-2 col-sm-5 m-2" prepend="PRICE" append=".00" v-model.number="amount.price" type="number"></b-input>
        <b-input placeholder="MRP" class="col-lg-2 col-sm-5 m-2" prepend="MRP" append=".00" v-model.number="amount.mrp" type="number"></b-input> -->
        <b-button variant="primary" class="col-3" @click="savePrice">Save Price</b-button>
      </div>
    </b-card>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      amount: {
        price: 0,
        mrp: 0
      }
    };
  },
  computed: {
    exam() {
      return this.$store.state.newExam;
    }
  },
  watch: {
    exam: {
      immediate: true,
      handler() {
        this.amount.mrp = this.exam.mrp;
        this.amount.price = this.exam.price;
      }
    }
  },
  methods: {
    savePrice() {
      this.$store.state.newExam.price = this.amount.price;
      this.$store.state.newExam.mrp = this.amount.mrp;   
      this.$store.commit("saveExam");    
    }
  }
};
</script>