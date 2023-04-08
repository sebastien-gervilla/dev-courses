export default class CSS {

    static toggleClass(name: string, element?: HTMLElement | null) {
        if (!element) return;

        CSS.hasClass(name, element) ?
            element.classList.remove(name) :
            element.classList.add(name);
    }

    static toggleBetweenClasses(first: string, second: string, element?: HTMLElement | null) {
        if (!element) return;

        if (CSS.hasClass(first, element) && !CSS.hasClass(second, element)) {
            element.classList.remove(first);
            void element.offsetWidth;
            element.classList.add(second);
            return;
        }

        element.classList.remove(second);
        void element.offsetWidth;
        element.classList.add(first);
        return;
    }

    static addClass(name: string, element?: HTMLElement | null) {
        if (!element) return;

        if (!CSS.hasClass(name, element))
            element.classList.add(name)
    }

    static removeClass(name: string, element?: HTMLElement | null) {
        if (!element) return;

        if (CSS.hasClass(name, element))
            element.classList.remove(name)
    }

    static hasClass(name: string, element?: HTMLElement | null) {
        return element && element.classList.contains(name);
    }
}