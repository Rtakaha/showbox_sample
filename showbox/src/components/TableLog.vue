<template>
    <v-card id="card">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          >
        </v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="logs"
        :search="search"
        :loading="isLoad"
        loading-text="読み込み中"
        no-data-text="データがありません"
        multi-sort
        >
        <!-- Statusのカラム -->
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            :color="getColor(item.status)"
            dark
          >
            {{ item.status }}
          </v-chip>
        </template>
        </v-data-table>
    </v-card>

</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

const BASE_URL = "<GOOGLE APPS SCRIPT API URL>"

export default {
  name: 'TableLog',
  data () {
      return {
        search: '',
        isLoad: true,
        headers: [
            {
                text: 'User',
                value: 'name',
                align: 'center',
            },
            {
                text: 'Date',
                value: 'timestamp',
                align: 'center',
            },
            {
                text: 'Status',
                value: 'status',
                align: 'center',
            },
        ],
        logs : [
          {
            name: "Ryo",
            timestamp: "2020/10/08 12:00:00",
            status: "入室"
          },
          {
            name: "Yudai",
            timestamp: "2020/10/08 13:00:00",
            status: "入室"
          },
          {
            name: "Kenta",
            timestamp: "2020/10/08 14:00:00",
            status: "入室"
          },
          {
            name: "Ryo",
            timestamp: "2020/10/08 15:00:00",
            status: "退室"
          },
          {
            name: "Yudai",
            timestamp: "2020/10/08 16:00:00",
            status: "退室"
          },
          {
            name: "Kenta",
            timestamp: "2020/10/08 17:00:00",
            status: "退室"
          },
        ],
      }
  },
  watch:{
      logs: {
        handler: function(){
          this.isLoad = false
        },
        deep: true
      }
    },
  methods:{
    getColor (status) {
        if (status == "入室") return 'green'
        else if (status == "退室") return 'red'
    },
  },
  mounted(){
// ================ uncomment this part when Google API is ready =============== 
    // user-device関係
    // axios
    //   .get(BASE_URL + "?param=status-log")
    //   .then(response => {
    //     this.logs = response.data
    //     console.log(this.logs)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.errored = true
    //   })
    //   .finally(() => {
    //     this.loading = false
    //   })
// ============================================================================= 

    // 5秒たってもlogsが空の場合ローディングの表示を消す
    setTimeout(() => {
        this.isLoad = false;
    }, 5000);
  }
}
</script>
