window.electronAPI.requestData();

    window.electronAPI.receiveData((rows) => {
        const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';  // Clear existing rows

        rows.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.moveName}</td>
                <td>${row.notation}</td>
                <td>${row.startupFrames}</td>
                <td>${row.framesOnHit}</td>
                <td>${row.framesOnBlock}</td>
                <td>${row.stringProperties}</td>
                <td>${row.damage}</td>
                <td>${row.throwBreak}</td>
                <td>${row.notes}</td>
            `;

            // Add toggle favorite button
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = row.isFavorite ? '★' : '☆';
            const favoriteCell = tr.insertCell();
            favoriteCell.appendChild(toggleBtn);

            toggleBtn.addEventListener('click', () => {
                window.electronAPI.toggleFavorite(row.moveID);  // Assuming 'moveID' is a unique identifier
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

