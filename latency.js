var accounts = ['checking account', 'travel rewards', 'retail card']

console.log('updating balance info..')

var ajax = (account) => {
    var promise = new Promise(function(resolve, reject) {
        var amount = 50 + Math.floor(Math.random() * 100)

        setTimeout( function() {
            // resolve(amount)

            if (account === 'retail card') {
               reject('not valid')
            } else {
                resolve('$' + amount)
            }
        }, 1005)

    })

    return promise
}

var fetchFromCache = () => {
    return Promise.resolve('cached: $100,000!')
}

var getData = () => {
    var timeAllowed = 1000
    var deadline = Date.now() + timeAllowed

    var freshData = ajax('checking account') // ~1000ms

    var cachedData = fetchFromCache().then((data) => {
        return new Promise((resolve, reject) => {
            var timeRemaining = Math.max(deadline - Date.now(), 0)
            setTimeout(() => {
                resolve(data)
            }, timeRemaining)
        })
    })

    var failure = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Unable to fetch in time'))
        }, timeAllowed) // ~1000ms
    })

    return Promise.race([freshData, cachedData, failure])
}


getData().then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})
