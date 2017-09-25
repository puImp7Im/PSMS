<template>
    <md-stepper md-elevation="0">
        <md-step md-button-back="上一步" md-button-continue="下一步">
            <h2 class="md-title">待结束讯(询)问确认</h2>
            <p class="md-caption"></p>
           <md-input-container>
               <label>嫌疑人</label>
               <md-select required v-model="suspect">
                   <md-option :key="suspect.id" v-for="suspect in suspects" :value="suspect.id">{{suspect.name}}</md-option>
               </md-select>
           </md-input-container>
        </md-step>
        <md-step md-button-back="上一步" md-button-continue="下一步">
            <h2 class="md-title">讯(询)问信息确认</h2>
            <h3 class="md-caption"></h3>
           <md-layout md-gutter="24">
               <md-layout>
                   <md-input-container>
                       <label>提审时间</label>
                       <md-input required disabled v-model="inquiriedOn"></md-input>
                   </md-input-container>
               </md-layout>
               <md-layout>
                   <md-input-container>
                       <label>结束时间</label>
                       <md-input required v-model="inquiriedDoneOn"></md-input>
                   </md-input-container>
               </md-layout>
           </md-layout>
       </md-step>
        <md-step md-button-back="上一步" md-button-continue="完成">
            <h2 class="md-title">讯(询)问民警确认信息</h2>
            <h3 class="md-caption">请讯(询)问民警交还审讯标签</h3>
            <md-layout md-gutter="24">
                <md-layout md-flex="50">
                    <md-input-container>
                        <label>审讯民警</label>
                        <md-select required disabled name="officer1" id="officer1" v-model="tagOfOfficer1">
                            <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <label>审讯民警</label>
                        <md-select required disabled name="officer2" id="officer2" v-model="tagOfOfficer2">
                            <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
            </md-layout>
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
  {id: 1, name: '询（讯）问室-1'},
  {id: 2, name: '询（讯）问室-2'},
  {id: 3, name: '醒酒室-1'},
  {id: 4, name: '醒酒室-2'}
]
export default {
  name: 'Inquiry',
  data: function () {
    return {
      suspect: '李二狗',
      inquiriedOn: '2017-09-12 13:00:00',
      inquiriedDoneOn: '2017-09-12 18:00:00',
      tagOfOfficer1: 1,
      tagOfOfficer2: 2,
      officer1: 0,
      officer2: 0,
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
