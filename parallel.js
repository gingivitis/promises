var accounts = ['checking account', 'travel rewards', 'retail card']

console.log('updating balance info..')

function ajax(account) {
    var promise = new Promise((resolve, reject) => {
        var amount = 50 + Math.floor(Math.random() * 100)

        setTimeout(() => {
            // resolve('$' + amount)

            if (account === 'retail card') {
               reject('not valid')
            } else {
                resolve('$' + amount)
            }
        }, 1000)

    })

    return promise
}

// accounts.forEach((account) => {
//     ajax(account).then((balance) => {
//         console.log(`${account} balance: ${balance}`)
//     })
// })

var requests = accounts.map((account) => {
    return ajax(account)
})

// Promise.all(requests).then((balances) => {
//     console.log(`All ${balances.length} balances are up to date`)
//     console.log('Balances:', balances)
// }).catch((err) => {
//     console.log('An error occurred:', err)
// })

function settled(promises) {
    var alwaysFulfilled = promises.map((p) => {
        return p.then((value) => {
            return { state: 'fulfilled', value: value}
        }, (err) => {
            return { state: 'rejected', reason: err}
        })
    })

    return Promise.all(alwaysFulfilled)
}

settled(requests).then((outcomes) => {
    var count = 0

    outcomes.forEach((outcome) => {
        if (outcome.state === 'fulfilled') { count++ }
    })

    console.log(`${count} of ${outcomes.length} were updated`)
    console.log(outcomes)
})
