<template>
  <div class="ui main text container">

    <table id="questions" class="display dataTable" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>Id</th>
          <th>Content</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
    </table>
  </div>

</template>

<script>
  import 'datatables.net-dt/css/jquery.datatables.css';
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import _ from 'lodash'
  import Promise from 'Bluebird'
  const co = Promise.coroutine
  var $ = require('jquery');
  require('datatables.net')(window, $);

  export default {
    computed: {
      ...mapState('adminQuestions', {
        questions: state => state.all

      })
    },

    created: co(function* () {

      this.$store.dispatch('adminQuestions/getAll').then(() => {

        $(document).ready(() => {

          let me = this
          let table = $('#questions').DataTable({
            data: me.questions,

            "columns": [{
                "data": "id"
              },
              {
                "data": "content"
              },
              {
                "data": "description"
              },
              {
                "data": "Action"
              }

            ],
            "columnDefs": [{
              "targets": -1,
              "data": null,
              "defaultContent": "<button>Cập nhật</button>"
            }]
          })
          $('#questions tbody').on('click', 'tr', function () {
            var data = table.row(this).data();
            //  console.log('data', data.answersForAQuestions[0], data.id, data);
            //alert(data.answersForAQuestions[0])
          });
        })
      })

    })

  }
</script>