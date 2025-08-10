document.addEventListener('DOMContentLoaded', function() {
  // Existing nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
  }

  // Add Vehicle form validation
  const vehicleForm = document.getElementById('addVehicleForm');
  if (vehicleForm) {
    vehicleForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Clear previous errors and error classes
      const errorMessages = vehicleForm.querySelectorAll('.error-message');
      errorMessages.forEach(em => em.style.display = 'none');

      const inputs = vehicleForm.querySelectorAll('input, select, textarea');
      inputs.forEach(input => input.classList.remove('error'));

      let isValid = true;

      // Helper to show error for a field
      function showError(input, message) {
        const errorSpan = input.parentElement.querySelector('.error-message');
        if (errorSpan) {
          errorSpan.textContent = message;
          errorSpan.style.display = 'block';
        }
        input.classList.add('error');
        isValid = false;
      }

      // Validate Classification
      const classification = vehicleForm.classification_id;
      if (!classification.value) {
        showError(classification, 'Classification is required.');
      }

      // Validate Make
      const make = vehicleForm.inv_make;
      if (!make.value.trim()) {
        showError(make, 'Make is required.');
      }

      // Validate Model
      const model = vehicleForm.inv_model;
      if (!model.value.trim()) {
        showError(model, 'Model is required.');
      }

      // Validate Year
      const year = vehicleForm.inv_year;
      const yearVal = parseInt(year.value, 10);
      const currentYear = new Date().getFullYear() + 1;
      if (!year.value || isNaN(yearVal) || yearVal < 1900 || yearVal > currentYear) {
        showError(year, `Year must be between 1900 and ${currentYear}.`);
      }

      // Validate Price
      const price = vehicleForm.inv_price;
      const priceVal = parseFloat(price.value);
      if (!price.value || isNaN(priceVal) || priceVal <= 0) {
        showError(price, 'Price must be greater than 0.');
      }

      // Validate Miles
      const miles = vehicleForm.inv_miles;
      const milesVal = parseInt(miles.value, 10);
      if (!miles.value || isNaN(milesVal) || milesVal < 0) {
        showError(miles, 'Miles must be 0 or greater.');
      }

      // Validate Color
      const color = vehicleForm.inv_color;
      if (!color.value.trim()) {
        showError(color, 'Color is required.');
      }

      if (isValid) {
        vehicleForm.submit();
      }
    });
  }
});
