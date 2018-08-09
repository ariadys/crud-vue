<template>
  <div class="details container">
    <router-link to="/" class="btn btn-info mt-2 pull-right">Back</router-link>
    <h1 class="page-header mt-5">Project : {{customer.name}}
        <span class="pull-right">
            <button class="btn btn-success" v-if="customer.status === 'waiting'" v-on:click="updateStatus(customer.id)">Complete</button>
            <router-link class="btn btn-primary" v-bind:to="'/edit/'+customer.id">Edit</router-link>
            <button class="btn btn-danger" v-on:click="deleteCustomer(customer.id)">Delete</button>
            </span>
    </h1>
    <hr/>
    <ul class="list-group">
            <li class="list-group-item">
              <span>Task :</span><br/>
            <b>{{customer.phone}}</b>
            </li>
        </ul>

        <ul class="list-group mt-2">
            <li class="list-group-item"> Date : <br/>
              <b>{{customer.address}}</b>
            </li>
        </ul>

        <ul class="list-group mt-2">
            <li class="list-group-item"> Status : <br/>
              <b><span class="badge badge-warning">{{customer.status}}</span></b>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'customerdetails',
  data () {
    return {
      customer: ''
    }
  },
  methods:{
      fetchCustomer(id){
          this.$http.get('http://slimapp/api/customer/'+id)
          .then(function(response){
            this.customer = response.body;
          });
      },
      updateStatus(id){
                let updCustomer = {
                    status: "complete"
                }
                this.$http.put('http://slimapp/api/customer/done/'+id, updCustomer)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'Task Update'}});
                    });
                e.preventDefault();
        },
      deleteCustomer(id){
          this.$http.delete('http://slimapp/api/customer/delete/'+id)
          .then(function(response){
            this.$router.push({path: '/', query: {alert: 'Customer Deleted'}});
          });
      }
  },
  created: function(){
      this.fetchCustomer(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>