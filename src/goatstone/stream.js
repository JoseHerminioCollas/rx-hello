var rx = require('rxjs');

const source = ['AAA', 'BBB'];
const subject$ = new rx.Subject()

const display = () => {
    const onM$ = rx.zip(
        rx.of(...source),
        rx.timer(0, 1000)
    )
    .subscribe(([e]) => {
        subject$.next(e)
    })
    source.splice(0)
}
const onMessage = listener => {
    subject$.asObservable().subscribe(listener)    
}
onMessage(evnt => console.log('ev', evnt))
display()
source.push('CCC')

setTimeout(() => display(), 3000)
