var accounts = ['checking account', 'travel rewards', 'retail card']

console.log('updating balance info..')

function ajax(account) {
    var promise = new Promise((resolve, reject) => {
        var amount = 50 + Math.floor(Math.random() * 100)

        setTimeout(() => {
            resolve('$' + amount)

            // if (account === 'travel rewards') {
            //    reject('not valid')
            // } else {
            //     resolve('$' + amount)
            // }
        }, 1000)

    })

    return promise
}

// using reducer / loop
// function sequence(array, callback) {
//     return array.reduce(function(promise, item) {
//         return promise.then(function() {
//             return callback(item)
//         })
//     }, Promise.resolve())
// }

// using recursion
function sequence(array, callback) {
    function chain(array, index) {
        if (index === array.length) return Promise.resolve()

        return Promise.resolve(callback(array[index])).then(() => {
            return chain(array, index + 1)
        })
    }

    return chain(accounts, 0)
}

sequence(accounts, (account) => {
    // run for each account
    console.log(`Connecting to ${account}`)
    return ajax(account).then((balance) => {
        console.log(`Balance: ${balance}`)
    })
}).catch((err) => {
    console.log(err)
})


// accounts.reduce(function(promise, item) {
//     return promise.then(function() {
//         // return callback(item)
//         return ajax(item).then(function(balance) {
//             console.log(`Balance: ${balance}`)
//         })
//     })
// }, Promise.resolve())
