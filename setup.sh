
#!/bin/bash

# Create unique database name from request ID
DATABASE_NAME="a6164d10_ae8e_4b60_92f1_a66c92525745"

# Create output directory if it doesn't exist
OUTPUT_DIR="/home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp"
mkdir -p "$OUTPUT_DIR"

# Generate Spring Boot project using Spring CLI
spring init \
  --type=maven-project \
  --language=java \
  --boot-version=3.4.0 \
  --packaging=jar \
  --java-version=17 \
  --groupId=com.examly \
  --artifactId=springapp \
  --name="Pet Adoption Management System" \
  --description="Spring Boot backend for Pet Adoption Management System" \
  --package-name=com.examly.springapp \
  --dependencies=web,data-jpa,validation,mysql \
  --build=maven \
  "$OUTPUT_DIR"

# Wait for project generation to complete
sleep 2

# Create MySQL database
mysql -u root -pexamly -e "CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};" 2>/dev/null || echo "Database creation failed, will use default"

# Configure application.properties
cat > "${OUTPUT_DIR}/src/main/resources/application.properties" << EOL
spring.datasource.url=jdbc:mysql://localhost:3306/${DATABASE_NAME}?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=examly
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
EOL

# Add Swagger dependency to pom.xml
sed -i '/<dependencies>/a \
    <dependency>\
        <groupId>org.springdoc</groupId>\
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>\
        <version>2.1.0</version>\
    </dependency>' "${OUTPUT_DIR}/pom.xml"

echo "Spring Boot project generated successfully in ${OUTPUT_DIR}"
