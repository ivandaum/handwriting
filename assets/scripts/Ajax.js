export const post = ({ url, params }) => {
    const http = new XMLHttpRequest()
    http.open('POST', url)
    http.setRequestHeader('content-type', 'application/json')

    return new Promise((resolve, reject) => {
        const status = http.status
        http.onload = () => resolve({ status, data: http.responseText })
        http.onerror = () => Error({ status, data: http.statusText })
        http.send(params)
    })
}
