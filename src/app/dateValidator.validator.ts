import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {      
        const value = control.value;

        if (!value) {
            return null;
        }
        let currentDate = new Date();
        let start = currentDate.setHours(0,0,0,0)
        let passDate = new Date(value).setHours(10,0,0,0)
        const passwordValid = (passDate > start || passDate === start) ? true : false;            
        return !passwordValid ? {passwordStrength:true}: null;
    }
}