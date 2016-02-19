//multi-part uploader.
//data should be a FormData object
function post_upload(target,data,callback)
{
  var xhr = new XMLHttpRequest();

  xhr.upload.onprogress = function(e) {
    var percentComplete = (e.loaded / e.total) * 100;
    console.log("Uploaded" + percentComplete + "%");
  };

  xhr.onreadystatechange=function()
  {
    if (xhr.readyState==4)
    {
      if(xhr.status==200){
        callback(null,xhr.responseText);
      }else {
        callback(true,xhr.status.toString()+' '+xhr.responseText);
      }
    }
  }
  xhr.open("POST","/api/"+target.toString().toLowerCase(),true);
  //xhr.setRequestHeader("Content-type","application/json");
  xhr.send(data);
}

////server/api/ path to upload
var upload_target = 'resources';

//on click of the upload button
function uploadfile_click(){
  var formData = new FormData();
  formData.append('file', geid('select-file').files[0]);
  post_upload(upload_target,formData,upload_callback);
}

//after uploading of a file, back is response from server
function upload_callback(err,back){
  if(err){
    alert('not 200 failure: '+back);
  }else{
    //do something important here!!

    brrr=JSON.parse(back);
    if(brrr.rid){
      //if redirection instruction exists
      alert(brrr.rid);
    }else {
      alert(back);
    }
  }
}

//When paste happens
function paste_handler(e) {
  var item = e.clipboardData.items[0]; //accept only one.
  console.log("Item: " + item.type);
  if (item.type.indexOf('image')==0) //if is image
  {
    var formData = new FormData();
    formData.append('file', item.getAsFile());
    post_upload(upload_target, formData, upload_callback);
  } else {
    console.log("Discarding image paste data");
  }
}

//enable Ctrl + V paste
window.onload = function() {
  geid("paste_target").addEventListener("paste", paste_handler);
};
