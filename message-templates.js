const homeMessageTemplate = (sender,message) => {
  return [
    {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*#team-updates*\n<fakelink.toUrl.com|Q4 Team Projects> posts project updates to <fakelink.toChannel.com|#team-updates>"
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
  
}

const baseHomeTemplate = (messages) => {
	"type": "home",
	"blocks": [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Here's your received messages:"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*#team-updates*\n<fakelink.toUrl.com|Q4 Team Projects> posts project updates to <fakelink.toChannel.com|#team-updates>"
			},
			"accessory": {
				"type": "button",
				"style": "danger",
				"text": {
					"type": "plain_text",
					"text": "Delete",
					"emoji": true
				}
			}
		},
		{
			"type": "divider"
		},
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
	]
}