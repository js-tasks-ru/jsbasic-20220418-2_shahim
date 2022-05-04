function makeFriendsList(data) {
  let list = document.createElement('ul');
  data.forEach(item => {
    list.innerHTML += `<li>${item.firstName} ${item.lastName}</li>`;
  });
  return list;
}
