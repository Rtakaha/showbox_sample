function statusLog(){
  const sheetId = "<SHEET ID>";
  const sheetSensor = SpreadsheetApp.openById(sheetId).getSheetByName("sensor");
  const sheetDeviceUser = SpreadsheetApp.openById(sheetId).getSheetByName("device_user");
  const sheetStatusLog = SpreadsheetApp.openById(sheetId).getSheetByName("attendance_log");
  const sheetCurrentAttend = SpreadsheetApp.openById(sheetId).getSheetByName("current_attendance");

  var cellsSensor = sheetSensor.getRange(2, 1, sheetSensor.getLastRow()-1, sheetSensor.getLastColumn()).getValues(); // 1行目は取得しないので、2から初めてlastRowから1引く
  var cellsDeviceUser = sheetDeviceUser.getRange(2, 1, sheetDeviceUser.getLastRow()-1, sheetDeviceUser.getLastColumn()).getValues(); // 1行目は取得しないので、2から初めてlastRowから1引く

  var rows = [];
  var cellsDeviceUser_T = transpose(cellsDeviceUser);
  for (let i=0; i<cellsSensor.length; i++){
    var device = cellsSensor[i][0];
    var timestamp = cellsSensor[i][1];
    var phi = cellsSensor[i][3];
    var name = "";
    var status = "";
    if (cellsDeviceUser_T[0].some( target => target === device)){
      name = cellsDeviceUser_T[1][cellsDeviceUser_T[0].indexOf(device)];
    }
//      phiを表すカラムが3列目なので
    if (phi < 20){
      status = "入室";
    }
    else if(phi > 20){
      status = "退室";
    }
    else{
      status = "未取得";
    }

    rows.push([device, name, status, timestamp, phi]);
    Logger.log(rows);
  }

  sheetStatusLog.clearContents();
  sheetStatusLog.getRange(1, 1, 1, 5).setValues([["device", "name", "status", "timestamp", "phi"]]);
  sheetStatusLog.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}
