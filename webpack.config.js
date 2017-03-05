// 
//  webpack.config.js
//  fingerApp
//  
//  Created by air on 2017-02-26.
//  Copyright 2017 air. All rights reserved.
// 
'use strict'
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
/**
 * @description 入口文件封装函数，针对多文件，多输出
 * @param {Array} globPath -文件路径函数
 * @return {Object} 返回文件路径对象
 */
function entries(globPath) {
	var files = [],
		entries = {},
		entry, dirname, basename;
	globPath.forEach(function(item) {
		[].forEach.call(glob.sync(item), function(filePath) {
			files.push(filePath);
		});
	});
	for(var i = 0; i < files.length; i++) {
		entry = files[i];
		basename = path.basename(entry, '.js');
		entries[basename] = path.resolve(__dirname, entry);
	}
	//	console.log(JSON.stringify(entries));
	return entries;
}

module.exports = {
	entry: entries([
		'apps/src/*.js'
	]),
	output: {
		path: path.resolve(__dirname, 'dist/js'),
		filename: '[name].mini.js'
	},
	module: {
		rules: []
	}
};