document.getElementById('searchButton').addEventListener('click', function() {
    var query = document.getElementById('searchInput').value.trim();
    var results = document.getElementById('results');
    if (!query) {
        results.textContent = 'Please enter a search term.';
        return;
    }
    results.textContent = 'You searched for: ' + query;
});
