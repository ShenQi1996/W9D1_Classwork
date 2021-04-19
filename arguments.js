function sum() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
};

function sum2(...args) {

    let sum = 0; 
    for (let i = 0; i < args.length; i++) {
        sum += args[i];
    }
    return sum
};

// console.log(sum(1, 2, 3, 4));
// console.log(sum2(1, 2, 3, 4, 5));

Function.prototype.myBind1 = function (context, ...bindingArgs) {
    const that = this;
    return function (...callingArgs) {
        return that.apply(context, bindingArgs.concat(callingArgs));
    };

}

Function.prototype.myBind2 = function () {
    const that = this;
    let context = arguments[0];
    let bindingArgs = Array.from(arguments).slice(1);
    return function () {
        let callingArgs = Array.from(arguments);
        return that.apply(context, bindingArgs.concat(callingArgs));
    };

}


class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind2(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind2(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind2(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind2(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true