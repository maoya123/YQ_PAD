var imagePluginAPI = function() {
};
imagePluginAPI.prototype.startActivity = function(success, error, testData1) {
    return PhoneGap.exec(success, error, 'ImagePlugin', // java类名，plugins.xml中注册的名字
    'startActivity', // action，Java方法中用来匹配的字段
    [ testData1 ] // params 传递的参数，Array形式
    );
};

var ImaList = function() {
};
ImaList.prototype.send = function(success, error, testData1,size) {
    return PhoneGap.exec(success, error, 'ImaList','send', [testData1,size] );
};

var updateImage = function() {
};
updateImage.prototype.send1 = function(success, error, testData1) {
    return PhoneGap.exec(success, error, 'updateImage','send1', [testData1] );
};
PhoneGap.addConstructor(function() {
    // 如果不支持window.plugins,则创建并设置
    PhoneGap.addPlugin('imagePluginAPI', new imagePluginAPI());
    PhoneGap.addPlugin('ImaList', new ImaList());
    PhoneGap.addPlugin('updateImage', new updateImage());
});