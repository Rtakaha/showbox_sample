// 2次元配列の転置のためのコード
const transpose = a => a[0].map((_, c) => a.map(r => r[c]));

function doGet(e) {
//  パラメータの指定がない場合はsensorシートを返す
  if (typeof(e.parameter) == "undefined"){
    var data = getData('<SHEET ID>', 'sensor');
  }
  else if (e.parameter.param == "sensor"){
    var data = getData('<SHEET ID>', 'sensor');
  }
  else if (e.parameter.param == "device-user"){
    var data = getData('<SHEET ID>', 'device_user');
  }
  else if (e.parameter.param == "current-attendance"){
    var data = getData('<SHEET ID>', 'current_attendance');  
  }
  else if (e.parameter.param == "status-log"){
    var data = getData('<SHEET ID>', 'attendance_log');  
  }
//  正しくないパラメータがある場合もsensorシートを返す
  else{
    var data = getData('<SHEET ID>', 'sensor');
  }

  var output = ContentService.createTextOutput(JSON.stringify(data, null, 2));
  output.setMimeType(ContentService.MimeType.TEXT);
  return output;
}

function doPost(e) {
  var params = JSON.parse(e.postData.getDataAsString());
  var postType = params.postType;
  var deviceId = params.device;
  var userName = params.user;
  var text = "";

  if (typeof(userName) == "undefined"){
    text = "[InvalidParamsError]: parameters are invalid";
  }
  else{
    if (postType == "register"){
      text = registerData("<SHEET ID>", "device_user", deviceId, userName);
    }
    else if (postType == "delete"){
      text = deleteData("<SHEET ID>", "device_user", userName);
    }
    else{
      text = "[InvalidParamsError]: parameters are invalid";
    }
  }

  var output = ContentService.createTextOutput(JSON.stringify({ message: text }));
  output.setMimeType(ContentService.MimeType.TEXT);
  return output;
}

function getData(sheetId, sheetName) {
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var rows = sheet.getDataRange().getValues();
  var keys = rows.splice(0, 1)[0];
  return rows.map(function(row) {
    var obj = {}
    row.map(function(item, index) {
      obj[keys[index]] = item;
    });
    return obj;
  });
}

function deleteData(sheetId, sheetName, userName) {
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  var cells = sheet.getRange(2, 1, lastRow-1, lastColumn).getValues(); // 1行目は取得しないので、2から初めてlastRowから1引く
  var text = "[InvalidContentsError]: device_id or user_name doesn't match existing data";

  // デバイスのIDとユーザ名がどちらも正しい場合のみdelete
  for(var i = 0; i < cells.length; i++){
    var sheetUserName = cells[i][1]
    if (sheetUserName == userName){
      cells.splice(i, 1);
      text = "Successfully deleted ["  + sheetUserName + "]";
      break;
    }
  }
  sheet.clearContents();
  sheet.getRange(1, 1, 1, 2).setValues([["device", "user"]]);
  sheet.getRange(2, 1, cells.length, cells[0].length).setValues(cells);
  checkStatus();
  return text;
}

function registerData(sheetId, sheetName, deviceId, userName){
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  var cells = sheet.getRange(2, 1, lastRow-1, lastColumn).getValues(); // 1行目は取得しないので、2から初めてlastRowから1引く
  var text = "[InvalidContentsError]: device_id  or user_name is already used";

  var cells_T = transpose(cells);
  var sheetDeviceIdArray = cells_T[0];
  var sheetUserNameArray = cells_T[1];
  // デバイスのIDとユーザ名がどちらもuniqueな場合のみregister
  if (!sheetDeviceIdArray.some( target => target === deviceId) && !sheetUserNameArray.some( target => target === userName)){
    sheet.getRange(lastRow+1, 1, 1, lastColumn).setValues([[deviceId, userName]]);
    text = "Successfully registered [" + deviceId + ", " + userName + "]";
  }
  checkStatus();
  return text;
}