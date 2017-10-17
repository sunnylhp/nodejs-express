/**
 * Created by Administrator on 2017/4/14.
 */
var baseUrl = 'assets/lib',
    path= '../../dist';
if(true){
    path = '../../src';
}
requirejs({
    baseUrl:baseUrl,
    paths:{
        app:path
    }
});
