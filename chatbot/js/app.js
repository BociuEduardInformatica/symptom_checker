let user = {
  messageInput: document.getElementById("message_input"),
  sendMessage: () => {
    let message = user.messageInput.value;
    let messageElement = new Message(message, true);
    messageElement.render();

    user.messageInput.value = "";

    return message;
  },
};

let bot = {
  reply: (message) => {
    let messageElement = new Message(message);
    messageElement.render();
  },
  ask: (question, answersToLookFor) => {
    let messageElement = new Message(question);
    messageElement.render();

    bot.sendMessageButton.addEventListener("click", () => {
      let score = bot.processMessage(user.sendMessage(), answersToLookFor);
      if (score > 1) {
        console.warn("There is symptomatology!");

        bot.reply(
          `Din ceea ce mi-ati spus, reiese ca ${score} dintre simptomele acuzate de dumneavoastra sunt simptome specifice SarsCov2. Va recomandam sa contactati DSP si sa respectati masurile de izolare recomandate de catre autoritati.`
        );
      } else {
        bot.reply(
          "Din cate mi-ati prezentat, nu cred ca aveti vreun motiv de ingrijorare. Totusi, stati cu ochii in 4 si in caz de urgenta medicala sunati la numarul de telefon de urgenta 112."
        );
      }
    });
  },
  processMessage: (rawMessage, posAnswers) => {
    let symptomatologyScore = 0;

    rawMessage = rawMessage.toLowerCase();
    for (let i = 0; i < posAnswers.length; i++) {
      if (rawMessage.includes(posAnswers[i])) {
        symptomatologyScore++;
      }
    }

    return symptomatologyScore;
  },
  messageScreen: document.querySelector(".container"),
  sendMessageButton: document.getElementById("submitMessage"),
};

class Message {
  constructor(message, isUser) {
    this.content = message;
    this.isUser = isUser;
  }

  render() {
    let messageBox = document.createElement("div");
    messageBox.classList.add("message");

    if (this.isUser) {
      messageBox.classList.add("user");
    }

    bot.messageScreen.append(messageBox);

    let textElement = document.createElement("p");
    textElement.textContent = this.content;
    messageBox.append(textElement);
  }
}

function onStart() {
  bot.reply("Buna ziua, ma numesc Marcus si voi fi asistentul dumneavoastra.");
  bot.ask(
    "Pentru a incepe, va rog sa imi descrieti ce simptomatologie aveti (clar, pentru a putea intelege. Ex.: durere de oase, febra, etc.",
    [
      "febra",
      "durere de oase",
      "durere musculara",
      "ameteala",
      "tuse uscata",
      "durere de cap",
      "nas infundat",
      "dificultati respiratorii",
    ]
  );
}

onStart();
