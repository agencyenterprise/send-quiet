const homeMessageTemplate = (senderName, message) => {
  return [
    {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `*@${senderName}*\n${message}`
			},
			"accessory": {
				"type": "button",
				"style": "danger",
				"text": {
					"type": "plain_text",
					"text": "Delete :see_no_evil:",
					"emoji": true
				}
			}
		},
		{
			"type": "divider"
		}
  ]
}

const homeTemplate = (messages) => {
  
  const headerBlock = {
    type: "home",
    blocks: [
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
    ]
  };
  const footerBlock = [
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Clear Them All",
						"emoji": true
					},
					"value": "new_configuration",
					"style": "danger"
				}
			]
		}
	];
  return headerBlock.concat(messages).concat(footerBlock);
}

module.exports = { homeMessageTemplate, homeTemplate }