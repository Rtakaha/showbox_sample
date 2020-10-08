function checkStatus(){
    const sheetId = "<SHEET ID>";
    const sheetSensor = SpreadsheetApp.openById(sheetId).getSheetByName("sensor");
    const sheetDeviceUser = SpreadsheetApp.openById(sheetId).getSheetByName("device_user");
    const sheetCurrentAttend = SpreadsheetApp.openById(sheetId).getSheetByName("current_attendance");
    const lastRow = sheetDeviceUser.getLastRow();
    const lastColumn = sheetDeviceUser.getLastColumn();
    var cellsSensor = sheetSensor.getRange(2, 1, sheetSensor.getLastRow()-1, sheetSensor.getLastColumn()).getValues(); // 1行目は取得しないので、2から初めてlastRowから1引く
    var cellsDeviceUser = sheetDeviceUser.getRange(2, 1, sheetDeviceUser.getLastRow()-1, sheetDeviceUser.getLastColumn()).getValues(); // 1行目は取得しないので、2から初めてlastRowから1引く
  //  var cellsCurrentAttend = sheetCurrentAttend.getRange(2, 1, sheetCurrentAttend.getLastRow()-1, sheetCurrentAttend.getLastColumn()).getValues(); // 1行目は取得しないので、2から初めてlastRowから1引く
  
    var attendance = [];
    for (let i=0; i<cellsDeviceUser.length; i++){
      var device = cellsDeviceUser[i][0];
      var user = cellsDeviceUser[i][1];
      var device_data = cellsSensor.filter(function(object){
        return object[0] == device;
      });
      var latest_data = device_data[device_data.length - 1];
      var latest_status = "";
      if (typeof(latest_data) == "undefined"){
        latest_status = "未取得";
      }
      else{
  //      phiを表すカラムが3列目なので
        if (latest_data[3] < 10){
          latest_status = "在室";
        }
        else if(latest_data[3] > 10){
          latest_status = "外出";
        }
        else{
          latest_status = "未取得";
        }
      }
      attendance.push([user, latest_status]);
      Logger.log(attendance);
    }
  
    sheetCurrentAttend.clearContents();
    sheetCurrentAttend.getRange(1, 1, 1, 2).setValues([["name", "status"]]);
    sheetCurrentAttend.getRange(2, 1, attendance.length, attendance[0].length).setValues(attendance);
  }