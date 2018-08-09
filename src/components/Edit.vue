<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Edit Task</h1>
    <form v-on:submit="updateCustomer">
        <div class="well">
            <h4>Who is projects ?</h4>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="name" v-model="customer.name">
            </div>
        </div>
        <div class="well">
            <h4>What you do?</h4>
            <div class="form-group">
                <label>Task</label>
                <input type="text" class="form-control" placeholder="task" v-model="customer.phone">
            </div>
        </div>

        <div class="well">
            <h4>When task handle?</h4>
            <div class="form-group">
                <label>Date</label>
                <input type="text" class="form-control" placeholder="date" v-model="customer.address">
            </div>
            
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
    import Alert from './Alert'
    export default {
    name: 'add',
    data () {
        return {
        customer: {},
        alert:''
        }
    },
    methods: {
        fetchCustomer(id){
            this.$http.get('http://slimapp/api/customer/'+id)
            .then(function(response){
                this.customer = response.body;
            });
        },
        updateCustomer(e){
            if(!this.customer.name || !this.customer.phone || !this.customer.address){
                this.alert = 'Please fill in all required fields';
            } else {
                let updCustomer = {
                    name: this.customer.name,
                    phone: this.customer.phone,
                    address: this.customer.address
                }
                this.$http.put('http://slimapp/api/customer/update/'+this.$route.params.id, updCustomer)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'Customer Updated'}});
                    });
                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    created: function(){
        this.fetchCustomer(this.$route.params.id);
    },
    components:{
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>