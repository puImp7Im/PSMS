<template>
    <md-stepper md-elevation="0">
        <md-step md-button-back="上一步" md-button-continue="下一步">
            <h2 class="md-title">出所类型确认</h2>
            <h3 class="md-caption">...</h3>
            <md-layout md-gutter="24">
                <md-layout md-flex="50">
                    <md-input-container>
                        <label>出所类型</label>
                        <md-select required name="type" id="type" v-model="type">
                            <md-option :key="type.id" v-for="type in types" :value="type.id">{{type.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <label>出所原因</label>
                        <md-select required name="reason" id="reason" v-model="reason">
                            <md-option :key="reason.id" v-for="reason in filteredReasons" :value="reason.id">{{reason.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
            </md-layout>
            <md-layout md-gutter="24">
                <md-layout md-flex="50">
                    <md-input-container>
                        <label>出所时间</label>
                        <md-input required name="leaveOn" id="type" v-model="leaveOn"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <label>申请人员</label>
                        <md-select required name="applicant" id="applicant" v-model="applicant">
                            <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
            </md-layout>
        </md-step>
        <md-step md-button-back="上一步" md-button-continue="下一步">
            <h2 class="md-title">负责民警和工作人员确认</h2>
            <h3 class="md-caption">&nbsp;</h3>
            <md-layout md-gutter="24">
                <md-layout>
                    <md-input-container>
                        <label class="md-caption">负责民警</label>
                        <md-select required name="watchedBy1" id="watchedBy1" multiple v-model="watchedBy1">
                            <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <label>工作人员</label>
                        <md-select required name="watchedBy2" id="watchedBy2" multiple v-model="watchedBy2">
                            <md-option :key="staff.id" v-for="staff in staffs" :value="staff.id">{{staff.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
            </md-layout>
        </md-step>
        <md-step md-icon="done" md-button-back="上一步" md-button-continue="完成">
            <h2 class="md-title">临时出所依据确认</h2>
            <h3 class="md-caption">请将出所依据文件拍照并上传</h3>
            <md-input-container>
                <label>出所依据</label>
                <md-file required v-model="file"></md-file>
            </md-input-container>
        </md-step>
    </md-stepper>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      type: 2,
      reason: 1,
      leaveOn: '2017-09-09 12:00:00',
      applicant: 0,
      watchedBy1: [],
      watchedBy2: [],
      types: [
        {id: 3, name: '送押'},
        {id: 2, name: '出所'}
      ],
      reasons: [
        {id: 1, type: 1, name: '身体检查'},
        {id: 2, type: 1, name: '辨认现场'},
        {id: 3, type: 1, name: '起赃'},
        {id: 4, type: 2, name: '留滞释放'},
        {id: 5, type: 2, name: '取保候审'},
        {id: 6, type: 2, name: '无违法犯罪事实'},
        {id: 7, type: 3, name: '治安拘留'},
        {id: 8, type: 3, name: '刑事拘留'},
        {id: 9, type: 3, name: '强制隔离戒毒'}
      ],
      officers: [
        {id: 1, name: '王警官'},
        {id: 2, name: '杨警官'},
        {id: 3, name: '张警官'},
        {id: 4, name: '毛警官'}
      ],
      staffs: [
        {id: 1, name: '王协警'},
        {id: 2, name: '杨协警'}
      ]
    }
  },
  computed: {
    filteredReasons: function () {
      return this.reasons.filter(i => {
        return i.type === this.type
      })
    }
  },
  watch: {
    type: function () {
      switch (this.type) {
        case 1:
          this.reason = 1
          break
        case 2:
          this.reason = 4
          break
        case 3:
          this.reason = 7
          break
      }
    }
  }
}
</script>
