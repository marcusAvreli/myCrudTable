import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import  "./container.scss";
/**
 * @injectHTML
 */
export class Container extends WJElement {
    constructor() {
        super();
    }

    
	 static get className(){
		return "Container";
	}

	static get is() {
		return `${elementPrefix}-container`;
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

        if(this.indent)
            this.style.setProperty("--wj-container-indent", this.indent);

        let element = document.createElement("slot");

        fragment.appendChild(element);

        return fragment;
    }
}

customElements.get(Container.is) || window.customElements.define(Container.is, Container);