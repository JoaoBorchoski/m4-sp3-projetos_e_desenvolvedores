import { updateProject } from "./logic/projects/patch/index";
import { newProject, newProjectTech } from "./logic/projects/post/index";
import {
    verifyIdProject,
    verifyRequiredKeysProjects,
} from "./logic/projects/middelwaresProjects";
import { getProjects, getProjectsById } from "./logic/projects/get/index";
import {
    updateDeveloper,
    updateDeveloperInfo,
} from "./logic/developer/patch/index";
import express, { Application } from "express";
import { startDataBase } from "./database/db";
import {
    getDeveloperById,
    getDeveloperProjects,
    getDevelopers,
} from "./logic/developer/get/index";
import { newDeveloper, newDeveloperInfo } from "./logic/developer/post/index";
import { deleteDeveloper } from "./logic/developer/delete/index";
import {
    verifyEmail,
    verifyId,
    verifyIdInfo,
    verifyInfos,
    verifyRequiredKeys,
    verifyRequiredKeysPatchDeveloper,
    verifyRequiredKeysPatchInfo,
    verifyTechs,
    verifyTechsAdd,
} from "./middleware/middelwares";
import {
    deleteProject,
    deleteProjectTech,
} from "./logic/projects/delete/index";

const app: Application = express();
app.use(express.json());

app.listen(3000, async () => {
    await startDataBase();
    console.log("Server is running on port 3000");
});

//  DEVELOPER

app.get("/developers", getDevelopers);
app.get("/developers/:id", verifyId, getDeveloperById);
app.get("/developers/:id/projects", verifyId, getDeveloperProjects);

app.post("/developers", verifyRequiredKeys, verifyEmail, newDeveloper);
app.post(
    "/developers/:id/infos",
    verifyId,
    verifyIdInfo,
    verifyInfos,
    newDeveloperInfo
);

app.delete("/developers/:id", verifyId, deleteDeveloper);

app.patch(
    "/developers/:id",
    verifyId,
    verifyRequiredKeysPatchDeveloper,
    verifyEmail,
    updateDeveloper
);
app.patch(
    "/developers/:id/infos",
    verifyId,
    verifyRequiredKeysPatchInfo,
    verifyInfos,
    updateDeveloperInfo
);

//  PROJECTS

app.get("/projects", getProjects);
app.get("/projects/:id", verifyIdProject, getProjectsById);

app.post("/projects", verifyRequiredKeysProjects, newProject);
app.post(
    "/projects/:id/technologies",
    verifyIdProject,
    verifyTechsAdd,
    newProjectTech
);

app.delete("/projects/:id", verifyIdProject, deleteProject);
app.delete(
    "/projects/:id/technologies/:name",
    verifyIdProject,
    verifyTechs,
    deleteProjectTech
);

app.patch(
    "/projects/:id",
    verifyIdProject,
    verifyRequiredKeysProjects,
    updateProject
);
