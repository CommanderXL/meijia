/**
 * Created by XRene on 16/10/2.
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

    window.slide = (function () {
        var configMap = {
            /*main_html: String()
            + '<div class="slide-container">'
                + '<ul class="slide-ul clearfix">'
                    + '<li class="slide-li" data-order="li-1">'
                        + '<a href="void:(0)" >'
                            + '<img src="../images/select-shop1.png">'
                        + '</a>'
                    + '</li>'
                    + '<li class="slide-li" data-order="li-2">'
                        + '<a href="void:(0)" >'
                            + '<img src="../images/select-shop2.png">'
                        + '</a>'
                    + '</li>'
                    + '<li class="slide-li" data-order="li-3">'
                        + '<a href="void:(0)" >'
                            + '<img src="../images/che.jpg">'
                        + '</a>'
                    + '</li>'
                    + '<li class="slide-li" data-order="li-4">'
                        + '<a href="void:(0)" >'
                            + '<img src="../images/taxi-pasger-protocol.png">'
                        + '</a>'
                    + '</li>'
                + '</ul>'
            + '</div>',*/
            settable_map: {
                imgUrls: true
            },
            imgUrls: []
        };

        var setDom, initModule, configModule, domMap = {};

        configModule = function (input_map) {
            util.setConfigMap({
                input_map: input_map,
                settable_map: configMap.settable_map,
                config_map: configMap
            })
        };


        setDom = function (container) {

            var main_html = String()
                + '<div class="slide-container">'
                    + '<ul class="slide-ul">';

            configMap.imgUrls.forEach(function (item, index) {
                main_html += '<li class="slide-li ' + (index === 0 ? '' : 'hide') + '" data-order="img-li-' + (index + 1) + '">'
                                + '<a href="void:(0)">'
                                    + '<img src="' + item + '">'
                                + '</a>'
            });

            main_html += '</ul></div>';

            var slide_nav = document.createElement('div'),
                nav_html = '<ul class="slide-nav-ul">';
            slide_nav.className = 'slide-nav';

            for(var i = 0; i < configMap.imgUrls.length; i++) {
                nav_html += '<li class="slide-nav-li ' + (i === 0 ? 'slide-nav-active' : '')+ '" data-order="nav-li-' + (i + 1) + '"></li>';
            }

            nav_html += '</ul>';

            slide_nav.innerHTML = nav_html;

            container.innerHTML = main_html;

            container.appendChild(slide_nav);

            domMap = {
                container: container,
                slideNav: document.querySelector('.slide-nav-ul')
            }
        };

        initModule = function (container) {
            setDom(container);


            domMap.slideNav.addEventListener('click', function (e) {
                var target = e.target;

                if(target.classList.contains('slide-nav-li')) {
                    var curIndex = document.querySelector('.slide-nav-active').dataset.order.split('-')[2],
                        activeIndex = target.dataset.order.split('-')[2],
                        curPage = document.querySelector('[data-order="img-li-' + curIndex + '"]'),
                        activePage = document.querySelector('[data-order="img-li-' + activeIndex + '"]');

                    if(activeIndex > curIndex) {
                        //activePage.style.transform = 'translateX(100%)';
                        activePage.style.left = '100%';
                        activePage.classList.remove('hide');

                        setTimeout(function () {
                            curPage.classList.add('left-out');
                            activePage.style.transform = 'translateX(0)';
                            activePage.style.transition = 'all .25s ease-in';
                            //activePage.classList.add('right-in')
                        }, 0);

                        setTimeout(function () {
                            curPage.classList.remove('left-out');
                            curPage.classList.remove('slide-nav-active');
                            curPage.classList.add('hide');
                            //activePage.classList.remove('right-in');
                            activePage.classList.add('slide-nav-active');
                            activePage.style.left = '0';
                        }, 350)
                    } else if(activeIndex < curIndex) {
                        activePage.style.left = '-100%';
                        activePage.classList.remove('hide');

                        setTimeout(function () {
                            curPage.classList.add('right-out');
                            activePage.style.transform = 'translateX(100%)';
                            activePage.style.transition = 'all .25s ease-in';
                        }, 0);

                        setTimeout(function () {
                            curPage.classList.remove('right-out');
                            curPage.classList.remove('slide-nav-active');
                            curPage.classList.add('hide');
                            //activePage.classList.remove('right')
                            activePage.classList.add('slide-nav-active');
                            activePage.style.left = '0';
                        }, 350);
                    }
                }
            });
        };


        return {
            configModule: configModule,
            initModule: initModule
        }

    })();

