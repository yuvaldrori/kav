var testKav = function () {
  var badEndBeforeStartShift = {location: 'sg',
                                start: 'Tue, 6 Dec 2011 10:00:00',
                                end: 'Tue, 6 Dec 2011 08:00:00'};
  var badStartDateStringShift = {location: 'sg',
                                 start: 'ghghs shshs',
                                 end: 'Tue, 6 Dec 2011 08:00:00'};
  var badEndDateStringShift = {location: 'sg',
                               start: 'Tue, 6 Dec 2011 08:00:00',
                               end: 'sdflskjdkfj'};
  var firstGoodShift = {location: 'sg',
                        start: 'Tue, 6 Dec 2011 08:00:00',
                        end: 'Tue, 6 Dec 2011 10:00:00'};
  var secondGoodShift = {location: 'sg',
                        start: 'Tue, 6 Dec 2011 12:00:00',
                        end: 'Tue, 6 Dec 2011 14:00:00'};

  return {
    testReset: function () {
      var ret;
      console.log('kav.reset test');
      kav.reset();
      ret = kav.getGroup();
      if (ret.list.length === 0 && ret.ids.length === 0) {
        return 0;
      } else {
        console.log('fail');
        return -1;
      }
    },
    testAddPerson: function () {
      var ret;
      console.log('kav.addPerson - add person');
      kav.reset();
      ret = kav.addPerson({id:1});
      if (ret === 0) {
        return 0;
      } else {
        return -1;
      }
    },
    testAddSecondPerson: function () {
      var ret;
      console.log('kav.addPerson - add 2nd person');
      kav.reset();
      kav.addPerson({id:1});
      ret = kav.addPerson({id:2});
      if (ret === 0) {
        return 0;
      } else {
        return -1;
      }
    },
    testAddPersonNoId: function () {
      var ret;
      console.log('kav.addPerson - add person with no id');
      kav.reset();
      if (kav.addPerson({}).name === 'errorMissingId') {
        return 0;
      } else {
        return -1;
      }
    },
    testAddPersonIdNotUnique: function () {
      var ret;
      console.log('kav.addPerson - add person with non unique id');
      kav.reset();
      kav.addPerson({id:1});
      if (kav.addPerson({id:1}).name === 'errorIdNotUnique') {
        return 0;
      } else {
        return -1;
      }
    },
    testRemoveFirstOfThreePerson: function () {
      var ret;
      console.log('kav.removePerson - remove first of 3');
      kav.reset();
      kav.addPerson({id:1});
      kav.addPerson({id:2});
      kav.addPerson({id:3});
      kav.removePerson(1);
      ret = kav.getGroup();
      if (ret.list[0].id === 2 &&
          ret.list[1].id === 3 &&
          ret.ids[0] === 2 &&
          ret.ids[1] === 3) {
        return 0;
      } else {
        return -1;
      }
    },
    testRemoveSecondOfThreePerson: function () {
      var ret;
      console.log('kav.removePerson - remove second of 3');
      kav.reset();
      kav.addPerson({id:1});
      kav.addPerson({id:2});
      kav.addPerson({id:3});
      kav.removePerson(2);
      ret = kav.getGroup();
      if (ret.list[0].id === 1 &&
          ret.list[1].id === 3 &&
          ret.ids[0] === 1 &&
          ret.ids[1] === 3) {
        return 0;
      } else {
        return -1;
      }
    },
    testRemoveThirdOfThreePerson: function () {
      var ret;
      console.log('remove third of 3');
      kav.reset();
      kav.addPerson({id:1});
      kav.addPerson({id:2});
      kav.addPerson({id:3});
      kav.removePerson(3);
      ret = kav.getGroup();
      if (ret.list[0].id === 1 &&
          ret.list[1].id === 2 &&
          ret.ids[0] === 1 &&
          ret.ids[1] === 2) {
        return 0;
      } else {
        return -1;
      }
    },
    testGroupSortById: function () {
      var ret;
      console.log('kav.groupSortById test');
      kav.reset();
      kav.addPerson({id:3});
      kav.addPerson({id:1});
      kav.addPerson({id:2});
      kav.groupSortById();
      ret = kav.getGroup();
      if (ret.list[0].id === 1 &&
          ret.list[1].id === 2 &&
          ret.list[2].id === 3) {
        return 0;
      } else {
        return -1;
      }
    },
    testAddShiftBadStartTime: function () {
      var ret;
      console.log('kav.addShift - bad start time');
      kav.reset();
      kav.addPerson({id:1});
      ret = kav.addShift(1, badStartDateStringShift);
      if (ret.name === 'errorParseStartTime') {
        return 0;
      } else {
        return -1;
      }
    },
    testAddShiftBadEndTime: function () {
      var ret;
      console.log('kav.addShift - bad end time');
      kav.reset();
      kav.addPerson({id:1});
      ret = kav.addShift(1, badEndDateStringShift);
      if (ret.name === 'errorParseEndTime') {
        return 0;
      } else {
        return -1;
      }
    },
    testAddShiftEndBeforeStart: function () {
      var ret;
      console.log('kav.addShift - end before start');
      kav.reset();
      kav.addPerson({id:1});
      ret = kav.addShift(1, badEndBeforeStartShift);
      if (ret.name === 'errorEndBeforeStart') {
        return 0;
      } else {
        return -1;
      }
    },
    testAddShiftNoId: function () {
      var ret;
      console.log('kav.addShift - no id');
      kav.reset();
      kav.addPerson({});
      ret = kav.addShift(1, firstGoodShift);
      if (ret.name === 'errorNoId') {
        return 0;
      } else {
        return -1;
      }
    },
    testAddShift: function () {
      var ret;
      console.log('kav.addShift - add first good shift');
      kav.reset();
      kav.addPerson({id:1});
      ret = kav.addShift(1, firstGoodShift);
      if (ret === 0 &&
          kav.getGroup().list[0].shift[0].location === firstGoodShift.location &&
          kav.getGroup().list[0].shift[0].start === firstGoodShift.start &&
          kav.getGroup().list[0].shift[0].end === firstGoodShift.end) {
        return 0;
      } else {
        return -1;
      }
    },
    testAddSecondShift: function () {
      var ret;
      console.log('kav.addShift - add second good shift');
      kav.reset();
      kav.addPerson({id:1});
      kav.addShift(1, firstGoodShift);
      ret = kav.addShift(1, secondGoodShift);
      if (ret === 0 &&
          kav.getGroup().list[0].shift[1].location === firstGoodShift.location &&
          kav.getGroup().list[0].shift[1].start === firstGoodShift.start &&
          kav.getGroup().list[0].shift[1].end === firstGoodShift.end &&
          kav.getGroup().list[0].shift[0].location === secondGoodShift.location &&
          kav.getGroup().list[0].shift[0].start === secondGoodShift.start &&
          kav.getGroup().list[0].shift[0].end === secondGoodShift.end) {
        return 0;
      } else {
        return -1;
      }
    },
    testAddShiftForEach: function () {
      var ret;
      console.log('kav.addShift - add a good shift to each person');
      kav.reset();
      kav.addPerson({id:1});
      kav.addPerson({id:2});
      kav.addShift(1, firstGoodShift);
      kav.addShift(2, secondGoodShift);
      if (kav.getGroup().list[0].shift[0].location === firstGoodShift.location &&
          kav.getGroup().list[0].shift[0].start === firstGoodShift.start &&
          kav.getGroup().list[0].shift[0].end === firstGoodShift.end &&
          kav.getGroup().list[1].shift[0].location === secondGoodShift.location &&
          kav.getGroup().list[1].shift[0].start === secondGoodShift.start &&
          kav.getGroup().list[1].shift[0].end === secondGoodShift.end) {
        return 0;
      } else {
        return -1;
      }
    },
    testGroupSortByTime: function () {
      console.log('kav.groupSortByTime test');
      kav.reset();
      kav.addPerson({id:1});
      kav.addPerson({id:2});
      kav.addShift(2, firstGoodShift);
      kav.addShift(1, secondGoodShift);
      kav.groupSortByTime();
      if (kav.getGroup().list[0].id === 2 &&
          kav.getGroup().list[1].id === 1) {
        return 0;
      } else {
        return -1;
      }
    }
  }
}();

var doTest = function (element, index, array) {
  if (typeof testKav[element] === 'function') {
    if (testKav[element]() === 0) {
      console.log('pass');
    } else {
      console.log('fail');
    }
  }
};

Object.getOwnPropertyNames(testKav).forEach(doTest);
