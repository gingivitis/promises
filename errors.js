var rejectedPromise = new Promise((resolve, reject) => {
    // reject(new Error('Arrrrgghhh'))

    throw new Error('bloooop!') // implicit 'reject'
})

rejectedPromise.catch((err) => {
    console.log('rejected!')
    console.error(err)
})


// functions that return promises should not throw err

var badfunc = (url) => {
    var image

    image.src = url // Error: image undefined
    return new Promise((resolve, reject) => {
        image.onload = resolve
        image.onerror = reject
    })
}

var goodfunc = (url) => {
    return new Promise((resolve, reject) => {
        var image
        image.src = url // Error: image undefined

        image.onload = resolve
        image.onerror = reject
    })
}

// bad! we should pass errors to promise rather than
// throwing back to caller!
try {
    badfunc().catch((err) => {
        console.error('This handler doesn\'t get invoked')
    })

} catch (err) {
    console.error('This handler gets invoked:', err)
}


goodfunc().catch((err) => {
    console.error(err)
})
