//webpak 配置文件
'use strict'
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

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
		'assets/src/*.js'
	]),
	output: {
		filename: './dist/js/[name].mini.js'
	}
};