<template>
<v-app>
<v-container>
<v-flex xs12>
  <v-card>
    <v-card-title class="blue white--text">
    <div class="container">
      <div class="row">
      <div class="col-md-4 col-12">
      <h3 class="headline mb-0">Table Data</h3>
      <div color="grey lighten-2">Export with PDF, Print and more.</div>
      </div>
      <div class="col-md-4 col-12">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        class="white--text"
        single-line
        dark
        hide-details
      ></v-text-field>
      </div>
      <div class="col-md-4 col-12 text-right">
      <v-dialog
      persistent
      v-model="dialog"
      width="500"
    >
    <v-btn
        slot="activator"
        color="blue"
        class="add-project"
        dark
      >
        Add Project
      </v-btn>

      <v-card> 
        <v-card-title
          class="white--text blue justify-center" 
          primary-title
        >
        <div class="title pl-3">{{ formTitle }}</div>
        <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent='submit'>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field v-model="editedItem.name" label="Project Name" hint="Write your project name" :counter="10" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="editedItem.address" label="Date" hint="Date project handled" :rules="dateRules" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.phone" label="Task" :rules="taskRules" required></v-text-field>
                <v-text-field id="id_lost" v-model="editedItem.id" label="ID #" disabled></v-text-field>
                <input type="file" name="fileToUpload" id="fileToUpload1" @change="onFileSelected">
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red white--text" @click.native="clear">Clear</v-btn>
          <v-btn color="blue white--text" :disabled="!valid" type="submit" >Save</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
      </v-dialog>
      </div>
      </div>
      </div>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="customers"
      :search="search"
      :rows-per-page-items="[10,20,{'text':'$vuetify.dataIterator.rowsPerPageAll','value':-1}]"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.address }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>
        <td class="text-xs-left">{{ props.item.status }}</td>
        <td class="align-center justify-left">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item.id)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</v-flex>
</v-container>
</v-app>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'customers',
    data () {
    return {
      valid: true,
      selectedFile: '',
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      task: '',
      taskRules: [
        v => !!v || 'Task is required'
        //v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      date: '',
      dateRules: [
        v => !!v || 'Date is required'
      ],
      dialog: false,
      search: '',
      headers: [
          {
            text: 'ID #',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: 'Project', value: 'name' },
          { text: 'Date', value: 'address' },
          { text: 'Task', value: 'phone' },
          { text: 'Status', value: 'status' },
          { text: 'Action', value: null, align: 'left' }
        ],
      customers: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        task: 0,
        date: 0,
      },
      defaultItem: {
        name: '',
        address: '',
        phone: ''
      }
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
  },
  methods:{
      fetchCustomer(){
          this.$http.get('http://slimapp/api/customers')
          .then(function(response){
            this.customers = response.body;
          });
        },
        onFileSelected(event){
          console.log(event)
          this.selectedFile = event.target.files[0]
        },
        submit () {
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
          this.$http.put('http://slimapp/api/customer/update/'+this.editedItem.id, {
            name: this.editedItem.name,
            address: this.editedItem.address,
            phone: this.editedItem.phone

          }).then(function(response){
              this.$refs.form.reset()
            });
          console.log(this.editedIndex);
          }else{
            var input = document.getElementById("id_lost");
            input.setAttribute("type", "hidden");

            const config = {headers:{ 'Content-Type':'multipart/form-data'}}
            const fd = new FormData();
            fd.append('fileToUpload', this.selectedFile)
            fd.append('name', this.editedItem.name)
            fd.append('address', this.editedItem.address)
            fd.append('phone', this.editedItem.phone)
            fd.append('status', 'waiting')
          // Native form submission is not yet supported
          axios.post('http://slimapp/api/customer/add', fd, config)
            .then(res => {
              this.$refs.form.reset();
              console.log(res)
            })
          .catch(e => {
            console.log(e);
          });
          }
          this.dialog = false
        }
      },
      editItem (item) {
        this.editedIndex = this.customers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        var a = confirm('Are you sure you want to delete this item?');
        if(a == true){
            this.$http.delete('http://slimapp/api/customer/delete/'+item)
            .then(function(response){
          });
        }
      },
      clear () {
        this.$refs.form.reset()
      }
      },
      created: function(){
      this.fetchCustomer();
      },
      updated: function(){
        this.fetchCustomer();
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-project {
  width: 100%;
}
</style>
