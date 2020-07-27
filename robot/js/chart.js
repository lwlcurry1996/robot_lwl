$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()


    //添加用户信息 用户输入的内容追加到页面
    $('.input_sub').on('click', function () {
        var text = $('.input_txt').val().trim();
        if (text == '') {
            return $('.input_txt').val('').focus();
        }
        $('.talk_list').append(`
        <li class="right_word">
           <img src="img/person02.png" />  
            <span>${text}</span>
         </li>
        `);
        $('.input_txt').val('').focus()
        //重置滚动条位置
        resetui()

        //回复消息
        getMsg(text)
    })

    //封装回复消息函数
    function getMsg(text) {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                // console.log(res);
                if (res.message !== 'success') {
                    return alert('回复消息失败,请重新输入');
                }
                var msg = res.data.info.text
                //把回复的消息渲染到页面
                $('.talk_list').append(`
                <li class="left_word">
                  <img src="img/person01.png" /> 
                  <span>${res.data.info.text}</span>
                </li>
                `)

                //重置页面
                resetui()
                //语音转换
                getVoice(msg)

            }
        })
    }

    //语音转换
    function getVoice(text) {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (Obj) {
                if (Obj.status !== 200) return alert('语音转换失败');
                $('#voice').attr('src', Obj.voiceUrl)
            }
        })
    }

    //回车键发送消息
    $('#ipt').on('keyup', function (e) {
        if (e.keyCode === 13) {
            $('.input_sub').click()
        }
    })


    // 获取聊天机器人发送回来的消息
    // function getMsg(text) {
    //     $.ajax({
    //         type: 'post',
    //         url: 'http://www.tuling123.com/openapi/api',
    //         data: {
    //             //如果参数加了一个userid,那机器人的回复就会根据聊天内容的上下文来回复
    //             userid: 34223, //后面的值随便写一个
    //             key: '271068d2b2834653b5eecd3f6e86f434',
    //             info: text
    //         },
    //         success: function (res) {
    //             // console.log(res.message)
    //             // if (res.message === 'success') {
    //             // 接收聊天消息
    //             var msg = res.text
    //             $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
    //             // 重置滚动条的位置
    //             resetui()
    //             //   // 调用 getVoice 函数，把文本转化为语音
    //             //   getVoice(msg)
    //             // }
    //         }
    //     })
    // }


})