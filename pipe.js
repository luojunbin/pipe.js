var Queue = (function () {
    var queue = [];
    var index = 0;

    return {
        save: function () {
            return pipe(queue.slice(index + 1));
        },

        setIndex: function (i) {
            return index = i;
        },

        update: function (list) {
            return queue = list;
        }
    };
})();

var Stoper = (function () {
    var flag = {
        stop: true
    };

    return {
        stop: function () {
            return flag;
        },

        isStop: function (data) {
            return data === flag;
        }
    };
})();

function pipe(handlers) {
    return function (data) {

        Queue.update(handlers);

        return handlers.reduce(function (input, fn, i, arr) {
            Queue.setIndex(i);

            switch(true) {
                case Stoper.isStop(input):
                    return input;

                case typeof fn === 'function':
                    return fn(input);

                case fn instanceof Array:
                    pipe(fn)(input);
                    Queue.update(arr);
                    return input;

                default:
                    console.log(Error('type wrong'), fn);
            }            
        }, data);
    };
}

function pipeAdaptor() {
    return pipe([].slice.call(arguments, 0));
}

module.exports = {
    p: pipeAdaptor,
    save: Queue.save,
    stop: Stoper.stop
};