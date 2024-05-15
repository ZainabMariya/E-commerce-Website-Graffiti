const deleteArt = (e) => {
    let delete_promise = fetch('/v1/articles/' + e.dataset.artid, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    delete_promise
      .then(response => response.json())
      .then(data => {
        alert(`Article deleted successfully!`);
      })
      .catch((reject) => {
        document.getElementById("message").textContent = reject;
      });
  }
  
  const updateArt = (e) => {
    const tds = document.querySelectorAll(`#tr_${e.dataset.artid} td`);
    const color = tds[1].innerText;
    const name = tds[2].innerText;
    const price = tds[3].innerText;
  
    let update_promise = fetch(`/v1/articles/id/${e.dataset.artid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, color, price }),
    });
  
    update_promise
      .then(response => response.json())
      .then(data => {
        alert(`Article updated successfully!`);
      })
      .catch((reject) => {
        document.getElementById("message").textContent = reject;
      });
  }
  