var testKav = function () {
  var personWithNoId = {};
  var personWithId = {id:1};
  var anotherPersonWithId = {id:2};
  var thirdPersonWithId = {id:3};
  var firstGoodShift = {location: 'sg',
                        start: '',
                        end: ''};

  return {
    testReset: function () {
      var ret;
      console.log('kav.reset test');
      kav.reset();
      ret = kav.getGroup();
      if (ret.list.length === 0 && ret.ids.length === 0) {
        console.log('pass');
      } else {
        console.log('fail');
      }
    },
    testAddPerson: function () {
      var ret;
      console.log('kav.addPerson test');
      //
      console.log('add person');
      kav.reset();
      ret = kav.addPerson(personWithId);
      if (ret === 0) {
        console.log('pass');
      } else {
        console.log('fail' + ret);
      }
      kav.reset();
      //
      console.log('add 2nd person');
      kav.reset();
      kav.addPerson(personWithId);
      ret = kav.addPerson(anotherPersonWithId);
      if (ret === 0) {
        console.log('pass');
      } else {
        console.log('fail' + ret);
      }
      kav.reset();
      //
      console.log('add person with no id');
      kav.reset();
      if (kav.addPerson(personWithNoId).message === 'person missing id') {
        console.log('pass');
      } else {
        console.log('fail');
      }
      kav.reset();
      //
      console.log('add person with non unique id');
      kav.addPerson(personWithId);
      if (kav.addPerson(personWithId).message === 'id 1 not unique') {
        console.log('pass');
      } else {
        console.log('fail');
      }
      kav.reset();
    },
    testRemovePerson: function () {
      console.log('kav.removePerson test');
      //
      console.log('remove first of 3');
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
        console.log('pass');
      } else {
        console.log('fail');
      }
      kav.reset();
      //
      console.log('remove second of 3');
      kav.reset();
      kav.addPerson(personWithId);
      kav.addPerson(anotherPersonWithId);
      kav.addPerson(thirdPersonWithId);
      kav.removePerson(2);
      ret = kav.getGroup();
      if (ret.list[0].id === 1 &&
          ret.list[1].id === 3 &&
          ret.ids[0] === 1 &&
          ret.ids[1] === 3) {
        console.log('pass');
      } else {
        console.log('fail');
      }
      kav.reset();
      //
      console.log('remove third of 3');
      kav.reset();
      kav.addPerson(personWithId);
      kav.addPerson(anotherPersonWithId);
      kav.addPerson(thirdPersonWithId);
      kav.removePerson(3);
      ret = kav.getGroup();
      if (ret.list[0].id === 1 &&
          ret.list[1].id === 2 &&
          ret.ids[0] === 1 &&
          ret.ids[1] === 2) {
        console.log('pass');
      } else {
        console.log('fail');
      }
      kav.reset();
    },
    testGroupSortById: function () {
      var ret;
      kav.reset();
      console.log('kav.groupSortById test');
      kav.addPerson(thirdPersonWithId);
      kav.addPerson(personWithId);
      kav.addPerson(anotherPersonWithId);
      kav.groupSortById();
      ret = kav.getGroup();
      if (ret.list[0].id === 1 &&
          ret.list[1].id === 2 &&
          ret.list[2].id === 3) {
        console.log('pass');
      } else {
        console.log('fail');
      }
      kav.reset();
    }
  }
}();
testKav.testReset();
testKav.testAddPerson();
testKav.testRemovePerson();
testKav.testGroupSortById();
