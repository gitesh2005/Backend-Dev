Query operator :

1) comparison operator:
--------------------------

i) $eq : Equal to

ii) $ne  : Not equal to

iii) $gte : Greater than or equal

iv) $gt : Greater than

v) $lt : Less than

vi) $lte : Less than or equal

vii) $in : Match any value in array

viii) $nin : Match none of value in array



2) Logical Operator : 
--------------------------

// AND  -> db.students.find({
    $and : [
        {age : {$age : 21}},
        {gpa : {$gte : 3.5}}
    ]  
});



// OR  -> db.students.find({
    $or : [
        {age : {$lt : 20}},
        {gpa : {$gte : 3.8}}
    ]
});


// NOT -> db.students.find({
    age:{ $not : {$gte : 21}}
});


MongoDB Index : Improves query performance by creating 