var kav = function () {
  var group = {list: [],
               ids: []}
  return {
    __sortById: function (personA, personb) {
      return personA.id - personB.id;
      },
    getGroup: function () {
      return group;
      },
    addShift: function (id, shift) {
      if (!group.list[id].shift) {
        group.list[id].shift = [];
        }
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
console.log(kav.addShift(0, {start: Date.parse("Thu, 01 Jan 1970 00:00:00 GMT-0400")}));
console.log(kav.getGroup());
