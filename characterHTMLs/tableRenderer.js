document.addEventListener('DOMContentLoaded', () => {
    // Request moves data from the main process
    window.electronAPI.requestData();
    
    // Receive moves data from the main process
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
                <td>${row.isFavorite ? 'Yes' : 'No'}</td> <!-- Assuming isFavorite is a boolean field -->
            `;
  
            tableBody.appendChild(tr);
        });
    });
  });