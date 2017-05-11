<template>
    <div class="ui container" style="padding-top: 10px">
        <div class="row">
            <div class="ui three column grid">
                <div class="four wide column">
                    <div class="row" style="padding-bottom:10px">
                        <router-link class="positive ui button fluid" to="/">Kết thúc thi</router-link>
                    </div>
                    <div class="row">
                        <div class="ui card">

                            <div class="content">
                                <div class="ui info message center aligned green">
                                    <div class="header">Thời gian</div>
                                    <h1>00:35 <i class="alarm outline icon"></i></h1>
                                </div>

                            </div>
                            <!--<div class="extra content">

                            </div>-->
                        </div>
                        <div class="ui card">

                            <div class="content">

                                <div class="ui info message">
                                    <div class="header">Thông tin thí sinh</div>
                                    <ul class="list">
                                        <li> <b>SBD :</b> 1</li>
                                        <li><b>Họ tên:</b> Phạm Văn A </li>
                                        <li><b>Ngày sinh:</b> 20/4/2000 </li>
                                    </ul>
                                </div>
                                <div class="ui info message">
                                    <div class="header">Thông tin kỳ thi</div>
                                    <ul class="list">
                                        <li> <b>Kì thi :</b> kiểm tra 60 phút</li>
                                        <li><b>Khóa ngày:</b> 6/5/2017 </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="eight wide column">
                    <div class="row">
                        <div class="ui card fluid">
                            <div class="content">
                                <div class="header">Câu 7</div>
                            </div>
                            <div class="content">
                                <h4 class="ui sub header ">Đây là nội dung câu hỏi?</h4>
                                <table class="ui table celled">

                                    <tbody>
                                        <tr>
                                            <td>A</td>
                                            <td>Đáp án A Đáp án A ... Đáp án A Đáp án A </td>
                                        </tr>
                                        <tr>
                                            <td>B</td>
                                            <td>Đáp án B </td>
                                        </tr>
                                        <tr>
                                            <td>C</td>
                                            <td>Đáp án C</td>
                                        </tr>
                                        <tr>
                                            <td>D</td>
                                            <td>Đáp án D</td>
                                        </tr>


                                    </tbody>
                                </table>
                                <!--<div class="ui divided items">
                                    <div class="item">
                                        <div class="ui tiny image">
                                            A
                                        </div>
                                        <div class="middle aligned content">
                                            Đáp án trả lời A
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="ui tiny image">
                                            B
                                        </div>
                                        <div class="middle aligned content">
                                            Đáp án trả lời B
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="ui tiny image">
                                            C
                                        </div>
                                        <div class="middle aligned content">
                                            Đáp án trả lời C
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="ui tiny image">
                                            D
                                        </div>
                                        <div class="middle aligned content">
                                            Đáp án trả lời D
                                        </div>
                                    </div>
                                </div>-->
                            </div>
                            <div class="extra content">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="four wide column">

                    <div class="row">
                        <div class="ui card">
                            <div class="content">
                                <div class="header">Đáp án</div>
                            </div>
                            <div class="content">
                                <div class="ui form">
                                    <div class="grouped fields">
                                        <!--<label>How often do you use checkboxes?</label>-->
                                        <div class="field">
                                            <div class="ui radio checkbox">
                                                <input type="radio" name="example2" checked="checked">
                                                <label>A</label>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui radio checkbox">
                                                <input type="radio" name="example2">
                                                <label>B</label>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui radio checkbox">
                                                <input type="radio" name="example2">
                                                <label>C</label>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui radio checkbox">
                                                <input type="radio" name="example2">
                                                <label>D</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="extra content">
                                <button class="ui button green fluid">Trả lời</button>
                                <div class="ui divider"></div>
                                <div id="nav-buttons" class="ui  buttons fluid  center alinged">
                                    <button class="ui button left attached blue "><i class="left chevron icon"></i>Trước</button>
                                    <button class="ui button right attached blue ">Sau <i class="right chevron icon"></i></button>
                                </div>


                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div id="quiz-progress" class="ui teal progress" data-value="16" data-total="20">
            <div class="bar">
                <div class="progress"></div>
            </div>
            <!--<div class="label"> 6/50 </div>-->
        </div>
        <!--<div class="ui divider"></div>-->
        <div class="row">
            <footer>
                <div class="ui card fluid">
                    <!--<div class="content">
                        <div class="header">Câu hỏi</div>
                    </div>-->
                    <div class="content">
                        <button class="mini green ui button inverted">Câu 1</button>
                        <button class="mini green ui button inverted">Câu 2</button>
                        <button class="mini green ui button inverted ">Câu 3</button>
                        <button class="mini orange ui button inverted">Câu 4</button>
                        <button class="mini orange ui button inverted">Câu 5</button>
                        <button class="mini orange ui button inverted">Câu 6</button>
                        <button class="mini green ui button ">Câu 7</button>
                        <button class="mini orange ui button inverted">Câu 8</button>
                        <button class="mini orange ui button inverted">Câu 9</button>

                    </div>

                </div>
                <div class="extra content ui center aligned container">
                    EasyQuizTest, một sản phẩm của VinaAS Co., Ltd
                </div>
            </footer>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'quiz',
        components: {},
        mounted: function () {
            $('#quiz-progress').progress({
                label: 'ratio',
                text: {
                    ratio: '{value} / {total}'
                },
                showActivity: false
            });
        }

    }
</script>
<style scoped>
    #nav-buttons {
        padding-top: 100px;
        padding-bottom: 10px;
    }
</style>