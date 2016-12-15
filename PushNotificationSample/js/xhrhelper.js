

var SendData=function(method,url, data, headersArr,callback)
{
    var xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.open(method, url, true);
    if (headersArr.length!=0)
    {
        for (var i = 0; i < headersArr.length; i++)
        {
            xhr.setRequestHeader(headersArr[i].header, headersArr[i].value);
        }
    }
    xhr.send(data);
}