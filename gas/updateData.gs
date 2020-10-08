function updateData(force=0){
    const sheetId = "<SHEET ID>";
    const sheetSensor = SpreadsheetApp.openById(sheetId).getSheetByName("sensor");
    const sheetDeviceUser = SpreadsheetApp.openById(sheetId).getSheetByName("device_user");
    const sheetStatusLog = SpreadsheetApp.openById(sheetId).getSheetByName("attendance_log");
    const sheetCurrentAttend = SpreadsheetApp.openById(sheetId).getSheetByName("current_attendance");
    const sheetParameter = SpreadsheetApp.openById(sheetId).getSheetByName("parameter");
    
    var parameter = sheetParameter.getRange(2,3).getValue();
    var numSensorLog = sheetSensor.getLastRow() - 1;
    
    if (parameter == numSensorLog && force == 0){
      return;
    }
    statusLog();
    checkStatus();
    
    sheetParameter.getRange(2,3).setValue(numSensorLog);
    return;
  }
  
  function updateDataForce(){
    updateData(force=1);
  }