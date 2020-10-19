var rx = require('rxjs');

const Message = () => {
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
    const add = message => {
        source.push(message)
       display()
    }
    return {
        display,
        add,
        onMessage
    }
}
const message = Message()
message.onMessage(evnt => console.log('ev', evnt))

setTimeout(() => message.add('CCC'), 3000)
setTimeout(() => message.add('DDD'), 6000)
setTimeout(() => message.add('e'), 6000)
