import { storageService } from "./storageService";

export const userService = {
  getUsers,
  getUserById,
  getUser,
  logIn,
  getLoggedInUser,
  deleteUser,
  saveUser,
  getEmptyUser,
};

const users = _loadUsers();

function _loadUsers() {
  let users = storageService.load("user_db");
  if (!users || !users.length) {
    users = [
      {
        _id: "5a56640269f123a5d64b32ca",
        name: "Liran",
        coins: 99,
        moves: [],
      },
      {
        _id: "5a56640269f123a5d64b45ca",
        name: "SpongeBob Squarepantes",
        coins: 75,
        moves: [],
      },
      {
        _id: "5a56640269f123a5d64b88ca",
        name: "Mumin Aba",
        coins: 17,
        moves: [],
      },
      {
        _id: "5a56640269f123a5d64b99ca",
        name: "Sheldon Cooper",
        coins: 444,
        moves: [],
      },
    ];

    storageService.store("user_db", users);
  }
  return users;
}

function getUsers() {
  return new Promise((resolve, reject) => {
    let usersToReturn = storageService.load("users");
    if (!usersToReturn || !usersToReturn.length) usersToReturn = users;
    resolve(usersToReturn);
  });
}

function getLoggedInUser() {
  let loggedInUser = storageService.load("loggedInUser");
  return loggedInUser;
}

async function logIn(user) {
  let loggedInUser = users.find(
    (u) => u.name.toLowerCase() === user.name.toLowerCase()
  );
  if (!loggedInUser) {
    loggedInUser = await _addUser(user);
    storageService.store("user_db", users);
  }
  storageService.store("loggedInUser", loggedInUser);
  return loggedInUser;
}

async function getUser() {
  const users = await getUsers();
  return users[0];
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user._id === id);
    user ? resolve(user) : reject(`User id ${id} not found!`);
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user._id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }

    resolve(users);
  });
}

function _updateUser(user) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((c) => user._id === c._id);
    if (index !== -1) {
      users[index] = user;
    }
    resolve(user);
  });
}

function _addUser(user) {
  return new Promise((resolve, reject) => {
    user._id = _makeId();
    users.push(user);
    resolve(user);
  });
}

function saveUser(user) {
  const savedUser = user._id ? _updateUser(user) : _addUser(user);
  storageService.store("user_db", users);
  return savedUser;
}

function getEmptyUser() {
  return {
    name: "",
    email: "",
    phone: "",
  };
}

function _makeId(length = 10) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
