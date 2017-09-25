<template>
    <md-stepper v-on:completed="finish" md-elevation="0">
        <md-step md-button-back="上一步" md-button-continue="下一步" :md-continue="sespectSelected">
            <md-card-header>
                <h2 class="md-title">嫌疑人信息确认</h2>
                <h3 class="md-subhead">&nbsp;</h3>
            </md-card-header>
            <md-card-content>
                <md-input-container>
                    <label>嫌疑人</label>
                    <md-select required v-model="suspect">
                        <md-option :key="suspect.id" v-for="suspect in suspects" :value="suspect.id">{{suspect.name}}</md-option>
                    </md-select>
                </md-input-container>
            </md-card-content>
        </md-step>
        <md-step md-button-back="上一步" md-button-continue="下一步" :md-continue="securityChecked">
            <md-card-header>
                <h2 class="md-title">人身安全检查确认</h2>
                <h3 class="md-subhead">&nbsp;</h3>
            </md-card-header>
            <md-card-content>
                <md-checkbox id="securityChecked" name="securityChecked" v-model="securityChecked">已经完成对犯罪嫌疑人的人身检查</md-checkbox>
                <md-input-container>
                    <label>检查人员</label>
                    <md-select name="securityCheckedBy" id="securityCheckedBy" v-model="securityCheckedBy">
                        <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                    </md-select>
                </md-input-container>
            </md-card-content>
        </md-step>
        <md-step md-button-back="上一步" md-button-continue="完成">
            <md-card-header>
                <h2 class="md-title">待看押</h2>
                <h3 class="md-caption">请将犯罪嫌疑人关押到指定房间并由相关民警及工作人员看管</h3>
            </md-card-header>
            <md-card-content>
                    <md-input-container>
                        <label>看押房间</label>
                        <md-select name="room" id="room" v-model="roomId">
                            <md-option :key="room.id" v-for="room in rooms" :value="room.id">{{room.name}}</md-option>
                        </md-select>
                    </md-input-container>
                <md-layout md-gutter="24">
                    <md-layout md-gutter>
                        <md-input-container>
                            <label>责任民警</label>
                            <md-select required name="watchedBy1" id="watchedBy1" multiple v-model="watchedBy1">
                                <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                            </md-select>
                            <span class="md-error">Textarea validation message</span>
                        </md-input-container>
                    </md-layout>
                    <md-layout md-gutter>
                        <md-input-container>
                            <label>工作人员</label>
                            <md-select required name="watchedBy2" id="watchedBy2" multiple v-model="watchedBy2">
                                <md-option :key="staff.id" v-for="staff in staffs" :value="staff.id">{{staff.name}}</md-option>
                            </md-select>
                        </md-input-container>
                    </md-layout>
                </md-layout>
            </md-card-content>
        </md-step>
    </md-stepper>
</template>

<script>
const SUSPECTS = [
    {id: 1, name: '张某某', status: 3, roomId: 1},
    {id: 2, name: '李某某', status: 4, roomId: 2},
    {id: 3, name: '朱某某', status: 3, roomId: 3},
    {id: 4, name: '王某某', status: 4, roomId: 4}
]
export default {
  name: 'takeBack',
  data: function () {
    return {
      type: 1,
      reason: 1,
      securityChecked: false,
      securityCheckedBy: 1,
      roomId: 1,
      watchedBy1: [],
      watchedBy2: [],
      officers: [
            {id: 1, name: '王警官'},
            {id: 2, name: '杨警官'},
            {id: 3, name: '张警官'},
            {id: 4, name: '毛警官'}
      ],
      staffs: [
            {id: 5, name: '崔协警'},
            {id: 6, name: '刘协警'}
      ],
      rooms: [
            {id: 1, name: '候问室'},
            {id: 2, name: '讯询问室1'},
            {id: 3, name: '讯询问室2'},
            {id: 4, name: '醒酒室1'},
            {id: 5, name: '醒酒室2'},
            {id: 6, name: '候押室1', type: 3},
            {id: 7, name: '候押室2', type: 3}
      ],
      suspects: SUSPECTS,
      suspect: 0
    }
  },
  computed: function () {
    return this.suspect !== 0
  },
  methods: {
    finish: function () {
      this.$refs.snackbar.open()
    }
  }
}
</script>
<style scope>
.events {
}
.events ul, li{
  margin: 0;
  padding: 0;
}
.event-time {
  list-style-type: none;
  background-color: lightgray;
  font-size: 8pt;
  color: white;
  padding: 2px;
}
.event {
  list-style-type: circle;
}
.event-time ul, li{
  list-style-type: none;
}
</style>
