<template>
<form novalidate @submit.stop.prevent="submit">
    <md-stepper md-elevation="0">
        <md-step md-icon="done" md-button-back="上一步" md-button-continue="下一步">
            <h2 class="md-title">嫌疑人信息确认</h2>
            <h3 class="md-caption">请选择要临时出所的犯罪嫌疑人</h3>
            <md-input-container>
                <label>嫌疑人</label>
                <md-select required name="suspect" id="suspect" v-model="suspect">
                    <md-option :key="suspect.id" v-for="suspect in suspects" :value="suspect.id">{{suspect.name}}</md-option>
                </md-select>
            </md-input-container>
        </md-step>
        <md-step md-icon="done" md-button-back="上一步" md-button-continue="下一步">
            <h2 class="md-title">临时出所信息登记</h2>
            <h3 class="md-caption">...</h3>
            <md-layout md-gutter="24">
                <md-layout>
                    <md-input-container>
                        <label>出所原因</label>
                        <md-select required id="reason" v-model="reason" name="reason">
                          <md-option :key="reason.id" v-for="reason in reasons" :value="reason.id">{{reason.name}}</md-option>
                        </md-select>
                    </md-input-container>
                        </md-layout>
                        <md-layout>
                    <md-input-container>
                        <label>申请人</label>
                        <md-select required id="applicant" v-model="applicant" name="applicant">
                          <md-option :key="officer.id" v-for="officer in officers" :md-value="officer.id">{{officer.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
            </md-layout>
            <md-layout md-gutter="24">
                <md-layout>
                    <md-input-container>
                        <label>计划出所时间</label>
                        <md-input placeholder="出所时间" v-model="leaveOn"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <label>预计返回时间</label>
                        <md-input placeholder="出所时间" v-model="backOn"></md-input>
                    </md-input-container>
                </md-layout>
            </md-layout>
        </md-step>
        <md-step md-icon="done" md-button-back="上一步" md-button-continue="下一步">
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
</form>
</template>

<script>
const SUSPECTS = [
    {id: 1, name: '张某某', status: 3, roomId: 1},
    {id: 2, name: '李某某', status: 4, roomId: 2},
    {id: 3, name: '朱某某', status: 3, roomId: 3},
    {id: 4, name: '王某某', status: 4, roomId: 4}
]
export default {
  name: 'hello',
  data: function () {
    return {
      type: 1,
      reason: 1,
      applicant: 1,
      file: null,
      leaveOn: '18:00:00',
      backOn: '19:00:00',
      watchedBy1: [2, 4],
      watchedBy2: [1, 2],
      suspects: SUSPECTS,
      officers: [
        {id: 1, name: '王警官'},
        {id: 2, name: '杨警官'},
        {id: 3, name: '张警官'},
        {id: 4, name: '毛警官'}
      ],
      staffs: [
        {id: 1, name: '王协警'},
        {id: 2, name: '杨协警'}
      ],
      reasons: [
        {id: 1, name: '身体检查'},
        {id: 2, name: '强制隔离戒毒'},
        {id: 3, name: '取保候审'}
      ]
    }
  }
}
</script>
