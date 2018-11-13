console.clear();

const ValSlider = Vue.component("val-slider", {
    props: ["component"],
    data: function () {
        return {
            mousedown: false,
            mouseX: 0
        };
    },
    mounted() {
        this.$el.style.setProperty('--width', `${this.component.value}vw`);
    },
    methods: {
        handleMousedown: function (e) {
            this.mousedown = true;
        },
        handleMouseup: function (e) {
            this.mousedown = false;
        },
        handleMousemove: function (e) {
            const windowWidth = window.innerWidth;
            const newVal = Math.floor((e.clientX / windowWidth) * 100);
            if (this.mousedown) this.handleValueChange(newVal);
        },
        handleValueChange: function (width) {
            this.$emit('update-value', {
                component: this.component,
                newValue: width
            });
            this.$el.style.setProperty('--width', `${width}vw`);
        },
    },
    template: `<div class="slider" :class="component"
        v-on:mousedown="handleMousedown"
        v-on:mouseup="handleMouseup"
        v-on:mousemove="handleMousemove">
            <span class="component-name">{{component.name}}</span>
            <span class="component-value">{{Math.floor(component.value / 100 * this.component.max)}}{{component.symbol}}</span>
    </div>`
});

const app = new Vue({
    el: ".app",
    components: {
        ValSlider
    },
    data: {
        colorsComponents: [{
                name: "hue",
                value: 6,
                max: 360,
                symbol: 'º'
            },
            {
                name: "saturation",
                value: 78,
                max: 100,
                symbol: '%'
            },
            {
                name: "luminance",
                value: 47,
                max: 100,
                symbol: '%'
            }
        ]
    },
    mounted() {
        this.handleColorChange();
    },
    methods: {
        handleUpdateValue(updatedComponent) {
            this.colorsComponents.forEach(component => {
                if (component.name === updatedComponent.component.name) {
                    component.value = updatedComponent.newValue;
                }
                this.handleColorChange();
            });
        },
        handleColorChange() {
            const values = this.colorsComponents.map(component => component.value);
            const redHSL = `hsl(${values[0]}, ${values[1]}%, ${values[2]}%)`
            this.$el.style.setProperty(`--red`, redHSL);
            const greenHSL = `hsl(${values[0] + 150}, ${values[1]}%, ${values[2]}%)`
            this.$el.style.setProperty(`--green`, greenHSL);
            const blueHSL = `hsl(${values[0] + 210}, ${values[1]}%, ${values[2]}%)`
            this.$el.style.setProperty(`--blue`, blueHSL);
        }
    }
});