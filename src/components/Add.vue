<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Add Task</h1>
    <form v-on:submit="addCustomer">
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
        addCustomer(e){
            if(!this.customer.name || !this.customer.phone || !this.customer.address){
                this.alert = 'Please fill in all required fields';
            } else {
                let newCustomer = {
                    name: this.customer.name,
                    phone: this.customer.phone,
                    address: this.customer.address,
                    status: "waiting"
                }
                this.$http.post('http://slimapp/api/customer/add', newCustomer)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'Customer Added'}});
                    });
                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    components: {
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>