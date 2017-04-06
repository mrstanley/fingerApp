declare function require(path: string): any;
import './index.scss'
import { component } from 'vuets'
import * as _ from 'lodash'
import * as Vue from 'vue'

new Vue({
    el: '#index',
    template: '<div>hello word hehe</div>',
    created: function () {
        // alert(123);
    }
})