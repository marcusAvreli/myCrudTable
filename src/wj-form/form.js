import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import  "./form.scss";
/**
 * @injectHTML
 */
export class Form extends WJElement {
    constructor() {
        super();
    }
static get className(){
		return "Form";
	}

	static get is() {
		return `${elementPrefix}-form`;
	}
	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}
    static get cssStyleSheet() {		
        return this.styles;
    }
    

    

    static get observedAttributes() {
        return [];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let element = document.createElement("slot");

        fragment.appendChild(element);

        return fragment;
    }
}

customElements.get(Form.is) || window.customElements.define(Form.is, Form);