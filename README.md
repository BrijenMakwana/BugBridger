<img src="./assets/icon.png" alt="bug bridger" width="250" height="250"/>

# Bug Bridger (Stack Overflow Mobile App)

<a href='https://play.google.com/store/apps/details?id=com.brijenmakwana.BugBridger&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="300"/></a>

## Table of contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Run the project](#run-the-project)
- [Built with](#built-with)
- [Contributing](#contributing)

## Overview

- Discover featured questions effortlessly on the home tab, elegantly presented in card format.
- Each question card provides essential details such as the question title, description, tags, and key statistics like view count, answer count, and votes.
- Get insights into the user who posted the question, with the option to tap for in-depth user information, including their name, joining date, reputation, and badges.
- Effortlessly search for specific questions using the search bar, complete with advanced search filters and sorting options for tailored results.
- Simply tap on any question card to access the dedicated question screen, offering comprehensive information about the question and all associated answers.
- Enjoy proper code and text formatting with Markdown support, ensuring readability of coding blocks.
- Quickly identify accepted answers for optimal problem-solving.
- If a question lacks an answer, our AI feature generates solutions directly.
- Explore the entire Stack Overflow repository, including both questions and answers, with a single button press.

## Screenshots

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
<img src="https://i.imgur.com/hjAE49G.png" alt="screenshot 1" width="250"/>
<img src="https://i.imgur.com/nQnbI51.png" alt="screenshot 2" width="250"/>
<img src="https://i.imgur.com/HwDFeQZ.png" alt="screenshot 3" width="250"/>
<img src="https://i.imgur.com/zc6TSlB.png" alt="screenshot 4" width="250"/>
<img src="https://i.imgur.com/EFhpCUY.png" alt="screenshot 5" width="250"/>
<img src="https://i.imgur.com/Fl1zh3p.png" alt="screenshot 6" width="250"/>
<img src="https://i.imgur.com/WMdNGYQ.png" alt="screenshot 7" width="250"/>
<img src="https://i.imgur.com/U3vB6FV.png" alt="screenshot 8" width="250"/>
<img src="https://i.imgur.com/0KFoQit.png" alt="screenshot 9" width="250"/>
<img src="https://i.imgur.com/oW1yz42.png" alt="screenshot 10" width="250"/>

</div>

## Run the project

First you need to have node and Android Studio install in your machine to run this project and app.
Clone this project and open it on any Code Editor or IDE.

Register your app on [Stack Apps](https://stackapps.com/apps/oauth/register) to get the API key. Copy this API key and paste it in .env file.

```
EXPO_PUBLIC_API_KEY=
```

Now go to [Google AI Studio](https://aistudio.google.com/app/apikey) to get the API key for Gemini AI. Copy this API key and paste it in .env file.

```
EXPO_PUBLIC_GEMINI_API_KEY=
```

Now run this command. It will install all the dependencies in your system.

```
yarn install
```

Then run this command to start the server.

```
yarn start
```

Now you can view this app on your smartphone or Emulator.

## Built with

- React Native
- Expo
- Typescript
- expo-router
- [tamagui](https://tamagui.dev)
- [Stack Exchange API](https://api.stackexchange.com/docs)
- [Shopify Flashlist](https://shopify.github.io/flash-list/)

## Contributing

Bug Bridger welcomes contributions from developers of all skill levels. If you're interested in contributing, please follow these steps:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/new-feature` or `git checkout -b bugfix/issue-description`.
3. Make your changes and test thoroughly.
4. Commit your changes: `git commit -m 'Add new feature'`.
5. Push to the branch: `git push origin feature/new-feature`.
6. Submit a pull request to the `main` branch of the Bug Bridger repository.
7. Provide a clear description of your changes and why they are needed.
