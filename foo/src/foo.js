import React from 'react'

export default class Foo extends React.Component {
	foo = 'bar'
	bar = { a: 1 }
	componentDidMount() {
		setTimeout(async () => {
			const bar = await import('./bar')
			bar()
		}, 5000)
		alert('fgfdhd')
	}
	render() {
		const bar = { b: 2, ...this.bar }
		return <div>{this.foo}</div>
	}
}
