var kav = function () {
  var list = [];
  var ids = [];
  return {
    getList: function () {
      return list;
      },
    addPerson: function (person) {
      if (!person.id) {
        return {name: "error",
                message: "person must have id"};
      }
      if (ids.indexOf(person.id !== -1)) {
        return {name: "error",
                message: "id not unique"};
      }
      list.push(person);
      ids.push(person.id);
      return 0;
      },
    removePerson: function (id) {
      var i = 0,
          j = 0;
      for (i = 0; i < list.length; i = i +1) {
        if (list[i].id === id) {
          list.splice (i, 1);
          for (j = 0; j < ids.length; j = j + 1) {
            if (ids[j] === id) {
              ids.splice(j, 1);
            }
          }
        }
      }
    },
    __getIds: function () {
      return ids;
    }
  }
}();

kav.addPerson({id:1});
kav.addPerson({id:2});
kav.addPerson({id:3});
kav.removePerson(2);
console.log(kav.getList());
console.log(kav.__getIds());
