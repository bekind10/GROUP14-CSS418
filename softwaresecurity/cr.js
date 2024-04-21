document.addEventListener('DOMContentLoaded', function () {
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const submitButton = document.getElementById('submitButton');
    const selectedItemsDiv = document.getElementById('selectedItems');
    const dropdownContent = document.getElementById('checkboxes');

    function toggleDropdown() {
        dropdownContent.classList.toggle('show');
    }

    document.querySelector('.dropbtn').addEventListener('click', function (event) {
        event.stopPropagation();
        toggleDropdown();
    });

    dropdownContent.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    document.addEventListener('click', function (event) {
        dropdownContent.classList.remove('show');
    });

    agreeCheckbox.addEventListener('change', function () {
        submitButton.disabled = !agreeCheckbox.checked;
    });

    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault();

        if (!agreeCheckbox.checked) {
            alert('Pay tuition fees to proceed');
            return;
        }

        const selectedItems = [];
        const checkboxes = document.querySelectorAll('input[name="items"]:checked');
        checkboxes.forEach(function (checkbox) {
            selectedItems.push(checkbox.value);
        });

        if (selectedItems.length > 0) {
            displaySelectedItems(selectedItems);
        } else {
            selectedItemsDiv.textContent = 'You have not selected any courses!';
        }
    });

    function displaySelectedItems(items) {
        const table = document.createElement('table');
        const headerRow = table.insertRow();
        const headerCell = document.createElement('th');
        headerCell.textContent = 'Selected Courses';
        headerRow.appendChild(headerCell);

        items.forEach(function (item) {
            const row = table.insertRow();
            const cell = row.insertCell();
            cell.textContent = item;
        });

        selectedItemsDiv.innerHTML = '';
        selectedItemsDiv.appendChild(table);
    }
});

function logout() {
    // Display alert message
    alert("You have been logged out successfully!");
    // Redirect to another page
    window.location.href = "index.html";
}
