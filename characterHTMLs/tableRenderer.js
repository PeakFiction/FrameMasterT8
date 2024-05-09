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