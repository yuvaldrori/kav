var group = {list: [],
            ids: []};

var indexOfPerson = function (id) {
  var i = 0;
  for (i = 0; i < group.list.length; i = i + 1) {
    if (group.list[i].id === id) {
      return i;
    }
  }
  return -1;
};

var sortShiftByTime = function (person) {
  person.shift.sort(function (a, b) {
    return a.end - b.end;
  }).reverse;
};

var simpleTimeCheck = function (period) {
  var startDate;
  var endDate;
  startDate = Date.parse(period.start);
  if (isNaN(startDate)) {
    return {name: 'errorParseStartTime',
            message: 'start time parse error '+ period.start};
  }
  endDate = Date.parse(period.end);
  if (isNaN(endDate)) {
    return {name: 'errorParseEndTime',
            message: 'end time parse error ' + period.end};
  }
  if ((endDate - startDate) < 0) {
    return {name: 'errorEndBeforeStart',
            message: 'start time ' + period.start +
                     ' cannot be later then end time ' +
                     period.end};
  };
  return 0;
};

exports.getGroup = function () {
  return group;
};

exports.addShift = function (id, shift) {
  var ret = simpleTimeCheck(shift);
  if (ret !== 0) {
    return ret;
  }
  index = indexOfPerson(id);
  if (index !== -1) {
    if (!group.list[index].shift) {
      group.list[index].shift = [];
    }
    group.list[index].shift.unshift(shift);
    return 0;
  } else {
    return {name: 'errorNoId',
      message: 'could not find the index for id ' + id}
  }
};

exports.groupSortById = function () {
 group.list.sort(function (a, b) {
   return a.id - b.id;
   });
};

exports.groupSortByTime = function () {
 group.list.sort(function (a, b) {
   return Date.parse(a.shift[0].end) - Date.parse(b.shift[0].end);
   }).reverse;
};

exports.reset = function () {
  group = {list: [],
            ids: []}
};

exports.addPerson = function (person) {
  if (!person.id) {
    return {name: 'errorMissingId',
     message: 'person missing id'};
  }
  if (group.ids.indexOf(person.id) !== -1) {
    return {name: 'errorIdNotUnique',
      message: 'id ' + person.id + ' not unique'};
  }
  group.list.push(person);
  group.ids.push(person.id);
  return 0;
};

exports.removePerson = function (id) {
  var index = indexOfPerson(id);
  if (index !== -1) {
    group.list.splice(index, 1);
    index = group.ids.indexOf(id);
    if (index !== -1) {
      group.ids.splice(index, 1);
    }
  } else {
    return {name: 'errorNoId',
      message: 'could not find the index for id ' + id}
  }
};

exports.addTour = function (id, period) {
  var ret = simpleTimeCheck(period);
  if (ret !== 0) {
    return ret;
  }
  index = indexOfPerson(id);
  if (index !== -1) {
    if (!group.list[index].period) {
      group.list[index].period = [];
    }
    group.list[index].period.unshift(period);
    return 0;
  } else {
    return {name: 'errorNoId',
      message: 'could not find the index for id ' + id}
  }
};
