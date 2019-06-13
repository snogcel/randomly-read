export default function validate(values) {
    const errors = {}
    const requiredFields = [
      'setting',
      'audience',
      'intention',
      'ease'
    ]
  
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    return errors
  }