let editIndex = null;
let modal = null; // ✅ Global modal variable

document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById('addbtn');
  const myModalEl = document.getElementById('mymodal');

  // ✅ Initialize modal once
  modal = new bootstrap.Modal(myModalEl);

  addBtn.addEventListener('click', function () {
    editIndex = null;

    // Clear form inputs
    document.getElementById('frtname').value = '';
    document.getElementById('lstname').value = '';
    document.getElementById('eml').value = '';
    document.getElementById('course').value = '';
    document.getElementById('db').value = '';
    document.querySelectorAll('input[name="gender"]').forEach(input => input.checked = false);
    document.getElementById('address').value = '';
    document.getElementById('phone').value = '';

    modal.show(); // ✅ Show modal
  });

  refreshTable();
});

function validateFirstName() {
  const firstname = document.getElementById('frtname').value.trim();
  const error = document.getElementById('n1');
  if (firstname === '') {
    error.textContent = 'Please enter first name';
    return false;
  } else {
    error.textContent = '';
    return true;
  }
}

function validateLastName() {
  const lastname = document.getElementById('lstname').value.trim();
  const error = document.getElementById('n2');
  if (lastname === '') {
    error.textContent = 'Please enter last name';
    return false;
  } else {
    error.textContent = '';
    return true;
  }
}

function validateEmail() {
  const email = document.getElementById('eml').value.trim().toLowerCase();
  const error = document.getElementById('n3');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    error.textContent = 'Please enter email';
    return false;
  } else if (!emailRegex.test(email)) {
    error.textContent = 'Invalid email format';
    return false;
  } else {
    error.textContent = '';
    return true;
  }
}

function validateCourse() {
  const course = document.getElementById('course').value.trim();
  const error = document.getElementById('n4');
  if (course === '') {
    error.textContent = 'Please select course';
    return false;
  } else {
    error.textContent = '';
    return true;
  }
}

function validateDOB() {
  const dobInput = document.getElementById('db').value.trim();
  const error = document.getElementById('n5');

  if (dobInput === '') {
    error.textContent = 'Please enter date of birth';
    return false;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  dob.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (dob > today) {
    error.textContent = 'Birth date cannot be Valid';
    return false;
  }

  error.textContent = '';
  return true;
}

function validateGender() {
  const gender = document.querySelector('input[name="gender"]:checked');
  const error = document.getElementById('n6');
  if (!gender) {
    error.textContent = 'Please select gender';
    return false;
  } else {
    error.textContent = '';
    return true;
  }
}

function validateAddress() {
  const address = document.getElementById('address').value.trim();
  const error = document.getElementById('n7');
  if (address === '') {
    error.textContent = 'Please enter address';
    return false;
  } else {
    error.textContent = '';
    return true;
  }
}

function validatePhone() {
  const phone = document.getElementById('phone').value.trim();
  const error = document.getElementById('n8');
  const phoneRegex = /^\d{10}$/;
  if (phone === '') {
    error.textContent = 'Please enter phone number';
    return false;
  } else if (!phoneRegex.test(phone)) {
    error.textContent = 'Phone number must be exactly 10 digits';
    return false;
  } else {
    error.textContent = '';
    return true;
  }
}

document.getElementById('frtname').addEventListener('input', validateFirstName);
document.getElementById('lstname').addEventListener('input', validateLastName);
document.getElementById('eml').addEventListener('input', validateEmail);
document.getElementById('course').addEventListener('input', validateCourse);
document.getElementById('db').addEventListener('input', validateDOB);
document.getElementsByName('gender').forEach(radio => radio.addEventListener('change', validateGender));
document.getElementById('address').addEventListener('input', validateAddress);
document.getElementById('phone').addEventListener('input', validatePhone);

function saveData() {
  const isValid =
    validateFirstName() &&
    validateLastName() &&
    validateEmail() &&
    validateCourse() &&
    validateDOB() &&
    validateGender() &&
    validateAddress() &&
    validatePhone();

  if (!isValid) return;

  const newData = {
    firstname: document.getElementById('frtname').value.trim(),
    lastname: document.getElementById('lstname').value.trim(),
    email: document.getElementById('eml').value.trim().toLowerCase(),
    field: document.getElementById('course').value.trim(),
    dob: document.getElementById('db').value.trim(),
    gender: document.querySelector('input[name="gender"]:checked').value.trim(),
    address: document.getElementById('address').value.trim(),
    phone: document.getElementById('phone').value.trim()
  };

  let students = JSON.parse(localStorage.getItem('students')) || [];

  if (editIndex !== null) {
    students[editIndex] = newData;
    editIndex = null;
  } else {
    students.unshift(newData);
  }

  localStorage.setItem('students', JSON.stringify(students));
  refreshTable();

  modal.hide(); // ✅ Use the global modal instance to hide

  // Clear form
  document.getElementById('frtname').value = '';
  document.getElementById('lstname').value = '';
  document.getElementById('eml').value = '';
  document.getElementById('course').value = '';
  document.getElementById('db').value = '';
  document.querySelectorAll('input[name="gender"]').forEach(input => input.checked = false);
  document.getElementById('address').value = '';
  document.getElementById('phone').value = '';
}

function addRowToTable(data, index) {
  const tableBody = document.querySelector(".stdata tbody");
  const newRow = tableBody.insertRow();

  const values = [
    data.firstname,
    data.lastname,
    data.email,
    data.field,
    data.dob,
    data.gender,
    data.address,
    data.phone
  ];

  values.forEach(value => {
    const cell = newRow.insertCell();
    cell.textContent = value;
  });

  const actionCell = newRow.insertCell();

  const updateBtn = document.createElement("button");
  updateBtn.className = "btn btn-success btn-sm me-2";
  updateBtn.textContent = "Update";
  updateBtn.onclick = function () {
    editIndex = index;
    loadFormForEdit(data);
    modal.show(); // ✅ Reuse the modal
  };
  actionCell.appendChild(updateBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = function () {
    deleteStudent(index);
  };
  actionCell.appendChild(deleteBtn);
}

function loadFormForEdit(data) {
  document.getElementById('frtname').value = data.firstname;
  document.getElementById('lstname').value = data.lastname;
  document.getElementById('eml').value = data.email;
  document.getElementById('course').value = data.field;
  document.getElementById('db').value = data.dob;
  document.querySelectorAll('input[name="gender"]').forEach(input => {
    input.checked = input.value === data.gender;
  });
  document.getElementById('address').value = data.address;
  document.getElementById('phone').value = data.phone;
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    if (index >= 0 && index < students.length) {
      students.splice(index, 1);
      localStorage.setItem("students", JSON.stringify(students));
      refreshTable();
    }
  }
}

function refreshTable() {
  const tableBody = document.querySelector(".stdata tbody");
  tableBody.innerHTML = "";

  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach((student, index) => {
    addRowToTable(student, index);
  });
}

