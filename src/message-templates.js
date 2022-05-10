// Element Builders
// ----------------
const buildPlainText = (text) => ({
  type: 'plain_text',
  text,
  emoji: true,
});

const buildPlainHeader = (text) => ({
  type: "header",
  text: buildPlainText(text),
});

// Buttons
// ----------

const preferenceButtonAction = {
  type: "button",
  text: buildPlainText('Preferences'),
  value: "preferences_value",
  action_id: "preferences_action",
};


const clearButtonAction = {
  type: "button",
  text: buildPlainText('Clear'),
  action_id: "clear",
  style: "danger",
};

const backToHomePageButtonAction = {
  type: "button",
  text: buildPlainText('Back'),
  action_id: "publish_app_home",
}

// Block Builders
// --------------

const buildActionsBlocks = (actions) => ({
  type: "actions",
  elements: actions,
});

const buildHomeBlocks = (blocks) => ({
  type: "home",
  blocks,
});

const buildPlainTextSectionBlock = (text) => ({
  type: 'section',
  text: buildPlainText(text),
});

const dividerBlock = {
  type: "divider",
};

// Pages
// ---------

const messageSection = ({senderUserName, message}) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: `*@${senderUserName}*\n${message}`,
  },
});

const homePage = (messages) => {
  const header = buildPlainHeader("Here's your received messages:");

  const footerBlock = buildActionsBlocks([
    clearButtonAction,
    preferenceButtonAction,
  ]);

  const messagesBlocks = messages.map(messageSection);
  
  const blocks = [];
  blocks.push(header);
  blocks.push(dividerBlock);
  blocks.push.apply(blocks, messagesBlocks);
  blocks.push(dividerBlock);
  blocks.push(footerBlock);
  
  return buildHomeBlocks(blocks);
};

const noMessagesPage = () => {
  const blocks = [];
  blocks.push(buildPlainHeader("You have 0 messages"));
  blocks.push(dividerBlock);
  blocks.push(
    buildActionsBlocks([
      preferenceButtonAction
    ])
  );
  
  return buildHomeBlocks(blocks);
}

const preferencesPage = () => {
  const blocks = [];
  blocks.push(
    buildPlainHeader("Preferences"),
    dividerBlock,
    buildPlainTextSectionBlock("Do you want to receive any notification?"),
    buildPlainTextSectionBlock("What time do you want to receive a notification in case you have unread messages?"),
    dividerBlock,
    buildActionsBlocks([
      backToHomePageButtonAction,
    ])
  );
 
  return buildHomeBlocks(blocks);
}

module.exports = {
  homePage,
  noMessagesPage,
  preferencesPage
};
