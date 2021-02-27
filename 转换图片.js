// 调用fs和path这两个内置模块
var fs = require('fs');
var path = require('path');
//解析需要遍历的文件夹，这里的文件夹为shuxian
var filePath = path.resolve('./把图片放在这里就好啦');


//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function(err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function(filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function(eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile(); //是文件
                        var isDir = stats.isDirectory(); //是文件夹
                        if (isFile) {

                            //如果检测到的是文件，判断他有没有.JPG的后缀

                            if (filedir.indexOf('.JPG') != -1) {
                                var newName = filedir.replace('.JPG', '.jpg'); //把当前文件的.JPG改成.jpg
                                rename(filedir, newName) //调用改名函数
                            }
                        }
                        if (isDir) {
                            fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}



// 修改文件名称
function rename(oldPath, newPath) {
    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            throw err;
        }
    });
}