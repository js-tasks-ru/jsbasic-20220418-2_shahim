function showSalary(users, age) {
  let usersInfo = users.reduce(function(balanceInfo, user) {
    if (user.age <= age) {
      return balanceInfo + user.name + ', ' + user.balance + '\n';
    }
    return balanceInfo;
  }, '');
  return usersInfo.slice(0, -1);
}
