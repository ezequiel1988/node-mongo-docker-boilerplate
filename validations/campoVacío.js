const validator = val => {
  return val > 0
};

exports.campoVacío = [validator, "Se debe llenar este campo"];
