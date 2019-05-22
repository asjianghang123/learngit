<template>
  <div class="overView">
    <el-row>
      <el-col :span="4">
        <el-select v-model="city" placeholder="城市" size="small">
          <el-option
            v-for="item in cityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="county " placeholder="县区" size="small">
          <el-option
            v-for="item in countyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 0;">
      <el-col :span='8'>
        <div class="customCard">
          <div class="smallCard bg-blue-light">
            {{ networkElementName }}
          </div>
          <div class="bigCard">
            <base-stations></base-stations>
            <cells-nums></cells-nums>
          </div>
        </div>
      </el-col>
      <el-col :span='16'>
        <div class="customCard">
          <div class="smallCard bg-green-light" style="display: inline-block;">
            {{ performanceName }}
          </div>
          <!-- <div style="display: inline-block;">
            legend  
          </div> -->
          <div class="bigCard">
            <el-row style="margin: 0;">
              <el-col :span='8'>
                <drop-rate></drop-rate>
              </el-col>
              <el-col :span='16'>
                <rrc-rate></rrc-rate>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 0px;">
      <el-col :span='8'>
        <div class="customCard">
          <div class="smallCard bg-red-light">
            {{ alarmName }}
          </div>
          <div class="bigCard">
            <alarm-nums></alarm-nums>
          </div>
        </div>
      </el-col>
      <el-col :span='16'>
        <div class="customCard">
          <div class="smallCard bg-yellow-light">
            {{ trafficName }}
          </div>
          <div class="bigCard">
            <el-row style="margin: 0;">
              <el-col :span='8'>
                <tenday-flow></tenday-flow>
              </el-col>
              <el-col :span='16'>
                <cities-flow></cities-flow>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>  
  // import customCard from './CustomCard';
  // import picture from 'img/nav/基站数.png'
  import baseStations from './BaseStations';
  import cellsNums from './CellsNums';
  import dropRate from './DropRate';
  import rrcRate from './RrcRate';
  import alarmNums from './AlarmNums';
  import tendayFlow from './TendayFlow';
  import citiesFlow from './CitiesFlow';
  export default {
    components: {
      // customCard
      baseStations,
      cellsNums,
      dropRate,
      rrcRate,
      alarmNums,
      tendayFlow,
      citiesFlow
    },
    data() {
      return {
         // img:'img/nav/基站数.png',
        // picture:picture,
        networkElementName: '网元概览',
        performanceName: '性能概览',
        alarmName: '告警概览',
        trafficName: '业务量概览',
        cityOptions: [{
          value: 'guangzhou',
          label: '广州'
        }, {
          value: 'qingyuan',
          label: '清远'
        }, {
          value: 'foshan',
          label: '佛山'
        }],
        countyOptions: [{
          value: 'yuexiu',
          label: '越秀区'
        },{
          value: 'haizhu',
          label: '海珠区'
        }],
        city: '',
        county: ''
      }
    }
  }
</script>

<style>
  .customCard {
    padding: 0 30px 0 0;
  }
  .customCard .smallCard {
    
    border: aliceblue;
    width: 30%;
    height: 35px;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    line-height: 35px;
    /*border-top-left-radius: 5px;
    border-top-right-radius: 5px;*/
  }
  .bg-blue-light {
    background: #cbe4f0;
  }
  .bg-green-light {
    background: #cbede6;
  }
  .bg-red-light {
    background: #f9d1d1;
  }
  .bg-yellow-light {
    background: #f6ecd2;
  }
  .customCard .bigCard {
    background: white;
    border: aliceblue;
    width: 100%;
    height: 170px;
    border-radius: 5px;
    text-align: -webkit-center;
  }
</style>