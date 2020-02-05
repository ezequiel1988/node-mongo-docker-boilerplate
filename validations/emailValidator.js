const validator = val => {
  var re = /(^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)/;

  return re.test(val);
};

exports.emailValidator = [validator, "Formato de email equivocado"];
