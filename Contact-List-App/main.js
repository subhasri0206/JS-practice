// Initialize an empty array to store contacts
let contacts = [];

// DOM Elements
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearSearchBtn = document.getElementById('clearSearchBtn');

// Event Listener for Adding Contact
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addContact();
});

// Function to Add Contact
function addContact() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const photoInput = document.getElementById('photo');
    const photoFile = photoInput.files[0];

    // Validate Inputs
    if (!validateContact(name, phone, email, photoFile)) return;

    // Handle Photo Upload
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const photoURL = event.target.result;
            createAndStoreContact(name, phone, email, photoURL);
        };
        reader.readAsDataURL(photoFile);
    } else {
        createAndStoreContact(name, phone, email, '');
    }
}

// Function to Create and Store Contact
function createAndStoreContact(name, phone, email, photoURL) {
    const contact = { name, phone, email, photoURL };
    contacts.push(contact);
    sortContacts(); // Optional: Sort contacts alphabetically by name
    displayContacts(contacts);
    contactForm.reset();
}

// Function to Sort Contacts Alphabetically by Name
function sortContacts() {
    contacts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}

// Function to Display Contacts
function displayContacts(contactArray) {
    contactList.innerHTML = '';

    contactArray.forEach((contact, index) => {
        const li = document.createElement('li');

        // Create Image Element
        const img = document.createElement('img');
        img.src = contact.photoURL || 'https://via.placeholder.com/60';
        img.alt = contact.name;

        // Create Contact Info Div
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('contact-info');

        const nameSpan = document.createElement('span');
        nameSpan.innerHTML = contact.name;

        const phoneSpan = document.createElement('span');
        phoneSpan.innerHTML = `${contact.phone}`;

        const emailSpan = document.createElement('span');
        emailSpan.innerHTML = `${contact.email}`;

        infoDiv.appendChild(nameSpan);
        infoDiv.appendChild(phoneSpan);
        infoDiv.appendChild(emailSpan);

        // Create Remove Button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeContact(index);

        // Append Elements to List Item
        li.appendChild(img);
        li.appendChild(infoDiv);
        li.appendChild(removeBtn);

        contactList.appendChild(li);
    });
}

// Function to Remove Contact
function removeContact(index) {
    contacts.splice(index, 1);
    displayContacts(contacts);
}

// Event Listener for Search
searchBtn.addEventListener('click', function() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        displayContacts(contacts);
        return;
    }

    const filteredContacts = contacts.filter(contact => {
        return (
            contact.name.toLowerCase().includes(query) ||
            contact.phone.includes(query) ||
            contact.email.toLowerCase().includes(query)
        );
    });

    displayContactsWithHighlight(filteredContacts, query);
});

// Function to Display Contacts with Highlighted Search Terms
function displayContactsWithHighlight(contactArray, query) {
    contactList.innerHTML = '';

    contactArray.forEach((contact, index) => {
        const li = document.createElement('li');

        // Create Image Element
        const img = document.createElement('img');
        img.src = contact.photoURL || 'https://via.placeholder.com/60';
        img.alt = contact.name;

        // Create Contact Info Div
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('contact-info');

        const nameSpan = document.createElement('span');
        nameSpan.innerHTML = highlightMatch(contact.name, query);

        const phoneSpan = document.createElement('span');
        phoneSpan.innerHTML = `${highlightMatch(contact.phone, query)}`;

        const emailSpan = document.createElement('span');
        emailSpan.innerHTML = `${highlightMatch(contact.email, query)}`;

        infoDiv.appendChild(nameSpan);
        infoDiv.appendChild(phoneSpan);
        infoDiv.appendChild(emailSpan);

        // Create Remove Button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeContact(index);

        // Append Elements to List Item
        li.appendChild(img);
        li.appendChild(infoDiv);
        li.appendChild(removeBtn);

        contactList.appendChild(li);
    });
}

// Function to Highlight Matched Text
function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Function to Escape RegExp Special Characters
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Event Listener for Clear Search
clearSearchBtn.addEventListener('click', function() {
    searchInput.value = '';
    displayContacts(contacts);
});

// Function to Validate Contact Inputs
function validateContact(name, phone, email, photoFile) {
    let valid = true;

    // Name Validation: At least 4 characters
    if (name.length < 4) {
        document.getElementById('nameError').textContent = "Name must be at least 4 characters.";
        valid = false;
    } else {
        document.getElementById('nameError').textContent = "";
    }

    // Phone Validation: Exactly 10 digits
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = "Phone number must be exactly 10 digits.";
        valid = false;
    } else {
        document.getElementById('phoneError').textContent = "";
    }

    // Email Validation: Basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = "Enter a valid email address.";
        valid = false;
    } else {
        document.getElementById('emailError').textContent = "";
    }

    // Photo Validation: Optional, but if provided, must be an image
    if (photoFile && !photoFile.type.startsWith('image/')) {
        document.getElementById('photoError').textContent = "Please upload a valid image file.";
        valid = false;
    } else {
        document.getElementById('photoError').textContent = "";
    }

    return valid;
}
