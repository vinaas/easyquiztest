<template>
    <div class="ui container" style="padding-top: 10px">
        <div class="row">
            <div class="ui three column grid">
                <div class="four wide column">
                    <div class="row">
                        <button class="positive ui button fluid">Kết thúc thi</button>
                    </div>
                    <div class="row">
                        <div class="ui card">
                            <div class="image">
                                <img src="https://semantic-ui.com/images/avatar2/large/kristy.png">
                            </div>
                            <div class="content">
                                <a class="header">Kristy</a>
                                <div class="meta">
                                    <span class="date">Joined in 2013</span>
                                </div>
                                <div class="description">
                                    Kristy is an art director living in New York.
                                </div>
                            </div>
                            <div class="extra content">
                                <a>
                                    <i class="user icon"></i> 22 Friends
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="eight wide column">
                    <div class="row">
                        <div class="ui card fluid">
                            <div class="content">
                                <div class="header">Câu hỏi</div>
                            </div>
                            <div class="content">
                                <h4 class="ui sub header">Activity</h4>
                                <div class="ui small feed">
                                    <div class="event">
                                        <div class="content">
                                            <div class="summary">
                                                <a>Elliot Fu</a> added <a>Jenny Hess</a> to the project
                                            </div>
                                        </div>
                                    </div>
                                    <div class="event">
                                        <div class="content">
                                            <div class="summary">
                                                <a>Stevie Feliciano</a> was added as an <a>Administrator</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="event">
                                        <div class="content">
                                            <div class="summary">
                                                <a>Helen Troy</a> added two pictures
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="extra content">
                                <button class="ui button">Join Project</button>
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
                                <h4 class="ui sub header">Activity</h4>
                                <div class="ui small feed">
                                    <div class="event">
                                        <div class="content">
                                            <div class="summary">
                                                <a>Elliot Fu</a> added <a>Jenny Hess</a> to the project
                                            </div>
                                        </div>
                                    </div>
                                    <div class="event">
                                        <div class="content">
                                            <div class="summary">
                                                <a>Stevie Feliciano</a> was added as an <a>Administrator</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="event">
                                        <div class="content">
                                            <div class="summary">
                                                <a>Helen Troy</a> added two pictures
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="extra content">
                                <button class="ui button">Join Project</button>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="ui card">

                            <div class="content">
                                <button class="ui left attached button ">Trước</button>
                                <button class="ui right attached button">Sau</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui progress">
            <div class="bar">
                <div class="progress"></div>
            </div>
            <div class="label"> 6/50 </div>
        </div>
        <div class="ui divider"></div>
        <div class="row">
            <footer>
                <div class="ui card fluid">
                    <div class="content">
                        <div class="header">Câu hỏi</div>
                    </div>
                    <div class="content">
                        <h4 class="ui sub header">Activity</h4>
                        <div class="ui small feed">
                            <div class="event">
                                <div class="content">
                                    <div class="summary">
                                        <a>Elliot Fu</a> added <a>Jenny Hess</a> to the project
                                    </div>
                                </div>
                            </div>
                            <div class="event">
                                <div class="content">
                                    <div class="summary">
                                        <a>Stevie Feliciano</a> was added as an <a>Administrator</a>
                                    </div>
                                </div>
                            </div>
                            <div class="event">
                                <div class="content">
                                    <div class="summary">
                                        <a>Helen Troy</a> added two pictures
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="extra content">
                        <button class="ui button">Join Project</button>
                    </div>
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
            $(document)
                .ready(function () {
                    $('.ui.menu .ui.dropdown').dropdown({
                        on: 'hover'
                    });
                    $('.ui.menu a.item')
                        .on('click', function () {
                            $(this)
                                .addClass('active')
                                .siblings()
                                .removeClass('active');
                        });
                });
        }
    }
</script>