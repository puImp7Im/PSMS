<template>
    <md-stepper md-elevation="0">
        <md-step md-button-back="上一步" md-button-continue="下一步">
            <h2 class="md-title">选择讯(询)问民警</h2>
            <p class="md-caption">对嫌疑人讯(询)问必须由两名民警同时进行！</p>
            <md-layout md-gutter="24">
                <md-layout md-flex="50">
                    <md-input-container>
                        <label>审讯民警1</label>
                        <md-select required name="officer1" id="officer1" v-model="officer1">
                            <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <label>标签</label>
                        <md-select required name="tagOfOfficer1" id="tagOfOfficer1" v-model="tagOfOfficer1">
                            <md-option :key="tag.id" v-for="tag in tags" :value="tag.id">{{tag.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
            </md-layout>
            <md-layout md-gutter="24">
                <md-layout md-flex="50">
                    <md-input-container>
                        <label>审讯民警2</label>
                        <md-select required name="officer2" id="officer2" v-model="officer2">
                            <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <label>标签</label>
                        <md-select required name="tagOfOfficer1" id="tagOfOfficer1" v-model="tagOfOfficer2">
                            <md-option :key="tag.id" v-for="tag in tags" :value="tag.id">{{tag.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
            </md-layout>
        </md-step>
        <md-step md-button-back="上一步" md-button-continue="下一步">
            <h2 class="md-title">选择犯罪嫌疑人</h2>
            <h3 class="md-caption"></h3>
            <!--
            <div v-for="(suspect, i) in suspects">
                <md-radio v-model="suspect[i]" name="suspect" :id="'suspect['+i+']'" :md-value="suspect.id">{{suspect.name}}</md-radio>
            </div>
            -->
            <md-input-container>
                <label>嫌疑人</label>
                <md-select required id="suspect" v-model="suspect">
                    <md-option v-for="(suspect, i) in suspects" name="suspect" :id="'suspect['+i+']'" :md-value="suspect.id">
                        {{suspect.name}} [{{suspect.roomId|roomName}}, {{suspect.status|statusName}}]
                    </md-option>
                </md-select>
            </md-input-container>
            <!--
            <md-table @select="onTableSelect">
                <md-table-header>
                    <md-table-row>
                        <md-table-head>姓名</md-table-head>
                        <md-table-head>房间</md-table-head>
                        <md-table-head>状态</md-table-head>
                    </md-table-row>
                </md-table-header>
                <md-table-body>
                    <md-table-row v-for="(suspect, i) in suspects" :key="i" :md-item="suspect" md-auto-select md-selection>
                        <md-table-cell>{{suspect.name}}</md-table-cell>
                        <md-table-cell>{{suspect.roomId|roomName}}</md-table-cell>
                        <md-table-cell>{{suspect.status|statusName}}</md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
        -->
        </md-step>
        <md-step md-button-back="上一步" md-button-continue="下一步">
            <h2 class="md-title">选择讯(询)问房间</h2>
            <h3 class="md-caption">&nbsp;</h3>
            <md-input-container>
                <label>房间</label>
                <md-select required name="room" id="room" v-model="room">
                    <md-option :key="room.id" v-for="room in rooms" :value="room.id">{{room.name}}</md-option>
                </md-select>
            </md-input-container>
            <md-input-container>
                <label>备注</label>
                <md-input name="memo" id="memo" v-model="memo"></md-input>
            </md-input-container>
        </md-step>
        <md-step md-button-back="上一步" md-button-continue="开始审讯" :md-continue="confirmed">
            <h2 class="md-title">信息确认</h2>
            <h3 class="md-caption">对犯罪嫌疑人讯(询)问少于两名民警审问属于违规审讯！</h3>
            <md-checkbox v-model="confirmed">讯(询)问民警清楚违规审讯要求</md-checkbox>
        </md-step>
    </md-stepper>
</template>

<script>
const OFFICERS = [
  {id: 1, name: '王警官'},
  {id: 2, name: '张警官'},
  {id: 3, name: '杨警官'}
]
const SUSPECTS = [
    {id: 1, name: '张某某', status: 3, roomId: 1},
    {id: 2, name: '李某某', status: 4, roomId: 2},
    {id: 3, name: '朱某某', status: 3, roomId: 3},
    {id: 4, name: '王某某', status: 4, roomId: 4}
]
const ROOMS = [
  {id: 1, name: '询(讯)问室-1'},
  {id: 2, name: '询(讯)问室-2'},
  {id: 3, name: '醒酒室-1'},
  {id: 4, name: '醒酒室-2'}
]
export default {
  name: 'Inquiry',
  data: function () {
    return {
      selected: 0,
      confirmed: 0,
      inquiriedBy: [],
      tagOfOfficer1: 1,
      tagOfOfficer2: 2,
      officer1: 0,
      officer2: 0,
      suspect: [],
      beginTime: '',
      endTime: '',
      room: 0,
      memo: '',
      suspects: SUSPECTS,
      rooms: ROOMS,
      tags: [
         {id: 1, name: 'T0001'},
         {id: 2, name: 'T0002'}
      ],
      officers: OFFICERS
    }
  },
  methods: {
    onTableSelect: function (suspect) {
      console.log(suspect)
    },
    onChange: function (id) {
      console.log(id)
      this.selected = id
    }
  },
  filters: {
    roomName (i) {
      console.log('*** ' + i)
      return {1: '醒酒室-1', 2: '醒酒室-2', 3: '询问室-1', 4: '询问室-2'}[i]
    },
    statusName: function (i) {
      return {3: '讯问中', 4: '候等中'}[i]
    },
    officerName: function (i) {
      return this.officers[i].name
    }
  },
  watch: {
    suspect: function () {
      console.log(this.suspect)
    }
  }
}
</script>
