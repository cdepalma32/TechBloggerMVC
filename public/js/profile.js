const newFormHandler = async (event) => {
    event.preventDefault();
  
    const postTitle = document.querySelector('#post-title').value.trim(); // Corrected variable name 👹👹👹👹👹👹👹👹👹
    const content = document.querySelector('#post-content').value.trim(); // Ensure there's a field with this ID 👹👹👹👹👹👹👹👹👹

    // variables postTitle might be misnamed 👹👹👹
    if (postTitle && content ) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ postTitle, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashBoard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashBoard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);
  