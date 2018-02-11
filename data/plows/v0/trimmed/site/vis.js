var oReq = new XMLHttpRequest();
oReq.open("GET", "/plow20180101.csv.pk", true);
oReq.responseType = "arraybuffer";

oReq.onload = function (oEvent) {
  return oReq.response; // Note: not oReq.responseText
};

var a = oReq.send(null);

