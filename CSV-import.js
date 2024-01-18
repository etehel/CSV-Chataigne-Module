

allValues = [];


function init() {
  script.log("Custom module init");
  local.parameters.separator.addOption(",", ",");
  local.parameters.separator.addOption(";", ";");
  local.parameters.separator.addOption("Tab", "\t");
  local.parameters.separator.set(",");
  local.parameters.nbRows.setAttribute("enabled", false);
}


function moduleParameterChanged(param) {

  if (param.name == "loadFile") {
    readCSV();
    loadLine();
  }
  if (param.name == "clearDatas") {
    clearDatas();
  }
}



function clearDatas() {
  local.values.removeContainer("Datas");
  local.values.addContainer("Datas");
}

function readCSV() {
  csvFile = local.parameters.csvFile.readFile(false);

  if (csvFile != null) {
    rows = csvFile.split("\n");
    local.values.currentLine.setAttribute("max", "" + rows.length);
    header = (rows[0] + "").split(local.parameters.separator.get());
    local.parameters.nbRows.set(rows.length - 1);

    for (i = 0; i < header.length; i++) {
      allValues[i] = local.values.datas.addStringParameter(header[i], "", "");
    }
  }

}

function moduleValueChanged(value) {
  if (value.name == "currentLine") {
    if (value.get() < local.parameters.nbRows.get()) {
      loadLine();
    } else {
      value.set(local.parameters.nbRows.get());
    }
  }
}

function loadLine() {
  csvFile = local.parameters.csvFile.readFile(false);
  rows = csvFile.split("\n");
  header = (rows[0] + "").split(local.parameters.separator.get());
  val = (rows[local.values.currentLine.get()]).split(local.parameters.separator.get());
  for (i = 0; i < val.length; i++) {
    script.log(header[i]);
    allValues[i].set(val[i] + "");
  }
}
