const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
      authorization: 'd45e7742-926e-4eb9-83ed-297f16544725',
      'Content-Type': 'application/json'
    }
  }

  const getProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }

  const uploadProfileData = (newData) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: newData.name,
          about: newData.about
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  const uploadProfileImage = (newLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newLink
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }

  const uploadCard = (newData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: newData.name,
          link: newData.link
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }

  const registerCardLike = (cardID) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: config.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }

  const removeCardLike = (cardID) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: config.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }

  export { getProfileData, uploadProfileData, uploadProfileImage, getInitialCards, uploadCard, deleteCardFromServer, registerCardLike, removeCardLike }