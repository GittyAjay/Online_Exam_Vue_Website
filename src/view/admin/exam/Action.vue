<template>
    <div>
        <b-icon class="m-2" icon="pencil-square" variant="success" v-on:click="edit()"></b-icon>
        <b-icon class="m-2" icon="columns-gap" variant="warning" v-on:click="preview()"></b-icon>
    </div>
</template>
<script>
    import Vue from "vue";
    export default Vue.extend({
        data() {
            return {
                examData:{
                    id:"",
                    name:"",
                },
            }
        },
        methods:{
            preview()
            {
                console.log("preview customer is called");
                this.$router.push({name:"customerForm",params:{data:this.examData.id}})
            },
            edit()
            {
                console.log("edit customer is  button is clicked");
                this.$router.push({name:'edit-exam',params:{examId:this.examData.id,}})
            },
        },
        created() {
            this.examData.id = this.params.node.data.id;
            console.log('created');
            console.log(this.params.node.data.id);
        },
    });
</script>
