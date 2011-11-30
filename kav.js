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
      if ((shift.end - shift.start) < 0) {
        return {name: "error",
                message: "start time " + shift.start +
                         " cannot be later then end time " +
                         shift.end};
      };
      var index = indexOfPerson(id);
      if (index !== -1) {
        if (!group.list[index].shift) {
          group.list[index].shift = [];
        }
        group.list[index].shift.unshift(shift);
        return 0;
      } else {
        return {name: "error",
          message: "could not find the index for id " + id}
      }
    },
    groupSortById: function () {
     group.list.sort(function (a, b) {
       return a.id - b.id;
       });
    },
    groupSortByTime: function () {
     group.list.sort(function (a, b) {
       return a.shift[0].end - b.shift[0].end;
       }).reverse;
    },
    addPerson: function (person) {
      if (!person.id) {
        return {name: "error",
         message: "person missing id"};
      }
      if (group.ids.indexOf(person.id) !== -1) {
        return {name: "error",
          message: "id " + person.id + " not unique"};
      }
      group.list.push(person);
      group.ids.push(person.id);
      return 0;
    },
    removePerson: function (id) {
      var i = 0,
      j = 0;
      for (i = 0; i < group.list.length; i = i +1) {
        if (group.list[i].id === id) {
          group.list.splice (i, 1);
          for (j = 0; j < group.ids.length; j = j + 1) {
            if (group.ids[j] === id) {
              group.ids.splice(j, 1);
            }
          }
        }
      }
    }
  }
}();