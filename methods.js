//reused functions
module.exports ={
    //sort array by last name ascending
    lastNameAscending: function (a, b) {
        var A = a[0];
        var B = b[0];
        A = A.toLowerCase();
        B = B.toLowerCase();
        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
    },
    //sort array by last name descending
    lastNameDescending: function (a, b) {
        var A = a[0];
        var B = b[0];
        A = A.toLowerCase();
        B = B.toLowerCase();
        if (A < B) return 1;
        if (A > B) return -1;
        return 0;
    },
    //sort array by birthDate.
    birtDateAscending: function (a, b) {
        var A = a[4];
        var B = b[4];
        A = Date.parse(A);
        B = Date.parse(B);
        if (A > B) return 1;
        if (A < B) return -1;
        return 0;
    },
    //return by female first.
    ladyFirst: function (records) {
        var sexySortArray = [];
        for (var i = 0; i < records.length; i++) {
            if (records[i][2][0] === "F") {
                sexySortArray.push(records[i]);
            }
        }
        for (var i = 0; i < records.length; i++) {
            if (records[i][2][0] === "M") {
                sexySortArray.push(records[i]);
            }
        }
        return sexySortArray;
    }
};
