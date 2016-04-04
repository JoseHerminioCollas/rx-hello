/**  Store CSS properties to be used inline in UI components
 * @module goatstone/ui/style/main
 * */

module.exports = {
    control: {
        start: {
            fontSize: '1.0em',
            backgroundColor: 'hsla( 100, 20%, 80%, 1.0 )',
            margin: '3px',
            borderRadius: '7px'
        },
        stop: {
            fontSize: '1.0em',
            backgroundColor: 'hsla( 0, 20%, 80%, 1.0 )',
            margin: '3px',
            borderRadius: '7px'
        },
        container: {
            fontSize: '1.2em',
            transition: 'opacity 0s',
            borderRadius: '13px',
            backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
            padding: '12px'
        },
        citySelect: {
            fontSize: '1.1em',
            backgroundColor: 'hsla( 100, 10%, 50%, 1.0 )',
            margin: '3px',
            borderRadius: '5px'
        }
    },
    messageDisplay: {
        container: {
            fontSize: '2.0em',
            color: 'hsla( 200, 10%, 10%, 1.0 )',
            transition: 'opacity 6s',
            borderRadius: '7px',
            minWidth: '6em',
            width: '100%',
            backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
            padding: '10px'
        }
    },
    weatherDisplay: {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            padding: '6px',
            transition: 'opacity 1s'
        },
        item: {
            fontSize: '0.9em',
            padding: '3px',
            margin: '1px 0px',
            borderRadius: '3px',
            color: 'hsla( 100, 50%, 10%, 1.0 )',
            backgroundColor: 'hsla( 200, 50%, 50%, 1.0 )',
            flexGrow: 1,
            textAlign: 'right'
        },
        em: {
            fontSize: '1.2em',
            fontWeight: 900,
            display: 'inline-block',
            background: 'hsla( 200, 90%, 90%, 1.0 )',
            padding: '3px',
            margin: '0 6px',
            borderRadius: '3px'
        },
        title: {
            fontSize: '1.0em',
            color: 'hsla( 200, 40%, 90%, 1.0 )',
            backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
            borderRadius: '3px',
            padding: '12px',
            margin: 0
        }
    },
    twitterDisplay: {
        container: {
            color: 'hsla( 200, 10%, 20%, 1.0 )',
            transition: 'opacity 2s',
            padding: '6px'
        },
        article: {
            fontSize: '0.9em',
            padding: '6px',
            margin: '1px 0px',
            borderRadius: '3px',
            color: 'hsla( 100, 50%, 10%, 1.0 )',
            background: 'hsla( 200, 90%, 90%, 1.0 )'
        },
        title: {
            fontSize: '1.0em',
            color: 'hsla( 200, 40%, 90%, 1.0 )',
            borderRadius: '3px',
            backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
            padding: '12px',
            margin: 0
        }
    },
    mapDisplay: {},
    titleHeader: {
        container: {
            fontSize: '1.2em',
            color: 'hsla( 200, 10%, 10%, 1.0 )',
            transition: 'opacity 1s',
            borderRadius: '7px',
            minWidth: '6em',
            width: '100%',
            backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
            padding: '10px'
        },
        link: {
            color: 'hsla( 200 , 50%, 5%, 1.0 )',
            textDecoration: 'none'
        }
    }
}
