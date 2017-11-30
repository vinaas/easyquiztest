<template class="">
    <div class="ui container" >
        <h1>Chào mừng Thí Sinh  </h1>
        <table class="ui celled striped table">
            <thead>
                <tr>
                    <th colspan="3">
                        Danh sách các bài thi 
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="collapsing">
                        <i class="folder icon"></i> node_modules
                    </td>
                    <td>Initial commit</td>
                    <td class="right aligned collapsing">10 hours ago</td>
                </tr>
                <tr>
                    <td>
                        <i class="folder icon"></i> test
                    </td>
                    <td>Initial commit</td>
                    <td class="right aligned">10 hours ago</td>
                </tr>
                <tr>
                    <td>
                        <i class="folder icon"></i> build
                    </td>
                    <td>Initial commit</td>
                    <td class="right aligned">10 hours ago</td>
                </tr>
                <tr>
                    <td>
                        <i class="file outline icon"></i> package.json
                    </td>
                    <td>Initial commit</td>
                    <td class="right aligned">10 hours ago</td>
                </tr>
                <tr>
                    <td>
                        <i class="file outline icon"></i> Gruntfile.js
                    </td>
                    <td>Initial commit</td>
                    <td class="right aligned">10 hours ago</td>
                </tr>
            </tbody>
        </table>
        <router-link class="item header item" to="/quiz"> EasyQuizTest</router-link>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import moment from "moment";
import Logger from "../../common/logger.js";
import Promise from "bluebird";
import toastr from "toastr";
import swal from "sweetalert";
import _ from "lodash";
const logger = Logger("UserQuizView");
const co = Promise.coroutine;
export default {
  // Format ngày tháng năm/////////////////////////////
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  },
  
  computed: {
    
  },
  mounted: function() {
        
  },
  methods: {      
      
  },
  created() {
    var me = this;
    logger.debug("Danh sach Bai Thi");
    this.$store.dispatch("adminQuizs/getAll").then(() => {});
  }
};
</script>
