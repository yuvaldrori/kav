var kav = function () {

  var group = {list: [],
                ids: []}

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

  return {
    getGroup: function () {
      return group;
    },
    addShift: function (id, shift) {
      var startDate;
      var endDate;
      var index;
      startDate = Date.parse(shift.start);
      if (isNaN(startDate)) {
        return {name: 'errorParseStartTime',
                message: 'start time parse error '+ shift.start};
      }
      endDate = Date.parse(shift.end);
      if (isNaN(endDate)) {
        return {name: 'errorParseEndTime',
                message: 'end time parse error ' + shift.end};
      }
      if ((endDate - startDate) < 0) {
        return {name: 'errorEndBeforeStart',
                message: 'start time ' + shift.start +
                         ' cannot be later then end time ' +
                         shift.end};
      };
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
    },
    groupSortById: function () {
     group.list.sort(function (a, b) {
       return a.id - b.id;
       });
    },
    groupSortByTime: function () {
     group.list.sort(function (a, b) {
       return Date.parse(a.shift[0].end) - Date.parse(b.shift[0].end);
       }).reverse;
    },
    reset: function () {
      group = {list: [],
                ids: []}
    },
    addPerson: function (person) {
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
    },
    removePerson: function (id) {
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
    }
  }
}();
