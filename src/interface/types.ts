import { QueryResult } from "pg";

interface iDeveloper {
    name: string;
    email: string;
    developerInfoId?: number;
}
interface iDeveloperReturn extends iDeveloper {
    id: number;
}

interface iDeveloperUpdate extends iDeveloperReturn {
    id_info: number;
    developerSince: string;
    preferredOS: string;
}

type preferredSistem = "Linux" | "Windows" | "MacOs";

interface iDeveloperInfo {
    developerSince: string;
    preferredOS: preferredSistem;
}

type developerResult = QueryResult<iDeveloperReturn>;

interface iNewProject {
    name: string;
    description: string;
    estimatedTime: string;
    repository: string;
    startDate: string;
    endDate?: string;
    dev_id: number;
}

type validTechs =
    | "JavaScript"
    | "Python"
    | "React"
    | "Express.js"
    | "HTML"
    | "CSS"
    | "Django"
    | "PostgreSQL"
    | "MongoDB";

type requiredKeysProject =
    | "name"
    | "description"
    | "estimatedTime"
    | "repository"
    | "startDate"
    | "endDate"
    | "dev_id";

export {
    iDeveloper,
    iDeveloperReturn,
    developerResult,
    iDeveloperInfo,
    preferredSistem,
    iNewProject,
    requiredKeysProject,
    validTechs,
};
