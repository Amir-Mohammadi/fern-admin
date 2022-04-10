export enum ValidatorTypes {
  REQUIRED,
  NUMERICAL,
  MIN,
  MAX,
  MIN_LENGTH,
  MAX_LENGTH,
  PHONE_NUMBER,
  MOBILE_PHONE_NUMBER,
  EMAIL_ADDRESS,
  PASSWORD,
  SAME_PASSWORD,
}

export type ValidationRES = {
  status: boolean;
  message: string;
};

export type Validator = {
  type: ValidatorTypes;
  cost?: number;
};

export const Validate = (validators: Validator[], value: string): any => {
  var defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  for (var item of validators) {
    switch (item.type) {
      case ValidatorTypes.REQUIRED:
        defaultValidation = validateRequirement(value);
        break;
      case ValidatorTypes.NUMERICAL:
        defaultValidation = validateNumerical(value);
        break;
      case ValidatorTypes.MIN:
        defaultValidation = validateMinValue(value, +item.cost!);
        break;
      case ValidatorTypes.MAX:
        defaultValidation = validateMaxValue(value, +item.cost!);
        break;
      case ValidatorTypes.MIN_LENGTH:
        defaultValidation = validateMinLengthValue(value, +item.cost!);
        break;
      case ValidatorTypes.MAX_LENGTH:
        defaultValidation = validateMaxLengthValue(value, +item.cost!);
        break;
      case ValidatorTypes.PHONE_NUMBER:
        defaultValidation = validatePhoneNumber(value);
        break;
      case ValidatorTypes.MOBILE_PHONE_NUMBER:
        defaultValidation = validateMobilePhoneNumber(value);
        break;
      case ValidatorTypes.EMAIL_ADDRESS:
        defaultValidation = validateEmailAddress(value);
        break;
      case ValidatorTypes.PASSWORD:
        defaultValidation = validatePassword(value);
        break;
      default:
        break;
    }

    if (defaultValidation.status == false) break;
  }
  return defaultValidation;
};

const validateRequirement = (value): ValidationRES => {
  const defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  if (value && value.length !== 0) {
    return defaultValidation;
  } else {
    return {
      status: false,
      message: `پر کردن این فیلد، الزامی‌ست.`,
    };
  }
};

const validateNumerical = (number): ValidationRES => {
  const defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  if (!isNaN(number)) return defaultValidation;
  else {
    return {
      status: false,
      message: `ورودی این فیلد، نمی‌تواند مقدار غیرعددی باشد.`,
    };
  }
};

const validateMinValue = (input, min: number): ValidationRES => {
  const defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  var isChecked: boolean = min <= input;
  if (isChecked) {
    return defaultValidation;
  } else {
    return {
      status: false,
      message: `مقدار ورودی، نمی‌تواند از ${min} کمتر باشد.`,
    };
  }
};

const validateMaxValue = (input, max: number): ValidationRES => {
  const defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  var isChecked: boolean = max >= input;
  if (isChecked) {
    return defaultValidation;
  } else {
    return {
      status: false,
      message: `مقدار ورودی، نمی‌تواند از ${max} بیشتر باشد.`,
    };
  }
};

const validateMinLengthValue = (
  input: string,
  minLength: number,
): ValidationRES => {
  const defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  var inputLength = input.length;
  var isChecked: boolean = minLength <= inputLength;
  if (isChecked) {
    return defaultValidation;
  } else {
    return {
      status: false,
      message: `تعداد کاراکترهای این ورودی، نمی‌تواند از ${minLength} کمتر باشد.`,
    };
  }
};

const validateMaxLengthValue = (
  input: string,
  maxLength: number,
): ValidationRES => {
  const defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  var inputLength = input.length;
  var isChecked: boolean = maxLength >= inputLength;
  if (isChecked) {
    return defaultValidation;
  } else {
    return {
      status: false,
      message: `تعداد کاراکترهای این ورودی، نمی‌تواند از ${maxLength} بیشتر باشد.`,
    };
  }
};

const validatePhoneNumber = (phoneNumber: string): ValidationRES => {
  const defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  var phoneNumberRegEx = /^0\d{2}\d{8}$/;
  var isChecked: boolean = phoneNumberRegEx.test(phoneNumber);
  if (isChecked) {
    return defaultValidation;
  } else {
    return {
      status: false,
      message: `فرمت واردشده برای شماره تلفن ثابت، صحیح نیست.`,
    };
  }
};

const validateMobilePhoneNumber = (mobile: string): ValidationRES => {
  const defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  var mobileRegEx = /^(\+98|098|0)?9\d{9}$/;
  var isChecked: boolean = mobileRegEx.test(mobile);
  if (isChecked) {
    return defaultValidation;
  } else {
    return {
      status: false,
      message: `فرمت واردشده برای شماره تلفن همراه، صحیح نیست.`,
    };
  }
};

const validateEmailAddress = (email: string): ValidationRES => {
  const defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  var emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  var isChecked: boolean = emailRegEx.test(email);
  if (isChecked) {
    return defaultValidation;
  } else {
    return {
      status: false,
      message: `فرمت واردشده برای ایمیل، صحیح نیست.`,
    };
  }
};

const validatePassword = (password: string): ValidationRES => {
  const defaultValidation: ValidationRES = {
    status: true,
    message: '',
  };
  var passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  var isChecked: boolean = passwordRegEx.test(password);
  if (isChecked) {
    return defaultValidation;
  } else {
    return {
      status: false,
      message: `رمز عبور انتخابی، باید شامل 8 کاراکتر و حداقل 1 حرف، 1 عدد و 1 کاراکتر ویژه (#$@!%&*?) باشد.`,
    };
  }
};

// const validateJustPersian = (persianText): ValidationRES => {
//   const defaultValidation: ValidationRES = {
//     status: true,
//     message: '',
//   };
//   var justPersianRegEx = /^[\u0600-\u06FF\s]+$/;
//   var isChecked: boolean = justPersianRegEx.test(persianText);
//   if (isChecked) {
//     return defaultValidation;
//   } else {
//     return {
//       status: false,
//       message: 'ورودی این فیلد، باید "فارسی" باشد.',
//     };
//   }
// };

// const validateJustEnglish = (englishText): ValidationRES => {
//   const defaultValidation: ValidationRES = {
//     status: true,
//     message: '',
//   };
//   var justEnglishRegEx = /^[A-Za-z0-9]*$/;
//   var isChecked: boolean = justEnglishRegEx.test(englishText);
//   if (isChecked) {
//     return defaultValidation;
//   } else {
//     return {
//       status: false,
//       message: 'ورودی این فیلد، باید "انگلیسی" باشد.',
//     };
//   }
// };

export default Validate;