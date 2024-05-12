window.electronAPI.requestData();

window.electronAPI.receiveData((rows) => {
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.moveName}</td>
            <td>${row.notation}</td>
            <td>${row.stringProperties}</td>
            <td>${row.damage}</td>
            <td>${row.startupFrames}</td>
            <td>${row.framesOnBlock}</td>
            <td>${row.framesOnHit}</td>
            <td>${row.framesOnCounter}</td>
            <td><textarea class="note-input">${row.notes}</textarea></td>
        `;

        // Add toggle favorite button
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = row.isFavorite ? '★' : '☆';
        toggleBtn.classList.add('favorite-btn');
        if (row.isFavorite) {
          toggleBtn.classList.add('active');
        }

        const favoriteCell = tr.insertCell();
        favoriteCell.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            window.electronAPI.toggleFavorite(row.moveID);
            toggleBtn.classList.toggle('active');
            toggleBtn.textContent = toggleBtn.textContent === '★' ? '☆' : '★';
          });

        // Get the note input element
        const noteInput = tr.querySelector('.note-input');

        // Add event listener for note input blur
        noteInput.addEventListener('blur', () => {
            const newNote = noteInput.value;
            const moveId = row.moveID;
            window.electronAPI.updateNote(moveId, newNote);
        });

        tableBody.appendChild(tr);
    });
});

  document.addEventListener('DOMContentLoaded', () => {
    // Function to filter table rows based on search input
    function filterTable() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toUpperCase();
        const table = document.getElementById('data-table');
        const tbody = table.getElementsByTagName('tbody')[0];
        const rows = tbody.getElementsByTagName('tr');

        // Loop through all table rows
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let found = false;
            // Loop through all cells in the row
            for (let j = 0; j < cells.length; j++) {
                const cell = cells[j];
                if (cell) {
                    const textValue = cell.textContent || cell.innerText;
                    // Check if the cell content contains the search filter
                    if (textValue.toUpperCase().indexOf(filter) > -1) {
                        found = true;
                        break; // Exit loop if a match is found in any cell
                    }
                }
            }
            // Show or hide the row based on the search result
            rows[i].style.display = found ? '' : 'none';
        }
    }

    // Listen for changes in the search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterTable);
    }
});