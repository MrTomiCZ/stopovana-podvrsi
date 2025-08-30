const dyv = document.createElement('div');
dyv.classList.add('statusdyv');
dyv.innerHTML = '<p>TEST OZNÁMENÍ...</p>';
dyv.id = 'statusdyv';
document.body.prepend(dyv);

async function showStatus() {
    const res = await fetch('/get');
    const data = await res.json();
    const message = data.message || 'Žádná nová oznámení.';
    const statusDiv = document.getElementById('statusdyv');
    statusDiv.innerHTML = `<p>${message}</p>`;
    statusDiv.style.display = 'block';
    /*setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 5000);*/
}

setInterval(async () => await showStatus(), 5000);