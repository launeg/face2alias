## Face2Alias

Sign Up Page:
- User can sign up with alias and a photo of themselves

Photo Face Finder Page:
- User can upload an image and Lambda will output boxed faces of faces registered and their alias with a confidence score.

Architecture:
![HLD AWS Architecture diagram](https://github.com/launeg/face2alias/blob/main/ArchitectureDiagramFace2Alias.png)

Run the frontend:
```
cp .env.example .env   # set the three API Gateway URLs
npm install
npm start
npm test
```
The frontend calls three API Gateway endpoints (login, signup, upload). The 2023 backend is not in this repo, so those URLs must point at your own deployment.

Project History
Face2Alias was originally co-developed by Laura Negrin and Nathan Wang during their 2023 AWS internship. Laura primarily contributed to the frontend while Nathan primarily implemented the backend, with both collaborating on architecture, AWS integration, research, testing, and debugging.

This repository has since been cleaned up by Laura as a portfolio project. The frontend now builds, has unit tests for its image and bounding-box logic, and no longer contains internal company references.

## Current status

- Frontend: working React app (login, sign up, upload and face boxes).
- Backend: not in this repo. The 2023 Lambda code was lost, so the three API Gateway URLs must point at your own deployment.
- Tests: unit tests for the helpers in `src/utils.js` and a render test for the login screen.

## Planned (P1)

- Rebuild the SignUp, Login and UploadImage Lambdas.
- Define DynamoDB (alias table) with AWS CDK so the stack is reproducible.
- Wire S3 and Rekognition collections to the Lambdas.
- Upload photos with presigned S3 URLs instead of base64 in a JSON body.
- Split `Home.js` into smaller components.

Nothing in the planned list exists yet.
