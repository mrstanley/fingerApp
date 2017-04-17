declare function require(path: string): any;
import './index.scss'
import { component } from 'vuets'
import * as _ from 'lodash'
import * as Vue from 'vue'

const plus: any = (<any>window).plus

new Vue({
    el: '#index',
    template: '<div>hello word wakaka</div>',
    created() {
        console.log('created');
    }
})