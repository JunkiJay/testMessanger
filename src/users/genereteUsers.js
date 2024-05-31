import { writeFile } from "fs";

const names = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Emma",
  "Frank",
  "Grace",
  "Hannah",
  "Ian",
  "Jack",
  "Kate",
  "Liam",
  "Mia",
  "Nathan",
  "Olivia",
  "Peter",
  "Quinn",
  "Rachel",
  "Sam",
  "Tina",
  "Uma",
  "Victor",
  "Wendy",
  "Xavier",
  "Yvonne",
  "Zack",
];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
  return names[getRandomNumber(0, names.length - 1)];
}

function generateMessages() {
  const messages = [];
  const numMessages = getRandomNumber(1, 20);
  const currentTime = Math.floor(Date.now() / 1000);

  for (let i = 0; i < numMessages; i++) {
    const owner = Math.random() < 0.5;
    const text = "Message " + (i + 1);
    const data = currentTime - (numMessages - 1 - i) * 60;
    messages.push({ id: i, data, text, owner });
  }
  return messages;
}

const users = [];
for (let i = 0; i < 22; i++) {
  const name = getRandomName();
  const id = i + 1;
  const messages = generateMessages();
  const logo = "userAvatar.png";
  users.push({ logo, name, id, messages });
}

const usersJSON = JSON.stringify(users, null, 2);

writeFile("./src/users/users.json", usersJSON, (err) => {
  if (err) {
    console.error("Ошибка записи данных в файл:", err);
    return;
  }
  console.log("Данные успешно записаны в users.json");
});
