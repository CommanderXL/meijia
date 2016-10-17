/**
 * Created by XRene on 16/9/27.
 */

(function (window) {
    window.util = {
        setConfigMap: function (arg_map) {
            var input_map = arg_map.input_map,
                settable_map = arg_map.settable_map,
                config_map = arg_map.config_map,
                key_name, error;

            for(key_name in input_map) {
                if(input_map.hasOwnProperty(key_name)) {
                    if(settable_map.hasOwnProperty(key_name)) { //可配置的选项里面如果存在这个可配置的key,那么才能进行配置
                        config_map[key_name] = input_map[key_name];
                    }
                } /*else {
                    error = makeError('Bad Input', 'Setting config key | ' + key_name + ' | is not supported');
                    throw error;
                }*/
            }
        }
    }
})(window);

(function (window) {

    window.dialog = (function () {
        var configMap = {
                main_html: String()
                + '<div class="dialog-wrapper">'
                    + '<div class="dialog-body">'
                        + '<div table>'
                            + '<div table="cell v-m h-c" class="dialog-img-box">'
                                + '<img class="dialog-img-src" src="../images/public_toast_error.png">'
                        + '</div>'
                    + '</div>'
                    + '<div class="dialog-tips">提交失败</div>'
                    + '</div>'
                    + '<div table class="dialog-btns">'
                    +   '<div table="cell v-m h-c" class="alert-btn">'
                    +   '</div>'
                    +   '<div class="confirm-box" style="display: none;">'
                    +   '</div>'
                    + '</div>'
                + '</div>',
            settable_map: {
                imgUrl: true,
                title: true,
                tips: true,
                btn: true
            },
            imgUrl: '',
            title: '',
            tips: '',
            btn: {
                title: '',
                cb: null
            }
            },
            domMap = {
                body: document.querySelector('body'),
                alertDom: document.createElement('div')
            },
            setDomMap, initModule, configModule,
            alert, confirm, tips;

        setDomMap = function () {
            domMap.dialogBtns = document.querySelector('.dialog-btns');
            domMap.dialogTips = document.querySelector('.dialog-tips');
            domMap.alertBtn = document.querySelector('.alert-btn');
            domMap.dialogContainer = document.querySelector('.dialog-container');
            domMap.img = document.querySelector('.dialog-img-src');
        };

        configModule = function (input_map) {
            util.setConfigMap({
                input_map: input_map,
                settable_map: configMap.settable_map,
                config_map: configMap
            });
        };


        initModule = function (opt) {
            domMap.alertDom.className = 'dialog-container';
            domMap.alertDom.innerHTML = configMap.main_html;
            domMap.alertDom.classList.add('dialog-hide');
            domMap.body.appendChild(domMap.alertDom);
            setDomMap();
        };

        //这样一开始就将dom添加进去了,改写成单例
        //模块的初始化
        initModule();


        alert = function (opt) {
            //domMap.img.src = opt.imgUrl || '';
            //alert配置信息
            domMap.dialogTips.innerHTML = opt.tips || '';

            domMap.dialogBtns.className = 'dialog-btns dialog-alert';

            domMap.alertBtn.innerHTML = opt.btn.title || '';

            domMap.alertDom.addEventListener('click', function () {
                domMap.dialogContainer.style.display = 'none';
            });
        };

        confirm = function (opt) {
            domMap.dialogTips.innerHTML = opt.tips || '';

            domMap.dialogBtns.className = 'dialog-btns dialog-confirm';
        };

        tips = function (opt) {

            domMap.alertDom.classList.contains('dialog-hide') && domMap.alertDom.classList.remove('dialog-hide');

            domMap.img.src = opt.state === 'success' ? '../images/public_toast_icorrect.png' : '../images/public_toast_error.png';

            domMap.dialogTips.innerHTML = opt.tips || '';

            domMap.dialogBtns.className = 'dialog-btns dialog-hide';

            setTimeout(function () {
                domMap.alertDom.classList.add('dialog-hide');
            }, 1000);
        };

        return {
            configModule: configModule,
            alert: alert,
            confirm: confirm,
            tips: tips
        }
    })();
})(window);

