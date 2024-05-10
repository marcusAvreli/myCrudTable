import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import  "./aside.scss";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Aside extends WJElement {
    constructor() {
        super();
    }
	static get is() {
		return `${elementPrefix}-aside`;
	}
	static get className(){
		return "Aside";
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

        if(this.width)
            this.style.setProperty("--wj-aside-width", this.width);

        if(this.top && this.hasAttribute("fixed"))
            this.style.setProperty("--wj-aside-top", this.top);

        let element = document.createElement("slot");

        fragment.appendChild(element);

        return fragment;
    }
}

customElements.get(Aside.is) || window.customElements.define(Aside.is, Aside);