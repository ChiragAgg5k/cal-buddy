# Cal Buddy

![GitHub stars](https://img.shields.io/github/stars/ChiragAgg5k/cal-buddy?style=social)
![GitHub forks](https://img.shields.io/github/forks/ChiragAgg5k/cal-buddy?style=social)
![GitHub issues](https://img.shields.io/github/issues/ChiragAgg5k/cal-buddy)
![GitHub license](https://img.shields.io/github/license/ChiragAgg5k/cal-buddy)
![GitHub last commit](https://img.shields.io/github/last-commit/ChiragAgg5k/cal-buddy)

![Thumbnail](/public/thumbnail.png)

[Cal Buddy](https://cal-buddy.vercel.app/) is a smart calendar assistant that helps you schedule, manage, and chat with your calendar. Boost your productivity with AI-powered task management.

## Table of Contents

- [Cal Buddy](#cal-buddy)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Features](#features)
  - [Installation using Daytona](#installation-using-daytona)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [Contributors](#contributors)
  - [License](#license)

## Demo

https://github.com/user-attachments/assets/2978235f-36f3-475f-84bd-1da041dd9c34

You can also find the YouTube video demonstration [here](https://www.youtube.com/watch?v=qSlW9Z22YvM).

## Features

- 📅 Smart calendar management
- 🤖 AI-powered task scheduling
- 💬 Chat interface for easy interaction
- 📊 Productivity tracking and insights
- 🔗 Integration with popular calendar services

## Installation using Daytona

1. **Install Daytona**: Follow the [Daytona installation guide](https://www.daytona.io/docs/installation/installation/). Make sure that you have a `provider` installed.
2. **Create the Workspace**:

```bash
daytona create https://github.com/ChiragAgg5k/cal-buddy --devcontainer-path=.devcontainer/devcontainer.json
```

You should get something like: `{"outcome":"success","result":"done"}`

3. Create a `.env.local` file in the root directory and add the following content:

```
GROQ_API_KEY=<GROQ_API_KEY>
NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=<GOOGLE_CALENDAR_API_KEY>
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<APPWRITE_PROJECT_ID>
```

Replace `<GROQ_API_KEY>`, `<GOOGLE_CALENDAR_API_KEY>`, `<APPWRITE_PROJECT_ID>`, and `<SITE_URL>` with your actual values.

4. Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Technologies Used

- [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
- [![CopilotKit](https://img.shields.io/badge/CopilotKit-007ACC?style=for-the-badge&logo=github&logoColor=white)](https://github.com/features/copilot)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
- [![ShadCN](https://img.shields.io/badge/ShadCN-000000?style=for-the-badge&logo=shadcn&logoColor=white)](https://ui.shadcn.com/)
- [![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)
- [![Groq](https://img.shields.io/badge/Groq-FF6600?style=for-the-badge&logo=groq&logoColor=black)](https://groq.netlify.app/)
- [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Contributing

We welcome contributions to Cal Buddy! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## Contributors

A big shoutout and heartfelt thanks to all our amazing contributors for their incredible efforts and dedication! This project wouldn’t be where it is without you.

<a href="https://github.com/ChiragAgg5k/cal-buddy/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ChiragAgg5k/cal-buddy" />
</a>

---

Made with ❤️ by [Chirag Aggarwal](https://github.com/ChiragAgg5k)
