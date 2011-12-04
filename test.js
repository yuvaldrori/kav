var testKav = function () {
  var personWithNoId = {};
  var personWithId = {id:1};
  var anotherPersonWithId = {id:2};
  var thirdPersonWithId = {id:3};

  return {
    testAddPerson: function () {
      var ret;
      console.log("kav.addPerson test");
      //
      console.log("add person");
      kav.reset();
      ret = kav.addPerson(personWithId);
      if (ret === 0) {
        console.log("pass");
      } else {
        console.log("fail" + ret);
      }
      kav.reset();
      //
      console.log("add 2nd person");
      kav.reset();
      kav.addPerson(personWithId);
      ret = kav.addPerson(anotherPersonWithId);
      if (ret === 0) {
        console.log("pass");
      } else {
        console.log("fail" + ret);
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
    },
    testRemovePerson: function () {
      console.log("kav.removePerson test");
      //
      console.log("remove first of 3");
      kav.reset();
      kav.addPerson(personWithId);
      kav.addPerson(anotherPersonWithId);
      kav.addPerson(thirdPersonWithId);
      kav.removePerson(1);
      ret = kav.getGroup();
      if (ret.list[0].id === 2 &&
          ret.list[1].id === 3 &&
          ret.ids[0] === 2 &&
          ret.ids[1] === 3) {
        console.log("pass");
      } else {
        console.log("fail" + kav.getGroup());
      }
    }
  }
}();
testKav.testAddPerson();
testKav.testRemovePerson();
