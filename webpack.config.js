//  
//  Created by air on 2017-02-26.
//  Copyright 2017 air. All rights reserved.
// 
'use strict'
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

//入口文件封装函数，针对多文件，多输出

function entries(globPath) {
	var files = [],
		entries = {},
		entry, dirname, basename;
	globPath.forEach(function (item) {
		[].forEach.call(glob.sync(item), function (filePath) {
			files.push(filePath);
		});
	});
	for (var i = 0, len = files.length; i < len; i++) {
		entry = files[i];
		basename = path.basename(entry, '.js');
		entries[basename] = path.resolve(__dirname, entry);
	}
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