/**
 * Generic image processing functions
 *
 */
function scaleToFit(width, height, image) {
    console.log(`Scaling image to ${width} x ${height}`)
    return image
}

function watermark(text, image) {
    console.log(`Watermarking image with ${text}`)
    return image
}

function grayscale(image) {
    console.log(`Converting image to grayscale`)
    return image
}

function processImage(image) {
    return Promise.resolve(image).then((image) => {
        return scaleToFit(400, 500, image)
    }).then((image) => {
        return watermark('Acme corporation', image)
    }).then((image) => {
        return grayscale(image)
    })
}

processImage('image.jpg').catch((err) => {
    console.error(err)
})
