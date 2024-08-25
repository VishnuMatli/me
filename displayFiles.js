document.addEventListener('DOMContentLoaded', function() {
    fetch('Source/files.json')
        .then(response => response.json())
        .then(files => {
            const fileContainer = document.getElementById('file-list');
            files.forEach(file => {
                const fileLink = document.createElement('a');
                fileLink.href = `Source/${file}`;
                fileLink.textContent = file;
                fileLink.style.display = 'block'; // Each file link on a new line
                fileContainer.appendChild(fileLink);
            });
        })
        .catch(error => console.error('Error fetching file list:', error));
});
