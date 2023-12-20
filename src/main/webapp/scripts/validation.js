const textReg1 = new RegExp("(-5|\\+?3)$");
const textReg2 = new RegExp("-[0-4](\\.([0-9]+)?)?$");
const textReg3 = new RegExp("\\+?[0-2](\\.([0-9]+)?)?$");

class Validator {
    validateText(teg) {
        const value = teg.value;
        if (value === null || value === undefined) return false;
        return value.search(textReg1) === 0 || value.search(textReg2) === 0 || value.search(textReg3) === 0;
    }

    validateRadio(tegs) {
        let selected = tegs.filter(teg => teg.checked)
        return selected.length === 1
    }

    validateCheckBox(tegs) {
        let selected = tegs.filter(elem => elem.checked)
        return selected.length === 1;
    }

    getTextValue(teg) {
        if (this.validateText(teg)) {
            return teg.value;
        }

        return null;
    }

    getRadioValue(tegs) {
        if (this.validateRadio(tegs)) {
            return tegs.filter(teg => teg.checked)[0].value;
        }

        return null;
    }

    getCheckBoxValue(tegs) {
        if (this.validateCheckBox(tegs)) {
            return tegs.filter(teg => teg.checked)[0].value;
        }

        return null;
    }
}
