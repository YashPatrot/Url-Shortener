---

# 🔗 URL Shortener

A powerful and modular **URL shortening service** built with **NestJS** and **Prisma**, featuring click analytics, custom aliases, and JWT-based user authentication.

---

## 🌟 Features

- 🔗 **Shorten Long URLs** into compact, shareable links  
- ✍️ **Custom Aliases** for personalized and memorable short URLs  
- 📈 **Click Analytics** with visitor tracking (IP, user agent, referrer)  
- 🔐 **JWT Authentication** for secure access and management  
- 📘 **Swagger API Docs** for easy integration and testing  

---

## ⚙️ Tech Stack

| Layer         | Tool/Service                      |
|---------------|-----------------------------------|
| Backend       | [NestJS](https://nestjs.com/)     |
| ORM           | [Prisma](https://prisma.io/) + Accelerate |
| Database      | SQLite (Development)              |
| Auth          | JWT (Bearer Tokens)               |
| Docs          | [Swagger](https://swagger.io/)    |
| DNS Resolver  | Cloudflare DNS over HTTPS         |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v14+`
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YashPatrot/Url-Shortener.git
cd Url-Shortener
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory using the template below:

```env
# Base URL for all short links
URL_PREFIX=http://localhost:3000/

# Cloudflare DNS API for IP resolution
CLOUDFLARE_URL=https://cloudflare-dns.com/dns-query

# Application port (optional, defaults to 3000)
PORT=3000
```

4. **Initialize database**
```bash
npx prisma migrate dev
```

5. **Start the application**
```bash
npm run start:dev
```

---

## 📚 API Documentation

Swagger UI is available at:  
👉 [http://localhost:3000/api](http://localhost:3000/api)

---

## 🔌 API Endpoints Overview

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | `/web-url`           | Create a shortened URL               |
| GET    | `/web-url`           | List all URLs for the user           |
| GET    | `/web-url/:id`       | Get details of a specific URL        |
| DELETE | `/web-url/:id`       | Delete a specific URL                |
| GET    | `/:url`              | Public redirect to the original URL  |

---

## 🔍 How It Works

1. Users submit a **long URL** and optionally a **custom alias**.
2. The backend:
   - Saves the original URL.
   - Generates a **random 10-character slug** if no alias is provided.
   - Resolves IP address via **Cloudflare DNS over HTTPS**.
   - Logs metadata on each redirect.
3. Shortened URLs redirect via a public endpoint: `/:slug`.

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e
```

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

```bash
1. Fork the repo
2. Create your feature branch: git checkout -b feature/amazing-feature
3. Commit your changes: git commit -m "Add amazing feature"
4. Push to the branch: git push origin feature/amazing-feature
5. Open a pull request
```

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgements

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Swagger](https://swagger.io/)
- [Cloudflare DNS](https://developers.cloudflare.com/1.1.1.1/dns-over-https/)

---

> Built with ❤️ by [YashPatrot](https://github.com/YashPatrot)

---
