// function getCurrentPosision() {
//     const subject = new Rx.Subject()
//
//     navigator.geolocation.getCurrentPosition(function (pos: Geoposition) {
//         subject.next(
//             {
//                 latitude: pos.coords.latitude,
//                 longitude: pos.coords.longitude
//             })
//         subject.complete()
//     }, function (err) {
//         subject.error(err.code)
//     })
//
//     return subject
// }
//
// function fetchWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
//     return new Rx.Observable.fromPromise(fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=01e6a6391e561e30874b7f17d148185c`))
// }
//
// function transformResponse(response) {
//     return new Rx.Observable.fromPromise(response.json())
//         .map(result => {
//             result.icon = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`
//             return result
//         })
// }
//
// export default {
//     getWeather (): Object {
//         return getCurrentPosision()
//             .flatMap(pos => fetchWeather(pos.latitude, pos.longitude))
//             .flatMap(response => transformResponse(response))
//     }
// }
