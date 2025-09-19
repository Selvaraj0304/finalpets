# Implementation Plan Checklist

## Original Question/Task

**Question:** <h1>Pet Adoption Management System</h1>

<h2>Overview</h2>
<p>You are tasked with developing a Pet Adoption Management System that allows users to view available pets and request adoptions, while staff members can manage pets and adoption requests. The system will consist of a Spring Boot backend API and a React frontend interface.</p>

<h2>Question Requirements</h2>

<h3>Backend Requirements (Spring Boot)</h3>

<h4>1. Pet Management</h4>
<p>Create a RESTful API to manage pets with the following endpoints:</p>
<ul>
    <li><b>Model:</b> Create a <code>Pet</code> entity with the following attributes:
        <ul>
            <li><code>id</code> (Long): Unique identifier for the pet</li>
            <li><code>name</code> (String): Name of the pet (required, 2-50 characters)</li>
            <li><code>species</code> (String): Species of the pet (required, e.g., "Dog", "Cat", "Bird")</li>
            <li><code>breed</code> (String): Breed of the pet (required)</li>
            <li><code>age</code> (Integer): Age of the pet in months (required, positive number)</li>
            <li><code>description</code> (String): Description of the pet (optional, max 500 characters)</li>
            <li><code>imageUrl</code> (String): URL to the pet's image (optional)</li>
            <li><code>adoptionStatus</code> (String): Status of the pet ("Available", "Pending", "Adopted")</li>
        </ul>
    </li>
    <li><b>GET /api/pets:</b> Retrieve all pets
        <ul>
            <li>Response: Array of pet objects</li>
            <li>Status code: 200 OK</li>
            <li>Example response:
                <pre>[
  {
    "id": 1,
    "name": "Buddy",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 24,
    "description": "Friendly and energetic",
    "imageUrl": "https://8080-ccfbdecabcaae334371528adaaadfdebeathree.premiumproject.examly.io/buddy.jpg",
    "adoptionStatus": "Available"
  },
  {
    "id": 2,
    "name": "Whiskers",
    "species": "Cat",
    "breed": "Siamese",
    "age": 12,
    "description": "Calm and affectionate",
    "imageUrl": "https://8080-ccfbdecabcaae334371528adaaadfdebeathree.premiumproject.examly.io/whiskers.jpg",
    "adoptionStatus": "Pending"
  }
]</pre>
            </li>
        </ul>
    </li>
    <li><b>GET /api/pets/{id}:</b> Retrieve a specific pet by ID
        <ul>
            <li>Response: Pet object</li>
            <li>Status code: 200 OK if found, 404 Not Found if not found</li>
            <li>Error message format for 404: <code>{"message": "Pet with ID {id} not found"}</code></li>
        </ul>
    </li>
    <li><b>POST /api/pets:</b> Create a new pet
        <ul>
            <li>Request body: Pet object (without ID)</li>
            <li>Response: Created pet object with ID</li>
            <li>Status code: 201 Created</li>
            <li>Validation: Return 400 Bad Request with appropriate error messages if validation fails</li>
            <li>Error message format: <code>{"message": "Validation failed", "errors": ["Name is required", "Age must be positive"]}</code></li>
        </ul>
    </li>
</ul>

<h4>2. Adoption Request Management</h4>
<p>Create a RESTful API to manage adoption requests with the following endpoints:</p>
<ul>
    <li><b>Model:</b> Create an <code>AdoptionRequest</code> entity with the following attributes:
        <ul>
            <li><code>id</code> (Long): Unique identifier for the request</li>
            <li><code>petId</code> (Long): ID of the pet being requested for adoption</li>
            <li><code>applicantName</code> (String): Name of the applicant (required, 2-100 characters)</li>
            <li><code>applicantEmail</code> (String): Email of the applicant (required, valid email format)</li>
            <li><code>applicantPhone</code> (String): Phone number of the applicant (required)</li>
            <li><code>status</code> (String): Status of the request ("Pending", "Approved", "Rejected")</li>
            <li><code>submissionDate</code> (LocalDateTime): Date and time when the request was submitted</li>
        </ul>
    </li>
    <li><b>POST /api/adoption-requests:</b> Submit a new adoption request
        <ul>
            <li>Request body: AdoptionRequest object (without ID and submissionDate)</li>
            <li>Response: Created AdoptionRequest object with ID and submissionDate</li>
            <li>Status code: 201 Created</li>
            <li>Validation: Return 400 Bad Request with appropriate error messages if validation fails</li>
            <li>Business logic: Check if the pet exists and is available for adoption. If not, return 400 Bad Request with message <code>{"message": "Pet is not available for adoption"}</code></li>
            <li>When a valid adoption request is created, update the pet's adoptionStatus to "Pending"</li>
        </ul>
    </li>
    <li><b>GET /api/adoption-requests:</b> Retrieve all adoption requests
        <ul>
            <li>Response: Array of AdoptionRequest objects</li>
            <li>Status code: 200 OK</li>
        </ul>
    </li>
</ul>

<h3>Frontend Requirements (React)</h3>

<h4>1. Pet Listing Page</h4>
<p>Create a page to display all available pets with the following features:</p>
<ul>
    <li>Display a list of pets with their basic information (name, species, breed, age, and adoption status)</li>
    <li>Each pet card should display:
        <ul>
            <li>Pet name as a heading</li>
            <li>Species and breed</li>
            <li>Age in months/years format (e.g., "2 years" or "6 months")</li>
            <li>Adoption status with appropriate styling (green for "Available", yellow for "Pending", gray for "Adopted")</li>
            <li>A "View Details" button that navigates to the pet details page</li>
        </ul>
    </li>
    <li>Implement a filter dropdown to filter pets by species (All, Dog, Cat, Bird, Other)</li>
    <li>Implement a filter dropdown to filter pets by adoption status (All, Available, Pending, Adopted)</li>
</ul>

<h4>2. Pet Details Page</h4>
<p>Create a page to display detailed information about a specific pet with the following features:</p>
<ul>
    <li>Display all pet information (name, species, breed, age, description, image, adoption status)</li>
    <li>If the pet's status is "Available", display an "Adopt Me" button that opens the adoption request form</li>
    <li>If the pet's status is "Pending" or "Adopted", display an appropriate message instead of the "Adopt Me" button</li>
</ul>

<h4>3. Adoption Request Form</h4>
<p>Create a form component for submitting adoption requests with the following features:</p>
<ul>
    <li>Form fields:
        <ul>
            <li>Applicant Name (required, 2-100 characters)</li>
            <li>Applicant Email (required, valid email format)</li>
            <li>Applicant Phone (required, valid phone format)</li>
        </ul>
    </li>
    <li>Form validation:
        <ul>
            <li>Display appropriate error messages for invalid inputs</li>
            <li>Disable the submit button until all required fields are valid</li>
        </ul>
    </li>
    <li>On successful submission:
        <ul>
            <li>Display a success message</li>
            <li>Update the pet's status to "Pending" in the UI</li>
            <li>Close the form or navigate back to the pet listing page</li>
        </ul>
    </li>
    <li>On submission error:
        <ul>
            <li>Display an error message with details from the API response</li>
            <li>Allow the user to correct the form and resubmit</li>
        </ul>
    </li>
</ul>

<h3>Technical Requirements</h3>
<ul>
    <li>Backend:
        <ul>
            <li>Use Spring Boot with Spring Data JPA for data access</li>
            <li>Implement proper validation for all input data</li>
            <li>Implement proper error handling with appropriate HTTP status codes and error messages</li>
            <li>Use MySQL as the database (pre-configured in the environment)</li>
        </ul>
    </li>
    <li>Frontend:
        <ul>
            <li>Use React functional components with hooks</li>
            <li>Implement proper form validation</li>
            <li>Use React Router for navigation between pages</li>
            <li>Use Axios or Fetch API for making HTTP requests to the backend</li>
        </ul>
    </li>
</ul>

<p>Note: Focus on implementing the core functionality and ensuring that all components work together correctly. You don't need to implement authentication or authorization for this assignment.</p>

**Created:** 2025-07-23 06:14:04
**Total Steps:** 18

## Detailed Step Checklist

### Step 1: Read and analyze the backend dependencies from pom.xml
- [x] **Status:** ✅ Completed
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/pom.xml
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/resources/application.properties
- **Description:** This step is necessary to ensure we use the correct backend dependencies and data source before implementing any backend functionality. It also informs later use of annotations, JPA features, and DB setup.

### Step 2: Implement Pet and AdoptionRequest entities with JPA validation
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/java/com/examly/springapp/model/Pet.java
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/java/com/examly/springapp/model/AdoptionRequest.java
- **Description:** Defines the structure of pet and adoption request data in the backend. Sets up validation rules as dictated by the requirements and referenced in test cases.

### Step 3: Implement JPA repositories for Pet and AdoptionRequest
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/java/com/examly/springapp/repository/PetRepository.java
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/java/com/examly/springapp/repository/AdoptionRequestRepository.java
- **Description:** Provides data access mechanisms for the Pet and AdoptionRequest entities, needed for service and controller layers.

### Step 4: Implement PetService and AdoptionRequestService classes with business logic
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/java/com/examly/springapp/service/PetService.java
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/java/com/examly/springapp/service/AdoptionRequestService.java
- **Description:** Encapsulates business logic and acts as a bridge between controller and repository layers for both major models.

### Step 5: Implement REST controllers for Pet and AdoptionRequest with error and validation handling
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/java/com/examly/springapp/controller/PetController.java
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/java/com/examly/springapp/controller/AdoptionRequestController.java
- **Description:** Exposes all specified endpoints with correct contracts and error handling, matching requirements and allowing frontend to properly consume and test backend functionality.

### Step 6: Implement centralized exception handling for validation and business errors
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/java/com/examly/springapp/exception/GlobalExceptionHandler.java
- **Description:** Ensures that all endpoints return the expected error messages and codes as described, and required by test coverage.

### Step 7: Configure CORS to allow React frontend to access backend endpoints
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/main/java/com/examly/springapp/config/CorsConfig.java
- **Description:** Allows the React frontend to communicate with backend APIs without CORS issues.

### Step 8: Implement all backend JUnit test cases as specified
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/test/java/com/examly/springapp/controller/PetControllerTest.java
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/test/java/com/examly/springapp/controller/AdoptionRequestControllerTest.java
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/springapp/src/test/java/com/examly/springapp/PetAdoptionManagementSystemApplicationTests.java
- **Description:** Implements all backend JUnit test cases as listed in the JSON, including creation, validation, status changing, and error scenarios. Supports backend code by ensuring proper test coverage and adherence to requirements.

### Step 9: Compile and run all backend tests
- [x] **Status:** ✅ Completed
- **Description:** Establishes that all backend logic is valid and test coverage is in place. Confirms that backend code is production ready before moving to the frontend.

### Step 10: Read and analyze frontend dependencies from package.json and existing React structure
- [ ] **Status:** ⏳ Not Started
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/package.json
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/App.js
- **Description:** Lays the foundation for frontend implementation by confirming package setup, configuration, and basic entry points.

### Step 11: Implement frontend utility files: API helper and constants
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/utils/api.js
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/utils/constants.js
- **Description:** Provides foundation for API communication and reusability in the React codebase.

### Step 12: Create PetListing React component and related CSS
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/PetListing.js
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/PetListing.css
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/App.js
- **Description:** Implements the list and filtering UI for all pets and connects to backend endpoint. Supports frontend PetListing test coverage.

### Step 13: Create PetDetails React component, including conditional rendering for Adopt Me / status
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/PetDetails.js
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/PetDetails.css
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/App.js
- **Description:** Implements the detailed view, including adoption status messaging and Adopt Me functionality, enabling next step for adoption request feature and validation testing.

### Step 14: Create AdoptionRequestForm React component with validation and API integration
- [ ] **Status:** ⏳ Not Started
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/AdoptionRequestForm.js
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/AdoptionRequestForm.css
- **Description:** Enables adoption request submission with real-time validation and error handling, fulfilling requirements and ensuring alignment with test case expectations.

### Step 15: Update App.js and routing to integrate all React components
- [ ] **Status:** ⏳ Not Started
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/App.js
- **Description:** Completes core app structure and navigation so that all pages can be directly accessed and tested.

### Step 16: Add global and component-specific CSS using CSS variables as per requirements
- [ ] **Status:** ⏳ Not Started
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/variables.css
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/index.css
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/PetListing.css
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/PetDetails.css
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/AdoptionRequestForm.css
- **Description:** Applies mandatory and modern UI patterns for accessible and usable user interface. Ensures visual feedback and state cues as needed by design and test validation.

### Step 17: Implement all frontend Jest test cases as specified
- [ ] **Status:** ⏳ Not Started
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/PetListing.test.js
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/PetDetails.test.js
  - /home/coder/project/workspace/question_generation_service/solutions/a6164d10-ae8e-4b60-92f1-a66c92525745/reactapp/src/components/AdoptionRequestForm.test.js
- **Description:** Implements all frontend test cases from the Test Cases JSON. Covers API mocking, UI states, validation, error handling, and state transitions as per requirements. Directly supports the core test coverage requirement.

### Step 18: Install, lint, build and run frontend React tests
- [ ] **Status:** ⏳ Not Started
- **Description:** This step ensures all frontend code is correct, tests pass and the code follows best practices and standards before final delivery.

## Completion Status

| Step | Status | Completion Time |
|------|--------|----------------|
| Step 1 | ✅ Completed | 2025-07-23 06:14:11 |
| Step 2 | ✅ Completed | 2025-07-23 06:14:27 |
| Step 3 | ✅ Completed | 2025-07-23 06:14:35 |
| Step 4 | ✅ Completed | 2025-07-23 06:14:46 |
| Step 5 | ✅ Completed | 2025-07-23 06:15:00 |
| Step 6 | ✅ Completed | 2025-07-23 06:15:09 |
| Step 7 | ✅ Completed | 2025-07-23 06:15:18 |
| Step 8 | ✅ Completed | 2025-07-23 06:20:13 |
| Step 9 | ✅ Completed | 2025-07-23 06:20:19 |
| Step 10 | ⏳ Not Started | - |
| Step 11 | ✅ Completed | 2025-07-23 06:20:48 |
| Step 12 | ✅ Completed | 2025-07-23 06:21:24 |
| Step 13 | ✅ Completed | 2025-07-23 06:21:58 |
| Step 14 | ⏳ Not Started | - |
| Step 15 | ⏳ Not Started | - |
| Step 16 | ⏳ Not Started | - |
| Step 17 | ⏳ Not Started | - |
| Step 18 | ⏳ Not Started | - |

## Notes & Issues

### Errors Encountered
- None yet

### Important Decisions
- Step 13: PetDetails and PetDetails.css implemented. App.js routing updated to include /pets/:id. Next up: adoption request form.

### Next Actions
- Begin implementation following the checklist
- Use `update_plan_checklist_tool` to mark steps as completed
- Use `read_plan_checklist_tool` to check current status

### Important Instructions
- Don't Leave any placeholders in the code.
- Do NOT mark compilation and testing as complete unless EVERY test case is passing. Double-check that all test cases have passed successfully before updating the checklist. If even a single test case fails, compilation and testing must remain incomplete.
- Do not mark the step as completed until all the sub-steps are completed.

---
*This checklist is automatically maintained. Update status as you complete each step using the provided tools.*