import { JSDOM } from 'jsdom'
const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'https://example.org/'
})
global.document = window.document
global.window = window
global.HTMLElement = window.HTMLElement
global.XMLHttpRequest = window.XMLHttpRequest
global.console = console
global.Event = window.Event
