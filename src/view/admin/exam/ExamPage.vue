<template>
  <div style="height: 100%;">
    <div>
  <b-navbar class="sticky-top" toggleable="lg" type="dark" variant="info">
    <!-- <b-navbar-brand href="#">
        <i class="fa fa-angle-left" aria-hidden="true"  @click="$router.go(-1)"></i>
          </b-navbar-brand> -->
       <b-navbar-brand href="#"><h6>Exam</h6></b-navbar-brand> 

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2"  @input="onFilterTextChange" placeholder="Search"></b-form-input>
        
        </b-nav-form> 
        <b-button  size="sm" @click="createNew()" variant="danger">New Exam</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    
    <ag-grid-vue
      id="myGrid"
      class="ag-theme-alpine ag-payment"
      :columnDefs="columnDefs"
      :rowData="rowData"
      animateRows
      :pagination="true"
      :paginationAutoPageSize="true"
      :gridOptions="gridOptions"
      :v-model="rowData"
      rowSelection="multiple"
    />
  </div>
</template>
<script>
import { AgGridVue } from "ag-grid-vue";
import moment from "moment-timezone";
import { db } from "../../../plugins/firebase";
import firebase from 'firebase';
import Action from "./Action";


export default {
  name: "Grid",
  data() {
    return {
      gridOptions: null,
      columnDefs: null,
       exam: {
        banner: '/banner.jpg',
        classes:null,
        created: firebase.firestore.Timestamp.now(),
        description: "Sample Description",
        mrp: 0,
        name: "",
        price: 0,
        language:'English',
        status: 'Draft',
        attemptCount:10,
        startTime:null,
        isPause:false,
        sections:[],
        duration:120,

      }
    };
  },
  methods: {
    editExam(id) {

      this.$router.push({
        name: "edit-exam",
        params: { examId: id }
      });
    },
    addNew() {
      this.exams.forEach(element => {
        db.collection("Exams")
          .add(element)
          .then(res => {
            console.log(res);
          });
      });
    },
    createNew() {
      this.$dialog
        .prompt({
          title: "Want to create new exam?",
          body: "Enter exam name you can change it leter?",
          promptHelp: 'Type exam name in the box below and click "[+:okText]"'
        })
        .then(dialog => {
          this.exam.name = dialog.data;
          if(dialog.data!=''){
            db.collection("Exams")
            .add(this.exam)
            .then(ref => {
              this.$router.push({name: "edit-exam", params: { examId: ref.id }});
            })
            .catch(err => {
              console.log(err);
            });
          }else{
            this.$dialog.alert(dialog.data || "OOPS! Exam name can not be empty");
          }
        })
        .catch(() => {
          
        });
    },
    navigateTo(name) {
      this.$router.push({ name: name });
    },
    onFilterTextChange() {
      this.gridOptions.api.setQuickFilter(
        document.getElementById("filter-text-box").value
      );
    }
  },
  components: {
    AgGridVue
  },
  beforeMount() {
    this.gridOptions = {};
    this.columnDefs = [
      {
        headerName: "Exam Name",
        field: "name",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 2
      },
      {
        headerName: "Class",
        field: "classes",
        sortable: true,
        filter: true,
        resizable: true,
        maxWidth: 140 ,
      },
       {
        headerName: "Duration",
        field: "duration",
        sortable: true,
        filter: true,
        resizable: true,
        maxWidth: 140 ,
      },
      {
        headerName: "Price",
        field: "price",
        sortable: true,
         cellRenderer: function (params) {
          return params.data.price+'₹';
        },
        filter: true,
        resizable: true,
        maxWidth: 140 ,
      },
      {
        headerName: "Start Date",
        field: "startTime",
        cellRenderer: function (params) {
          return (params.data.startTime)? moment(params.data.startTime.seconds * 1000).format("DD MMM YYYY HH:mm A"): "NA";
        },
        sortable: true,
        filter: true,
        flex: 2,
        resizable: true
      },
      {
        headerName: "Date",
        field: "created",
        cellRenderer: function (params) {
          return  (params.data.created)? moment(params.data.created.seconds * 1000).format("DD MMM YYYY HH:mm A"): "NA";
        },
        sortable: true,
        filter: true,
        flex: 2,
        resizable: true
      },
      {
        headerName: "Status",
        field:'status',
        sortable: true,
        filter: true,
        flex: 1,
        resizable: true,

      },
       {
        headerName: "Action",
        sortable: true,
        filter: true,
        flex: 1,
        resizable: true,
        cellRendererFramework: Action,
        colId: 'params',
      },
    ];
  },
  computed: {
    rowData() {
      return this.$store.state.exams;
    }
  },
  created: function() {
    this.$store.dispatch("bindExam");
  }
};
</script>

<style>
.ag-payment {
  width: 100%;
  height: -webkit-calc(100% - 54px);
  height: -moz-calc(100% - 54px);
  height: calc(100% - 54px);
}
.data-action {
  height: 48px;
  width: 48px;
  margin-bottom: 4px;
}
</style>
