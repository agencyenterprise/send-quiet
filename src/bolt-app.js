const {
  homePage,
  noMessagesPage,
  preferencesPage,
} = require("./message-templates.js");
const { App } = require("@slack/bolt");
const messages = require("./messages.js");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_BOT_SIGNING_SECRET,
});

const publishPage = async (userId, client, page) => {
  console.log('Publishing page: ', JSON.stringify(page));
  return await client.views.publish({
    user_id: userId,
    view: page,
  });
};

const publishAppHomePage = async (userId, client) => {
  try {
    const fetchedMessages = await messages.fetchUserMessages(userId);
    if (!fetchedMessages || fetchedMessages.length === 0) {
      await publishPage(userId, client, noMessagesPage());
    } else {
      await publishPage(userId, client, homePage(fetchedMessages));
    }
  } catch (error) {
    console.error(error.data);
  }
}

app.event("app_home_opened", async ({ event, client }) => {
  await publishAppHomePage(event.user, client);
});

app.command(
  "/sendq",
  async ({ ack, client, payload, context, respond, body }) => {
    await ack();

    const respondWithUsage = () => {
      respond("Usage: /sendq @user message");
    };

    const params = payload.text.match(/\s*?\<@(.+)?>(.+)/);

    if (params.length !== 3) {
      respondWithUsage();
      return;
    }

    const destUserId = params[1].replace(/\|.*/, "");
    const message = params[2].trim();

    const senderUserId = payload.user_id;
    const senderUserName = payload.user_name;
    await messages.saveMessage(
      destUserId,
      senderUserId,
      senderUserName,
      message
    );

    await respond("Message delivered :tada:");
  }
);

app.action({ action_id: "clear" }, async ({ client, ack, respond, body }) => {
  await ack();
  const userId = body.user.id;
  if (!userId) {
    respond("bad user id");
  } else {
    await messages.clearUserMessages(userId);
    await publishPage(userId, client, noMessagesPage())
  }
});

app.action(
  { action_id: "preferences_action" },
  async ({ client, ack, respond, body }) => {
    await ack();
    const userId = body.user.id;
    await publishPage(userId, client, preferencesPage());
  }
);

app.action(
  { action_id: "publish_app_home" },
  async ({ client, ack, respond, body }) => {
    await ack();
    const userId = body.user.id;
    await publishAppHomePage(userId, client);
  }
);

module.exports.run = async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
};
