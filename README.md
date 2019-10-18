# DST-technical-mentoring-webhooks
This is a HubSpot app to be used for the technical mentoring program.

*Knowledge doc for using webhooks in HubSpot workflows: https://knowledge.hubspot.com/workflows/how-do-i-use-webhooks-with-hubspot-workflows
*Dev doc for HubSpot Webhooks API: https://developers.hubspot.com/docs/methods/webhooks/webhooks-overview

# What it does
Simple web server that accepts webhook notifications and displays them in real-time on a webpage.

# Instructions
1. Deploy this app
  - Clone this repository locally (https://help.github.com/en/articles/cloning-a-repository).
  - Push the repository to Heroku (https://devcenter.heroku.com/articles/deploying-nodejs).
  - Create a HubSpot app and install it to your HubSpot account.
2. Create a workflow in your HubSpot account that upon contact creation, sends that contact's payload to your Heroku app's URL.
3. Our app does not function properly by default. We need to fix a few things:
  - When our app receives a payload, it only displays “Object Created! ID: {objectId}”. This proves to us that it works, but this isn't useful beyond that. Fix this so that it displays the payload.
  - By default the app just sends a websocket notification for the first item in the request body. (see app.js, line 30) This is fine for basic testing, but if any requests have multiple webhook notifications then we won’t properly display all of them. Tweak the app so that it will send a websocket notification for each webhook notification in the request.
  - Right now, the app displays notifications in the same exact way, no matter what the object type is. This is fine for an example, but in reality we’d treat these different notifications differently. Tweak the app so that contact, company, and deal notifications are displayed in different parts of the page.
4. Using your developer account's API key, create subscriptions that send payloads to your Heroku app based on the following subscriptions:
  - Contact, company, and deal creation
  - Contact, company, and deal deletion
  - Deal object propery changes to dealstage and amount.
5. Edit your Heroku app to no longer display the entire HubSpot payload, but instead to display:
  - The contact's full name and email address.
  - The company's name and domain name.
  - The deal's deal stage, owner, and close date (if closed).