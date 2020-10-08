<template>

 <v-card id="card">
   <Button @btn-event="tableMethod" text="ユーザーを削除" class="text-right"/>
  <v-data-table
    :headers="headers"
    :items="attendance"
    :loading="isLoad"
    loading-text="読み込み中"
    no-data-text="データがありません"
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

    <!-- ユーザー削除のカラム -->
    <template v-slot:[`item.delete`]="{ item }">
      <v-btn
        v-bind:class="{ 'deletable': isActive }"
        must-sort
        small
        color="error"
        @click="deleteItem(item)"
        style="margin-left:18px;"
        >
        delete
      </v-btn>
    </template>
    <template v-slot:top>
    <v-dialog v-model="dialog" max-width="500px" activator="#activator">
     <template v-slot:activator="{ on, attrs }">
       <Button id="activator" v-on="on" v-bind="attrs" text="＋ユーザーを追加" class="text-left add_button"/>
          </template> 
          <v-card>
            <v-card-title>
              <span class="headline"></span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="registerItem.deviceId"
                      label="デバイスID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="registerItem.userName"
                      label="名前"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                キャンセル
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                登録
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
  </v-data-table>
  
</v-card>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import Button from './Button.vue'

const BASE_URL = "<GOOGLE APPS SCRIPT API URL>"

export default {
    name: 'TableWrapper',
    components: {
      Button
    },
    data () {
      return {
        isLoad: true,
        isActive: true,
        headers: [
          {
            text: 'User',
            value: 'name',
            align: 'center',
          },
          {
            text: 'Status',
            value: 'status',
            align: 'center',
          },
        ],
        sensor_data : [],
        user_device_data : [],
        attendance : [
          {
            name: "Ryo",
            status: "在室"
          },
          {
            name: "Yudai",
            status: "外出"
          },
          {
            name: "Kenta",
            status: "在室"
          }
        ],
        dialog: false,
        registerItem: {
          deviceId: '',
          userName: '',
        },
      }
    },
    watch:{
      attendance: {
        handler: function(){
          this.isLoad = false
        },
        deep: true
      }
    },
    methods:{
      getColor (status) {
        if (status == "在室") return 'green'
        else if (status == "外出") return 'red'
        else return 'gray'
      },
      deleteItem (item) {
        // ユーザーを削除する関数（DBから削除する部分は未実装のため要修正）
        const index = this.attendance.indexOf(item)
        console.log(item.name)
        if(confirm("本当に削除しますか？")){

// ================ uncomment this part when Google API is ready =============== 
          // deleteをPOSTし、成功したらHTML上で削除する
          // axios.post(BASE_URL, {
          //   postType: "delete",
          //   user: item.name,
          //   },
          //   {
          //     headers: {
          //       "Content-Type": "application/x-www-form-urlencoded",
          //     }
          //   }
          // )
          // .then(response => {
          //   console.log(response.data)
          // })
          // .catch(error => {
          //   console.log(error)
          //   this.errored = true
          // })
          // .finally(() => {
          //   this.attendance.splice(index, 1)
          // })
// ============================================================================= 
// ================ comment out this part when Google API is ready ============= 
          this.attendance.splice(index, 1)
// ============================================================================= 
        }
      },

      tableMethod() {
        // 削除カラムの表示・非表示を切り替える関数
        this.isActive = !this.isActive
        if (this.isActive){
          this.headers = [
            {
              text: 'User',
              value: 'name',
              align: 'center',
            },
            {
              text: 'Status',
              value: 'status',
              align: 'center',
            },
          ]
        }
        else{
          this.headers = [
            {
              text: 'User',
              value: 'name',
              align: 'center',
            },
            {
              text: 'Status',
              value: 'status',
              align: 'center',
            },
            {
              text:'削除',
              value:'delete',
              sortable:false,
              align: 'center',
            }
          ]
        }
      },
      openModal() {
        // モーダルを開く関数
        this.dialog = true
      },
      close () {
        this.dialog = false
      },
      save () {
        var status = "未取得";

// ================ uncomment this part when Google API is ready =============== 
        // registerをPOSTし、成功したらHTML上で登録する
        // axios.post(BASE_URL, {
        //   postType: "register",
        //   user: this.registerItem.userName,
        //   device: this.registerItem.deviceId
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded",
        //     }
        //   }
        // )
        // .then(response => {
        //   console.log(response.data)
        // })
        // .catch(error => {
        //   console.log(error)
        //   this.errored = true
        // })
        // .finally(() => {
        //   this.attendance.push({name: this.registerItem.userName, status: status})
        //   this.close()
        // })
// ============================================================================= 
// ================ comment out this part when Google API is ready =============
        this.attendance.push({name: this.registerItem.userName, status: status})
// ============================================================================= 
      },

    },
    mounted() {

// ================ uncomment this part when Google API is ready =============== 
  // axiosを用いてスプレットシート（APIサーバ化）から値を取得
      // axios
      //   .get(BASE_URL + "?param=current-attendance")
      //   .then(response => {
      //     this.attendance = response.data
      //   })
      //   .catch(error => {
      //     console.log(error)
      //     this.errored = true
      //   })
      //   .finally(() => {
      //     this.loading = false
      //   })
// ============================================================================= 

    // 3秒たってもattendanceが空の場合ローディングの表示を消す
    setTimeout(() => {
        this.isLoad = false;
    }, 3000);
    }
  }
</script>

<style>
#card {
  margin: 10px;
}
.deletable {
  display:none;
}
.add_button {
  position: absolute;
  margin-left: calc(50% - 71px) !important;
  bottom: -40px;
  }
th {
  padding-left:34px !important;
}
</style>
