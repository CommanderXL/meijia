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
                    + '<div class="dialog-btns">'
                    + '</div>'
                + '</div>',
            settable_map: {
                imgUrl: true,
                title: true,
                tips: true,
                btn: true
                }
            },
            stateMap = {
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
            setDomMap, initModule, configModule;

        setDomMap = function () {
            domMap.dialogBtns = document.querySelector('.dialog-btns');
            domMap.dialogTips = document.querySelector('.dialog-tips');
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
            domMap.alertDom.innerHTML = configMap.main_html;
            domMap.body.appendChild(domMap.alertDom);
            setDomMap();

            domMap.img.src = configMap
        };

        return {
            initModule: initModule,
            configModule: configModule
        }
    })();

    window.dialog = {
        configState: {
            imgUrl: '',
            title: '',
            tips: '',
            btn: {
                title: '',
                cb: null       //按钮的回调函数
            }
        },
        domMap: {
            body: document.querySelector('body'),
            alertDom: document.createElement('div')
        },
        htmlSnippet: {

        },
        init: function () {
            this.domMap.alertDom.className = 'dialog-container';
            this.domMap.alertDom.innerHTML = String()
                + '<div class="dialog-wrapper">'
                    + '<div class="dialog-body">'
                        + '<div table>'
                            + '<div table="cell v-m h-c" class="dialog-img-box">'
                                + '<img class="dialog-img-src" src="../images/public_toast_error.png">'
                            + '</div>'
                        + '</div>'
                        + '<div class="dialog-tips">提交失败</div>'
                    + '</div>'
                    + '<div class="dialog-btns">'
                    + '</div>'
                + '</div>';

            this.domMap.dialogBtn = document.querySelector('.dialog-btns');
            this.domMap.dialogTips = document.querySelector('.dialog-tips');
        }
    };

    dialog.alert = function (str) {

        this.init();

        this.domMap.alertDom.innerHTML = '<div class="dialog-wrapper">'
                + '<div class="dialog-body">'
                    + '<div table>'
                        + '<div table="cell v-m h-c" class="dialog-img-box">'
                            + '<img src="../images/public_toast_error.png">'
                        + '</div>'
                    + '</div>'
                    + '<div class="dialog-tips">提交失败</div>'
                + '</div>'
                + '<div class="dialog-btns">'
                + '</div>'
            + '</div>';

        this.domMap.body.appendChild(this.domMap.alertDom);
    };

    dialog.confirm = function () {

    };
})(window);

