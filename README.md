# project-E.M.S-Api 
# Admin Task
| HTTP Method | URL |Request Body |  Error Status | Description |
|-------------|-----|-------------|---------------|-------------|
| post  | admin/signup| {firstName,lastName , email,avatar ,password} | 400 | |
| post     | admin/login | {email, password }| 400  |  |
| get |  / |    | |  |
| get | admin/profile |  | |  |
|post | admin/add-admin | {firstName,lastName , email,avatar ,password} | 400| |   |
| get | admin/patient |  | 400 |    |    |
| post | admin/patient| { firstName, lastName, avatar, phone, fileNumber,bloodType, age, weight, height, disease, email, password } |400 |    |
|put | admin/patient/:id | { firstName, lastName, avatar, phone, fileNumber,bloodType, age, weight, height, disease, email, password }| 400|   |
|delete | admin/patient/:id |  | 400 |    |    |   |

