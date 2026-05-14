# 🚀 Spring Boot Project Initialization Guide

## 1️⃣ Open the Website

👉 Go to: https://start.spring.io/

---

## 2️⃣ Fill Project Details

Use the following settings:

### 🔸 Project Configuration

* **Project** → Maven
* **Language** → Java
* **Spring Boot** → Latest stable (3.x recommended)
* **Packaging** → Jar

---

## 3️⃣ Add Dependencies

Click **“Add Dependencies”** and select:

1. Spring Data JPA
2. Spring Boot DevTools
3. Spring Web
4. Spring Security
5. Validation

---

## 4️⃣ Generate Project

👉 Click **“Generate”**
📥 A `.zip` file will be downloaded

---

## 5️⃣ Open in IDE

* Extract the downloaded ZIP file
* Open the project in your IDE (IntelliJ / VS Code)

---

## ▶️ Run the Project

Use the following command in the project root:

```bash
./mvnw spring-boot:run
```

For Windows:

```bash
mvnw.cmd spring-boot:run
```

---

## 🗄️ Database Configuration (MySQL)

Add the following properties in `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:3306/databasename
spring.datasource.username=username
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## ✅ Notes

* Ensure MySQL is running before starting the application
* Replace `databasename`, `username`, and `password` with your actual credentials

---


