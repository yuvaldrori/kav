var kav = function () {
  var group = [];
  var personalNumber = [];
  return {
    getGroup: function () {
      return group;
      },
    addPerson: function (person) {
      group.push(person);
      },
    removePerson: function (personalNuber) {
      var i = 0;
      for (i = 0; i < group.length; i = i +1) {
        if (group[i].id === personalNumber) {
    group.splice (i, 1);
	}
      }
    }
  }
}();

kav.addPerson({id:1});
kav.addPerson({id:2});
kav.addPerson({id:3});
kav.removePerson(2);
console.log(kav.getGroup());