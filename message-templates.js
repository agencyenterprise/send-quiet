const homeMessageBlockTemplate = (senderName, message) => {
  return [
    {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `*@${senderName}*\n${message}`
			}
		},
		{
			"type": "divider"
		}
  ]
}

const homePageTemplate = (messages) => {
  
  const homePage = {
    type: "home",
  };
  const headerBlocks = [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "Here's your received messages:"
      }
    },
    {
      "type": "divider"
    }
  ];
  const footerBlocks = [
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Clear",
						"emoji": true
					},
          "action_id": "clear",
					"style": "danger"
				}
			]
		}
	];
  homePage.blocks = headerBlocks.concat(messages).concat(footerBlocks);
  return homePage;
}

const noMessagesHomeTemplate = {
	"type": "home",
	"blocks": [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "You didn't receive any messages... :smiling_face_with_tear:",
				"emoji": true
			}
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Check out later!"
			}
		}
	]
};

module.exports = { homeMessageBlockTemplate, homePageTemplate, noMessagesHomeTemplate }