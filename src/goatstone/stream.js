var rx = require('rxjs');

const Message = () => {
    const messageSubjects = {}
    const source = [];
    const subject$ = new rx.Subject()
    let isDone = true
    const timeIncrement = 1000
    const display = (delayTime = 0, id = null) => {
        if (!isDone) return
        isDone = false
        
        Object.entries(messageSubjects)
            .filter((e) => {
                // console.log(e, id)
                return e[0] !== id
            })
            .forEach(element => {
                const onM$ = rx.zip(
                    rx.of(...source),
                    rx.timer(delayTime, timeIncrement)
                )
                .subscribe({
                    next: e => {
                        element[1].next(e[0])
                    },
                    complete: e => {
                        // console.log('complete')
                        isDone = true
                        if (source.length > 0) display(1000)
                    }
                });
            })
        source.splice(0)
    }
    const onMessage = (listener, id) => {
        messageSubjects[id] = new rx.Subject()
        messageSubjects[id]
            .asObservable()
            .subscribe(listener)
    }
    const add = (message, id) => {
        source.push(message)
        display(0, id)
    }
    return {
        add,
        onMessage
    }
}
const message = Message()
message.onMessage(evnt => console.log('1:::', evnt), '1')
message.onMessage(evnt => console.log('10:::', evnt), '10')

setTimeout(() => message.add('CCC', '1'), 3000)
setTimeout(() => message.add('DDD', '2'), 6000)
setTimeout(() => message.add('EEE'), 6000)
setTimeout(() => message.add('FFF'), 6000)
setTimeout(() => message.add('GGG'), 6000)
