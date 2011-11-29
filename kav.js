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

  return {
    getGroup: function () {
      return group;
    },
    addShift: function (id, shift) {
      var index = indexOfPerson(id);
      if (index !== -1) {
        if (!group.list[index].shift) {
          group.list[index].shift = [];
        }
        group.list[index].shift.push(shift);
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
    addPerson: function (person) {
      if (!person.id) {
        return {name: "error",
         message: "person must have id",
         object: person};
      }
      if (group.ids.indexOf(person.id) !== -1) {
        return {name: "error",
          message: "id not unique",
          object: person};
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

console.log(kav.addPerson({id:1}));
console.log(kav.addPerson({id:2}));
console.log(kav.addPerson({id:12}));
console.log(kav.addPerson({id:3}));
console.log(kav.addShift(1, {station: "base",
                             start: Date.parse("Thu, 01 Jan 1970 00:00:00 GMT-0400"),
                             end: Date.parse("Thu, 01 Jan 1970 02:00:00 GMT-0400")}));
console.log(kav.addShift(1, {station: "sg",
                             start: Date.parse("Thu, 02 Jan 1970 00:00:00 GMT-0400"),
                             end: Date.parse("Thu, 02 Jan 1970 02:00:00 GMT-0400")}));
console.log("%j", kav.getGroup());
kav.groupSortById();
console.log("%j", kav.getGroup());
