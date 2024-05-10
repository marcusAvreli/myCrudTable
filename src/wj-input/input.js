import { default as WJElement, event } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import  "./input.scss";
/**
 * @injectHTML
 */
export class Input extends WJElement {
    constructor(options = {}) {
        super();

        // this._value = "";
        this.invalid = false;
        this.pristine = true;
        this.internals = this.attachInternals();
    }
 static get className(){
		return "Input";
	}

	static get is() {
		return `${elementPrefix}-input`;
	}
	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}
    static get cssStyleSheet() {		
        return this.styles;
    }
	get label (){
		return this.getAttribute("label") || "";
	}
    set value(value) {

        this.setAttribute("value", value);
    }

    get value() {
        return this.getAttribute("value") || "";
    }

    get customErrorDisplay() {
        return this.hasAttribute('custom-error-display');
    }

    get validateOnChange() {
        return this.hasAttribute('validate-on-change');
    }

    get invalid() {
        return this.hasAttribute('invalid');
    }

    set invalid(isInvalid) {
        isInvalid && this.customErrorDisplay ? this.setAttribute('invalid', '') : this.removeAttribute('invalid');
    }

    get form() {
        return this.internals.form;
    }

    get name() {
        return this.getAttribute('name');
    }

    get type() {
        return this.localName;
    }

    get validity() {
        return this.internals.validity;
    }

    get validationMessage() {
        return this.internals.validationMessage;
    }

    get willValidate() {
        return this.internals.willValidate;
    }

    checkValidity() {
        return this.internals.checkValidity();
    }

    reportValidity() {
        return this.internals.reportValidity();
    }
static get formAssociated(){
	return true;
}
  

    

    static get observedAttributes() {
        return ["value"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
		console.log("draw_input_start");
        let hasSlotStart = this.hasSlot(this, "start");
        let hasSlotEnd = this.hasSlot(this, "end");
        let fragment = document.createDocumentFragment();

        // Wrapper
        let native = document.createElement("div");
        native.setAttribute("part", "native");
        native.classList.add("native-input", this.variant || "default");

        if(this.hasAttribute("invalid"))
            native.classList.add("has-error");

        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        let inputWrapper = document.createElement("div");
        inputWrapper.classList.add("input-wrapper");

        // Label
        let label = document.createElement("label");
        label.innerText = this.label;
		console.log("=======:text label:"+this.label);
        if(this.value && !this.hasAttribute("error"))
            label.classList.add("fade");

        // Input
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("part", "input");
        input.setAttribute("value", this.value || "");
        input.classList.add("form-control");

        if(this.hasAttribute("placeholder"))
            input.setAttribute("placeholder", this.placeholder);

        if(this.hasAttribute("disabled"))
            input.setAttribute("disabled", "");

        if(this.hasAttribute("readonly"))
            input.setAttribute("readonly", "");

        // Error
        let error = document.createElement("div");
        error.classList.add("error-message");

        let start = null;
        if(hasSlotStart) {
            start = document.createElement("slot");
            start.setAttribute("name", "start");
        }

        let end = null;
        if(hasSlotEnd) {
            end = document.createElement("slot");
            end.setAttribute("name", "end");
        }

        if(hasSlotStart) {
            wrapper.appendChild(start);
            native.classList.add("has-start");
        }

        if(this.variant === "standard") {
            if(this.label)
                native.appendChild(label);
        } else {
            inputWrapper.appendChild(label);
        }

        inputWrapper.appendChild(input);

        wrapper.appendChild(inputWrapper);

        native.appendChild(wrapper);

        if(this.hasAttribute("clearable")) {
            this.clear = document.createElement("wj-button");
            this.clear.classList.add("clear");
            this.clear.setAttribute("variant", "link")
            this.clear.setAttribute("part", "clear");

            let clearIcon = document.createElement("wj-icon");
            clearIcon.setAttribute("name", "x");

            this.clear.appendChild(clearIcon);

            inputWrapper.appendChild(this.clear);
        }

        if(hasSlotEnd) {
            wrapper.appendChild(end);
            native.classList.add("has-end");
        }


        native.appendChild(error);

        fragment.appendChild(native);

        this.native = native;
        this.labelElement = label;
        this.input = input;
        this.errorMessage = error;
console.log("draw_input_finish");
        return fragment;
    }

    afterDraw() {
        [
            'type',
            'value',
            'placeholder',
            'required',
            'min',
            'max',
            'minLength',
            'maxLength',
            'pattern'
        ].forEach((attr) => {
            const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);
            if(attrValue !== null && attrValue !== undefined) {
                this.input[attr] = attrValue;
            }
        });

        this.input.addEventListener("focus", (e) => {
            this.labelElement.classList.add("fade");
            this.native.classList.add("focused");
        });

        this.input.addEventListener("blur", (e) => {
            this.native.classList.remove("focused");
            if(!e.target.value)
                this.labelElement.classList.remove("fade")
        });

        this.input.addEventListener('input', (e) => {
            if(this.validateOnChange) {
                this.pristine = false;
            }
            this.input.classList.remove("pristine");

            this.labelElement.classList.add("fade");

            const clone = new e.constructor(e.type, e);
            this.dispatchEvent(clone);

            this.validateInput();

            event.dispatchCustomEvent(this, "wj-input:input", {
                value: this.input.value
            });
        });

        this.addEventListener('invalid', (e) => {
            this.invalid = true;
            this.pristine = false;

            this.errorMessage.textContent = this.internals.validationMessage;

            if(this.customErrorDisplay) {
                e.preventDefault();
            }
        });

        this.addEventListener('focus', () => this.input.focus());

        if(this.clear) {
            this.clear.addEventListener("wj:button-click", (e) => {
                this.input.value = "";
                event.dispatchCustomEvent(this.clear, "wj-input:clear");
            });
        }
    }

    validateInput() {
        const validState = this.input.validity;
        this.invalid = false;

        if(!validState.valid) {
            for(let state in validState) {
                const attr = `message-${state.toString()}`;

                if(validState[state]) {
                    this.validationError = state.toString();
                    this.invalid = !this.pristine && !validState.valid;

                    let errorMessage = this.message;

                    if(!this.hasAttribute("message"))
                        errorMessage = this.hasAttribute(attr) ? this.getAttribute(attr) : this.input.validationMessage;

                    this.internals.setValidity(
                      {[this.validationError]: true},
                      errorMessage
                    );

                    if(this.invalid && this.customErrorDisplay) {
                        this.dispatchEvent(new Event('invalid'));
                    }
                }
            }
        }
        else {
            this.internals.setValidity({});
            this.pristine = false;
            this.errorMessage.textContent = this.input.validationMessage;
        }
    }

    hasSlot(el, slotName = null) {
        let selector = slotName ? `[slot="${slotName}"]` : "[slot]";

        return el.querySelectorAll(selector).length > 0 ? true : false;
    }
}

customElements.get(Input.is) || window.customElements.define(Input.is, Input);