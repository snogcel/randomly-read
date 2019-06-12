export default function validate(values) {
    const errors = {}
    const requiredFields = [
      'settingField',
      'audienceField',
      'intentionField',
    ]
  
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    return errors
  }