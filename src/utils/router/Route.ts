import Component from 'src/utils/component/Component'
import { render } from 'src/utils/renderDom'

class Route {
    _pathname: string
    _block: Component<any>
    _rootQuery: string

    constructor(pathname: string, _block: Component<any>, _rootQuery: string) {
        this._pathname = pathname
        this._rootQuery = _rootQuery
        this._block = _block
    }

    leave() {
        if (this._block) {
            this._block.getContent()?.forEach((element) => {
                element.remove()
            })
        }
    }

    match(pathname: string) {
        return pathname === this._pathname
    }

    render() {
        render(this._rootQuery, this._block)
    }
}

export default Route
