export function dowandFile(res,fileName){
    var blob = new Blob([res]);
    if('download' in document.createElement('a')){
        var a = window.document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }else{
        navigator.msSaveBlob(blob, fileName)
    }
}