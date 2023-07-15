<template>
  <div class="users-page">
    <div>
        <base-button @click="handleLogOut">
            Sair
        </base-button>
    </div>
    <table class="users-table">
      <tr>
        <th>Name</th>
        <th>E-mail</th>
        <th>Data de nascimento</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td>{{user.birthDate}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'UsersView',
  components: {
    BaseButton
  },
  computed: {
    ...mapGetters({
      users: 'authStore/users'
    })
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    ...mapActions({
      getUsers: 'authStore/GET_USERS',
      logOut: 'authStore/LOG_OUT'
    }),
    handleLogOut () {
      this.logOut()
    }
  }
}
</script>
<style lang="scss">
.users-page{
    padding: 2rem;
}

.users-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }
}
</style>
