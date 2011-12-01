var testKav = function () {
  var personWithNoId = {};
  var personWithId = {id:1};

  return {
    testAddPerson: function () {
      console.log("kav.addperson test");
      //
      console.log("add person");
      kav.reset();
      if (kav.addPerson(personWithId) === 0) {
        console.log("pass");
      } else {
        console.log("fail");
      }
      kav.reset();
      //
      console.log("add person with no id");
      kav.reset();
      if (kav.addPerson(personWithNoId).message === "person missing id") {
        console.log("pass");
      } else {
        console.log("fail");
      }
      kav.reset();
      //
      console.log("add person with non unique id");
      kav.addPerson(personWithId);
      if (kav.addPerson(personWithId).message === "id 1 not unique") {
        console.log("pass");
      } else {
        console.log("fail");
      }
      kav.reset();
    }
  }
}();
testKav.testAddPerson();
