const e = require("express");

const users = [{
        id: 'as23',
        nick: 'Octopus',
        firstName: 'John',
        LastName: 'Dou'
    },
    {
        id: 'as25',
        nick: 'Star',
        firstName: 'Andy',
        LastName: 'Lee'
    },
    {
        id: 'as77',
        nick: 'Wally',
        firstName: 'Liza',
        LastName: 'Corty'
    }
]




const newArr = users.map(el => {   
    return {[el.id]: {
        nick: el.nick,
        firstName: el.firstName,
        LastName: el.LastName
    }};
})
console.log(newArr);
