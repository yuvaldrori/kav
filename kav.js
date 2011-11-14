var KAV = function () {

        var l = []; //array of p
        var ids = []; //array of p.id
        
        var sanitizel = function (a) {
                if (!Array.isArray(a)) {
                    throw {
                        name: "userException",
                        message: "not an array"
                    };
                }
                for (i = 0; i < a.length; i++) {
                    if (!a[i].id) {
                        throw {
                            name: "userException",
                            message: "p has no id"
                        };
                    }
                    if (ids.indexOf(a[i].id) !== -1) {
                        throw {
                            name: "userException",
                            message: "id " + a[i].id + " already exists"
                        };
                    }
                    ids.push(a[i].id);
                }
                l = a;
                return l;
            };

        return {
            init: function (a) {
                return sanitizel(a);
            },
            addp: function (p) {
                if (!p.id) {
                    throw {
                        name: "userException",
                        message: "p has no id"
                    };
                }
                if (ids.indexOf(p.id) !== -1) {
                    throw {
                        name: "userException",
                        message: "id " + p.id + " already exists"
                    };
                }
                l.push(p);
                ids.push(p.id);
                return l;
            }
        };
    }();

try {
    console.log(KAV.init([{
        id: 1
    }, {
        id: 2
    }]));
}
catch (e) {
    console.log(e.message);
}